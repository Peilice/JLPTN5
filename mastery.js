// 已熟 module: each word's run of right answers is kept on this device as [right in a row, types
// answered right in that run]. CLEAR right in a row, in at least TYPES of the types (or every type
// the word gets, if it gets fewer), makes it 已熟; a miss starts the run over, so a 已熟 word that
// is missed is 已熟 no more. Every answer counts, in the 錯題本 too. A word in two sections shares one record.
// The store is anything with get(key) and set(key, value): localStorage on the page, memory in tests.
(function (root) {
  const KEY = 'jlptn5.mastery.v1';
  const CLEAR = 5;
  const TYPES = 2;

  function createMastery(bank, store) {
    const runs = store.get(KEY) || {};
    const save = () => store.set(KEY, runs);

    const ids = new Set(bank.items.map(bank.wordId));
    // A word whose writing or reading changed on the page is gone; its record goes with it.
    // An empty bank means the page could not be read, so nothing is dropped then.
    const gone = Object.keys(runs).filter(id => !ids.has(id));
    if (ids.size && gone.length) {
      gone.forEach(id => delete runs[id]);
      save();
    }

    function isKnown(item) {
      const run = runs[bank.wordId(item)];
      if (!run || run[0] < CLEAR) return false;
      const types = bank.typesFor(item);
      return run[1].filter(t => types.includes(t)).length >= Math.min(TYPES, types.length);
    }

    // Where this answer left the word: { streak, known }, plus became when it just turned 已熟
    // and lost when a 已熟 word was missed.
    function record(item, right, type) {
      const id = bank.wordId(item);
      const was = isKnown(item);
      if (!right) delete runs[id];
      else {
        const run = runs[id] || [0, []];
        run[0]++;
        if (!run[1].includes(type)) run[1].push(type);
        runs[id] = run;
      }
      save();
      const known = isKnown(item);
      const out = { streak: runs[id] ? runs[id][0] : 0, known };
      if (known && !was) out.became = true;
      if (was && !known) out.lost = true;
      return out;
    }

    // Taken off by hand: the run starts over.
    function unmark(item) {
      delete runs[bank.wordId(item)];
      save();
    }

    function clear() {
      Object.keys(runs).forEach(id => delete runs[id]);
      save();
    }

    return { record, isKnown, unmark, clear, CLEAR };
  }

  const api = { createMastery, CLEAR, TYPES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JLPTMastery = api;
})(this);
