// 一組練習: draws the questions for one 一組, takes the answers (recording them in the 錯題本),
// keeps the 一組 saved so a reload picks it up, and sums it up at the end.
// The page draws what practice.round holds; it never changes it.
(function (root) {
  const KEY = 'jlptn5.quiz.v5';
  const LENGTH = 10;

  function createPractice({ bank, misses, store, random = Math.random }) {
    let round = null;

    function shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // 範圍: 'all', a chapter, a section or 'miss'. The round shuffles the pool anyway,
    // so the 錯題本 range needs no order.
    const pool = scope => scope === 'miss' ? misses.list().map(x => x.item) : bank.pool(scope);
    const save = () => store.set(KEY, round);
    // A word in the 錯題本 is asked the way it was missed.
    const ask = item => ({ ...bank.question(item, misses.typeFor(item)), choice: null });

    // A new 一組 from the range; an empty range (錯題本 with no words) falls back to 全部.
    // Returns the range actually used.
    function start(scope) {
      if (!pool(scope).length) scope = 'all';
      round = { scope, qs: shuffle(pool(scope)).slice(0, LENGTH).map(ask), i: 0, retry: false };
      save();
      return scope;
    }

    const isRight = q => q.choice !== null && q.choice === bank.answerOf(q);
    const score = () => round.qs.filter(isRight).length;
    const isDone = () => round.i >= round.qs.length;
    const inProgress = () => !isDone() && (round.i > 0 || round.qs[0].choice !== null);

    // Answers the current question once. Where it left the word in the 錯題本 is kept with
    // the question, so a reload shows it too. Returns null when there is nothing to answer.
    function answer(opt) {
      const q = round && round.qs[round.i];
      if (!q || q.choice !== null) return null;
      q.choice = opt;
      const right = isRight(q);
      q.book = misses.record(bank.item(q.k), right, q.t);
      if (q.book?.cleared) (round.cleared ||= []).push(q.k);
      save();
      return { right, book: q.book };
    }

    // On to the next question, once this one is answered.
    function next() {
      if (!round || isDone() || round.qs[round.i].choice === null) return false;
      round.i++;
      save();
      return true;
    }

    // The words this 一組 got wrong, asked again, all of them.
    function retry() {
      const missed = round.qs.filter(q => !isRight(q)).map(q => bank.item(q.k));
      round = { scope: round.scope, qs: shuffle(missed).map(ask), i: 0, retry: true };
      save();
    }

    // Picks up the 一組 saved before a reload; one asking a word or type the page no longer
    // has is dropped. Returns whether there was one to pick up.
    function restore() {
      const saved = store.get(KEY);
      if (!saved || !Array.isArray(saved.qs) || !saved.qs.length) return false;
      if (!saved.qs.every(q => bank.item(q.k) && bank.typesFor(bank.item(q.k)).includes(q.t) &&
        Array.isArray(q.opts) && q.opts.includes(bank.answerOf(q)))) return false;
      round = saved;
      return true;
    }

    // The grade is a level, 0 to 3: all right, 70% or more, 40% or more, less.
    // The page words it (the seal and the line under it).
    function result() {
      const total = round.qs.length;
      const s = score();
      const ratio = s / total;
      return {
        score: s, total, retry: round.retry,
        level: ratio === 1 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0,
        missed: round.qs.filter(q => !isRight(q)).map(q => bank.item(q.k)),
        cleared: (round.cleared || []).map(k => bank.item(k)).filter(Boolean),
      };
    }

    return {
      pool,
      start,
      retry,
      restore,
      result,
      answer,
      next,
      isRight,
      score,
      isDone,
      inProgress,
      get round() { return round; },
    };
  }

  const api = { createPractice, LENGTH };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JLPTRound = api;
})(this);
