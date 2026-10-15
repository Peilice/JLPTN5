const test = require('node:test');
const assert = require('node:assert/strict');
const { createBank } = require('../quiz.js');
const { createMissBook } = require('../missbook.js');
const { createMastery } = require('../mastery.js');
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
  const mastery = createMastery(bank, store);
  const practice = createPractice({ bank, misses, mastery, store });
  // Answer the current question right or wrong.
  const reply = ok => {
    const q = practice.round.qs[practice.round.i];
    const right = bank.answerOf(q);
    return practice.answer(ok ? right : q.opts.find(o => o !== right));
  };
  return { bank, misses, mastery, practice, store, reply };
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
  assert.deepEqual(reply(false), {
    right: false, book: { n: 1, streak: 0 }, known: { streak: 0, known: false },
    notes: [{ kind: 'missed', text: '已記入錯題本（答錯 1 次），連續答對 5 次就移出' }],
  });
  assert.deepEqual(misses.list().map(x => x.item.k), [q.k]);
  assert.equal(practice.answer(bank.answerOf(q)), null);
  assert.equal(practice.score(), 0);
  assert.equal(practice.inProgress(), true);
  assert.equal(practice.next(), true);
  assert.deepEqual(reply(true), { right: true, book: null, known: { streak: 1, known: false }, notes: [] });
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

// Makes a word 已熟: right CLEAR times, in both types the test words get.
const learn = (mastery, x) => { for (let i = 0; i < 5; i++) mastery.record(x, true, i % 2 ? 'zh2r' : 'r2zh'); };

test('已熟的字不出題，但每組混一題已熟的字抽查', () => {
  const { bank, mastery, practice } = setup();
  bank.pool('名詞').slice(0, 5).forEach(x => learn(mastery, x));
  for (let n = 0; n < 20; n++) {
    practice.start('名詞');
    const qs = practice.round.qs;
    // 7 words not yet 已熟, and one 已熟 word to check.
    assert.equal(qs.length, 8);
    assert.equal(qs.filter(q => mastery.isKnown(bank.item(q.k))).length, 1);
    assert.deepEqual(qs.filter(q => q.check).map(q => q.k), qs.filter(q => mastery.isKnown(bank.item(q.k))).map(q => q.k));
    assert.equal(practice.round.allKnown, false);
  }
  practice.start('副詞');
  assert.equal(practice.round.qs.length, 4);
  assert.ok(practice.round.qs.every(q => !q.check));
});

test('範圍裡的字都已熟，就照樣全部出題，並標明都已熟', () => {
  const { bank, mastery, practice } = setup();
  bank.pool('副詞').forEach(x => learn(mastery, x));
  practice.start('副詞');
  assert.equal(practice.round.qs.length, 4);
  assert.equal(practice.round.allKnown, true);
});

test('抽查答錯就不再是已熟，並記入錯題本', () => {
  const { bank, misses, mastery, practice, reply } = setup();
  bank.pool('名詞').forEach((x, n) => { if (n) learn(mastery, x); });
  practice.start('名詞');
  const qs = practice.round.qs;
  for (const q of qs) {
    const r = reply(!q.check);
    if (q.check) assert.equal(r.known.lost, true);
    practice.next();
  }
  const checked = bank.item(qs.find(q => q.check).k);
  assert.equal(mastery.isKnown(checked), false);
  assert.ok(misses.list().some(x => x.item.k === checked.k));
  assert.deepEqual(practice.result().known, []);

});

test('這組變成已熟的字列在結果裡', () => {
  const { bank, mastery, practice, reply } = setup();
  const fresh = bank.pool('副詞')[0];
  for (let i = 0; i < 4; i++) mastery.record(fresh, true, i % 2 ? 'zh2r' : 'r2zh');
  practice.start('副詞');
  for (const q of practice.round.qs) { reply(q.k === fresh.k); practice.next(); }
  assert.deepEqual(practice.result().known.map(x => x.k), [fresh.k]);
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

// What the page says under an answered question: one line per note, in this order —
// the 錯題本 first, then the はなまる. The page only adds the icon each kind carries.
const said = notes => notes.map(n => `${n.kind}：${n.text}`);

test('答完一題的提示：答錯記入錯題本，答對時錯題本的進度', () => {
  const store = memoryStore();
  store.set('jlptn5.mistakes.v1', { 'すぐ|すぐ': [2, 3, 'zh2r'] });
  const { practice, reply } = setup(store);
  practice.start('miss');
  assert.deepEqual(said(reply(true).notes), ['streak：錯題本：連續答對 4 / 5']);
  assert.equal(practice.round.qs[0].book.streak, 4);

  const fresh = setup();
  fresh.practice.start('副詞');
  assert.deepEqual(said(fresh.reply(false).notes), ['missed：已記入錯題本（答錯 1 次），連續答對 5 次就移出']);
  fresh.practice.next();
  assert.deepEqual(fresh.reply(true).notes, []);
});

test('答完一題的提示：移出錯題本與畫上はなまる同時發生時，兩句都說，錯題本在前', () => {
  const store = memoryStore();
  store.set('jlptn5.mistakes.v1', { 'すぐ|すぐ': [1, 4, 'zh2r'] });
  store.set('jlptn5.mastery.v1', { 'すぐ|すぐ': [4, ['r2zh']] });
  const { practice, reply } = setup(store);
  practice.start('miss');
  assert.deepEqual(said(reply(true).notes), [
    'cleared：連續答對 5 次，移出錯題本',
    'known：連續答對 5 次，畫上はなまる，之後出題先跳過',
  ]);
});

test('答完一題的提示：抽查答對留著はなまる，答錯就擦掉並記入錯題本', () => {
  const { bank, mastery, practice, reply } = setup();
  bank.pool('名詞').forEach((x, n) => { if (n) learn(mastery, x); });
  practice.start('名詞');
  const at = practice.round.qs.findIndex(q => q.check);
  for (let i = 0; i < at; i++) { reply(true); practice.next(); }
  assert.deepEqual(said(reply(true).notes), ['checked：抽查已熟的字：還記得，はなまる留著']);

  const again = setup();
  bank.pool('名詞').forEach((x, n) => { if (n) learn(again.mastery, again.bank.item(x.k)); });
  again.practice.start('名詞');
  const at2 = again.practice.round.qs.findIndex(q => q.check);
  for (let i = 0; i < at2; i++) { again.reply(true); again.practice.next(); }
  assert.deepEqual(said(again.reply(false).notes), [
    'missed：已記入錯題本（答錯 1 次），連續答對 5 次就移出',
    'lost：抽查已熟的字答錯了，擦掉はなまる',
  ]);
});

test('重新載入後，答過的題目照樣說出同樣的提示', () => {
  const store = memoryStore();
  const first = setup(store);
  first.practice.start('名詞');
  const notes = first.reply(false).notes;
  const again = setup(store);
  again.practice.restore();
  assert.deepEqual(again.practice.notes(again.practice.round.qs[0]), notes);
  assert.deepEqual(again.practice.notes(again.practice.round.qs[1]), []);
});

test('評語：朱印的日文、中文與底下那句話依等級而定；複習全對另有一句', () => {
  const wording = (rights, retry) => {
    const { practice, reply } = setup();
    practice.start('名詞');
    if (retry) {
      reply(false);
      for (let i = 1; i < LENGTH; i++) { practice.next(); reply(true); }
      practice.next();
      practice.retry();
      reply(true);
      practice.next();
    } else for (let i = 0; i < LENGTH; i++) { reply(i < rights); practice.next(); }
    const { grade, msg } = practice.result();
    return [grade.ja, grade.zh, msg];
  };
  assert.deepEqual(wording(10), ['たいへんよくできました', '做得非常好', '全部答對！這組字已經很熟了。']);
  assert.deepEqual(wording(7), ['よくできました', '做得很好', '不錯！把下面答錯的字再看一遍就更穩了。']);
  assert.deepEqual(wording(4), ['もうすこし', '再一點點', '有進步空間，先複習下面這些字再試一次。']);
  assert.deepEqual(wording(0), ['がんばりましょう', '一起加油吧', '別急，先把下面的字看過一遍，再挑戰一次。']);
  assert.deepEqual(wording(0, true), ['たいへんよくできました', '做得非常好', '錯題都訂正好了，這幾個字記住了。']);
});
