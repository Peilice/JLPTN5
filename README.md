# JLPTN5

給台灣學習者的 JLPT N5 單字表與選擇題練習。純靜態網頁，部署在 GitHub Pages，不需要建置。

- `index.html`：單字表（唯一的資料來源）與頁面程式
- `quiz.js`：出題規則（題型、錯誤選項、範圍）
- `missbook.js`：錯題本（記錄、移出規則、清單）
- `round.js`：一組練習（抽題、作答、存檔與接續、評語等級）
- `audio/`：VOICEVOX 產生的發音，由 `tools/make_audio.py` 產生
- 詞彙定義見 `GLOSSARY.md`，產品方向見 `PRODUCT.md`

## 測試

需要 Node.js 18 以上，不用安裝任何套件：

```
node --test
```

`tests/bank.test.js` 會讀取 `index.html` 的整份單字表，檢查每個字的每種題型都不能只看字形或數字就答對。
新增單字或修改 `data-trap` 後，如果能出的題型有變動（且確認是預期的），重新產生對照表：

```
UPDATE_SNAPSHOT=1 node --test
```
