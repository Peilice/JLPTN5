// Reads the words off index.html with the page's own reader (words.js). No dependencies, so a
// small tree built from the tags stands in for the DOM: just what words.js asks of it, class
// selectors (.a, .b) in querySelector(All) and closest, textContent, id and dataset.
// An unsupported selector throws, so the reader cannot quietly ask for more than this gives.
const fs = require('node:fs');
const path = require('node:path');
const { readWords, readSentences } = require('../words.js');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const decode = s => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&(lt|gt|quot|#39|nbsp|amp);/g, (_, n) => ({ lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', amp: '&' }[n]));
const attrsOf = s => Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));

function classesOf(sel) {
  return sel.split(',').map(s => {
    const m = s.trim().match(/^\.([\w-]+)$/);
    if (!m) throw new Error(`read-page.js 不支援這個選擇器：${sel}`);
    return m[1];
  });
}

class Node {
  constructor(tag, attrs = {}, parent = null) {
    this.tag = tag;
    this.attrs = attrs;
    this.parent = parent;
    this.children = [];   // Nodes and strings, in order
    this.classes = (attrs.class || '').split(/\s+/).filter(Boolean);
  }
  get id() { return this.attrs.id || ''; }
  get dataset() {
    return Object.fromEntries(Object.entries(this.attrs).filter(([k]) => k.startsWith('data-'))
      .map(([k, v]) => [k.slice(5).replace(/-(\w)/g, (_, c) => c.toUpperCase()), v]));
  }
  get textContent() { return this.children.map(c => typeof c === 'string' ? c : c.textContent).join(''); }
  matches(sel) { return classesOf(sel).some(c => this.classes.includes(c)); }
  // Descendants in document order, like the DOM.
  querySelectorAll(sel) {
    classesOf(sel);
    const out = [];
    const walk = n => n.children.forEach(c => {
      if (typeof c === 'string') return;
      if (c.matches(sel)) out.push(c);
      walk(c);
    });
    walk(this);
    return out;
  }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  closest(sel) {
    for (let n = this; n; n = n.parent) if (n.tag !== '#document' && n.matches(sel)) return n;
    return null;
  }
}

function parse(file = path.join(__dirname, '..', 'index.html')) {
  // Script and style bodies hold < and tag-like strings, so they are dropped first.
  const html = fs.readFileSync(file, 'utf8').replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const doc = new Node('#document');
  let at = doc;
  for (const m of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>|<!--[\s\S]*?-->|<![^>]*>|([^<]+)/g)) {
    const [, close, tagRaw, attrStr, selfClose, text] = m;
    if (text !== undefined) { at.children.push(decode(text)); continue; }
    if (!tagRaw) continue;  // comment or doctype
    const tag = tagRaw.toLowerCase();
    if (close) {
      // Close up to the matching open element; a stray end tag is ignored.
      let n = at;
      while (n !== doc && n.tag !== tag) n = n.parent;
      if (n !== doc) at = n.parent;
      continue;
    }
    const node = new Node(tag, attrsOf(attrStr), at);
    at.children.push(node);
    if (!VOID.has(tag) && !selfClose) at = node;
  }
  return doc;
}

const readPage = file => readWords(parse(file)).map(x => x.rec);
// Every text a say button sends: each word's reading and each example sentence.
function readSpoken(file) {
  const doc = parse(file);
  return [...new Set([...readWords(doc).map(x => x.rec.r), ...readSentences(doc).map(x => x.text)])];
}

module.exports = { readPage, readSpoken };
