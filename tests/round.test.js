const test = require('node:test');
const assert = require('node:assert/strict');
const { createBank } = require('../quiz.js');
const { createMissBook } = require('../missbook.js');
const { createPractice, LENGTH } = require('../round.js');

function memoryStore() {
  const data = {};
  return {
    get: key => key in data ? JSON.parse(data[key]) : null,
    set: (key, value) => { data[key] = JSON.stringify(value); },
  };
}

// 12 words in 名詞 (more than one 一組), 4 in 副詞.
const NOUNS = ['いぬ 狗', 'ねこ 貓', 'とり 鳥', 'うま 馬', 'うし 牛', 'さかな 魚', 'はな 花', 'くるま 車', 'いえ 家', 'やま 山', 'かわ 河', 'そら 天空'];
const ADVERBS = ['すぐ 馬上', 'もう 已經', 'まだ 還', 'よく 常常'];
const records = [
  ...NOUNS.map(s => s.split(' ')).map(([w, c]) => ({ cat: '名詞', ch: 'ch-1', w, r: w, c, traps: [] })),
  ...ADVERBS.map(s => s.split(' ')).map(([w, c]) => ({ cat: '副詞', ch: 'ch-2', w, r: w, c, traps: [] })),
];

function setup(store = memoryStore()) {
  const bank = createBank(records);
  const misses = createMissBook(bank, store);
  const practice = createPractice({ bank, misses, store });
  // Answer the current question right or wrong.
  const reply = ok => {
    const q = practice.round.qs[practice.round.i];
    const right = bank.answerOf(q);
    return practice.answer(ok ? right : q.opts.find(o => o !== right));
  };
  return { bank, misses, practice, store, reply };
}
const words = (bank, practice) => practice.round.qs.map(q => bank.item(q.k).w);

test(`一組從範圍抽 ${LENGTH} 題，同一個字不重複；範圍不到 ${LENGTH} 字就全部出`, () => {
  const { bank, practice } = setup();
  assert.equal(practice.start('名詞'), '名詞');
  assert.equal(new Set(words(bank, practice)).size, LENGTH);
  assert.ok(words(bank, practice).every(w => NOUNS.some(s => s.startsWith(w + ' '))));
  practice.start('副詞');
  assert.deepEqual(words(bank, practice).sort(), ['すぐ', 'まだ', 'もう', 'よく']);
});

test('範圍是空的（錯題本還沒有字）就改用全部', () => {
  const { practice } = setup();
  assert.equal(practice.pool('miss').length, 0);
  assert.equal(practice.start('miss'), 'all');
  assert.equal(practice.round.scope, 'all');
});

test('作答：答錯記入錯題本；同一題不能再答；答完才能下一題', () => {
  const { bank, misses, practice, reply } = setup();
  practice.start('副詞');
  assert.equal(practice.inProgress(), false);
  assert.equal(practice.next(), false);
  const q = practice.round.qs[0];
  assert.deepEqual(reply(false), { right: false, book: { n: 1, streak: 0 } });
  assert.deepEqual(misses.list().map(x => x.item.k), [q.k]);
  assert.equal(practice.answer(bank.answerOf(q)), null);
  assert.equal(practice.score(), 0);
  assert.equal(practice.inProgress(), true);
  assert.equal(practice.next(), true);
  assert.deepEqual(reply(true), { right: true, book: null });
  assert.equal(practice.score(), 1);
});

test('最後一題答完並按下一題，這組就結束', () => {
  const { practice, reply } = setup();
  practice.start('副詞');
  for (let i = 0; i < 4; i++) { reply(true); practice.next(); }
  assert.equal(practice.isDone(), true);
  assert.equal(practice.inProgress(), false);
  assert.equal(practice.score(), 4);
});

test('評語等級：全對 3、七成以上 2、四成以上 1、其他 0', () => {
  for (const [rights, level] of [[10, 3], [7, 2], [6, 1], [4, 1], [3, 0], [0, 0]]) {
    const { practice, reply } = setup();
    practice.start('名詞');
    for (let i = 0; i < LENGTH; i++) { reply(i < rights); practice.next(); }
    const r = practice.result();
    assert.equal(r.score, rights);
    assert.equal(r.total, LENGTH);
    assert.equal(r.level, level, `${rights} / ${LENGTH}`);
    assert.equal(r.missed.length, LENGTH - rights);
  }
});

test('複習答錯的字：只出這組答錯的字，而且全部都出', () => {
  const { bank, practice, reply } = setup();
  practice.start('名詞');
  const missed = [];
  for (let i = 0; i < LENGTH; i++) {
    if (i % 3 === 0) missed.push(bank.item(practice.round.qs[i].k).w);
    reply(i % 3 !== 0);
    practice.next();
  }
  assert.deepEqual(practice.result().missed.map(x => x.w).sort(), missed.sort());
  practice.retry();
  assert.deepEqual(words(bank, practice).sort(), missed.sort());
  assert.equal(practice.round.retry, true);
  assert.equal(practice.result().retry, true);
});

test('連續答對移出錯題本的字，列在這組的結果裡', () => {
  const store = memoryStore();
  store.set('jlptn5.mistakes.v1', { 'すぐ|すぐ': [1, 4] });
  const { bank, practice, reply } = setup(store);
  practice.start('miss');
  assert.deepEqual(words(bank, practice), ['すぐ']);
  assert.deepEqual(reply(true).book, { cleared: true });
  practice.next();
  assert.deepEqual(practice.result().cleared.map(x => x.w), ['すぐ']);
});

test('重新載入頁面後接續同一組；存檔裡的字已經不在題庫就重新出題', () => {
  const store = memoryStore();
  const first = setup(store);
  first.practice.start('名詞');
  first.reply(false);
  first.practice.next();
  const again = setup(store);
  assert.equal(again.practice.restore(), true);
  assert.deepEqual(again.practice.round, first.practice.round);

  store.set('jlptn5.quiz.v5', { ...first.practice.round, qs: [{ k: '名詞|いない', t: 'zh2r', opts: [], choice: null }] });
  assert.equal(setup(store).practice.restore(), false);
  assert.equal(setup(memoryStore()).practice.restore(), false);
});
