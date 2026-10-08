---
name: JLPT N5 單字整理表
description: 通勤時翻開的日文單字本：紙張、墨色、一支螢光筆與老師的朱筆
colors:
  vermilion: "#b5473b"
  vermilion-ink: "#9e3b30"
  vermilion-wash: "#f7e4df"
  highlighter: "#efc030"
  paper: "#f7f3ea"
  paper-sheet: "#fffdf8"
  paper-shade: "#f1ece1"
  paper-mask: "#e5dfd2"
  sumi: "#1f1d1a"
  sumi-soft: "#3b3732"
  sumi-faded: "#6a645b"
  ruled-line: "#e4ddcf"
  pencil-line: "#8c8478"
  pine: "#2f6f4f"
  pine-wash: "#e4eee2"
  indigo: "#2b5a9e"
  indigo-wash: "#e6ecf4"
  ochre: "#85561c"
  ochre-wash: "#f3e7d3"
  bookmark: "#6b4680"
  bookmark-wash: "#f0e5f8"
  bookmark-line: "#9678a9"
  correct: "#2b6a4a"
  correct-wash: "#e2eee0"
  wrong: "#a83f33"
  wrong-wash: "#f8e4df"
  night-paper: "#171512"
  night-sheet: "#211e1a"
  night-shade: "#2a2621"
  night-mask: "#3b362f"
  night-ink: "#ede6da"
  night-ink-soft: "#d8d0c3"
  night-ink-faded: "#a9a196"
  night-ruled-line: "#38332d"
  night-pencil-line: "#7a7268"
  night-vermilion: "#e2806f"
  night-vermilion-ink: "#f0a395"
  night-vermilion-wash: "#3b231f"
  night-on-vermilion: "#1b1210"
  night-pine: "#86cba4"
  night-pine-wash: "#1d3227"
  night-indigo: "#94b8ee"
  night-indigo-wash: "#1d2b41"
  night-ochre: "#e2b574"
  night-ochre-wash: "#3a2c18"
  night-highlighter: "#6b5414"
  night-bookmark: "#caa8df"
  night-bookmark-wash: "#33253c"
  night-bookmark-line: "#886e99"
typography:
  display:
    fontFamily: "Klee One, Hiragino Mincho ProN, Yu Mincho, Noto Serif JP, serif"
    fontSize: "clamp(2.75rem, 12vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
  headline:
    fontFamily: "PingFang TC, Noto Sans TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.01em"
  title:
    fontFamily: "PingFang TC, Noto Sans TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.4
  headword:
    fontFamily: "Klee One, Hiragino Mincho ProN, Yu Mincho, Noto Serif JP, serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "PingFang TC, Noto Sans TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
  body-ja:
    fontFamily: "Hiragino Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, Yu Gothic, Meiryo, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "PingFang TC, Noto Sans TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  hairline: "6px"
  field: "8px"
  surface: "12px"
  sheet: "16px"
  pill: "999px"
spacing:
  gutter-phone: "16px"
  gutter: "20px"
  row: "14px"
  section: "28px"
  container: "900px"
components:
  button-primary:
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.paper-sheet}"
    rounded: "{rounded.surface}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.sumi-soft}"
    textColor: "{colors.paper-sheet}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.sumi}"
    rounded: "{rounded.surface}"
    padding: "0 28px"
    height: "52px"
  answer-option:
    backgroundColor: "{colors.paper-sheet}"
    textColor: "{colors.sumi}"
    rounded: "{rounded.surface}"
    padding: "10px 14px"
    height: "56px"
    typography: "{typography.body}"
  answer-option-correct:
    backgroundColor: "{colors.correct-wash}"
    textColor: "{colors.correct}"
  answer-option-wrong:
    backgroundColor: "{colors.wrong-wash}"
    textColor: "{colors.wrong}"
  quiz-sheet:
    backgroundColor: "{colors.paper-sheet}"
    rounded: "{rounded.sheet}"
    padding: "18px 18px 8px"
  toc-button:
    backgroundColor: "transparent"
    textColor: "{colors.sumi}"
    rounded: "{rounded.pill}"
    padding: "0 12px 0 10px"
    height: "40px"
  toc-link-current:
    backgroundColor: "{colors.bookmark}"
    textColor: "{colors.paper-sheet}"
    rounded: "{rounded.field}"
    height: "44px"
  chapter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.sumi-soft}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "40px"
  pos-tag-intransitive:
    backgroundColor: "{colors.pine-wash}"
    textColor: "{colors.pine}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  pos-tag-transitive:
    backgroundColor: "{colors.indigo-wash}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  pos-tag-both:
    backgroundColor: "{colors.ochre-wash}"
    textColor: "{colors.ochre}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  say-button:
    backgroundColor: "transparent"
    textColor: "{colors.sumi-faded}"
    rounded: "{rounded.pill}"
    size: "36px"
  say-button-speaking:
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.paper}"
  select-field:
    backgroundColor: "{colors.paper-sheet}"
    textColor: "{colors.sumi}"
    rounded: "{rounded.field}"
    padding: "0 10px"
    height: "40px"
---

# Design System: JLPT N5 單字整理表

## Overview

**Creative North Star: "通勤用的單字本"**

這個介面是一本放在口袋裡、在捷運上隨手翻開的單字本：暖白的紙、墨色的字、一支學習者自己畫重點的螢光筆，和一支只在批改時落下的朱筆。學習者手上通常只有幾分鐘、一隻手、晃動的車廂和忽明忽暗的光線，所以每一頁都要一眼看懂、拇指按得到、隨時可以闔上再打開。介面本身退到紙的背後，讓日文字成為頁面上最有存在感的東西。

材質語言來自課本：紙張分成頁面底色（`paper`）和攤開的那一張（`paper-sheet`），單字之間像筆記本一樣用細橫線分隔，而不是一張張浮起來的卡片。日文單字用教科書體 Klee One 書寫，讓學習者看到正確的筆畫形狀；中文說明用安靜的繁中黑體退居其次。螢光筆（`highlighter`）是學習者在課本上畫的重點，標出念法會變、要特別注意的字；朱紅（`vermilion`）是老師的批改筆，只出現在答錯和一輪結束的朱印。

元件的手感是**清爽、俐落**：細線、精準的對齊、大而明確的觸控目標，沒有多餘的裝飾或特效。整個系統只保留一個值得記住的時刻：一輪練習結束時，分數像朱印一樣蓋在紙上。

**Key Characteristics:**
- 暖白紙張與暖墨黑，深色模式是「夜裡的墨」，不是冷灰。
- 朱紅只用在答錯與朱印，要注意的地方用螢光筆，「目前在哪、可以去哪」用江戶紫的書籤色，其餘介面狀態用墨色；詞性用低彩度的傳統色（松葉綠、藍染、黃土）。
- 日文單字用教科書體，日文例句用日文黑體，中文介面用繁中黑體，三者各司其職。
- 單字表是畫在紙上的橫線，不是卡片堆疊。
- 觸控目標至少 40px，主要動作 52–56px，放在拇指範圍內。
- 動態只有一個：朱印分數落下。

## Colors

一張暖白的紙、一瓶墨、一支螢光筆、一支朱筆、一條書籤繩，再加上三種低彩度的傳統色標示詞性。

### Primary
- **螢光筆（Highlighter）** (`highlighter`)：山吹色。塗在字的下半部（`linear-gradient(transparent 55%, highlighter 55%)`），字維持墨色粗體：念法會變的假名、例句中的目標單字、章首說明裡的「畫上螢光筆」；對照表中念法會變的格子右上角 10px 的小三角；反白選取文字的底色。墨色字在上面的對比為 9.8:1。與紙面的明度對比只有 1.55:1，所以**不能**用在焦點框、開關或任何唯一的狀態提示。深色模式為 `night-highlighter`，米白墨在上面為 5.8:1。
- **朱筆（Vermilion）** (`vermilion`)：只有結束時的朱印分數。答錯使用同色系的 `wrong`。深色模式改用 `night-vermilion`。
- **朱墨（Vermilion Ink）** (`vermilion-ink`)：朱印下方評語的日文。
- **朱暈（Vermilion Wash）** (`vermilion-wash`)：保留給答錯相關的底色，介面其他地方不使用。

### Secondary
- **松葉綠（Pine）** (`pine` / `pine-wash`)：自動詞標籤。
- **藍染（Indigo）** (`indigo` / `indigo-wash`)：他動詞標籤。

### Tertiary
- **黃土（Ochre）** (`ochre` / `ochre-wash`)：自他動詞標籤。

### Wayfinding
- **書籤（Bookmark）** (`bookmark`)：江戶紫，像書裡夾著的那條書籤繩，只標「目前在哪、可以去哪」：目次列的目前位置（前面一枚書籤圖示，字為 600）、目次面板中目前所在那一節的實心底（紙色字）、節標題右側的「練這節」文字，以及從錯題本跳到單字時那一下的框線。色相刻意避開松葉綠、藍染、黃土、朱與螢光筆。在三種紙面上的文字對比 6.3–7.3:1；深色模式 `night-bookmark` 在暖黑紙上 7.3–8.8:1，實心底改用暗色字。
- **書籤暈（Bookmark Wash）** (`bookmark-wash`)：目次按鈕展開與滑過、目次連結、章首節連結與「練這節」滑過時的底色，以及跳轉提示的底色。
- **書籤線（Bookmark Line）** (`bookmark-line`)：「練這節」的框線，與紙面對比 3.2:1 以上。

### Neutral
- **紙（Paper）** (`paper`)：頁面底色、頁首、固定導覽列與表頭的底色。
- **攤開的紙（Paper Sheet）** (`paper-sheet`)：練習卡、選項按鈕、下拉選單等「拿在手上」的表面。
- **紙影（Paper Shade）** (`paper-shade`)：答案揭曉區、選項數字鍵、提示框、滑鼠移過的底色。
- **遮紙（Paper Mask）** (`paper-mask`)：遮住答案模式下蓋住答案的色塊。
- **墨（Sumi）** (`sumi`)：主要文字、主要按鈕底色、遮住答案開啟時與發音播放中的底色、鍵盤焦點框、節標題下的短線。
- **淡墨（Sumi Soft）** (`sumi-soft`)：次要內文、說明文字。
- **褪墨（Sumi Faded）** (`sumi-faded`)：讀音、字數、例句中譯、欄位名稱等輔助資訊；在所有紙面上都維持 4.9:1 以上。
- **橫線（Ruled Line）** (`ruled-line`)：單字列之間、區塊之間的分隔線。
- **鉛筆線（Pencil Line）** (`pencil-line`)：可操作元件的邊框與表頭下緣，與紙面對比 3.3:1 以上。

### Feedback
- **答對** (`correct` / `correct-wash`) 與 **答錯** (`wrong` / `wrong-wash`)：只出現在作答結果、進度格與錯題相關文字。

### Named Rules
**The 朱筆 Rule.** 朱紅是老師的批改筆，只出現在兩個地方：答錯（包括目次列錯題本按鈕和錯題本清單上的朱色小叉與錯誤次數；單字表本身不放），以及一輪結束的朱印。看到紅色就代表「錯了」或「這一輪的結果」，不拿來當重點、狀態、裝飾或背景。唯一例外是會丟掉進度的警告，沿用答錯的 `wrong` 色：作答途中按「換一組題目」後出現的「再按一次，放棄這組重新出題」，以及頁尾清除按鈕按第一下後的「再按一次清除，無法復原」。

**The 螢光筆 Rule.** 要注意的地方（念法會變、例句目標字）一律用螢光筆畫在字的下半部，字本身維持墨色粗體，讓意思不只靠顏色傳達。介面狀態（焦點、開關、播放中）一律用墨色，不用螢光筆。

**The 書籤 Rule.** 江戶紫只有一個意思：「你在這裡／從這裡過去」。它只出現在目次列的目前位置、目次面板的目前那一節、「練這節」與跳轉提示；不用在按鈕主色、焦點框、開關、單字或任何裝飾。目前位置同時有書籤圖示或實心底，不只靠顏色。

**The 綠色是對 Rule.** 答對永遠用綠色加勾，答錯用朱紅加叉。不採用日本「紅圈＝答對」的慣例，因為台灣學習者會把紅色讀成錯誤。

**The 夜裡的墨 Rule.** 深色模式是暖黑紙（`night-paper` / `night-sheet`）配米白墨（`night-ink`），每個淺色 token 都有一個 `night-` 對應值（紙影、遮紙、淡墨、褪墨、橫線、鉛筆線、螢光筆、朱、朱墨、朱暈、松葉綠、藍染、黃土、書籤與各自的底色）；答對沿用 `night-pine`，答錯沿用 `night-vermilion-ink`。朱紅按鈕在深色模式改用深色字（`night-on-vermilion`）。不使用冷藍灰。

## Typography

**Display Font:** Klee One（教科書體，後備 Hiragino Mincho ProN、Yu Mincho、Noto Serif JP）
**Body Font:** PingFang TC／Noto Sans TC／Microsoft JhengHei（繁中黑體）
**Japanese Body Font:** Hiragino Sans／Noto Sans JP／Yu Gothic／Meiryo（日文黑體）

**Character:** 教科書體帶著手寫的筆畫，讓日文單字像寫在課本上；繁中黑體安靜、中性，負責所有說明與操作。兩者的對比本身就是層級：手寫的是要學的，印刷的是告訴你怎麼學。

### Hierarchy
- **Display**（600，`--fs-display`：clamp(2.75rem, 12vw, 4.25rem)，行高 1.2）：練習題的單字。一個畫面只有一個。中翻日題目的中文用較小的 `--fs-display-zh`（clamp(1.75rem, 7vw, 2.5rem)）。
- **Headline**（700，1.3rem，行高 1.3）：頁面標題「JLPT N5 單字整理表」。
- **Chapter**（700，`--fs-chapter`：clamp(1.75rem, 7vw, 2.25rem)，行高 1.25；手機 1.75rem、桌機 2.25rem）：章標題「數字與念法」與錯題本標題，前面以褪墨 600、1rem、字距 0.08em 的「第一章」同一行、基線對齊引導（不另起一行當眉標）。章首說明 1rem 淡墨、寬 40em。390px 寬的手機上最長的「第六章 形容詞與副詞」仍維持一行。
- **中文段落寬度**一律用 `em` 而不是 `ch`（`ch` 只有半個中文字寬）：章首說明與節說明 46em、頁首說明 42em，並加上 `text-wrap: pretty` 避免最後一行只剩一兩個字。
- **Title**（700，1.2rem）：節標題；練習區標題略小（1.1rem）並使用淡墨。
- **Headword**（Klee One 600，1.2rem；手機 1.3rem；答案揭曉 1.5rem）：單字表、答案揭曉、錯題清單中的日文單字。
- **Body**（400，0.92rem，行高 1.6）：中文意思、例句；選項按鈕放大到 1.1rem。說明段落限制在 46em 以內。
- **Label**（600，0.85rem）：表頭、字數、進度、讀音與說明文字；最小一級 0.78rem 只給詞性標籤、數字鍵與分類字數。數字使用等寬數字（tabular-nums）。

### Type Scale
程式碼只使用九級字級 token（`--fs-xs` 到 `--fs-4xl`）：0.78、0.85、0.92、1、1.1、1.2、1.3、1.5、1.75rem，加上 `--fs-display`（題目單字）、`--fs-display-zh`（中文題目）與 `--fs-chapter`（章標題）三個 clamp。不得寫入表外的字級；朱印內的字級屬於 SVG 座標，不在此表。

### Named Rules
**The 語言標記 Rule.** 所有日文（單字、讀音、例句、題目、助詞が／を）都必須帶 `lang="ja"`，由 `:lang(ja)` 套用日文字體。中文介面字體清單永遠以繁中字體開頭。

**The 手寫只給日文 Rule.** Klee One 只用在要學習的日文單字上（題目、單字、答案、錯題）；介面文字、數字、按鈕從不使用它（朱印分數除外）。

## Layout

單欄、置中的內容寬度 900px，左右留白 20px（手機 16px），頁首、練習區、導覽列與單字表共用同一條左邊線。

頁面順序固定為：精簡頁首 → 練習區 → 固定在頂端的目次列（只在單字區範圍內固定）→ 六章單字。練習區是主角，在 390px 寬的手機上，四個選項必須在第一個畫面內可見。

單字區是一本書：**章 → 節 → 小標**。每章開頭是章首（章標題、一句說明、這一章各節的圓頭連結），章與章之間用一條橫跨整欄的 3px 墨線和 96px（手機 64px）留白分開，像課本翻到新的一章；錯題本區塊比照；節標題保留目次列高度加 8px 的捲動邊距。每節 10–45 字，同一節的呈現方式一致；練習題型每題隨機，不依章節固定。

目次列只有一行、高 52px：左邊「目次」按鈕同時寫出目前位置（「第五章・移動與位置」），右邊固定「錯題本」與「遮住答案」。點開後目次面板從列下方垂下，只列出六章與各節字數；點節名直接跳過去，不做平滑捲動。在頁面頂端（目次列還沒固定）點開時，先把目次列直接移到畫面頂端再垂下面板，整個面板都在畫面內。「練這節」放在每節標題右側。

單字列在 760px 以上每行兩個字，成對的一組橫跨整行並沿用同樣的兩欄；以下每行一個字。手機上一列是「單字（讀音在下）｜中文（詞性標籤在下）｜展開箭頭｜發音」，中文欄至少佔 58%，不得被詞性標籤擠到換行。選項在 560px 以上排成兩欄，以下為單欄，主要按鈕在手機上撐滿寬度。

間距節奏：列內 14px、區塊之間 28px、卡片內距 18px（手機 16px／14px）。

## Elevation & Depth

幾乎是平的。深度來自紙張的色階（`paper` → `paper-sheet` → `paper-shade`），而不是陰影。只有練習卡這一張「拿在手上的紙」帶一層極淡、貼近紙面的陰影，其餘全部用細線與色階分層。

### Shadow Vocabulary
- **貼紙陰影**（`box-shadow: 0 1px 2px rgba(28, 24, 20, 0.05), 0 2px 6px -2px rgba(28, 24, 20, 0.08)`）：只用在練習卡。深色模式為 `0 1px 2px rgba(0,0,0,0.4), 0 2px 6px -2px rgba(0,0,0,0.5)`。

### Named Rules
**The 一張紙 Rule.** 畫面上同時只有一張紙是浮起來的（練習卡）。單字表、提示、答案區都畫在紙上，不加陰影、不加外框。

## Shapes

形狀語言是「裁切整齊的紙與圓頭標籤」：

- 紙面與按鈕使用柔和的圓角，只有五級（`--r-hair` 6px、`--r-field` 8px、`--r-surface` 12px、`--r-sheet` 16px、`--r-pill` 999px）：練習卡 16px、選項、按鈕與提示框 12px、下拉選單 8px、遮紙色塊與數字鍵 6px、進度格是圓頭。
- 可以點的小元件（目次按鈕、章首的節連結、「練這節」、詞性標籤、發音按鈕、遮住答案開關）一律是完整圓頭（999px）。
- 線條有三種粗細：1px 的橫線與鉛筆線、作答結果的 2px 邊框，以及 3px 的墨線。節標題下方是一條 1px 的鉛筆線，左側疊一段 2.5em 寬、3px 高的墨線；章首上方則是同一條 3px 墨線拉滿整欄。成對的字之間是一個褪墨的雙向箭頭（自繪 SVG，線寬 1.6）。
- 唯一的圓形是朱印：168px 雙圈，外圈 3.5px、內圈 1.5px，傾斜 −8°，評語沿上半圈排列。

## Components

### Buttons
清爽、俐落，尺寸大到拇指不會按錯。
- **Shape:** 柔和圓角（12px），高度 52px。
- **Primary:** 墨底、紙色字、600 字重；一個畫面只有一個（「下一題」「看結果」「複習答錯的 N 題」）。深色模式自動反轉為米白底、暖黑字。
- **Hover / Focus:** 移過時轉為淡墨；鍵盤焦點為 2px 墨色外框、2px 間距。滑鼠移過效果只在支援 hover 的裝置上出現。
- **Secondary:** 透明底、墨色字、鉛筆線邊框，用於並列的次要動作（「再來一組」）。
- **Text:** 「換一組題目」是帶底線的褪墨文字，最小高度 44px，放在練習卡底部、遠離主要按鈕；作答途中按下會變成朱紅的「再按一次，放棄這組重新出題」，4 秒後恢復。
- **清除錯題本與練習進度：** 頁尾「製作日期」下方置中的次要按鈕（高 44px、內距 20px、0.92rem），左邊自繪垃圾桶圖示；下方一行 0.78rem 褪墨小字「錯題本和練習進度只存放在這台裝置的瀏覽器裡。」按第一下整顆變成 `wrong` 實心、紙色字（深色模式為暗色字）的「再按一次清除，無法復原」，4 秒後恢復；按第二下清除並重新出題，按鈕換成墨色勾「已清除錯題本與練習進度」3 秒。寬度不超過版面，窄螢幕時文字換行。列印與未啟用 JavaScript 時不顯示。

### Scope Select 與範圍切換
- 作答到一半改選範圍，不會丟掉目前這組：選單下方出現一行紙影底的提示「這組做完後改用「X」出題」，「換一組題目」同時變成「改用「X」重新出題」，按一下才立即換。
- 選單順序：「全部」→「錯題本」→ 六章的群組（每組是「第N章全部」與各節）。錯題本和「全部」同一層，不放進任何一章；錯題本 0 字時停用（目前正選著它時除外）。
- 範圍選單的數字是該範圍可練習的不重複字數；頁首同時寫出核心單字數與全部可練習字數，兩者不得互相矛盾。

### Answer Options（簽名元件）
- **Style:** 攤開的紙底、鉛筆線邊框、12px 圓角、最小高度 56px；左側一枚 26px 的紙影數字鍵（1–4），對應鍵盤快捷鍵。
- **Correct / Wrong:** 2px 邊框，綠或朱的底色與文字，右側畫上 20px 的勾或叉（自繪 SVG），並附上螢幕閱讀器可讀的「（正確答案）／（你的選擇）」。
- **Disabled:** 作答後其他選項設為真正的停用狀態，透明度 0.5。

### Chips
- **Chapter chip:** 章首的節連結。透明底、1px 橫線邊框、淡墨字、40px 高、完整圓頭；字數以較小的褪墨等寬數字跟在後面。
- **Part-of-speech tag:** 完整圓頭小標籤（0.78rem），自動詞松葉綠、他動詞藍染、自他動詞黃土、其他詞性紙影底淡墨字。

### Cards / Containers
- **Quiz sheet:** 唯一的卡片。攤開的紙底、1px 橫線邊框、16px 圓角、貼紙陰影、內距 18px。
- **Reveal panel:** 紙影底、12px 圓角、無邊框；第一行是綠勾「答對了」或朱叉「答錯了，正確答案是：」，第二行是教科書體單字、讀音、意思與發音按鈕。

### 錯題記號
- **錯題本按鈕與區塊：** 目次列「遮住答案」左邊一顆圓頭框線按鈕「✕ 錯題本 4 ⌄」，朱色叉和粗體數字讓它一眼可辨；0 字時換成褪墨色、不放叉。手機（< 560px）只縮小內距，仍保留「錯題本」三個字。點了打開或收起單字區最上方、第一章之前的「錯題本」區塊，並捲到那裡。區塊和章同一層級：同樣的鉛筆線、留白與章標題字級；標題下一行說明（共幾字、排序與移出規則）配「練這些字」次要按鈕（等同範圍選「錯題本」），下面是清單。目次面板只放章節導覽。
- **練習題結果區：** 答題後在答案下方加一行小字。答錯：「已記入錯題本（答錯 N 次），連續答對 5 次就移出」；答對錯題本裡的字：「錯題本：連續答對 2 / 5 ●●○○○」；第 5 次連續答對：綠勾「連續答對 5 次，移出錯題本」。不在錯題本的字答對時不顯示。
- **單字列與對照表格子：** 不放任何錯題資訊，有例句和沒例句的字顯示方式一致。
- **結束畫面：** 有字移出錯題本時，在答錯清單下方加一行綠勾說明，不另加動畫。

### Say Button
- **Style:** 透明底、褪墨色的喇叭圖示（自繪 SVG，線寬 1.8）、完整圓頭；單字與題目旁 36px，答案揭曉 32px，例句旁 28px。邊框刻意使用淡的橫線色，避免 277 列單字表上出現數百個重的圓圈。
- **Hit area:** 不論畫出來多大，可點範圍一律向外延伸到至少 40px。
- **States:** 移過時紙影底、墨色圖示；播放中反轉為墨底、紙色圖示，播放結束自動恢復。對照表的格子播放中為遮紙底。以瀏覽器內建的日語語音念出讀音（假名），語速 0.85。

### Inputs / Fields
- **Range select:** 原生下拉選單，攤開的紙底、鉛筆線邊框、8px 圓角、40px 高。
- **Focus:** 與全站一致的 2px 墨色焦點框。

### Navigation
- **目次列:** 紙色底、1px 橫線下緣、52px 高；只在單字區範圍內固定於頂端。「目次」按鈕是列表圖示＋粗體「目次」＋目前位置（前面一枚 9×14px 的書籤圖示，書籤色 600 字，太長時以刪節號截斷；手機 < 560px 省略「第N章・」只寫節名，< 380px 不寫位置）＋可旋轉的箭頭，是一個 `aria-expanded` 的展開按鈕。
- **目次面板:** 紙色底、1px 鉛筆線下緣、向下的柔和陰影，最高到視窗底部前 24px，內容可捲動。每章一段：褪墨「第一章」＋粗體章名，章名列與每節連結都是 44px 高（節名、靠右的字數）；目前所在那一節為書籤色實心底、紙色字；滑過為書籤暈。Esc、點面板外或選了一節就收起。沒有 JS 時同一份目次直接排在單字區開頭。
- **「練這節」:** 節標題右側一顆 32px 高的小圓頭框線按鈕（0.78rem、600、書籤色字與書籤線框，滑過為書籤暈，可點範圍向外延伸到 44px），列印時不顯示。把練習範圍切到該節並回到練習卡；作答途中則沿用範圍切換的規則，等這組做完才換。
- **遮住答案提示:** 開啟遮住答案時，目次列下方出現一行紙影底的提示，5 秒後消失，並以 `role="status"` 念給螢幕閱讀器。

### Ruled Word List（簽名元件）
- 每個單字是紙上的一列，以 1px 橫線分隔，沒有外框、底色或圓角；預設只佔一行，最小高度 52px。
- 日文單字以教科書體呈現，讀音以褪墨小字排在單字下方（只有假名的字不重複寫讀音）；動詞帶自他動詞標籤，其他詞性不另外標。
- **有例句的列**整列是一個展開按鈕，右側畫一個向下箭頭；點開後例句排在中文欄下方（手機靠左），目標單字以墨色粗體加螢光筆標出，中譯另起一行。同時可以展開多列。
- **成對的一組（Set）:** 一起記的字放在同一組，上方一行 0.78rem 褪墨小標（「反義」「自他成對」「借出⇔借入」）。互相對照的兩個字（反義、自他成對、一問一答的寒暄語）之間畫一個褪墨雙向箭頭：桌機左右排、箭頭在中間；手機上下排、箭頭夾在兩列之間的單字欄下方。只是放在一起的組（「哥哥姊姊」「依部位用不同的動詞」）只有小標，沒有箭頭。不使用左側括線。
- **Phrase list:** 寒暄語的列把中文排在日文下方，不壓縮長句。
- **Mask mode:** 第一章遮讀音，其他章遮中文意思，以遮紙色塊蓋住；有例句的列展開就揭開，沒有例句的列在遮住模式下變成可以點的按鈕（鍵盤 Enter／空白鍵）。

### Reading Tables
- 數字、日期、時刻、期間、量詞、こそあど、相對時間與顏色維持格子或對照表。念法會變的格子以右上角 10px 的螢光筆小三角標示，讀音中變化的那幾個假名再以墨色粗體加螢光筆標出；遮住答案時螢光筆一起隱藏。不使用側邊色條。

### Seal Score（簽名元件）
- 一輪結束時，蓋上一枚像日本老師批改作業用的評語印章：168px 朱紅雙圈（外圈 3.5、內圈 1.5，以 SVG 繪製），傾斜 −8°，上半圈沿弧線寫著評語，中央是教科書體分數，下方小字「/ 10」。
- 評語依答對比例分四級，全部是 N5 程度讀得懂的假名：全對「たいへんよくできました」、七成以上「よくできました」、四成以上「もうすこし」、其餘「がんばりましょう」。印章下方以「評語：中文」附上翻譯。
- 只重考錯題的回合全對時，說明文字改為「錯題都訂正好了」。
- 印章與評語之後緊接著行動按鈕（「複習答錯的 N 題」「再來一組」），錯題清單放在按鈕下方，一行一字：教科書體單字、讀音（只有假名的字不重複）、靠右的中文意思。
- 印章整體以 `role="img"` 與完整的 aria-label（分數、評語與翻譯）提供給螢幕閱讀器。
- 出現時以 420ms、`cubic-bezier(0.16, 1, 0.3, 1)` 從 1.35 倍縮放落下，像蓋印；開啟「減少動態效果」或重新整理頁面回到已完成的回合時直接顯示。這是整個系統唯一的動畫時刻。

## Do's and Don'ts

### Do:
- **Do** 讓日文單字成為畫面上最大、最有存在感的元素，並一律用 Klee One 書寫。
- **Do** 為每一段日文加上 `lang="ja"`。
- **Do** 把主要動作放在練習卡下方、拇指範圍內，觸控目標至少 40px，主要按鈕 52px 以上。
- **Do** 用紙張色階和 1px 細線分層，讓單字表看起來像畫在紙上的橫線。
- **Do** 讓所有文字與紙面維持 4.5:1 以上的對比，可操作元件的邊框維持 3:1 以上，淺色與深色模式都要檢查。
- **Do** 作答回饋要立即、安靜：顏色、勾叉圖示、文字三者並用，並透過 aria-live 讓螢幕閱讀器唸出結果。

### Don't:
- **Don't** 用朱紅標示重點或介面狀態；朱紅只給答錯、朱印，以及會丟掉進度的再按一次警告。
- **Don't** 把書籤色（江戶紫）擴散到主要按鈕、焦點框、開關或裝飾；它只標目前位置與導覽。
- **Don't** 用螢光筆當唯一的狀態提示（焦點、開關、目前所在），它和紙面的明度對比不夠。
- **Don't** 用紅色表示答對。
- **Don't** 把單字列做成一張張浮起來的卡片，或在練習卡以外的地方加陰影。
- **Don't** 在卡片、提示或警告框上使用左側彩色粗邊框。
- **Don't** 用表情符號（⚠️、✅、❌）代替圖示；圖示一律是線寬一致的自繪 SVG。
- **Don't** 走櫻花粉、動漫可愛、黑金奢華或遊戲化（吉祥物、霓虹色、連勝火焰）的日語學習套版。
- **Don't** 加入毛玻璃、漸層文字或分散在各處的進場動畫；整個系統只有一個朱印時刻。
- **Don't** 在深色模式使用冷藍灰，或讓任何顏色只有淺色版本。
