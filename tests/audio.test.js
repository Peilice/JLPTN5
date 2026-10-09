// Every say button should play the recorded VOICEVOX voice; a text without an mp3 falls
// back to the browser's own voice, which sounds different. tools/make_audio.py fills the gaps.
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { readSpoken } = require('./read-page.js');

test('頁面上每個播放鍵的文字都有 VOICEVOX 音檔', { todo: '等 tools/make_audio.py 補上 <td> 格子的音檔' }, () => {
  global.window = {};
  require(path.join(__dirname, '..', 'audio', 'manifest.js'));
  const audio = global.window.SAY_AUDIO;
  delete global.window;
  const missing = readSpoken().filter(text => !audio[text]);
  assert.deepEqual(missing, [], `缺少 ${missing.length} 個音檔，請執行 python tools/make_audio.py`);
});
