# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

給台灣學習者的 JLPT N5 單字表與選擇題練習。純靜態網頁（GitHub Pages），沒有建置步驟、沒有 npm 套件；打開 `index.html` 就能跑（`file://` 也行）。

## 指令

```
node --test                          # 全部測試（Node 18+，零依賴）
node --test tests/quiz.test.js       # 單一測試檔
UPDATE_SNAPSHOT=1 node --test        # 能出的題型有預期內的變動時，重寫 tests/types.snapshot.json
python tools/make_audio.py           # 用本機 VOICEVOX（127.0.0.1:50021）補齊缺少的發音 mp3，需 pip install lameenc
python tools/make_audio.py --prune   # 同時刪掉頁面上已不存在的音檔
```

新增或修改單字、例句後要跑 `make_audio.py`，否則 `tests/audio.test.js` 會失敗。`audio/manifest.js` 是產生出來的，不要手改。

## 架構

**`index.html` 是唯一的資料來源。** 單字不存在任何 JSON 裡，而是寫在 HTML 標記中：`section.chapter`（6 章）> `section.lex-section`（節，id 即範圍 id）> `.entry`（單字列，欄位 `.jw` `.reading` `.mean-t` `.ex-ja`）或 `.tile`（表格格子，欄位 `.t-w` `.t-r` `.t-c`）。`data-trap="…・…"` 是手寫的常見錯誤念法。

`words.js` 的 `readWords(doc)`／`readSentences(doc)` 把這些讀成純紀錄 `{ cat, ch, w, r, c, traps }`。頁面交給它 `document`；`tests/read-page.js` 交給它一棵從 HTML 建出來的簡化節點樹（只支援 class 選擇器，用到不支援的選擇器會直接報錯），所以頁面和測試跑的是同一份讀法。`tools/make_audio.py` 的 `Collector` 是 Python 版的同一套規則，改了單字標記的 class 或結構時要一起改；`audio.test.js` 只能抓到它漏收的文字。

頁面讀完單字後一律換成題庫裡的那一筆（`bank.itemFor`）；題庫的 `typesFor`／`question` 收到不是自己發出的資料會報錯。

**規則模組**都是 UMD 風格的 IIFE：瀏覽器用 `<script src>` 掛到 `window.JLPT*`，Node 用 `module.exports`。它們不碰 DOM，儲存透過注入的 `store`（有 `get(key)`／`set(key, value)` 的物件；頁面是包了 try/catch 的 localStorage，測試是記憶體）。
- `quiz.js`（`JLPTQuiz.createBank`）：四種題型、錯誤選項挑選（trap 優先、數字分組、`tooClose` 排除太接近的字）、範圍（`'all'`、`ch-…` 章、節 id）。
- `missbook.js`（`createMissBook`）：錯題本，key `jlptn5.mistakes.v1`。
- `mastery.js`（`createMastery`）：已熟／はなまる，key `jlptn5.mastery.v1`。
- `round.js`（`createPractice`）：一組練習的抽題、作答（同時記入錯題本與已熟）、存檔接續，key `jlptn5.quiz.v5`；範圍多一個 `'miss'`。也負責答完一題的提示句（`notes`）、評語文字、各範圍字數（`scopes`）、擦掉はなまる（`unmark`）與清除學習紀錄（`clearRecords`）。頁面只讀 `practice.round` 來畫；會改變紀錄的操作都經過 `round.js`，查詢可以直接問錯題本與已熟。

規則一律放在這些模組並在 `tests/` 測；`index.html` 的腳本只負責畫面。改 localStorage 資料格式時要換 key 的版本號。字的身分是 `寫法|讀音`（`bank.wordId`），所以改了某字的寫法或讀音，它的錯題本與已熟紀錄會在載入時被清掉（這是刻意的）。

`tests/bank.test.js` 拿整份單字表、每種題型、多個 seed 出題，檢查沒有題目能只靠字形或數字答對；這是新增單字時最常失敗的測試，通常靠調整 `data-trap` 或單字本身解決，而不是放寬規則。它刻意自己抄一份「太接近」的規則，不引用 `quiz.js`，別當成重複程式碼合併。

頁面腳本本身沒有自動測試；改了它要在瀏覽器實際操作確認。

## 用語與文件

- `GLOSSARY.md` 定義專案詞彙（字、筆、義項、題型、錯誤選項、trap、範圍、一組、錯題本、已熟、抽查），並列出使用者文字中**要避免**的說法。程式註解與 UI 文案都用這些詞；程式註解以英文寫、夾帶這些中文術語。
- `PRODUCT.md`：使用者（手機、零碎時間）、章節結構、出題原則。
- `DESIGN.md`：日系文具風格的設計系統（色票 token、元件、Do/Don't）。改畫面前先讀。`.impeccable/` 是 impeccable 設計工具的紀錄。
- Commit 訊息用繁體中文，描述使用者看得到的改變。
