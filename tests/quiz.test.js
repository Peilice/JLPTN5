const test = require('node:test');
const assert = require('node:assert/strict');
const { createBank } = require('../quiz.js');

// A seeded random (mulberry32), so a failing question can be reproduced.
function seeded(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const word = (cat, ch, w, r, c, traps = []) => ({ cat, ch, w, r, c, traps });

test('同一個字收錄在兩節：全部和整章只出一次，單節各自都有', () => {
  const bank = createBank([
    word('時間', 'ch-1', '毎年', 'まいとし', '每年'),
    word('頻率', 'ch-1', '毎年', 'まいとし', '每年'),
    word('頻率', 'ch-1', '毎日', 'まいにち', '每天'),
    word('家族', 'ch-2', '母', 'はは', '媽媽'),
  ], { random: seeded(1) });

  const ws = list => list.map(x => x.w).sort();
  assert.deepEqual(ws(bank.pool('all')), ['母', '毎年', '毎日']);
  assert.deepEqual(ws(bank.pool('ch-1')), ['毎年', '毎日']);
  assert.deepEqual(ws(bank.pool('時間')), ['毎年']);
  assert.deepEqual(ws(bank.pool('頻率')), ['毎年', '毎日']);
  assert.equal(bank.items.length, 4);
  assert.equal(bank.wordId(bank.pool('時間')[0]), bank.wordId(bank.pool('頻率')[0]));
});

test('湊不出 3 個錯誤選項的題型不出：13日 只出中文→讀音和漢字→讀音', () => {
  const bank = createBank([
    word('日期', 'ch-1', '13日', 'じゅうさんにち', '13號', ['じゅうさんか', 'じゅうさんび']),
    word('年齡', 'ch-1', '13歳', 'じゅうさんさい', '13歲'),
    word('日期', 'ch-1', '1日', 'ついたち', '1號'),
    word('日期', 'ch-1', '2日', 'ふつか', '2號'),
    word('日期', 'ch-1', '3日', 'みっか', '3號'),
  ], { random: seeded(1) });
  assert.deepEqual(bank.typesFor(bank.item('日期|13日')).sort(), ['reading', 'zh2r']);
});

test('帶數字的字只和同一個數字的字放在一起：6本 配 6杯、6匹、6枚，不配 1本', () => {
  const records = [
    word('量詞', 'ch-1', '6本', 'ろっぽん', '6支'),
    word('量詞', 'ch-1', '6杯', 'ろっぱい', '6杯'),
    word('量詞', 'ch-1', '6匹', 'ろっぴき', '6隻'),
    word('量詞', 'ch-1', '6枚', 'ろくまい', '6張'),
    word('量詞', 'ch-1', '1本', 'いっぽん', '1支'),
    word('量詞', 'ch-1', '1杯', 'いっぱい', '1杯'),
    word('量詞', 'ch-1', '何本', 'なんぼん', '幾支'),
  ];
  for (let seed = 1; seed <= 20; seed++) {
    const bank = createBank(records, { random: seeded(seed) });
    const q = bank.question(bank.item('量詞|6本'), 'kana');
    assert.equal(q.t, 'kana');
    assert.deepEqual([...q.opts].sort(), ['6匹', '6本', '6杯', '6枚']);
    assert.equal(bank.answerOf(q), '6本');
  }
});

test('錯題本指定的題型能出就用它，不能出就隨機挑一種能出的', () => {
  const bank = createBank([
    word('副詞', 'ch-1', 'すぐ', 'すぐ', '馬上'),
    word('副詞', 'ch-1', 'もう', 'もう', '已經'),
    word('副詞', 'ch-1', 'まだ', 'まだ', '還'),
    word('副詞', 'ch-1', 'よく', 'よく', '常常'),
  ], { random: seeded(3) });
  const item = bank.item('副詞|すぐ');
  for (let i = 0; i < 10; i++) assert.equal(bank.question(item, 'r2zh').t, 'r2zh');
  for (let i = 0; i < 10; i++) assert.ok(['zh2r', 'r2zh'].includes(bank.question(item, 'kana').t));
});

test('能出哪些題型和抽選項的順序無關', () => {
  // 甲乙丙 shares a sense with each of 甲, 乙, 丙, so drawing it first would leave no room for
  // two more; 甲, 乙, 丙 together still make three wrong options.
  const records = [
    word('名詞', 'ch-1', 'いぬ', 'いぬ', '丁'),
    word('名詞', 'ch-1', 'ねこ', 'ねこ', '甲、乙、丙'),
    word('名詞', 'ch-1', 'とり', 'とり', '甲'),
    word('名詞', 'ch-1', 'うま', 'うま', '乙'),
    word('名詞', 'ch-1', 'うし', 'うし', '丙'),
  ];
  for (let seed = 1; seed <= 30; seed++) {
    const bank = createBank(records, { random: seeded(seed) });
    assert.ok(bank.typesFor(bank.item('名詞|いぬ')).includes('r2zh'), `seed ${seed}`);
  }
});

test('只用假名寫的字不出漢字→讀音和讀音→漢字', () => {
  const bank = createBank([
    word('副詞', 'ch-1', 'すぐ', 'すぐ', '馬上'),
    word('副詞', 'ch-1', 'もう', 'もう', '已經'),
    word('副詞', 'ch-1', 'まだ', 'まだ', '還'),
    word('副詞', 'ch-1', 'よく', 'よく', '常常'),
  ], { random: seeded(1) });
  assert.deepEqual(bank.typesFor(bank.item('副詞|すぐ')).sort(), ['r2zh', 'zh2r']);
});
