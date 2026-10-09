// 出題 module: builds the quiz bank from the words read off the page and makes questions.
// The page (index.html) and the tests (tests/) each read the words their own way and hand
// them in as plain records: { cat, ch, w, r, c, traps }.
// Loaded with a plain <script src>, so it works on GitHub Pages and from file:// alike.
(function (root) {
  // The separate senses of a meaning: 不好意思、對不起 → 不好意思 / 對不起.
  // A 、 inside （） only qualifies one sense (穿（鞋、褲）), so it does not split.
  const senses = c => c.replace(/（[^）]*）/g, m => m.replace(/、/g, '・'))
    .split(/[、；／]/).map(s => s.trim()).filter(Boolean);
  // The number a word counts, so its wrong options can share it: 6本 is asked among 6杯 6匹 6枚,
  // never beside 1本, where matching the digit alone would give the answer away.
  // 'bare' groups the plain numerals (6, 100) and '何' the question words (何本, いくつ).
  const KANJI_NUM = '一二三四五六七八九十';
  function numOf(w) {
    if (/^[\d万]+$/.test(w)) return 'bare';
    const m = w.match(/^\d+/) || w.match(/^([一二三四五六七八九十])[つ人]?$/);
    if (m) return m[1] ? String(KANJI_NUM.indexOf(m[1]) + 1) : m[0];
    return (w.startsWith('何') && w.length > 1) || w === 'いくつ' ? '何' : null;
  }

  // A word (寫法＋讀音) can sit in several sections; each listing is its own item.
  const wordId = item => item.w + '|' + item.r;

  // Question types: what the prompt shows, what the options are, and the line asking.
  // The reading always sits on one side: kanji and Chinese share glyphs (学校／學校), so a
  // prompt in one with options in the other could be answered by matching shapes alone.
  //   zh2r    中文→讀音：show the meaning, pick the reading
  //   reading 漢字→讀音：show the word (and meaning, so 1日 1號／一天 stay distinct), pick the reading
  //   r2zh    讀音→中文：show the reading, pick the meaning
  //   kana    讀音→漢字：show the reading, pick how it is written
  const TYPES = {
    zh2r: { show: 'c', opt: 'r', ask: '這個意思怎麼念？' },
    reading: { show: 'w', opt: 'r', ask: '這個怎麼念？' },
    r2zh: { show: 'r', opt: 'c', ask: '這個讀音的中文意思是？' },
    kana: { show: 'r', opt: 'w', ask: '這個讀音要怎麼寫？' },
  };
  const ans = (item, type) => item[TYPES[type].opt];
  // Which words can stand as a wrong option of each type.
  const fits = {
    zh2r: () => true,
    reading: () => true,
    r2zh: x => Boolean(x.c),
    kana: x => x.w !== x.r,
  };
  // A reading listing two ways to say it (よん／し) only sits among others that do too,
  // so the ／ never singles out the answer or a wrong option.
  const multi = r => r.includes('／');

  // Two items are too close to share one question: same meaning or a shared sense
  // (ごめんなさい 對不起／すみません 不好意思、對不起), same reading (homophones like 暑い／熱い),
  // or one word containing the other (すぐ／すぐに).
  function tooClose(a, b) {
    return a.w === b.w || a.c === b.c || a.r === b.r || a.w.startsWith(b.w) || b.w.startsWith(a.w) ||
      a.s.some(s => b.s.includes(s));
  }

  function createBank(records, { random = Math.random } = {}) {
    const items = [];
    const byKey = new Map();
    records.forEach(rec => {
      const item = { ...rec, traps: rec.traps || [] };
      item.k = item.cat + '|' + item.w;
      item.s = senses(item.c);
      item.n = numOf(item.w);
      if (byKey.has(item.k)) return;
      byKey.set(item.k, item);
      items.push(item);
    });

    // A word can sit in two sections; a whole chapter or 全部 asks it once.
    const once = list => {
      const seen = new Set();
      return list.filter(x => seen.has(wordId(x)) ? false : (seen.add(wordId(x)), true));
    };
    // 範圍: 'all', a chapter id (ch-…) or a section id. The 錯題本 range is built by the caller.
    const pool = scope => scope === 'all' ? once(items)
      : scope.startsWith('ch-') ? once(items.filter(x => x.ch === scope))
        : items.filter(x => x.cat === scope);

    // What may stand beside the answer: the word's own traps (reading questions only) and the
    // words of the same 數字分組 that fit the type, with an option shaped like the answer.
    function candidates(item, type) {
      const right = ans(item, type);
      const byReading = TYPES[type].opt === 'r';
      const shape = v => !byReading || multi(v) === multi(right);
      const traps = byReading ? [...new Set(item.traps)].filter(t => t !== right && shape(t)) : [];
      const words = items.filter(x => x.k !== item.k && x.n === item.n && fits[type](x) && shape(ans(x, type)));
      return { right, traps, words };
    }
    // Whether two words may both be options (or one the answer): 漢字→讀音 shows the meaning,
    // so only the readings need to differ; the other types also keep apart words too close.
    const apart = (type, a, b) => ans(a, type) !== ans(b, type) && (type === 'reading' || !tooClose(a, b));

    // Whether any three wrong options exist, regardless of the order they are drawn in.
    function canFill(item, type) {
      const { right, traps, words } = candidates(item, type);
      const need = 3 - Math.min(traps.length, 3);
      const usable = words.filter(x => ans(x, type) !== right && !traps.includes(ans(x, type)) && apart(type, item, x));
      const search = (chosen, from) => chosen.length === need ||
        usable.some((x, i) => i >= from && chosen.every(y => apart(type, x, y)) && search([...chosen, x], i + 1));
      return search([], 0);
    }

    // Words written in kana alone have no kanji to read or write. A type is also left out
    // when it cannot find three wrong options (13日 has no other 13 to stand beside it).
    const typeCache = new Map();
    function typesFor(item) {
      if (typeCache.has(item.k)) return typeCache.get(item.k);
      const t = [];
      if (item.c) t.push('zh2r', 'r2zh');
      if (item.w !== item.r) t.push('reading', 'kana');
      const full = t.filter(type => canFill(item, type));
      const out = full.length ? full : t;
      typeCache.set(item.k, out);
      return out;
    }

    function shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // Questions answered with a reading lead with up to two hand-written traps (よんにち for 4日),
    // the mistakes learners actually make. The rest come from the same table,
    // then the same chapter, then anywhere, drawn from words that fit the type and
    // count the same number; when those run out, any traps left over fill in.
    function pickDistractors(item, type) {
      const { right, traps: allTraps, words } = candidates(item, type);
      const out = [];
      const taken = new Set([right]);
      const traps = shuffle(allTraps);
      const addTraps = max => {
        while (out.length < max && traps.length) {
          const t = traps.shift();
          if (!taken.has(t)) { taken.add(t); out.push(t); }
        }
      };
      addTraps(2);
      const chosen = [item];
      const tiers = [
        x => x.cat === item.cat,
        x => x.cat !== item.cat && x.ch === item.ch,
        x => x.ch !== item.ch,
      ].flatMap(f => shuffle(words.filter(f)));
      for (const x of tiers) {
        if (out.length === 3) break;
        const v = ans(x, type);
        if (taken.has(v) || !chosen.every(y => apart(type, x, y))) continue;
        taken.add(v);
        chosen.push(x);
        out.push(v);
      }
      addTraps(3);
      return out;
    }

    // One question about item. prefer is the type the 錯題本 asks it in; a type the word
    // cannot be asked in is ignored and one is drawn at random.
    function question(item, prefer) {
      const types = typesFor(item);
      const t = types.includes(prefer) ? prefer : types[Math.floor(random() * types.length)];
      return { k: item.k, t, opts: shuffle([ans(item, t), ...pickDistractors(item, t)]) };
    }

    return {
      items,
      pool,
      typesFor,
      question,
      answerOf: q => ans(byKey.get(q.k), q.t),
      wordId,
      item: k => byKey.get(k),
    };
  }

  const api = { createBank, TYPES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JLPTQuiz = api;
})(this);
