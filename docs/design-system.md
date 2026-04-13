# Design System — Esme's Portfolio

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FDF8EC` | 全站底色（米白） |
| Text | `#000000` (black) | 主要文字 |
| Gray 500 | `#6B7280` | 次要文字 |
| Gray 200 | `#E5E7EB` | 邊線、分隔線 |
| Gray 100 | `#F3F4F6` | 區塊底色 |
| Highlight Gold | `rgba(215, 190, 130, 0.35)` | 螢光筆劃線底色 |

## Typography

- **Font Stack:** `Playfair Display`, `Noto Serif TC`, serif
- 中英文共用同一組 serif 字體，Playfair Display 處理英文，Noto Serif TC 處理中文

### Scale（Tailwind class）

| Element | Class | Usage |
|---------|-------|-------|
| Hero 標題 | `text-4xl md:text-5xl font-bold` | 首頁大標 |
| 專案標題 | `text-3xl md:text-4xl font-bold` | 專案頁 h1 |
| Section 標題 | `text-[20px] font-semibold tracking-widest uppercase` | 專案頁 h2 |
| 副標題 | `text-base font-medium` | 專案頁 h3（策略標題等） |
| 內文 | `text-black leading-relaxed` | 段落文字 |
| 小標 | `text-xs font-semibold tracking-widest uppercase` | sidebar 標籤 |
| 連結/按鈕 | `text-sm` | Navbar、CTA |

## Layout

| Token | Value |
|-------|-------|
| Max Width | `max-w-[1200px]` |
| Horizontal Padding | `px-8` |
| Centering | `mx-auto` |

> 所有頁面容器統一使用 `max-w-[1200px] mx-auto px-8`，確保左右對齊一致。

## Components

### Navbar（雙線邊框）

```css
.nav-double-border {
  border-bottom: 2px solid black;
}
.nav-double-border::after {
  /* 下方 4px 處加一條 1px 細線 */
  bottom: -4px;
  height: 1px;
  background: black;
}
```

- 固定於頂部，背景半透明 `bg-[#FDF8EC]/80 backdrop-blur-sm`

### Highlight Underline（螢光筆劃線）

用於加強副標題的視覺層級，模擬手繪螢光筆效果。

```html
<h3><span class="highlight-underline">策略一：降低使用門檻</span></h3>
```

```css
.highlight-underline {
  background-image: linear-gradient(transparent 60%, rgba(215, 190, 130, 0.35) 60%);
  padding: 0 2px;
}
```

**調整方式：**
- 劃線厚度：改 `60%` 數值，越小越厚（例如 `50%` = 下半部都有底色）
- 劃線顏色：改 `rgba(215, 190, 130, 0.35)` 的色值或透明度
- 定義於 `src/styles/global.css`，全站可用

### CTA Button

```html
<a class="inline-block border border-black text-black text-sm px-6 py-3
          hover:bg-black hover:text-white transition-colors">
  馬上聯繫
</a>
```

### Grain Overlay（紙質紋理）

- 全站套用 `.grain-overlay` 於 `<body>`
- 使用 SVG fractalNoise 產生雜訊，opacity `0.035`
- 動畫 `grain-shift` 以 steps 模擬底片顆粒感

## Animation

| Name | Usage | Duration |
|------|-------|----------|
| `hero-animate` / `fade-in-up` | 首頁元素依序淡入 | 0.8s, staggered |
| `fadeInUp` | 專案頁 section 依序淡入 | 0.6s, staggered |
| `blink` | 打字機游標閃爍 | 0.8s infinite |
| `grain-shift` | 紙質紋理微移 | 6s infinite |

## File Structure

```
src/
├── styles/global.css        ← 全域樣式（顏色、動畫、utility class）
├── layouts/
│   ├── BaseLayout.astro     ← 首頁 layout
│   └── ProjectLayout.astro  ← 專案頁 layout（sidebar + content）
├── components/
│   ├── Navbar.astro
│   ├── Hero.astro
│   └── Footer.astro
└── pages/projects/          ← 各專案頁面
```
