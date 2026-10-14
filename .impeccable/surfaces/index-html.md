---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# index.html surface brief

Scope: 整頁（頁首、練習區、目次列、六章單字、錯題本、頁尾）。Mode: Operate。
Audience/job: 中文母語的 N5 學習者，用手機零碎時間複習、做 10 題練習。
Constraints: 內容、章節、功能、JS 行為與 class 名稱不動；螢光筆標特殊念法保留（使用者指定）；純靜態、無建置。
User steer (2026-10-15): 三輪方向都重擲後，使用者指定「可愛、溫暖、有親和力，像日本文具／便利貼／手帳」，色彩交給設計判斷。

## Direction contract

THESIS: 一張日系文具桌面：單字本貼滿索引標籤與便利貼，練習題是一疊便利貼，答完一張撕下一張。拒絕的預設：米白紙＋明朝體＋朱筆的「課本」，以及藍色主色的一般單字 app。

OWN-WORLD: 桌面是白色方眼紙（淡藍灰 20px 方格、每五格一條粗線），只出現在頁首與練習區；單字本是白紙，暖炭墨字。（建置時曾改用綠色切割墊，使用者 2026-10-15 回覆「我不喜歡綠色切割墊背景」，改回方眼紙。）六章各有一種文具色（珊瑚橘、天空藍、若草綠、薰衣草、櫻桃粉、薄荷）作為索引標籤、章首色塊與目前位置；螢光筆黃只標念法。圓體字：日文 Zen Maru Gothic、中文標題 jf 粉圓（Huninn），內文系統黑體。大圓角、便利貼帶極輕的貼紙陰影與微傾斜。

STORY: 一打開就看到方眼紙桌面上一疊便利貼寫著「開始練習」，下面是貼著彩色索引標籤的單字本；學習者點便利貼開始，答完撕下、下一張已在底下；章節用索引標籤顏色記住「我在哪」。

FIRST VIEWPORT: 手機 390px：頂端精簡頁首（名稱用粉圓、字數一行）；接著方眼桌面上一張傾斜 −1.5° 的便利貼（練習列，章色紙）寫開始／接續與進度，下面露出兩張紙邊表示一疊；再下面是固定目次列（目前章的索引標籤色），然後第一章章首：頂端一條珊瑚橘章色帶，「第一章」索引標籤與章標題同一行，數字格是白色小卡。便利貼固定是桃色（不隨範圍換色）；收合時傾斜 −1.5°，展開的練習卡不傾斜以利閱讀。

FORM: 使用者指定的方向（日系文具），取代擲出的方向；擲骰序列 seed key 255e984a（三輪重擲後由使用者 steer 決定）。Signature move：答題後點「下一題」，目前的便利貼向右上撕起飛出、底下一張補上（尊重 prefers-reduced-motion 改為淡出）。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
