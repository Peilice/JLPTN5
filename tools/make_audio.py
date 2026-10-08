"""用本機的 VOICEVOX 為 index.html 裡所有播放鍵產生 mp3。

收集的文字和頁面上播放鍵送出的文字完全相同：
  - 單字列的讀音（.reading）
  - 表格格子的讀音（.t-r，沒有就用 .t-w）
  - 例句（.ex-ja）
產生的檔案放在 audio/，對照表寫到 audio/manifest.js，頁面載入後優先播放 mp3。

用法（先開啟 VOICEVOX，讓引擎在 127.0.0.1:50021 執行）：
  python tools/make_audio.py --list          列出可用的聲音與 speaker ID
  python tools/make_audio.py                 產生缺少的音檔（已存在的會略過）
  python tools/make_audio.py --speaker 8     指定聲音
  python tools/make_audio.py --force         全部重新產生（換聲音後使用）
  python tools/make_audio.py --prune         順便刪掉已不在頁面上的舊音檔

需要：pip install lameenc
"""

import argparse
import hashlib
import io
import json
import re
import sys
import urllib.parse
import urllib.request
import wave
from html.parser import HTMLParser
from pathlib import Path

import lameenc

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / 'index.html'
OUT = ROOT / 'audio'
MANIFEST = OUT / 'manifest.js'


class Collector(HTMLParser):
    """依序收集頁面上會被朗讀的文字（等同 textContent.trim()）。"""

    TARGETS = ('reading', 't-r', 't-w', 'ex-ja')
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []      # 每個開啟中的元素：收集目標名稱或 None
        self.bufs = {}       # 目標名稱 -> 正在累積的文字
        self.tile = None     # 目前所在格子的 {'t-r': ..., 't-w': ...}
        self.tile_depth = None
        self.texts = []      # 單字與格子的讀音
        self.sentences = []  # 例句

    def handle_starttag(self, tag, attrs):
        if tag in self.VOID:
            return
        classes = (dict(attrs).get('class') or '').split()
        if 'tile' in classes and tag == 'li':
            self.tile, self.tile_depth = {}, len(self.stack)
        target = next((c for c in self.TARGETS if c in classes), None)
        if target:
            self.bufs[target] = []
        self.stack.append(target)

    def handle_startendtag(self, tag, attrs):
        pass  # <br> 等空元素不影響文字

    def handle_endtag(self, tag):
        if not self.stack:
            return
        target = self.stack.pop()
        if target:
            text = ''.join(self.bufs.pop(target)).strip()
            if target == 'reading':
                self.texts.append(text)
            elif target == 'ex-ja':
                self.sentences.append(text)
            elif self.tile is not None:
                self.tile[target] = text
        if self.tile is not None and len(self.stack) == self.tile_depth:
            spoken = self.tile.get('t-r') or self.tile.get('t-w')
            if spoken:
                self.texts.append(spoken)
            self.tile = self.tile_depth = None

    def handle_data(self, data):
        for buf in self.bufs.values():
            buf.append(data)


def say_fix(html):
    """讀取頁面裡的 SAY_FIX，讓 VOICEVOX 和瀏覽器語音使用相同的修正。"""
    m = re.search(r'const SAY_FIX = (\{.*?\});', html)
    return json.loads(m.group(1)) if m else {}


def api(path, params=None, body=None):
    url = 'http://127.0.0.1:50021' + path
    if params:
        url += '?' + urllib.parse.urlencode(params)
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


def speaker_name(speaker_id):
    for sp in json.loads(api('/speakers')):
        for style in sp['styles']:
            if style['id'] == speaker_id:
                return sp['name'], style['name']
    sys.exit(f'找不到 speaker ID {speaker_id}，請用 --list 查看可用的聲音。')


def synth(text, speaker, speed):
    query = json.loads(api('/audio_query', {'text': text, 'speaker': speaker}, body={}))
    query.update(speedScale=speed, outputSamplingRate=24000, outputStereo=False,
                 prePhonemeLength=0.05, postPhonemeLength=0.15)
    wav = api('/synthesis', {'speaker': speaker}, body=query)
    with wave.open(io.BytesIO(wav)) as w:
        pcm, rate, channels = w.readframes(w.getnframes()), w.getframerate(), w.getnchannels()
    enc = lameenc.Encoder()
    enc.set_bit_rate(48)
    enc.set_in_sample_rate(rate)
    enc.set_channels(channels)
    enc.set_quality(2)
    return enc.encode(pcm) + enc.flush()


def main():
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding='utf-8', errors='replace')
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--speaker', type=int, default=8, help='VOICEVOX speaker（style）ID，預設 8：春日部つむぎ')
    ap.add_argument('--list', action='store_true', help='列出可用的聲音')
    ap.add_argument('--force', action='store_true', help='已存在的音檔也重新產生')
    ap.add_argument('--prune', action='store_true', help='刪除頁面上已不再使用的音檔')
    args = ap.parse_args()

    try:
        version = json.loads(api('/version'))
    except OSError:
        sys.exit('連不到 VOICEVOX 引擎（127.0.0.1:50021），請先開啟 VOICEVOX。')

    if args.list:
        for sp in json.loads(api('/speakers')):
            print(sp['name'] + '：' + '、'.join(f"{s['name']}={s['id']}" for s in sp['styles']))
        return

    html = HTML.read_text(encoding='utf-8')
    fix = say_fix(html)
    collector = Collector()
    collector.feed(html)
    sentences = set(collector.sentences)
    texts = list(dict.fromkeys(t for t in collector.texts + collector.sentences if t))
    name, style = speaker_name(args.speaker)
    print(f'VOICEVOX {version}，聲音：{name}（{style}），共 {len(texts)} 段文字')

    OUT.mkdir(exist_ok=True)
    manifest, made = {}, 0
    for i, text in enumerate(texts, 1):
        file = hashlib.sha1(text.encode()).hexdigest()[:12] + '.mp3'
        manifest[text] = file
        path = OUT / file
        if path.exists() and not args.force:
            continue
        spoken = fix.get(text, text).replace('／', '、').replace('/', '、')
        # 單字放慢一點，例句維持接近自然的速度
        speed = 0.9 if text in sentences else 0.8
        path.write_bytes(synth(spoken, args.speaker, speed))
        made += 1
        print(f'[{i}/{len(texts)}] {text}')

    credit = f'VOICEVOX:{name}'
    MANIFEST.write_text(
        '// 由 tools/make_audio.py 產生，請勿手動修改。\n'
        f'window.SAY_AUDIO_CREDIT = {json.dumps(credit, ensure_ascii=False)};\n'
        f'window.SAY_AUDIO = {json.dumps(manifest, ensure_ascii=False, indent=0)};\n',
        encoding='utf-8')

    removed = 0
    if args.prune:
        used = set(manifest.values())
        for f in OUT.glob('*.mp3'):
            if f.name not in used:
                f.unlink()
                removed += 1
    print(f'完成：新產生 {made} 個、刪除 {removed} 個，manifest 共 {len(manifest)} 筆。')


if __name__ == '__main__':
    main()
