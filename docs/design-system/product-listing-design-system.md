---
name: FreshCart Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#3f493f'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7a6e'
  outline-variant: '#becabc'
  surface-tint: '#006d30'
  primary: '#00652c'
  on-primary: '#ffffff'
  primary-container: '#15803d'
  on-primary-container: '#d3ffd5'
  inverse-primary: '#79db8d'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#4e5a53'
  on-tertiary: '#ffffff'
  tertiary-container: '#66726b'
  on-tertiary-container: '#eaf7ee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f8a7'
  primary-fixed-dim: '#79db8d'
  on-primary-fixed: '#00210a'
  on-primary-fixed-variant: '#005323'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  currency-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.02em
  currency-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: -0.01em
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-caption:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves a dual-sided online grocery ecosystem spanning an approachable, consumer-facing storefront and a data-dense operational admin dashboard. The design aesthetic balances **Modern Cleanliness** with **Warm Utility**, evoking agricultural freshness, reliable delivery, and transaction clarity.

### Personality & Emotional Response
- **Trustworthy & Dependable:** High legibility, grounded structures, and explicit pricing indicators cultivate confidence in transaction security, product weight accuracy, and timely home delivery.
- **Vibrant & Fresh:** Crisp botanical green tones evoke organic vitality and market freshness without causing interface fatigue.
- **Efficient & Ergonomic:** Frictionless navigation, immediate visual feedback, and uncluttered operational views prevent cognitive overload during multi-item basket assembly and back-office order fulfillment.

### Visual Architecture
The system blends structured modern interface norms with soft, organic geometry:
- Subtly rounded containers counter-balance rigorous grid alignments.
- Thin, low-contrast structural boundaries maintain order across high-density inventory views.
- Restrained, warm ambient lighting grounds interactive surfaces without unnecessary skeuomorphic ornamentation.

## Colors

The palette is tuned for high visual contrast, hygiene, and rapid cognitive scanning across catalog browsing and rapid inventory updating.

### Core Roles
- **Primary (`#15803D`):** Deep forest green. Applied to critical conversion flows, primary action buttons, active navigation states, verified organic badging, and key metrics.
- **Secondary (`#22C55E`):** Bright foliage green. Serves as a dynamic accent for promotional callouts, stock-level indicators, interactive switches, and micro-delight moments.
- **Tertiary (`#F0FDF4`):** Soft dew green tint. Serves as surface backgrounds for storefront sections, selected list rows, highlighted product cards, and operational alerts.
- **Neutral Dark (`#1F2937`):** Charcoal slate. Dedicated to primary text headings, currency integers, and heavy interface borders.
- **Neutral Muted (`#6B7280`):** Balanced mid-grey for unit indicators (e.g., `/kg`, `/pack`), secondary metadata, SKU codes, and breadcrumbs.
- **Surface Canvas (`#FFFFFF`):** Pure clinical white for card surfaces, transactional tables, modal panels, and navigation bars.

### Functional Alerts
- **Critical / Error (`#DC2626`):** Out of stock notifications, destructive operational tasks, and validation errors.
- **Warning (`#D97706`):** Low inventory thresholds, express delivery timers, and pending order statuses.

### Contrast & Usability Standards
Text pairing adheres strictly to WCAG AA/AAA thresholds. Interactive items placed over `#15803D` always utilize pure `#FFFFFF` typography. The light surface background (`#F0FDF4`) maintains an explicit separation from `#FFFFFF` product cards using a 1px boundary of `#E5E7EB` or `#DCFCE7`.

## Typography

The typography engine is powered strictly by **Inter**, selected for its neutral geometric clarity, tall x-height, and legible numerical glyphs.

### Numerical & Pricing Discipline
Indonesian Rupiah (IDR) values present long digit strings that require strict visual prioritization:
- Currency symbol (`Rp`) uses medium weighting (`fontWeight: 500`) with a trailing non-breaking space.
- Price values feature tabular numbers (`font-feature-settings: "tnum" 1`) to preserve vertical alignment across cart line-items and operational admin tables.
- Discounted prices feature a strike-through on original prices styled with `body-sm` and `#6B7280`, placed adjacently to `currency-md` values styled in `#15803D`.

### Scale Adaptability
Display headers dynamically step down between viewports to avoid text overflows in localized customer banners, while operational data sizes (`body-md`, `body-sm`, and `title-sm`) maintain constant scale across screens to ensure dense dashboard scanning.

## Layout & Spacing

The layout is built upon an 8pt spatial grid system, balancing density in administrative panels with accessible breathing room in storefront commerce screens.

### Structural Grids
- **Customer Storefront:**
  - **Desktop (≥1280px):** 12-column grid, max-width `1280px`, centered with `margin: 2rem` and `gutter: 1.5rem`. Produce product cards occupy a 3 or 4-column span (4 or 3 items per row).
  - **Tablet (768px - 1279px):** 8-column fluid grid, `gutter: 1rem`, product cards span 2 columns.
  - **Mobile (<768px):** 4-column fluid layout, `margin-mobile: 1rem`, `gutter-mobile: 0.75rem`. Products flow into a 2-column card matrix or full-width vertical stack.
- **Admin Dashboard:**
  - Uses an asymmetric layout: a fixed `260px` operational left sidebar coupled with a fluid, multi-pane content region with internal margins locked at `space-lg`. Table rows adopt compact heights using `space-sm` vertical cell padding.

### Spacing Token Rules
- `space-xs` (4px): Micro-gaps between badge icons and label text; spacing between checkbox and text label.
- `space-sm` (8px): Gaps between currency tag and product title; internal padding of small chips and action buttons.
- `space-md` (16px): Internal padding for standard product cards, input container heights, and table row groupings.
- `space-lg` (24px): Card module separation, section header offsets, and dashboard panel separation.
- `space-xl` (32px): Storefront shelf row margins (e.g., "Trending Fresh Produce" vs. "Flash Deals").

## Elevation & Depth

This system utilizes low-elevation surfaces and muted boundaries rather than deep drop shadows, establishing an airy, hygienic environment appropriate for grocery retail.

### Surface Tiers & Boundaries
1. **Base Layer (Elevation 0):** Pure `#FFFFFF` in admin interfaces or `#F0FDF4` in storefront landing viewports. Completely flat without shadow.
2. **Raised Surfaces (Elevation 1):** Product cards, input fields, and standard table cells. Surfaces sit on `#FFFFFF` with a 1px boundary of `#E5E7EB` (or `#DCFCE7` when resting over light green canvases) and an ambient shadow: `0 1px 3px 0 rgba(31, 41, 55, 0.05), 0 1px 2px -1px rgba(31, 41, 55, 0.05)`.
3. **Interactive Hover (Elevation 2):** Elevated cards on pointer hover and dropdown context menus. The card translates `Y: -2px` with shadow: `0 4px 6px -1px rgba(31, 41, 55, 0.08), 0 2px 4px -2px rgba(31, 41, 55, 0.04)`. Border shifts dynamically to `#BBF7D0`.
4. **Floating Overlays (Elevation 3):** Cart side-drawers, sticky quick-checkout bars, operational date pickers, and modals. Shadow: `0 10px 15px -3px rgba(31, 41, 55, 0.08), 0 4px 6px -4px rgba(31, 41, 55, 0.04)`.

## Shapes

The design adopts a **Rounded (Level 2)** shape vocabulary. This profile softens structured e-commerce frameworks, creating a welcoming, natural market feel while preserving enterprise integrity within backend tools.

### Radius Distribution
- **Base Components (`0.5rem` / 8px):** Form controls, text inputs, table wrappers, quantity steppers, and regular CTA buttons.
- **Structural Cards (`1rem` / 16px - `rounded-lg`):** Storefront product cards, recipe bundles, modal overlays, category highlight bubbles, and admin metric widgets.
- **Feature Banners (`1.5rem` / 24px - `rounded-xl`):** Seasonal promotions, hero banners, and storefront checkout callout cards.
- **Pill Exception (`9999px`):** Promo, organic, and freshness badges, status tag chips, and floating cart quantity counters strictly preserve fully-rounded pill capsules to contrast with rectangular product imagery.

## Components

### Buttons
- **Primary:** Solid `#15803D` background, white label, `0.5rem` radius. Hover: `#166534`. Active: `#14532D`. Focus ring: 2px offset with `#22C55E`.
- **Secondary / Cart Action:** Outline format with 1px border `#15803D`, background `#FFFFFF`, text `#15803D`. Hover initiates background fill `#F0FDF4`.
- **Destructive (Admin):** Solid `#DC2626` background, white label. Hover: `#B91C1C`.
- **Sizing:** Standard touch target height of `44px` for storefront accessibility; compact `36px` height for administrative dashboard utility.

### Badges & Chips
- **Organic Badge:** Background `#DCFCE7`, border `1px solid #86EFAC`, text `#15803D`, font `label-badge`. Optional sprout or leaf icon at 12px.
- **Freshness Badge:** Background `#FEF9C3`, border `1px solid #FDE047`, text `#854D0E` (e.g., "Harvested Today").
- **Promo Badge:** Background `#FEE2E2`, border `1px solid #FCA5A5`, text `#DC2626` (e.g., "Hemat 25%").
- **Filter Chips:** Pill-shaped (`rounded-full`), `#FFFFFF` background, 1px `#E5E7EB` border. Selected state swaps to `#15803D` background and pure `#FFFFFF` text.

### Product Card
- Encapsulated in a `rounded-lg` (16px) white shell with `1px solid #E5E7EB`.
- **Top Bar:** Pinned status badges (left) and wishlist toggle (right).
- **Media Area:** Clean 1:1 aspect ratio container with soft neutral background (`#F9FAFB`) to present produce imagery.
- **Detail Body:** Unit label (`#6B7280`), followed by a two-line clamped item title (`#1F2937`), ending with the formatted price (`Rp 24.500/kg`).
- **Footer Interaction:** Full-width "+ Keranjang" (+ Cart) button or an inline quantity stepper when items are active in the cart.

### Quantity Stepper
- Compact inline control with minus, value, and plus zones.
- Border `1px solid #15803D`, rounded at `0.5rem`.
- Buttons use `#F0FDF4` on interaction, with central numeric value set in `Inter` semi-bold (`#1F2937`).

### Input Fields & Selectors
- Background `#FFFFFF`, border `1px solid #D1D5DB`, border-radius `0.5rem`, height `42px`, typography `body-md`.
- Focus state applies border `#15803D` with a subtle outline glow: `box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2)`.
- Error state switches border to `#DC2626` with immediate inline helper text in `body-sm`.

### Checkboxes & Radios
- Size `18px x 18px`, border `1.5px solid #D1D5DB`, radius `4px` (checkbox) or circular (radio).
- Checked state fills `#15803D` with crisp white checkmark or center dot.

### Operational Data Tables (Admin)
- Header row styled in `#F9FAFB` with `title-sm` text color `#6B7280`, uppercase, letter spacing `0.05em`.
- Alternating or bordered rows featuring `1px solid #F3F4F6`.
- Direct inline indicators for inventory levels: Stock numbers below minimum threshold automatically highlight with `#DC2626` warning text and an amber pill indicator.