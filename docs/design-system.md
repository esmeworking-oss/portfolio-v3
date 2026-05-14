# Design System — Esme's Portfolio

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#ffffff` | 全站底色（白） |
| Primary | `#7BB3E3` | 主要按鈕底色、tag chip 底色（搭黑字） |
| Text | `#000000` | 主要文字 |
| Text Muted | `rgba(0,0,0,0.6)` | Hero 介紹文、次要文字 |
| Gray 500 | `#6B7280` | 次要文字 |
| Gray 200 | `#E5E7EB` | 邊線、分隔線 |
| Gray 100 | `#F3F4F6` | 區塊底色 |

## Typography

- **Font Stack:** `Inter`, `Noto Sans TC`, system-ui, sans-serif
- 中英文皆使用 sans-serif，無 serif 字體
- **字距原則：** 標題文字間距比照一般排版，不加寬字距（避免 `tracking-widest`）；若有 uppercase 標籤類小字可保留 `tracking-wide`，但不超過此幅度

### Scale

| Element | Class | Usage |
|---------|-------|-------|
| Hero 標題 | `text-[21px] md:text-[32px] font-semibold leading-[1.15] tracking-tight text-primary` | 首頁大標 |
| Hero 內文 | `text-[14px] text-black/60 leading-relaxed` | 首頁介紹段落 |
| 專案標題 | `text-3xl md:text-4xl font-bold` | 專案頁 h1 |
| Section 標題 | `text-[20px] font-semibold` | 專案頁 h2，不加 tracking |
| 副標題 | `text-base font-medium` | 專案頁 h3 |
| 內文 | `text-black leading-relaxed` | 段落文字 |
| 小標 | `text-xs font-semibold tracking-wide uppercase` | sidebar 標籤，tracking-wide 上限 |
| 連結/按鈕 | `text-sm` | Navbar、CTA |

## Layout

### 首頁（HorizontalShowcase）

> 2026-05-14 改版：首頁桌機改為「橫向左右滾動」單頁體驗，靈感取自 simpleinfo.cc。

桌機（`min-width: 1024px`）配置：

| 區域 | 寬度 | 說明 |
|------|------|------|
| Hero panel | `46vw`，`padding-left: 10vw` | 沿用 Hero 文字 + CTA，背景 `/images/hero-bg-2.png` |
| Project panel | `50vw`，`padding-top: 140px`、`padding-bottom: 96px`、`padding-x: 1.5vw` | 每個專案一個 panel，內部上 → 下：標題＋類別、描述、`VIEW PROJECT` 連結、媒體 |
| End / Contact panel | `38vw`，`padding-left: 4vw`、`padding-right: 8vw` | 結尾 contact + copyright，取代 Footer |

- Scroll 容器：`.hs-root` 為 `overflow-x: auto; overflow-y: hidden; height: 100vh`，scrollbar 隱藏
- Track：`.hs-track` 為 `display: flex; flex-direction: row; width: max-content; height: 100vh`
- 媒體容器（`.hs-project-media`）固定 `aspect-ratio: 1545 / 1000`（接近 3:2，對應實際圖片/影片原始比例），桌機額外用 `max-width: calc((100vh - 380px) * 1.545)` 依視窗高度上限計算，避免裁切也不留灰底空白
- Footer 不渲染（由 `<BaseLayout showFooter={false}>` 控制），結尾資訊由 End panel 提供
- 手機（`< 1024px`）fallback 為垂直堆疊，圖片移到文字上方、`aspect-ratio` 沿用 1.545:1

#### 互動

| 行為 | 對應 |
|------|------|
| 滑鼠滾輪上下 | 映射為 `.hs-root` 水平 scroll |
| ← / → / PageUp / PageDown | 每次平滑捲動 `50vw` |
| Home / End | 跳到開頭 / 結尾 |
| 左下角提示 | 首次造訪顯示「可使用滑鼠滾輪上下滑動，或以鍵盤左右操作網頁。」+ OK 按鈕，dismiss 後寫入 `localStorage` |
| 右下角圓點 | 反映目前 panel 位置 |

### 專案頁（ProjectLayout）

| Token | Value |
|-------|-------|
| Max Width | `max-w-[1200px]` |
| Horizontal Padding | `px-8` |
| Centering | `mx-auto` |
| Sidebar 寬度 | `md:w-[200px]` |

### Footer

`max-w-[900px] mx-auto px-8`

## Components

### Navbar

- 固定於頂部，**白底**（`bg-white`），全寬（`left-0 right-0`），**無 border-bottom 灰線**
- Inner 容器：`px-8 lg:pl-[10vw] lg:pr-8 py-6`，全寬，`justify-between`
- 左：Logo 改用 `/esme-design.svg`，高度 `h-5`，`hover:opacity-50`
- 右：語言切換（ZH / EN），位於右側邊緣

```css
/* 語言切換 pill */
border: 1px solid rgba(0, 0, 0, 0.2);
border-radius: 999px;
padding: 2px;

/* 各按鈕 */
font-size: 11px;
letter-spacing: 0.08em;
padding: 3px 11px;

/* Active 狀態 */
background: black;
color: white;
```

### Highlight Underline

用於專案頁加強副標題層級。

```css
.highlight-underline {
  background-image: linear-gradient(transparent 60%, rgba(253, 224, 71, 0.5) 60%);
  padding: 0 2px;
}
```

定義於 `src/styles/global.css`，全站可用。

### ProjectCard（舊版垂直 grid，目前未使用於首頁）

- 圖片/影片容器：`rounded-xl`（12px 圓角），`overflow-hidden`
- Hover 效果：`scale-[1.02]`，圓角由容器裁切保持不變

> 注：2026-05-14 起首頁改用 `HorizontalShowcase`，此元件保留供未來其他頁面使用。

### HorizontalShowcase（首頁專用）

整合 Hero、專案列表與 Contact 為單一橫向滾動畫面，定義於 `src/components/HorizontalShowcase.astro`。

**Project Panel 內部結構**

```
┌─ padding-top: 140px ─────────────┐
│ [Title] ／[Category]              │  ← .hs-project-title (26px / 600)
│                                   │
│ [Description 1–3 行]               │  ← .hs-project-desc (14px / black 70%)
│                                   │
│ VIEW PROJECT →                    │  ← .hs-project-view (13px / 600 / tracking 0.08em)
│                                   │
│ ┌─────────────────────────────┐   │
│ │                             │   │
│ │      Image / Video          │   │  ← aspect-ratio: 1545/1000，rounded 16px
│ │                             │   │
│ └─────────────────────────────┘   │
└─ padding-bottom: 96px ───────────┘
```

- 整張 panel 為 `<a href={project.href}>`，hover 觸發圖片 `scale(1.02)` 與箭頭右移
- 媒體 `object-fit: cover`、`border-radius: 16px`、`overflow: hidden`
- 圖片/影片原始比例約為 1.545:1（PNG 1594×1032、video 2020×1348 / 2006×1328），故媒體容器以此為標準
- Panel 寬 `50vw`，內部左 padding `1.5vw` 對齊文字與圖片，右 padding `1.5vw` 為下一張卡片預留呼吸空間（卡片之間的可見間距 = 本卡 padding-right + 下一卡 padding-left + 媒體未填滿時的留白）

### Hint Pill（左下提示）

```css
position: fixed; left: 24px; bottom: 24px;
padding: 14px 18px 14px 22px;
background: rgba(243, 244, 246, 0.95);
backdrop-filter: blur(8px);
border-radius: 999px;
```

OK 按鈕為淺藍底（`var(--color-primary)`）pill 配黑字，dismiss 後寫入 `localStorage['hs-hint-dismissed'] = '1'`。

### Progress Dots（右下指示器）

```css
position: fixed; right: 24px; bottom: 24px;
gap: 8px; padding: 8px 12px;
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(8px);
border-radius: 999px;
```

每個 dot 為 `6px × 6px` 圓點，`active` 狀態 `background: #000; transform: scale(1.2)`。

### CTA Button

主要 CTA（如首頁「看看我的作品」、Hint OK）使用淺藍底配黑字 pill：

```html
<a class="inline-flex items-center gap-2 px-6 py-[10px] rounded-full
          bg-primary text-black text-sm font-medium hover:bg-primary/80
          transition-colors">
  看看我的作品 →
</a>
```

- 底色：`var(--color-primary)`（`#7BB3E3`，淺藍）
- 文字色：`#000`（淺藍底搭白字對比度不足，固定使用黑字）
- Hover：`bg-primary/80` 或 `color-mix(in srgb, var(--color-primary) 80%, transparent)`

### Tag / Chip

專案頁用於標記工具、技術、流程的小標籤（如 `Claude Code`、`Figma AI`）：

```html
<span class="text-xs bg-primary text-black px-3 py-1">Claude Code</span>
```

- 與 CTA Button 共用 primary 底 + 黑字配色，維持視覺一致性
- 多個 tag 用 `flex flex-wrap gap-2` 容器排列

### Grain Overlay（紙質紋理）

- 僅專案頁 `<body>` 套用 `.grain-overlay`
- 首頁無此效果

## Animation

| Name | Usage | Duration |
|------|-------|----------|
| `fade-in-up` / `.hero-animate` | 首頁元素依序淡入，共 5 層 stagger | 0.8s |
| `fadeInUp` | 專案頁 section 依序淡入，共 7 層 stagger | 0.6s |
| `bob` | 首頁向下滾動箭頭上下浮動 | 2s infinite |

## File Structure

```
src/
├── styles/global.css            ← 全域樣式（顏色 token、動畫、utility class）
├── layouts/
│   ├── BaseLayout.astro         ← 共用 layout，支援 showFooter / bodyClass prop
│   └── ProjectLayout.astro      ← 專案頁 layout（sidebar + content + 下一篇導航）
├── components/
│   ├── Navbar.astro             ← 固定導覽列，含語言切換，logo 為 SVG
│   ├── HorizontalShowcase.astro ← 首頁橫向滾動展示（hero + projects + contact）
│   ├── Hero.astro               ← 舊版垂直 hero（首頁已不使用，保留備用）
│   ├── Footer.astro             ← 全站 footer（首頁停用）
│   ├── ProjectCard.astro        ← 舊版專案卡片（首頁已不使用）
│   └── ExperienceList.astro     ← 工作經歷列表（首頁已不使用）
└── pages/
    ├── index.astro              ← 首頁（ZH），改用 HorizontalShowcase
    ├── en/index.astro           ← 首頁（EN），改用 HorizontalShowcase
    └── projects/                ← 各專案頁面
```

## Changelog

### 2026-05-14
- 首頁改為橫向左右滾動體驗（`HorizontalShowcase`）
- Navbar logo 改為 `/esme-design.svg`，移除底部 border 灰線
- BaseLayout 新增 `showFooter` 與 `bodyClass` props，首頁停用 Footer
- 專案 panel 媒體容器固定 `aspect-ratio: 1545 / 1000`，並依視窗高度計算 `max-width` 上限
- Primary 色從深藍 `#004080` 改為淺藍 `#7BB3E3`，作為按鈕與 tag 的主色（搭黑字以滿足對比度）
- 首頁 CTA、Hint OK、AI workflow 頁面所有 tag chip 統一改為「淺藍底 + 黑字」配色
