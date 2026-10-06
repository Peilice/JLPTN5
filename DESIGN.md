---
name: JLPT N5 單字整理表
description: 通勤時翻開的日文單字本：紙張、墨色與一支朱筆
colors:
  vermilion: "#b5473b"
  vermilion-ink: "#9e3b30"
  vermilion-wash: "#f7e4df"
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
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper-sheet}"
    rounded: "{rounded.surface}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-ink}"
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
  nav-chip:
    backgroundColor: "transparent"
    textColor: "{colors.sumi-soft}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "40px"
  nav-chip-current:
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.paper}"
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
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper-sheet}"
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

這個介面是一本放在口袋裡、在捷運上隨手翻開的單字本：暖白的紙、墨色的字、一支只在必要時落下的朱筆。學習者手上通常只有幾分鐘、一隻手、晃動的車廂和忽明忽暗的光線，所以每一頁都要一眼看懂、拇指按得到、隨時可以闔上再打開。介面本身退到紙的背後，讓日文字成為頁面上最有存在感的東西。

材質語言來自課本：紙張分成頁面底色（`paper`）和攤開的那一張（`paper-sheet`），單字之間像筆記本一樣用細橫線分隔，而不是一張張浮起來的卡片。日文單字用教科書體 Klee One 書寫，讓學習者看到正確的筆畫形狀；中文說明用安靜的繁中黑體退居其次。朱紅（`vermilion`）是老師的批改筆，只出現在使用者的下一步與需要特別注意的地方。

元件的手感是**清爽、俐落**：細線、精準的對齊、大而明確的觸控目標，沒有多餘的裝飾或特效。整個系統只保留一個值得記住的時刻：一輪練習結束時，分數像朱印一樣蓋在紙上。

**Key Characteristics:**
- 暖白紙張與暖墨黑，深色模式是「夜裡的墨」，不是冷灰。
- 朱紅只用在行動與重點，詞性用低彩度的傳統色（松葉綠、藍染、黃土）。
- 日文單字用教科書體，日文例句用日文黑體，中文介面用繁中黑體，三者各司其職。
- 單字表是畫在紙上的橫線，不是卡片堆疊。
- 觸控目標至少 40px，主要動作 52–56px，放在拇指範圍內。
- 動態只有一個：朱印分數落下。

## Colors

一張暖白的紙、一瓶墨、一支朱筆，再加上三種低彩度的傳統色標示詞性。

### Primary
- **朱筆（Vermilion）** (`vermilion`)：主要按鈕「下一題／看結果」、例句中的目標單字、分類標題下的短朱線、遮住中文開關的啟用狀態、鍵盤焦點框、結束時的朱印分數。深色模式改用 `night-vermilion`，並搭配深色文字。
- **朱墨（Vermilion Ink）** (`vermilion-ink`)：朱紅用於文字時的較深版本（例句目標單字、「說明」連結、主要按鈕的滑鼠移過狀態），確保在紙上達到 6:1 的對比。
- **朱暈（Vermilion Wash）** (`vermilion-wash`)：形容詞、名詞等一般詞性標籤的底色。

### Secondary
- **松葉綠（Pine）** (`pine` / `pine-wash`)：自動詞標籤。
- **藍染（Indigo）** (`indigo` / `indigo-wash`)：他動詞標籤。

### Tertiary
- **黃土（Ochre）** (`ochre` / `ochre-wash`)：自他動詞標籤。

### Neutral
- **紙（Paper）** (`paper`)：頁面底色、頁首、固定導覽列與表頭的底色。
- **攤開的紙（Paper Sheet）** (`paper-sheet`)：練習卡、選項按鈕、下拉選單等「拿在手上」的表面。
- **紙影（Paper Shade）** (`paper-shade`)：答案揭曉區、選項數字鍵、提示框、滑鼠移過的底色。
- **遮紙（Paper Mask）** (`paper-mask`)：遮住中文模式下蓋住答案的色塊。
- **墨（Sumi）** (`sumi`)：主要文字、目前分類的導覽標籤底色。
- **淡墨（Sumi Soft）** (`sumi-soft`)：次要內文、說明文字。
- **褪墨（Sumi Faded）** (`sumi-faded`)：讀音、字數、例句中譯、欄位名稱等輔助資訊；在所有紙面上都維持 4.9:1 以上。
- **橫線（Ruled Line）** (`ruled-line`)：單字列之間、區塊之間的分隔線。
- **鉛筆線（Pencil Line）** (`pencil-line`)：可操作元件的邊框與表頭下緣，與紙面對比 3.3:1 以上。

### Feedback
- **答對** (`correct` / `correct-wash`) 與 **答錯** (`wrong` / `wrong-wash`)：只出現在作答結果、進度格與錯題相關文字。

### Named Rules
**The 朱筆 Rule.** 朱紅只標記兩件事：使用者的下一步，以及要特別注意的字。不拿來當裝飾、背景或大面積色塊（朱印是唯一例外）。

**The 綠色是對 Rule.** 答對永遠用綠色加勾，答錯用朱紅加叉。不採用日本「紅圈＝答對」的慣例，因為台灣學習者會把紅色讀成錯誤。

**The 夜裡的墨 Rule.** 深色模式是暖黑紙（`night-paper` / `night-sheet`）配米白墨（`night-ink`），每個淺色 token 都有一個 `night-` 對應值（紙影、遮紙、淡墨、褪墨、橫線、鉛筆線、朱、朱墨、朱暈、松葉綠、藍染、黃土與各自的底色）；答對沿用 `night-pine`，答錯沿用 `night-vermilion-ink`。朱紅按鈕在深色模式改用深色字（`night-on-vermilion`）。不使用冷藍灰。

## Typography

**Display Font:** Klee One（教科書體，後備 Hiragino Mincho ProN、Yu Mincho、Noto Serif JP）
**Body Font:** PingFang TC／Noto Sans TC／Microsoft JhengHei（繁中黑體）
**Japanese Body Font:** Hiragino Sans／Noto Sans JP／Yu Gothic／Meiryo（日文黑體）

**Character:** 教科書體帶著手寫的筆畫，讓日文單字像寫在課本上；繁中黑體安靜、中性，負責所有說明與操作。兩者的對比本身就是層級：手寫的是要學的，印刷的是告訴你怎麼學。

### Hierarchy
- **Display**（600，clamp(2.75rem, 12vw, 4.25rem)，行高 1.2）：練習題的單字。一個畫面只有一個。
- **Headline**（700，1.3rem，行高 1.3）：頁面標題「JLPT N5 單字整理表」。
- **Title**（700，1.2rem）：分類標題；練習區標題略小（1.1rem）並使用淡墨。
- **Headword**（Klee One 600，1.2rem；手機 1.3rem；答案揭曉 1.5rem）：單字表、答案揭曉、錯題清單中的日文單字。
- **Body**（400，0.92rem，行高 1.6）：中文意思、例句；選項按鈕放大到 1.1rem。說明段落限制在 68ch 以內。
- **Label**（600，0.85rem）：表頭、字數、進度、讀音與說明文字；最小一級 0.78rem 只給詞性標籤、數字鍵與分類字數。數字使用等寬數字（tabular-nums）。

### Type Scale
程式碼只使用八級字級 token（`--fs-xs` 到 `--fs-3xl`）：0.78、0.85、0.92、1、1.1、1.2、1.3、1.5rem，加上題目單字的 clamp。不得寫入表外的字級；朱印內的字級屬於 SVG 座標，不在此表。

### Named Rules
**The 語言標記 Rule.** 所有日文（單字、讀音、例句、題目、助詞が／を）都必須帶 `lang="ja"`，由 `:lang(ja)` 套用日文字體。中文介面字體清單永遠以繁中字體開頭。

**The 手寫只給日文 Rule.** Klee One 只用在要學習的日文單字上（題目、單字、答案、錯題）；介面文字、數字、按鈕從不使用它（朱印分數除外）。

## Layout

單欄、置中的內容寬度 900px，左右留白 20px（手機 16px），頁首、練習區、導覽列與單字表共用同一條左邊線。

頁面順序固定為：精簡頁首 → 練習區 → 固定在頂端的分類導覽（只在單字表範圍內固定）→ 各分類單字表。練習區是主角，在 390px 寬的手機上，四個選項必須在第一個畫面內可見。

分類導覽是一列高 60px 的橫向捲動標籤，右側固定「遮住中文」開關，捲動到的分類會自動高亮並捲入可視範圍。各分類標題保留導覽列高度加 8px 的捲動邊距。

單字表在 641px 以上是四欄表格（單字 22%、中文 20%、詞性 13%、例句），表頭固定在導覽列下方；640px 以下每一列變成三行條目：「單字・讀音・發音 ｜ 詞性」、「中文」、「例句與中譯」。選項在 560px 以上排成兩欄，以下為單欄，主要按鈕在手機上撐滿寬度。

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
- 可以點的小元件（分類標籤、詞性標籤、發音按鈕、遮住中文開關）一律是完整圓頭（999px）。
- 線條只有兩種粗細：1px 的橫線與鉛筆線，以及作答結果的 2px 邊框。分類標題下方是一條 1px 的鉛筆線，左側疊一段 2.5em 寬、3px 高的朱線。
- 唯一的圓形是朱印：168px 雙圈，外圈 3.5px、內圈 1.5px，傾斜 −8°，評語沿上半圈排列。

## Components

### Buttons
清爽、俐落，尺寸大到拇指不會按錯。
- **Shape:** 柔和圓角（12px），高度 52px。
- **Primary:** 朱筆底、紙色字、600 字重；一個畫面只有一個（「下一題」「看結果」「複習答錯的 N 題」）。
- **Hover / Focus:** 移過時轉為朱墨；鍵盤焦點為 2px 朱紅外框、2px 間距。滑鼠移過效果只在支援 hover 的裝置上出現。
- **Secondary:** 透明底、墨色字、鉛筆線邊框，用於並列的次要動作（「再來一組」）。
- **Text:** 「換一組題目」是帶底線的褪墨文字，最小高度 44px，放在練習卡底部、遠離主要按鈕；作答途中按下會變成朱紅的「再按一次，放棄這組重新出題」，4 秒後恢復。

### Answer Options（簽名元件）
- **Style:** 攤開的紙底、鉛筆線邊框、12px 圓角、最小高度 56px；左側一枚 26px 的紙影數字鍵（1–4），對應鍵盤快捷鍵。
- **Correct / Wrong:** 2px 邊框，綠或朱的底色與文字，右側畫上 20px 的勾或叉（自繪 SVG），並附上螢幕閱讀器可讀的「（正確答案）／（你的選擇）」。
- **Disabled:** 作答後其他選項設為真正的停用狀態，透明度 0.5。

### Chips
- **Category chip:** 透明底、淡墨字、40px 高、完整圓頭；字數以較小的褪墨等寬數字跟在後面。目前所在分類反轉為墨底紙字。第一個「練習」標籤用朱墨強調。
- **Part-of-speech tag:** 完整圓頭小標籤（0.78rem），自動詞松葉綠、他動詞藍染、自他動詞黃土、其他詞性朱暈。

### Cards / Containers
- **Quiz sheet:** 唯一的卡片。攤開的紙底、1px 橫線邊框、16px 圓角、貼紙陰影、內距 18px。
- **Reveal panel:** 紙影底、12px 圓角、無邊框；第一行是綠勾「答對了」或朱叉「答錯了，正確答案是：」，第二行是教科書體單字、讀音、意思與發音按鈕。

### Say Button
- **Style:** 透明底、褪墨色的喇叭圖示（自繪 SVG，線寬 1.8）、完整圓頭；單字與題目旁 36px，答案揭曉 32px，例句旁 28px。邊框刻意使用淡的橫線色，避免 277 列單字表上出現數百個重的圓圈。
- **Hit area:** 不論畫出來多大，可點範圍一律向外延伸到至少 40px。
- **States:** 移過時朱暈底、朱墨圖示；播放中反轉為朱紅底、紙色圖示，播放結束自動恢復。以瀏覽器內建的日語語音念出讀音（假名），語速 0.85。

### Inputs / Fields
- **Range select:** 原生下拉選單，攤開的紙底、鉛筆線邊框、8px 圓角、40px 高。
- **Focus:** 與全站一致的 2px 朱紅焦點框。

### Navigation
- **Category bar:** 紙色底、1px 橫線下緣、60px 高，標籤列橫向捲動且隱藏捲軸，右緣以漸層淡出暗示還有內容；只在單字表範圍內固定於頂端。

### Ruled Word List（簽名元件）
- 每個單字是紙上的一列，以 1px 橫線分隔，沒有外框、底色或圓角。
- 日文單字以教科書體呈現，讀音以褪墨小字接在旁邊；例句的目標單字以朱墨粗體標出，中譯另起一行。
- **Mask mode:** 中文意思與例句中譯被遮紙色塊蓋住；點一下該列（或鍵盤 Enter／空白鍵）揭開。

### Seal Score（簽名元件）
- 一輪結束時，蓋上一枚像日本老師批改作業用的評語印章：168px 朱紅雙圈（外圈 3.5、內圈 1.5，以 SVG 繪製），傾斜 −8°，上半圈沿弧線寫著評語，中央是教科書體分數，下方小字「/ 10」。
- 評語依答對比例分四級，全部是 N5 程度讀得懂的假名：全對「たいへんよくできました」、七成以上「よくできました」、四成以上「もうすこし」、其餘「がんばりましょう」。印章下方以「評語：中文」附上翻譯。
- 只重考錯題的回合全對時，說明文字改為「錯題都訂正好了」。
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
- **Don't** 用朱紅做大面積背景、裝飾或強調以外的用途（朱印分數除外）。
- **Don't** 用紅色表示答對。
- **Don't** 把單字列做成一張張浮起來的卡片，或在練習卡以外的地方加陰影。
- **Don't** 在卡片、提示或警告框上使用左側彩色粗邊框。
- **Don't** 用表情符號（⚠️、✅、❌）代替圖示；圖示一律是線寬一致的自繪 SVG。
- **Don't** 走櫻花粉、動漫可愛、黑金奢華或遊戲化（吉祥物、霓虹色、連勝火焰）的日語學習套版。
- **Don't** 加入毛玻璃、漸層文字或分散在各處的進場動畫；整個系統只有一個朱印時刻。
- **Don't** 在深色模式使用冷藍灰，或讓任何顏色只有淺色版本。
