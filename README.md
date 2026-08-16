# NOVA 2 Fintech Design System v1.0

A comprehensive, systematic design foundation and React component library engineered for building high-trust financial products.

---

## Tech Stack & Architecture

- **Runtime & Framework:** React 19, TypeScript 5.7
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), CSS custom properties
- **Build Tooling:** Vite 8, `oxfmt`
- **Design Tokens:** 3-tier architecture (Primitive → Semantic → Component)

---

## Design Foundations

### 1. Color System
- **Nova Green Scale:** Anchored at `#16A34A` across 10 precise steps (`50` through `900`) for institutional financial confidence.
- **Neutral Scale:** 11-step neutral palette (`50` to `950`) providing high contrast and subtle background surfaces.
- **Semantic Intent Colors:**
  - **Success:** `#16A34A` (Positive outcomes, confirmed states)
  - **Warning:** `#F59E0B` (Caution, pending states)
  - **Error:** `#DC2626` (Failures, destructive actions)
  - **Info:** `#2563EB` (Informational guidance)
- **Gradients:** Hero linear gradients (`--gradient-hero`), surface, card, and accent gradients.

### 2. Typography
- **Font Family:** Inter (Regular 400, Medium 500, Semibold 600, Bold 700).
- **Line-Height Rule:** 
  - **100% line height** for sizes $\ge$ 32px (Display, Heading 1) for tight, impactful financial figures.
  - **130% line height** for sizes < 32px (Heading 2 through Caption) for comfortable legibility.

### 3. Spacing & Grid
- **Base Grid:** 8px systematic grid system.
- **Scale:** 0px, 2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px.

### 4. Radius & Borders
- **SM (4px):** Tags, small chips, minor accents.
- **MD (8px):** Buttons, form inputs, dropdowns, navigation items.
- **LG (12px):** Cards, panels, modals, page sections.
- **Full (9999px):** Badges, pills, avatars, toggles.
- **Borders:** Hairline default (`#E5E5E5`), primary (`#DCFCE7`), strong (`#D4D4D4`).

### 5. Elevation & Motion
- **Elevation (5 levels):** Flat-first approach with shadow levels Level 0 (none) through Level 4 (deep overlay).
- **Motion:** Duration scale (`100ms` to `700ms`) and easing curves (`--ease-out`, `--ease-in`, `--ease-in-out`, `--ease-spring`).

---

## Component Inventory

- **Buttons:** 7 variants (Primary, Secondary, Ghost, Outline, Destructive, Black, White) across 3 sizes (`sm` 32px, `md` 40px, `lg` 48px) and 5 interactive states.
- **Form Inputs:** Text inputs, select dropdowns, checkboxes, toggles, with explicit focus/error rings.
  - *Rule:* Inline input + button pairs with icons must both maintain a fixed `h-10` (40px) height.
- **Cards:** Metric cards, Account cards, Payment cards, Transaction lists, and Feature cards.
- **Badges & Avatars:** Status badges (Success, Warning, Error, Info, Neutral) and avatars ranging from XS (24px) to XL (56px) with status indicators and stacked groups.
- **Iconography:** Lucide-style stroke icons at 1.75px width on 24×24 viewports.
- **Empty & Loading States:** Intentional empty states with CTAs and skeleton loaders mirror structural layouts.

---

## Design Token Architecture

The token system is structured into three distinct tiers:
1. **Primitive:** Raw design values (`--color-nova-600: #16A34A`, `--space-4: 16px`).
2. **Semantic:** Role-based aliases (`--color-primary: var(--color-nova-600)`, `--color-surface: var(--color-neutral-50)`).
3. **Component:** Usage-specific tokens (`--button-radius: var(--radius-md)`).

---

## Scripts & Development

- `pnpm dev` - Start Vite development server
- `pnpm build` - Build production bundle
- `pnpm preview` - Preview production build locally
- `pnpm format` - Format codebase with oxfmt
