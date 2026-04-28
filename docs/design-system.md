# Design System — Esme's Portfolio

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#ffffff` | 全站底色（白） |
| Primary | `#004080` | Hero 標題色、藍色右側面板 |
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

### 首頁（BaseLayout）

分欄設計，僅桌機生效：

| 區域 | Class | 說明 |
|------|-------|------|
| 左側內容區 | `lg:w-[70%] lg:pl-[10vw] lg:pr-8` | 白色底、主要內容 |
| 右側藍色面板 | `w-[30%]` fixed，`bg-primary` | 純裝飾，pointer-events-none |

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

- 固定於頂部，無背景色（透明），全寬（`left-0 right-0`）
- Inner 容器：`px-8 lg:pl-[10vw] lg:pr-8 py-6`，全寬，`justify-between`
- 左：Logo（`text-sm font-medium tracking-widest uppercase`）
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

### ProjectCard

- 圖片/影片容器：`rounded-xl`（12px 圓角），`overflow-hidden`
- Hover 效果：`scale-[1.02]`，圓角由容器裁切保持不變

### CTA Button

```html
<a class="inline-block border border-black text-black text-sm px-6 py-3
          hover:bg-black hover:text-white transition-colors">
  馬上聯繫
</a>
```

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
├── styles/global.css        ← 全域樣式（顏色 token、動畫、utility class）
├── layouts/
│   ├── BaseLayout.astro     ← 首頁 layout（含 Navbar + Footer）
│   └── ProjectLayout.astro  ← 專案頁 layout（sidebar + content + 下一篇導航）
├── components/
│   ├── Navbar.astro         ← 固定導覽列，含語言切換
│   ├── Hero.astro           ← 首頁 hero section
│   ├── Footer.astro         ← 全站 footer
│   ├── ProjectCard.astro    ← 首頁專案卡片
│   └── ExperienceList.astro ← 首頁工作經歷列表
└── pages/
    ├── index.astro          ← 首頁（ZH）
    ├── en/index.astro       ← 首頁（EN）
    └── projects/            ← 各專案頁面
```
