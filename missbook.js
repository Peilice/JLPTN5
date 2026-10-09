// 錯題本 module: every miss is kept on this device as [times missed, correct in a row, question type].
// While a word is in the book it is always asked the way it was last missed, and CLEAR correct
// in a row of that type takes it out. A word listed in two sections shares one record.
// The store is anything with get(key) and set(key, value): localStorage on the page, memory in tests.
(function (root) {
  const KEY = 'jlptn5.mistakes.v1';
  const CLEAR = 5;

  function createMissBook(bank, store) {
    const mistakes = store.get(KEY) || {};
    const save = () => store.set(KEY, mistakes);

    // Records from before the type was kept, or a type the word no longer gets, have none.
    function typeFor(item) {
      const t = mistakes[bank.wordId(item)]?.[2];
      return bank.typesFor(item).includes(t) ? t : null;
    }

    // Where this answer left the word: { cleared: true } when it just left the book,
    // { n, streak } while it is in the book, null when it is not.
    function record(item, right, type) {
      const id = bank.wordId(item);
      const rec = mistakes[id];
      if (!right) mistakes[id] = [(rec ? rec[0] : 0) + 1, 0, type];
      // An easier type answered right proves nothing about the one that was missed.
      else if (!rec) return null;
      else if ((typeFor(item) || type) !== type) return { n: rec[0], streak: rec[1] };
      else if (++rec[1] >= CLEAR) {
        delete mistakes[id];
        save();
        return { cleared: true };
      }
      save();
      const now = mistakes[id];
      return { n: now[0], streak: now[1] };
    }

    // The first listing of each word stands for it; a word no longer on the page is not listed.
    const itemOf = new Map();
    bank.items.forEach(x => { if (!itemOf.has(bank.wordId(x))) itemOf.set(bank.wordId(x), x); });

    // Most-missed first; among equals, the one furthest from leaving the book.
    const list = () => Object.keys(mistakes).filter(id => itemOf.has(id))
      .sort((a, b) => mistakes[b][0] - mistakes[a][0] || mistakes[a][1] - mistakes[b][1])
      .map(id => ({ item: itemOf.get(id), n: mistakes[id][0], streak: mistakes[id][1] }));

    function clear() {
      Object.keys(mistakes).forEach(id => delete mistakes[id]);
      save();
    }

    return { record, typeFor, list, clear };
  }

  const api = { createMissBook, CLEAR };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JLPTMissBook = api;
})(this);
