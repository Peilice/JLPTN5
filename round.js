// 一組練習: draws the questions for one 一組, takes the answers (recording them in the 錯題本 and 已熟),
// keeps the 一組 saved so a reload picks it up, and sums it up at the end.
// The page draws what practice.round holds; it never changes it.
(function (root) {
  const KEY = 'jlptn5.quiz.v5';
  const LENGTH = 10;

  function createPractice({ bank, misses, mastery, store, random = Math.random }) {
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
    // 已熟 words are skipped, but one of them is mixed in to check it is still known.
    // A range that is all 已熟 is asked whole (allKnown), so it can still be practised.
    // Returns the range actually used.
    function start(scope) {
      if (!pool(scope).length) scope = 'all';
      const all = shuffle(pool(scope));
      const fresh = all.filter(x => !mastery.isKnown(x));
      const check = all.find(x => mastery.isKnown(x));
      let qs;
      if (!fresh.length) qs = all.slice(0, LENGTH).map(ask);
      else {
        qs = fresh.slice(0, check ? LENGTH - 1 : LENGTH).map(ask);
        if (check) qs.splice(Math.floor(random() * (qs.length + 1)), 0, { ...ask(check), check: true });
      }
      round = { scope, qs, i: 0, retry: false, allKnown: !fresh.length };
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
      q.known = mastery.record(bank.item(q.k), right, q.t);
      if (q.known.became) (round.known ||= []).push(q.k);
      save();
      return { right, book: q.book, known: q.known, notes: notes(q) };
    }

    // What to say under an answered question, one line per note: the 錯題本 first, then the
    // はなまる. Worked out from what the question saved, so a reload says the same.
    // kind tells the page which icon goes with the line; streak feeds its ●●○○○.
    function notes(q) {
      const out = [];
      const { book, known } = q;
      if (q.choice === null) return out;
      if (book?.cleared) out.push({ kind: 'cleared', text: `連續答對 ${misses.CLEAR} 次，移出錯題本` });
      else if (book && isRight(q)) {
        out.push({ kind: 'streak', text: `錯題本：連續答對 ${book.streak} / ${misses.CLEAR}`, streak: book.streak });
      } else if (book) out.push({ kind: 'missed', text: `已記入錯題本（答錯 ${book.n} 次），連續答對 ${misses.CLEAR} 次就移出` });
      if (known?.became) out.push({ kind: 'known', text: `連續答對 ${mastery.CLEAR} 次，畫上はなまる，之後出題先跳過` });
      else if (known?.lost) out.push({ kind: 'lost', text: '抽查已熟的字答錯了，擦掉はなまる' });
      else if (q.check && known?.known) out.push({ kind: 'checked', text: '抽查已熟的字：還記得，はなまる留著' });
      return out;
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

    // A はなまる taken off by hand. The 一組 under way follows: its range is no longer all
    // 已熟, and the word, if still to be asked as a check, is asked as any other.
    function unmark(item) {
      mastery.unmark(item);
      if (!round) return;
      round.allKnown = false;
      round.qs.forEach(q => {
        if (q.check && q.choice === null && bank.wordId(bank.item(q.k)) === bank.wordId(item)) delete q.check;
      });
      save();
    }

    // Wipes the 錯題本 and every はなまる, and starts a new 一組 in the range given, or this
    // 一組's (全部 when that was the 錯題本, now empty). Returns the range used.
    function clearRecords(scope = round ? round.scope : 'all') {
      misses.clear();
      mastery.clear();
      return start(scope);
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

    // The grade is stamped the way a Japanese teacher stamps homework, in kana an N5 learner can
    // read, with its Chinese and a line under the seal. Indexed by level.
    const GRADES = [
      ['がんばりましょう', '一起加油吧', '別急，先把下面的字看過一遍，再挑戰一次。'],
      ['もうすこし', '再一點點', '有進步空間，先複習下面這些字再試一次。'],
      ['よくできました', '做得很好', '不錯！把下面答錯的字再看一遍就更穩了。'],
      ['たいへんよくできました', '做得非常好', '全部答對！這組字已經很熟了。'],
    ];

    // The grade is a level, 0 to 3: all right, 70% or more, 40% or more, less.
    function result() {
      const total = round.qs.length;
      const s = score();
      const ratio = s / total;
      const level = ratio === 1 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
      const [ja, zh, line] = GRADES[level];
      return {
        score: s, total, retry: round.retry, level,
        grade: { ja, zh },
        msg: round.retry && level === 3 ? '錯題都訂正好了，這幾個字記住了。' : line,
        missed: round.qs.filter(q => !isRight(q)).map(q => bank.item(q.k)),
        cleared: (round.cleared || []).map(k => bank.item(k)).filter(Boolean),
        known: (round.known || []).map(k => bank.item(k)).filter(Boolean),
      };
    }

    return {
      pool,
      start,
      retry,
      restore,
      result,
      answer,
      notes,
      next,
      unmark,
      clearRecords,
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
