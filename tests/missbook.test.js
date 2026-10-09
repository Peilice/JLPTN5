const test = require('node:test');
const assert = require('node:assert/strict');
const { createBank } = require('../quiz.js');
const { createMissBook, CLEAR } = require('../missbook.js');

// The page's store, kept in memory: a reload is a second book over the same store.
function memoryStore(init = {}) {
  const data = Object.fromEntries(Object.entries(init).map(([k, v]) => [k, JSON.stringify(v)]));
  return {
    get: key => key in data ? JSON.parse(data[key]) : null,
    set: (key, value) => { data[key] = JSON.stringify(value); },
  };
}

const word = (cat, w, r, c) => ({ cat, ch: 'ch-1', w, r, c, traps: [] });
// Enough words that every one of them can be asked in all four types.
const bank = createBank([
  word('時間', '毎年', 'まいとし', '每年'),
  word('頻率', '毎年', 'まいとし', '每年'),
  word('時間', '毎日', 'まいにち', '每天'),
  word('時間', '今日', 'きょう', '今天'),
  word('時間', '明日', 'あした', '明天'),
  word('時間', '昨日', 'きのう', '昨天'),
]);
const item = w => bank.items.find(x => x.w === w);

test('答錯記入錯題本：答錯次數加一、連續答對歸零、記下這次的題型', () => {
  const book = createMissBook(bank, memoryStore());
  assert.equal(book.record(item('今日'), true, 'kana'), null);
  assert.deepEqual(book.record(item('今日'), false, 'kana'), { n: 1, streak: 0 });
  assert.deepEqual(book.record(item('今日'), true, 'kana'), { n: 1, streak: 1 });
  assert.deepEqual(book.record(item('今日'), false, 'reading'), { n: 2, streak: 0 });
  assert.equal(book.typeFor(item('今日')), 'reading');
});

test('只有用記下的題型答對才算連續答對', () => {
  const book = createMissBook(bank, memoryStore());
  book.record(item('明日'), false, 'kana');
  assert.deepEqual(book.record(item('明日'), true, 'zh2r'), { n: 1, streak: 0 });
  assert.deepEqual(book.record(item('明日'), true, 'kana'), { n: 1, streak: 1 });
});

test(`用記下的題型連續答對 ${CLEAR} 次就移出錯題本`, () => {
  const book = createMissBook(bank, memoryStore());
  book.record(item('昨日'), false, 'kana');
  for (let i = 1; i < CLEAR; i++) assert.deepEqual(book.record(item('昨日'), true, 'kana'), { n: 1, streak: i });
  assert.deepEqual(book.record(item('昨日'), true, 'kana'), { cleared: true });
  assert.equal(book.typeFor(item('昨日')), null);
  assert.equal(book.record(item('昨日'), true, 'kana'), null);
});

test('舊格式的紀錄沒有題型：用任何題型答對都算', () => {
  const store = memoryStore({ 'jlptn5.mistakes.v1': { '毎日|まいにち': [3, 1] } });
  const book = createMissBook(bank, store);
  assert.equal(book.typeFor(item('毎日')), null);
  assert.deepEqual(book.record(item('毎日'), true, 'r2zh'), { n: 3, streak: 2 });
});

test('錯題本清單：答錯多的排前面，次數相同時連續答對少的排前面；同一個字只列一次', () => {
  const book = createMissBook(bank, memoryStore());
  book.record(item('今日'), false, 'kana');
  book.record(item('明日'), false, 'kana');
  book.record(item('明日'), true, 'kana');
  book.record(item('毎年'), false, 'kana');
  book.record(item('毎年'), false, 'kana');
  assert.deepEqual(book.list().map(x => [x.item.w, x.n, x.streak]), [
    ['毎年', 2, 0],
    ['今日', 1, 0],
    ['明日', 1, 1],
  ]);
});

test('重新載入頁面後紀錄還在；清除後重新載入也是空的', () => {
  const store = memoryStore();
  const first = createMissBook(bank, store);
  first.record(item('今日'), false, 'kana');
  first.record(item('今日'), true, 'kana');
  assert.deepEqual(createMissBook(bank, store).list().map(x => [x.item.w, x.n, x.streak]), [['今日', 1, 1]]);
  first.clear();
  assert.deepEqual(first.list(), []);
  assert.deepEqual(createMissBook(bank, store).list(), []);
});

test('記下的題型現在已經不能出：不指定題型，用任何題型答對都算', () => {
  // ありがとう is written in kana alone, so it can no longer be asked 讀音→漢字.
  const kanaBank = createBank([
    word('寒暄', 'ありがとう', 'ありがとう', '謝謝'),
    word('寒暄', 'すみません', 'すみません', '不好意思'),
    word('寒暄', 'おはよう', 'おはよう', '早安'),
    word('寒暄', 'さようなら', 'さようなら', '再見'),
  ]);
  const store = memoryStore({ 'jlptn5.mistakes.v1': { 'ありがとう|ありがとう': [1, 0, 'kana'] } });
  const book = createMissBook(kanaBank, store);
  const x = kanaBank.items[0];
  assert.equal(book.typeFor(x), null);
  assert.deepEqual(book.record(x, true, 'zh2r'), { n: 1, streak: 1 });
});
