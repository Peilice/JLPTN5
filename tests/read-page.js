// Reads the words off index.html the way the page does (see the reader at the top of the
// page script): every .entry and .tile inside a .lex-section, in page order, as the plain
// records quiz.js takes, plus the example sentences the page speaks.
// No dependencies, so a small tag walker stands in for the DOM.
const fs = require('node:fs');
const path = require('node:path');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const FIELDS = ['jw', 't-w', 'reading', 't-r', 'mean-t', 't-c', 'ex-ja'];
const decode = s => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&(lt|gt|quot|#39|nbsp|amp);/g, (_, n) => ({ lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', amp: '&' }[n]));
const attrsOf = s => Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));

function walk(file = path.join(__dirname, '..', 'index.html')) {
  // Script and style bodies hold < and tag-like strings, so they are dropped first.
  const html = fs.readFileSync(file, 'utf8').replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const records = [];
  const sentences = [];
  const stack = [];   // { tag, cls, role } for each open element
  let chapter = null, section = null, word = null;
  // Text is collected into every open field, like textContent.
  const open = () => stack.filter(e => e.field).map(e => e.field);

  for (const m of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>|<!--[\s\S]*?-->|([^<]+)/g)) {
    const [, close, tagRaw, attrStr, selfClose, text] = m;
    if (text !== undefined) {
      if (word) open().forEach(f => { word.text[f] += decode(text); });
      continue;
    }
    if (!tagRaw) continue;  // comment
    const tag = tagRaw.toLowerCase();
    if (close) {
      const e = stack.pop();
      if (!e) continue;
      if (e.role === 'word') {
        const t = word.text;
        if (t['ex-ja'].trim()) sentences.push(t['ex-ja'].trim());
        const w = (t.jw || t['t-w']).trim();
        records.push({
          cat: section.id, ch: chapter, w,
          r: (t.reading || t['t-r']).trim() || w,
          c: (t['mean-t'] || t['t-c']).trim(),
          traps: (word.trap || '').split('・').filter(Boolean),
        });
        word = null;
      } else if (e.role === 'section') section = null;
      else if (e.role === 'chapter') chapter = null;
      continue;
    }
    if (VOID.has(tag) || selfClose) continue;
    const a = attrsOf(attrStr);
    const cls = (a.class || '').split(/\s+/);
    const e = { tag };
    if (tag === 'section' && cls.includes('chapter')) { e.role = 'chapter'; chapter = a.id; }
    else if (tag === 'section' && cls.includes('lex-section')) { e.role = 'section'; section = { id: a.id }; }
    else if (section && (cls.includes('entry') || cls.includes('tile'))) {
      e.role = 'word';
      word = { trap: a['data-trap'], text: Object.fromEntries(FIELDS.map(f => [f, ''])) };
    } else if (word) e.field = FIELDS.find(f => cls.includes(f));
    stack.push(e);
  }
  return { records, sentences };
}

const readPage = file => walk(file).records;
// Every text a say button sends: each word's reading and each example sentence.
function readSpoken(file) {
  const { records, sentences } = walk(file);
  return [...new Set([...records.map(x => x.r), ...sentences])];
}

module.exports = { readPage, readSpoken };
