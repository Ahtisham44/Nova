@AGENTS.md

# NOVA 2 Fintech Design System - Local Developer & AI Instructions

## Core Principles & Design Rules
- **Design Token Hierarchy:** Always use 3-tier tokens (`src/tokens/`: Primitive → Semantic → Component). Never hardcode raw values when a semantic or component token exists.
- **Color Anchor:** Primary brand color is Nova Green (`#16A34A`), spanning a 10-step scale (`50` to `900`).
- **Typography Rules:** 
  - Sizes $\ge$ 32px use 100% line height.
  - Sizes < 32px use 130% line height.
- **Form Layouts:** Inline input and button pairs with icons must both maintain `h-10` (40px) height.
- **Radius Scale:** Use strictly 4px (sm), 8px (md), 12px (lg), or 9999px (full).

## Code Quality & Conventions
- **Framework & Tooling:** React 19, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`), Vite 8.
- **Component Exports:** Export components as default exports from their file and re-export via `src/components/index.ts`. Ensure JSX tags and braces are balanced.
- **Strings:** Use double quotes for strings containing apostrophes or escape them properly.
- **Formatting:** Run `pnpm format` (`oxfmt`) before final verification.

## Send Money Flow (`src/SendMoneyFlow.tsx`)
- **Purpose:** End-to-end mobile transfer demo (Loading → Home → Amount → Recipient → Review → Success), rebuilt entirely from NOVA components and tokens.
- **Wiring:** Uses the component library (`@/components`) and token modules (`@/tokens`). Screen state is driven by `screen`/`stack`; navigation helpers `go()` and `back()` push/pop screens.
- **Live demo:** https://jolly-genie-0d17b6.netlify.app (screenshot in `screenshots/send-money-flow.jpg`).
- **Conventions:** Inline styles use JS tokens (`nova`, `neutral`, `semantic`, `gradients`, `shadow`, `ease`) rather than raw hex values; motion uses `ease.out` (320ms) for screen transitions; keep screens absolute-positioned within the phone frame.
