const test = require('node:test');
const assert = require('node:assert/strict');
const { createBank } = require('../quiz.js');
const { createMastery, CLEAR } = require('../mastery.js');

// The page's store, kept in memory: a reload is a second record over the same store.
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
const item = (w, cat = '時間') => bank.items.find(x => x.w === w && x.cat === cat);
// Answers right n times, in the types given in turn.
const rights = (m, x, n, types) => {
  let out;
  for (let i = 0; i < n; i++) out = m.record(x, true, types[i % types.length]);
  return out;
};

test(`連續答對 ${CLEAR} 次、至少兩種題型，就是已熟`, () => {
  const m = createMastery(bank, memoryStore());
  assert.deepEqual(rights(m, item('今日'), CLEAR - 1, ['kana', 'reading']), { streak: CLEAR - 1, known: false });
  assert.deepEqual(m.record(item('今日'), true, 'kana'), { streak: CLEAR, known: true, became: true });
  assert.equal(m.isKnown(item('今日')), true);
  assert.deepEqual(m.record(item('今日'), true, 'zh2r'), { streak: CLEAR + 1, known: true });
});

test('同一種題型答對再多次也不算已熟，換一種題型答對才算', () => {
  const m = createMastery(bank, memoryStore());
  assert.deepEqual(rights(m, item('明日'), CLEAR + 2, ['kana']), { streak: CLEAR + 2, known: false });
  assert.deepEqual(m.record(item('明日'), true, 'r2zh'), { streak: CLEAR + 3, known: true, became: true });
});

test('只有一種題型能出的字，用那一種連續答對就算', () => {
  const one = { ...bank, typesFor: () => ['zh2r'] };
  const m = createMastery(one, memoryStore());
  assert.equal(rights(m, item('今日'), CLEAR, ['zh2r']).known, true);
});

test('答錯就從頭算；已熟的字答錯就不再是已熟', () => {
  const m = createMastery(bank, memoryStore());
  rights(m, item('昨日'), CLEAR - 1, ['kana', 'reading']);
  assert.deepEqual(m.record(item('昨日'), false, 'kana'), { streak: 0, known: false });
  assert.equal(rights(m, item('昨日'), CLEAR - 1, ['kana', 'reading']).known, false);
  rights(m, item('昨日'), 1, ['kana']);
  assert.deepEqual(m.record(item('昨日'), false, 'zh2r'), { streak: 0, known: false, lost: true });
  assert.equal(m.isKnown(item('昨日')), false);
});

test('同一個字在兩節共用一筆紀錄；重新載入後還在', () => {
  const store = memoryStore();
  const m = createMastery(bank, store);
  rights(m, item('毎年', '時間'), CLEAR, ['kana', 'reading']);
  assert.equal(m.isKnown(item('毎年', '頻率')), true);
  assert.equal(createMastery(bank, store).isKnown(item('毎年', '時間')), true);
});

test('手動取消與全部清除', () => {
  const m = createMastery(bank, memoryStore());
  rights(m, item('今日'), CLEAR, ['kana', 'reading']);
  rights(m, item('明日'), CLEAR, ['kana', 'reading']);
  m.unmark(item('今日'));
  assert.equal(m.isKnown(item('今日')), false);
  assert.equal(m.record(item('今日'), true, 'kana').streak, 1);
  m.clear();
  assert.equal(m.isKnown(item('明日')), false);
});

test('頁面上已經沒有的字，紀錄跟著刪掉；讀不到單字表時什麼都不刪', () => {
  const store = memoryStore({ 'jlptn5.mastery.v1': { '今日|きょう': [5, ['kana', 'reading']], '去年|きょねん': [5, ['kana', 'reading']] } });
  createMastery(createBank([]), store);
  assert.deepEqual(Object.keys(store.get('jlptn5.mastery.v1')).sort(), ['今日|きょう', '去年|きょねん']);
  createMastery(bank, store);
  assert.deepEqual(Object.keys(store.get('jlptn5.mastery.v1')), ['今日|きょう']);
});
