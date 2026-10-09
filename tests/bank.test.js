// Every word on the page, asked in every type it supports, under several seeds:
// no question may be answerable without knowing the word (PRODUCT.md, 練習模式).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createBank } = require('../quiz.js');
const { readPage } = require('./read-page.js');

function seeded(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const records = readPage();
const SEEDS = [1, 2, 3, 4, 5];
// Which field each type's options are: the reading, the meaning or the written form.
const OPT = { zh2r: 'r', reading: 'r', r2zh: 'c', kana: 'w' };
const senses = c => c.replace(/（[^）]*）/g, m => m.replace(/、/g, '・')).split(/[、；／]/).map(s => s.trim()).filter(Boolean);
const close = (a, b) => a.w === b.w || a.c === b.c || a.r === b.r || a.w.startsWith(b.w) || b.w.startsWith(a.w) ||
  senses(a.c).some(s => senses(b.c).includes(s));

// Asks every listing in every type it supports and returns what breaks each rule.
function violations() {
  const found = { 選項數: [], 數字分組: [], 斜線: [], 太接近: [], 題型: [] };
  for (const seed of SEEDS) {
    const bank = createBank(records, { random: seeded(seed) });
    for (const item of bank.items) {
      for (const t of bank.typesFor(item)) {
        const q = bank.question(item, t);
        const at = `${item.k} ${t} seed=${seed}: ${q.opts.join(' / ')}`;
        const right = bank.answerOf(q);
        if (q.t !== t || !OPT[t] || ((t === 'reading' || t === 'kana') && item.w === item.r)) found.題型.push(at);
        if (q.opts.length !== 4 || new Set(q.opts).size !== 4 || q.opts.filter(o => o === right).length !== 1) found.選項數.push(at);
        const wrong = q.opts.filter(o => o !== right);
        // Each wrong option is one of the word's traps or a word counting the same number.
        const words = wrong.filter(o => !(OPT[t] === 'r' && item.traps.includes(o)))
          .map(o => bank.items.filter(x => x[OPT[t]] === o && x.n === item.n));
        if (words.some(ws => !ws.length)) found.數字分組.push(at);
        if (OPT[t] === 'r' && wrong.some(o => o.includes('／') !== right.includes('／'))) found.斜線.push(at);
        if (t !== 'reading') {
          // Two words can share an option (十 and 10個 both mean 10個), so the options pass when
          // some choice of words behind them keeps every pair apart, the answer included.
          const fits = (chosen, i) => i === words.length ||
            words[i].some(x => chosen.every(y => !close(x, y)) && fits([...chosen, x], i + 1));
          if (!fits([item], 0)) found.太接近.push(at);
        }
      }
    }
  }
  return found;
}

test('整份單字表：每個字的每種題型都不能只看字形或數字就答對', () => {
  const found = violations();
  const summary = Object.fromEntries(Object.entries(found).map(([k, v]) => [k, [...new Set(v.map(s => s.replace(/ seed=\d+:.*/, '')))]]));
  assert.deepEqual(summary, { 選項數: [], 數字分組: [], 斜線: [], 太接近: [], 題型: [] },
    Object.entries(found).filter(([, v]) => v.length).map(([k, v]) => `${k}（${v.length}）\n  ${v.slice(0, 8).join('\n  ')}`).join('\n'));
});

// Which types each listing can be asked in. Regenerate after editing words or traps:
//   UPDATE_SNAPSHOT=1 node --test
test('每個字能出的題型和 types.snapshot.json 一致', () => {
  const file = path.join(__dirname, 'types.snapshot.json');
  const bank = createBank(records, { random: seeded(1) });
  const now = Object.fromEntries(bank.items.map(x => [x.k, bank.typesFor(x).slice().sort().join(' ')]));
  if (process.env.UPDATE_SNAPSHOT || !fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(now, null, 1) + '\n');
  assert.deepEqual(now, JSON.parse(fs.readFileSync(file, 'utf8')));
});
