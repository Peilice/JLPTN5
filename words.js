// 單字 reader: every word row (.entry) and table tile (.tile) inside a .lex-section, read off the
// page as the plain records quiz.js takes: { cat, ch, w, r, c, traps }, each with its element.
// The page hands in its document; tests/read-page.js hands in a small tree built from index.html,
// so both read the words with this same code. tools/make_audio.py reads them the same way in Python.
(function (root) {
  const text = el => el ? el.textContent.trim() : '';

  function readWords(doc) {
    const words = [];
    doc.querySelectorAll('.lex-section').forEach(sec => {
      const base = { cat: sec.id, ch: sec.closest('.chapter').id };
      sec.querySelectorAll('.entry, .tile').forEach(el => {
        const w = text(el.querySelector('.jw, .t-w'));
        words.push({
          el, rec: {
            ...base, w,
            r: text(el.querySelector('.reading, .t-r')) || w,
            c: text(el.querySelector('.mean-t, .t-c')),
            traps: (el.dataset.trap || '').split('・').filter(Boolean),
          },
        });
      });
    });
    return words;
  }

  // Every example sentence a say button speaks: { el, text }, el being its .ex-ja.
  const readSentences = doc => [...doc.querySelectorAll('.e-ex')]
    .map(box => box.querySelector('.ex-ja')).filter(Boolean)
    .map(el => ({ el, text: text(el) }));

  const api = { readWords, readSentences };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JLPTWords = api;
})(this);
