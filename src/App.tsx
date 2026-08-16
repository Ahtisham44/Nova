import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type NavId =
  | 'overview' | 'colors' | 'typography' | 'spacing'
  | 'radius' | 'elevation' | 'motion'
  | 'buttons' | 'inputs' | 'cards' | 'badges' | 'icons' | 'states'
  | 'tokens'

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV: { group: string; items: { id: NavId; label: string }[] }[] = [
  {
    group: 'Foundation',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radius', label: 'Radius & Borders' },
      { id: 'elevation', label: 'Elevation' },
      { id: 'motion', label: 'Motion' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Form Inputs' },
      { id: 'cards', label: 'Cards' },
      { id: 'badges', label: 'Badges & Avatars' },
      { id: 'icons', label: 'Iconography' },
      { id: 'states', label: 'Empty & Loading' },
    ],
  },
  {
    group: 'Tokens',
    items: [{ id: 'tokens', label: 'Design Tokens' }],
  },
]

// ─── Color Data ───────────────────────────────────────────────────────────────

const GREEN_SCALE = [
  { name: 'Green 50', token: '--color-nova-50', hex: '#F0FDF4', dark: false },
  { name: 'Green 100', token: '--color-nova-100', hex: '#DCFCE7', dark: false },
  { name: 'Green 200', token: '--color-nova-200', hex: '#BBF7D0', dark: false },
  { name: 'Green 300', token: '--color-nova-300', hex: '#86EFAC', dark: false },
  { name: 'Green 400', token: '--color-nova-400', hex: '#4ADE80', dark: false },
  { name: 'Green 500', token: '--color-nova-500', hex: '#22C55E', dark: false },
  { name: 'Green 600', token: '--color-nova-600', hex: '#16A34A', dark: true },
  { name: 'Green 700', token: '--color-nova-700', hex: '#15803D', dark: true },
  { name: 'Green 800', token: '--color-nova-800', hex: '#166534', dark: true },
  { name: 'Green 900', token: '--color-nova-900', hex: '#14532D', dark: true },
]

const NEUTRAL_SCALE = [
  { name: '50', hex: '#FAFAFA', dark: false },
  { name: '100', hex: '#F5F5F5', dark: false },
  { name: '200', hex: '#E5E5E5', dark: false },
  { name: '300', hex: '#D4D4D4', dark: false },
  { name: '400', hex: '#A3A3A3', dark: false },
  { name: '500', hex: '#737373', dark: true },
  { name: '600', hex: '#525252', dark: true },
  { name: '700', hex: '#404040', dark: true },
  { name: '800', hex: '#262626', dark: true },
  { name: '900', hex: '#171717', dark: true },
  { name: '950', hex: '#0A0A0A', dark: true },
]

const SEMANTIC_COLORS = [
  { name: 'Success', hex: '#16A34A', bg: '#F0FDF4', border: '#DCFCE7', textColor: '#15803D', desc: 'Positive outcomes and confirmed states' },
  { name: 'Warning', hex: '#F59E0B', bg: '#FFFBEB', border: '#FEF3C7', textColor: '#92400E', desc: 'Caution and pending states' },
  { name: 'Error', hex: '#DC2626', bg: '#FEF2F2', border: '#FEE2E2', textColor: '#B91C1C', desc: 'Failures and destructive actions' },
  { name: 'Info', hex: '#2563EB', bg: '#EFF6FF', border: '#DBEAFE', textColor: '#1E40AF', desc: 'Informational alerts and guidance' },
]

const GRADIENTS = [
  { name: 'Hero', token: '--gradient-hero', value: 'linear-gradient(135deg, #16A34A 0%, #166534 100%)', desc: 'Hero sections, primary CTAs', gradient: 'linear-gradient(135deg, #16A34A 0%, #166534 100%)' },
  { name: 'Surface', token: '--gradient-surface', value: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)', desc: 'Section backgrounds, page zones', gradient: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)' },
  { name: 'Card', token: '--gradient-card', value: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)', desc: 'Featured and premium cards', gradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' },
  { name: 'Accent', token: '--gradient-accent', value: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)', desc: 'Progress bars, accent elements', gradient: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)' },
]

// ─── Typography Data ──────────────────────────────────────────────────────────
// Line-height: 100% for size ≥ 32px · 130% for size < 32px

const TYPE_SCALE = [
  { name: 'Display', size: 40, lh: 40, weight: 700, rule: '100%', sample: 'Financial clarity, engineered.' },
  { name: 'Heading 1', size: 32, lh: 32, weight: 700, rule: '100%', sample: 'Account Overview' },
  { name: 'Heading 2', size: 24, lh: 31, weight: 600, rule: '130%', sample: 'Transaction History' },
  { name: 'Heading 3', size: 20, lh: 26, weight: 600, rule: '130%', sample: 'Payment Methods' },
  { name: 'Heading 4', size: 18, lh: 23, weight: 600, rule: '130%', sample: 'Card Details' },
  { name: 'Body LG', size: 16, lh: 21, weight: 400, rule: '130%', sample: 'Your NOVA balance reflects all confirmed transactions as of today.' },
  { name: 'Body SM', size: 14, lh: 18, weight: 400, rule: '130%', sample: 'Transfers may take up to 3 business days to process and appear in your account.' },
  { name: 'Caption', size: 12, lh: 16, weight: 400, rule: '130%', sample: 'Last updated: Aug 16, 2026 · 09:41 AM EST · FDIC insured up to $250,000' },
]

// ─── Spacing Data ─────────────────────────────────────────────────────────────

const SPACING_SCALE = [
  { token: 'space-0', value: '0px', px: 0 },
  { token: 'space-0.5', value: '2px', px: 2 },
  { token: 'space-1', value: '4px', px: 4 },
  { token: 'space-1.5', value: '6px', px: 6 },
  { token: 'space-2', value: '8px', px: 8 },
  { token: 'space-3', value: '12px', px: 12 },
  { token: 'space-4', value: '16px', px: 16 },
  { token: 'space-5', value: '20px', px: 20 },
  { token: 'space-6', value: '24px', px: 24 },
  { token: 'space-8', value: '32px', px: 32 },
  { token: 'space-10', value: '40px', px: 40 },
  { token: 'space-12', value: '48px', px: 48 },
  { token: 'space-16', value: '64px', px: 64 },
  { token: 'space-20', value: '80px', px: 80 },
  { token: 'space-24', value: '96px', px: 96 },
]

// ─── Radius Data (4 steps only) ───────────────────────────────────────────────

const RADIUS_SCALE = [
  { name: 'SM', token: '--radius-sm', value: '4px', px: 4, usage: 'Tags, small chips, minor accents' },
  { name: 'MD', token: '--radius-md', value: '8px', px: 8, usage: 'Buttons, inputs, dropdowns, nav items' },
  { name: 'LG', token: '--radius-lg', value: '12px', px: 12, usage: 'Cards, panels, modals, page sections' },
  { name: 'Full', token: '--radius-full', value: '9999px', px: 9999, usage: 'Badges, pills, avatars, toggles' },
]

// ─── Elevation Data ───────────────────────────────────────────────────────────

const ELEVATION_LEVELS = [
  { name: 'Level 0', token: '--shadow-none', value: 'none', desc: 'Flat, inline elements', shadow: 'none' },
  { name: 'Level 1', token: '--shadow-xs', value: '0 1px 2px rgba(0,0,0,0.06)', desc: 'Inputs, chips', shadow: '0 1px 2px rgba(0,0,0,0.06)' },
  { name: 'Level 2', token: '--shadow-sm', value: '0 4px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)', desc: 'Cards, panels', shadow: '0 4px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)' },
  { name: 'Level 3', token: '--shadow-md', value: '0 10px 20px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.05)', desc: 'Modals, floating', shadow: '0 10px 20px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.05)' },
  { name: 'Level 4', token: '--shadow-lg', value: '0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.05)', desc: 'Overlays, commands', shadow: '0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.05)' },
]

// ─── Motion Data ──────────────────────────────────────────────────────────────

const DURATION_TOKENS = [
  { name: '--duration-instant', value: '100ms', desc: 'Micro-interactions, icon swaps, toggle snaps' },
  { name: '--duration-fast', value: '200ms', desc: 'Hover states, badge changes, focus rings' },
  { name: '--duration-normal', value: '300ms', desc: 'Panel slides, card reveals, dropdowns' },
  { name: '--duration-slow', value: '500ms', desc: 'Page transitions, loader progress' },
  { name: '--duration-slower', value: '700ms', desc: 'Onboarding, celebration feedback' },
]

const EASING_TOKENS = [
  { name: '--ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Elements entering the screen' },
  { name: '--ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Elements leaving the screen' },
  { name: '--ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Persistent, cycling transitions' },
  { name: '--ease-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Playful, confirmation feedback' },
]

// ─── Token Data ───────────────────────────────────────────────────────────────

const PRIMITIVE_TOKENS = [
  { name: '--color-nova-50', value: '#F0FDF4', type: 'Color' },
  { name: '--color-nova-100', value: '#DCFCE7', type: 'Color' },
  { name: '--color-nova-200', value: '#BBF7D0', type: 'Color' },
  { name: '--color-nova-300', value: '#86EFAC', type: 'Color' },
  { name: '--color-nova-400', value: '#4ADE80', type: 'Color' },
  { name: '--color-nova-500', value: '#22C55E', type: 'Color' },
  { name: '--color-nova-600', value: '#16A34A', type: 'Color' },
  { name: '--color-nova-700', value: '#15803D', type: 'Color' },
  { name: '--color-nova-800', value: '#166534', type: 'Color' },
  { name: '--color-nova-900', value: '#14532D', type: 'Color' },
  { name: '--color-neutral-50', value: '#FAFAFA', type: 'Color' },
  { name: '--color-neutral-100', value: '#F5F5F5', type: 'Color' },
  { name: '--color-neutral-200', value: '#E5E5E5', type: 'Color' },
  { name: '--color-neutral-300', value: '#D4D4D4', type: 'Color' },
  { name: '--color-neutral-400', value: '#A3A3A3', type: 'Color' },
  { name: '--color-neutral-500', value: '#737373', type: 'Color' },
  { name: '--color-neutral-700', value: '#404040', type: 'Color' },
  { name: '--color-neutral-900', value: '#171717', type: 'Color' },
  { name: '--color-neutral-950', value: '#0A0A0A', type: 'Color' },
  { name: '--space-0', value: '0px', type: 'Spacing' },
  { name: '--space-0.5', value: '2px', type: 'Spacing' },
  { name: '--space-1', value: '4px', type: 'Spacing' },
  { name: '--space-2', value: '8px', type: 'Spacing' },
  { name: '--space-4', value: '16px', type: 'Spacing' },
  { name: '--space-6', value: '24px', type: 'Spacing' },
  { name: '--space-8', value: '32px', type: 'Spacing' },
  { name: '--space-12', value: '48px', type: 'Spacing' },
  { name: '--space-16', value: '64px', type: 'Spacing' },
  { name: '--radius-sm', value: '4px', type: 'Radius' },
  { name: '--radius-md', value: '8px', type: 'Radius' },
  { name: '--radius-lg', value: '12px', type: 'Radius' },
  { name: '--radius-full', value: '9999px', type: 'Radius' },
  { name: '--font-size-display', value: '40px / 40px (100%)', type: 'Typography' },
  { name: '--font-size-h1', value: '32px / 32px (100%)', type: 'Typography' },
  { name: '--font-size-h2', value: '24px / 31px (130%)', type: 'Typography' },
  { name: '--font-size-h3', value: '20px / 26px (130%)', type: 'Typography' },
  { name: '--font-size-h4', value: '18px / 23px (130%)', type: 'Typography' },
  { name: '--font-size-body-lg', value: '16px / 21px (130%)', type: 'Typography' },
  { name: '--font-size-body-sm', value: '14px / 18px (130%)', type: 'Typography' },
  { name: '--font-size-caption', value: '12px / 16px (130%)', type: 'Typography' },
]

const SEMANTIC_TOKENS = [
  { name: '--color-primary', value: 'var(--color-nova-600)', role: 'Primary brand action' },
  { name: '--color-primary-hover', value: 'var(--color-nova-700)', role: 'Primary hover state' },
  { name: '--color-primary-surface', value: 'var(--color-nova-50)', role: 'Light primary background' },
  { name: '--color-primary-border', value: 'var(--color-nova-100)', role: 'Primary border and divider' },
  { name: '--color-success', value: 'var(--color-nova-600)', role: 'Success indicator' },
  { name: '--color-warning', value: '#F59E0B', role: 'Warning and caution state' },
  { name: '--color-error', value: '#DC2626', role: 'Error and destructive state' },
  { name: '--color-info', value: '#2563EB', role: 'Informational state' },
  { name: '--color-text', value: 'var(--color-neutral-950)', role: 'Primary body text' },
  { name: '--color-text-secondary', value: 'var(--color-neutral-500)', role: 'Labels, captions, metadata' },
  { name: '--color-text-disabled', value: 'var(--color-neutral-400)', role: 'Disabled state text' },
  { name: '--color-text-inverse', value: '#FFFFFF', role: 'Text on dark or primary surfaces' },
  { name: '--color-surface', value: 'var(--color-neutral-50)', role: 'Page background' },
  { name: '--color-surface-raised', value: '#FFFFFF', role: 'Card and panel background' },
  { name: '--color-surface-overlay', value: 'var(--color-neutral-100)', role: 'Hover and interactive overlays' },
  { name: '--color-border', value: 'var(--color-neutral-200)', role: 'Hairline borders and dividers' },
  { name: '--color-border-strong', value: 'var(--color-neutral-300)', role: 'Emphasized borders' },
  { name: '--color-focus-ring', value: 'var(--color-nova-600)', role: 'Keyboard focus indicator' },
]

const COMPONENT_TOKENS = [
  { name: '--button-height-sm', value: '32px', component: 'Button' },
  { name: '--button-height-md', value: '40px', component: 'Button' },
  { name: '--button-height-lg', value: '48px', component: 'Button' },
  { name: '--button-radius', value: 'var(--radius-md) · 8px', component: 'Button' },
  { name: '--button-font-weight', value: '500', component: 'Button' },
  { name: '--input-height-sm', value: '32px', component: 'Input' },
  { name: '--input-height-md', value: '40px', component: 'Input' },
  { name: '--input-height-lg', value: '48px', component: 'Input' },
  { name: '--input-radius', value: 'var(--radius-md) · 8px', component: 'Input' },
  { name: '--input-focus-ring', value: '0 0 0 3px rgba(22,163,74,0.12)', component: 'Input' },
  { name: '--card-radius', value: 'var(--radius-lg) · 12px', component: 'Card' },
  { name: '--card-padding-sm', value: '16px', component: 'Card' },
  { name: '--card-padding-md', value: '24px', component: 'Card' },
  { name: '--badge-radius', value: 'var(--radius-full) · 9999px', component: 'Badge' },
  { name: '--badge-height', value: '20px', component: 'Badge' },
  { name: '--badge-font-size', value: '11px', component: 'Badge' },
  { name: '--avatar-size-xs', value: '24px', component: 'Avatar' },
  { name: '--avatar-size-sm', value: '32px', component: 'Avatar' },
  { name: '--avatar-size-md', value: '40px', component: 'Avatar' },
  { name: '--avatar-size-lg', value: '48px', component: 'Avatar' },
  { name: '--avatar-size-xl', value: '56px', component: 'Avatar' },
]

// ─── Button Styles (includes Black + White) ───────────────────────────────────

const BTN_STYLES: Record<string, Record<string, CSSProperties>> = {
  Primary: {
    default: { backgroundColor: '#16A34A', color: '#FFF' },
    hover: { backgroundColor: '#15803D', color: '#FFF' },
    disabled: { backgroundColor: '#E5E5E5', color: '#A3A3A3' },
  },
  Secondary: {
    default: { backgroundColor: '#F0FDF4', color: '#15803D', border: '1px solid #DCFCE7' },
    hover: { backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #BBF7D0' },
    disabled: { backgroundColor: '#F5F5F5', color: '#D4D4D4', border: '1px solid #E5E5E5' },
  },
  Ghost: {
    default: { backgroundColor: 'transparent', color: '#16A34A' },
    hover: { backgroundColor: '#F0FDF4', color: '#16A34A' },
    disabled: { backgroundColor: 'transparent', color: '#D4D4D4' },
  },
  Outline: {
    default: { backgroundColor: 'transparent', color: '#171717', border: '1px solid #E5E5E5' },
    hover: { backgroundColor: '#F5F5F5', color: '#171717', border: '1px solid #E5E5E5' },
    disabled: { backgroundColor: 'transparent', color: '#D4D4D4', border: '1px solid #F5F5F5' },
  },
  Destructive: {
    default: { backgroundColor: '#DC2626', color: '#FFF' },
    hover: { backgroundColor: '#B91C1C', color: '#FFF' },
    disabled: { backgroundColor: '#E5E5E5', color: '#A3A3A3' },
  },
  Black: {
    default: { backgroundColor: '#0A0A0A', color: '#FFF' },
    hover: { backgroundColor: '#262626', color: '#FFF' },
    disabled: { backgroundColor: '#E5E5E5', color: '#A3A3A3' },
  },
  White: {
    default: { backgroundColor: '#FFFFFF', color: '#171717', border: '1px solid #E5E5E5' },
    hover: { backgroundColor: '#F5F5F5', color: '#171717', border: '1px solid #E5E5E5' },
    disabled: { backgroundColor: '#FFFFFF', color: '#D4D4D4', border: '1px solid #F5F5F5' },
  },
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: { name: string; d: string[] }[] = [
  { name: 'Wallet', d: ['M21 12V7H5a2 2 0 0 1 0-4h14v4', 'M3 5v14a2 2 0 0 0 2 2h16v-5', 'M18 14h.01'] },
  { name: 'Credit Card', d: ['M2 5h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'M1 10h22'] },
  { name: 'Trending Up', d: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'] },
  { name: 'Trending Down', d: ['M23 18l-9.5-9.5-5 5L1 6', 'M17 18h6v-6'] },
  { name: 'Dollar Sign', d: ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'] },
  { name: 'Home', d: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'] },
  { name: 'Settings', d: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'] },
  { name: 'Bell', d: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'] },
  { name: 'Search', d: ['M20.49 20.49L16 16', 'M10 3a7 7 0 1 0 0 14A7 7 0 0 0 10 3z'] },
  { name: 'Check Circle', d: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'] },
  { name: 'X Circle', d: ['M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z', 'M15 9l-6 6M9 9l6 6'] },
  { name: 'Alert Circle', d: ['M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z', 'M12 8v4', 'M12 16h.01'] },
  { name: 'Clock', d: ['M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z', 'M12 6v6l4 2'] },
  { name: 'Send', d: ['M22 2 11 13', 'M22 2 15 22 11 13 2 9l20-7z'] },
  { name: 'Shield', d: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'] },
  { name: 'User', d: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'] },
  { name: 'Lock', d: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'] },
  { name: 'Arrow Up', d: ['M12 19V5', 'M5 12l7-7 7 7'] },
  { name: 'Arrow Down', d: ['M12 5v14', 'M19 12l-7 7-7-7'] },
  { name: 'Refresh', d: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'] },
]

// ─── Reusable Primitives ──────────────────────────────────────────────────────

function Ico({ name, size = 18 }: { name: string; size?: number }) {
  const icon = ICONS.find(i => i.name === name)
  if (!icon) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {icon.d.map((path, i) => <path key={i} d={path} />)}
    </svg>
  )
}

function SectionHeader({ breadcrumb, title, desc }: { breadcrumb: string; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{breadcrumb}</p>
      <h1 className="text-[28px] font-bold text-neutral-950 leading-none mb-2">{title}</h1>
      <p className="text-neutral-500 text-[15px] max-w-lg" style={{ lineHeight: '21px' }}>{desc}</p>
    </div>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.1em] mb-4">{children}</p>
}

function Frame({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`bg-white border border-neutral-200 rounded-lg ${className}`} style={style}>{children}</div>
}

function Skel({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`bg-neutral-100 rounded-md animate-pulse ${className}`} style={style} />
}

// ─── Section: Overview ────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div>
      <div className="rounded-2xl p-10 mb-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #166534 100%)' }}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-tight">N</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl tracking-wider leading-none">NOVA</p>
              <p className="text-green-200 text-[11px] font-medium mt-0.5">Design System · v1.0</p>
            </div>
          </div>
          <h1 className="text-white font-bold leading-none mb-3 max-w-md" style={{ fontSize: 40, lineHeight: '40px' }}>
            Financial clarity,<br />engineered for trust.
          </h1>
          <p className="text-green-100 text-[15px] max-w-sm mb-6" style={{ lineHeight: '21px' }}>
            A comprehensive, systematic design foundation for building premium fintech products with confidence.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Trustworthy', 'Bold', 'Clear', 'Modern', 'Solid'].map(t => (
              <span key={t} className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white text-[13px] font-medium border border-white/20">{t}</span>
            ))}
          </div>
        </div>
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4ADE80 0%, transparent 70%)' }} />
        <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #86EFAC 0%, transparent 70%)' }} />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { value: '10', label: 'Green Scale Steps', sub: '50 → 900' },
          { value: '8', label: 'Type Sizes', sub: 'Display → Caption' },
          { value: '4', label: 'Radius Tokens', sub: 'sm · md · lg · full' },
          { value: '65+', label: 'Design Tokens', sub: 'Primitive · Semantic · Component' },
        ].map(s => (
          <Frame key={s.label} className="p-5">
            <p className="text-2xl font-bold text-nova-600 mb-1">{s.value}</p>
            <p className="text-sm font-semibold text-neutral-800 mb-0.5">{s.label}</p>
            <p className="text-xs text-neutral-500">{s.sub}</p>
          </Frame>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Frame className="p-6">
          <Label>Balance Card Preview</Label>
          <Frame className="p-5" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-nova-50 flex items-center justify-center text-nova-600">
                  <Ico name="Wallet" size={15} />
                </div>
                <span className="text-sm font-medium text-neutral-800">Main Account</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">•••• 8291</span>
            </div>
            <p className="text-xs text-neutral-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-neutral-950 mb-3">$24,580.00</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-nova-50 text-nova-700 text-xs font-medium border border-nova-100">
                <span className="w-1.5 h-1.5 rounded-full bg-nova-600" />Active
              </span>
              <span className="text-xs text-neutral-500">+$1,240 this month</span>
            </div>
          </Frame>
        </Frame>

        <Frame className="p-6">
          <Label>Badges & Buttons Preview</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: 'Completed', bg: '#F0FDF4', text: '#15803D', dot: '#16A34A', border: '#DCFCE7' },
              { label: 'Pending', bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B', border: '#FEF3C7' },
              { label: 'Failed', bg: '#FEF2F2', text: '#B91C1C', dot: '#DC2626', border: '#FEE2E2' },
              { label: 'Processing', bg: '#EFF6FF', text: '#1E40AF', dot: '#2563EB', border: '#DBEAFE' },
            ].map(b => (
              <span key={b.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: b.bg, color: b.text, border: `1px solid ${b.border}` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.dot }} />{b.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-nova-600 text-white text-sm font-medium hover:bg-nova-700 transition-colors">
              <Ico name="Send" size={14} />Send Money
            </button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors">
              Cancel
            </button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
              Confirm
            </button>
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Colors ──────────────────────────────────────────────────────────

function ColorsSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Color System" desc="Anchored at #16A34A — a precise, institutional green across 10 steps. Complemented by an 11-step neutral scale and 4 semantic intent colors." />

      <div className="mb-10">
        <Label>NOVA Green Scale · 10 Steps</Label>
        <div className="flex rounded-lg overflow-hidden border border-neutral-200 mb-3">
          {GREEN_SCALE.map(s => (
            <div key={s.name} className="flex-1 h-28 flex flex-col justify-end p-3 cursor-default" style={{ backgroundColor: s.hex }}>
              <p className={`text-[11px] font-semibold leading-none mb-1 ${s.dark ? 'text-white/80' : 'text-neutral-600'}`}>{s.name.replace('Green ', '')}</p>
              <p className={`text-[10px] font-mono ${s.dark ? 'text-white/50' : 'text-neutral-500'}`}>{s.hex}</p>
            </div>
          ))}
        </div>
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          {GREEN_SCALE.map(s => (
            <div key={s.name + 'tok'} className="flex-1 px-2 py-2 bg-neutral-50 border-r border-neutral-200 last:border-0">
              <p className="text-[9px] font-mono text-neutral-500 truncate">{s.token}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Neutral Scale · 11 Steps</Label>
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          {NEUTRAL_SCALE.map(s => (
            <div key={s.name} className="flex-1 h-24 flex flex-col justify-end p-2 cursor-default" style={{ backgroundColor: s.hex }}>
              <p className={`text-[10px] font-bold ${s.dark ? 'text-white/60' : 'text-neutral-500'}`}>{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Semantic Colors</Label>
        <div className="grid grid-cols-4 gap-4">
          {SEMANTIC_COLORS.map(c => (
            <div key={c.name} className="rounded-lg overflow-hidden border border-neutral-200">
              <div className="h-20" style={{ backgroundColor: c.hex }} />
              <div className="p-4 bg-white">
                <p className="font-semibold text-neutral-800 text-sm mb-1">{c.name}</p>
                <p className="font-mono text-xs text-neutral-500 mb-2">{c.hex}</p>
                <p className="text-xs text-neutral-500" style={{ lineHeight: '18px' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Semantic Chips</Label>
        <Frame className="p-6 flex flex-col gap-3">
          {SEMANTIC_COLORS.map(c => (
            <div key={c.name + 'chip'} className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: c.bg, color: c.textColor, border: `1px solid ${c.border}` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.hex }} />
                {c.name}: {c.name === 'Success' ? 'Payment confirmed' : c.name === 'Warning' ? 'Verification required' : c.name === 'Error' ? 'Transaction declined' : 'Account under review'}
              </div>
              <span className="font-mono text-xs text-neutral-500">{c.hex}</span>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Gradients</Label>
        <div className="grid grid-cols-4 gap-4">
          {GRADIENTS.map(g => (
            <div key={g.name} className="rounded-lg overflow-hidden border border-neutral-200">
              <div className="h-24" style={{ background: g.gradient }} />
              <div className="p-4 bg-white">
                <p className="font-semibold text-neutral-800 text-sm mb-1">{g.name}</p>
                <p className="font-mono text-[9px] text-neutral-500 mb-2 leading-relaxed break-all">{g.token}</p>
                <p className="text-xs text-neutral-500">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section: Typography ──────────────────────────────────────────────────────

function TypographySection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Typography" desc="Inter across all weights. Line height: 100% for sizes ≥ 32px (tight, impactful), 130% for sizes below 32px (comfortable, readable)." />

      <div className="mb-10">
        <Label>Type Scale · Inter · Line Height Rule</Label>
        <Frame>
          {TYPE_SCALE.map((t, i) => (
            <div key={t.name} className={`flex items-baseline gap-5 px-6 py-5 hover:bg-neutral-50 transition-colors ${i < TYPE_SCALE.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div className="w-28 shrink-0">
                <p className="text-xs font-semibold text-neutral-700">{t.name}</p>
                <p className="text-[10px] font-mono text-neutral-500 mt-0.5">{t.size}px · {t.rule}</p>
              </div>
              <p className="text-neutral-900 flex-1 min-w-0 truncate" style={{ fontSize: t.size, lineHeight: `${t.lh}px`, fontWeight: t.weight }}>
                {t.sample}
              </p>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Font Weights</Label>
        <Frame className="p-6">
          <div className="grid grid-cols-4 gap-6">
            {[{ w: 400, n: 'Regular' }, { w: 500, n: 'Medium' }, { w: 600, n: 'Semibold' }, { w: 700, n: 'Bold' }].map(fw => (
              <div key={fw.w}>
                <p className="text-xl text-neutral-900 mb-2" style={{ fontWeight: fw.w, lineHeight: '26px' }}>Account balance</p>
                <p className="text-xs text-neutral-500">{fw.w} · {fw.n}</p>
              </div>
            ))}
          </div>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Line Height in Context</Label>
        <Frame className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">≥ 32px · 100% line height</p>
              <p className="font-bold text-neutral-950 mb-2" style={{ fontSize: 40, lineHeight: '40px' }}>$24,580.00</p>
              <p className="font-bold text-neutral-950" style={{ fontSize: 32, lineHeight: '32px' }}>Account Balance</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{"< 32px · 130% line height"}</p>
              <p className="font-semibold text-neutral-900 mb-2" style={{ fontSize: 24, lineHeight: '31px' }}>Transaction History</p>
              <p className="text-neutral-700" style={{ fontSize: 16, lineHeight: '21px' }}>
                Your NOVA balance reflects all confirmed transactions.<br />
                Transfers may take up to 3 business days to appear.
              </p>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Spacing ─────────────────────────────────────────────────────────

function SpacingSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Spacing" desc="An 8px base grid. Every step is deliberate — no arbitrary margins. Starts at 0, 2, 4, 6px, then 8px increments onward." />

      <div className="mb-8">
        <Label>Spacing Scale</Label>
        <Frame>
          {SPACING_SCALE.map((s, i) => (
            <div key={s.token} className={`flex items-center gap-5 px-5 py-3 hover:bg-neutral-50 transition-colors ${i < SPACING_SCALE.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <p className="w-24 shrink-0 font-mono text-xs text-nova-700">{s.token}</p>
              <p className="w-12 text-xs text-neutral-500 shrink-0">{s.value}</p>
              <div className="flex-1 flex items-center h-5">
                {s.px > 0 && <div className="bg-nova-100 rounded-sm h-full" style={{ width: Math.min(s.px, 280) }} />}
                {s.px === 0 && <span className="text-xs text-neutral-300">—</span>}
              </div>
              <p className="w-12 text-right text-xs text-neutral-500 shrink-0 font-mono">{s.px}px</p>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-4">
        <Label>8px Grid Visualized</Label>
        <Frame className="p-6">
          <p className="text-sm text-neutral-500 mb-6" style={{ lineHeight: '21px' }}>Every measurement is a multiple of 4px. Component internals use 4–16px; layout gaps use 16–48px.</p>
          <div className="flex items-end gap-3">
            {[2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96].map(px => (
              <div key={px} className="flex flex-col items-center gap-1.5">
                <div className="bg-nova-600 rounded-sm w-6" style={{ height: px * 0.6 }} />
                <p className="text-[10px] text-neutral-500 font-mono">{px}</p>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Radius & Borders ────────────────────────────────────────────────

function RadiusSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Radius & Borders" desc="Four purposeful radii. SM for micro elements, MD for interactive components, LG for containers, Full for pills and indicators." />

      <div className="mb-10">
        <Label>4-Step Radius System</Label>
        <div className="grid grid-cols-4 gap-4">
          {RADIUS_SCALE.map(r => (
            <Frame key={r.name} className="p-6 flex flex-col gap-4">
              <div
                className="w-full aspect-square bg-nova-50 border-2 border-nova-200 max-w-[80px] mx-auto"
                style={{ borderRadius: Math.min(r.px, 80) }}
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-neutral-900 text-sm">{r.name}</p>
                  <p className="font-mono text-xs text-nova-600">{r.value}</p>
                </div>
                <p className="font-mono text-[10px] text-neutral-500 mb-2">{r.token}</p>
                <p className="text-xs text-neutral-500" style={{ lineHeight: '18px' }}>{r.usage}</p>
              </div>
            </Frame>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Component Mapping</Label>
        <Frame className="p-6 flex flex-wrap gap-4 items-center">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-sm bg-neutral-100 text-neutral-600 text-xs font-medium">Tag · SM</span>
            <p className="text-[10px] text-neutral-500">4px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-nova-600 text-white text-sm font-medium">Button · MD</button>
            <p className="text-[10px] text-neutral-500">8px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <input className="h-10 px-3 rounded-md border border-neutral-200 text-sm text-neutral-700 outline-none w-32" defaultValue="Input · MD" readOnly />
            <p className="text-[10px] text-neutral-500">8px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="px-5 h-12 rounded-lg border border-neutral-200 text-sm text-neutral-700 flex items-center">Card · LG</div>
            <p className="text-[10px] text-neutral-500">12px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-nova-50 text-nova-700 text-xs font-medium border border-nova-100">Badge · Full</span>
            <p className="text-[10px] text-neutral-500">9999px</p>
          </div>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Border Styles</Label>
        <Frame className="p-6 grid grid-cols-3 gap-6">
          {[
            { name: '1px · Neutral 200', border: '1px solid #E5E5E5', token: '--border-default', desc: 'Cards, inputs, dividers' },
            { name: '1px · Nova 100', border: '1px solid #DCFCE7', token: '--border-primary', desc: 'Primary borders, highlights' },
            { name: '1px · Neutral 300', border: '1px solid #D4D4D4', token: '--border-strong', desc: 'Active inputs, emphasis' },
          ].map(b => (
            <div key={b.name}>
              <div className="h-20 rounded-md mb-4 flex items-center justify-center text-neutral-300 text-sm" style={{ border: b.border }}>Sample</div>
              <p className="font-semibold text-neutral-800 text-sm mb-1">{b.name}</p>
              <p className="font-mono text-xs text-nova-600 mb-1">{b.token}</p>
              <p className="text-xs text-neutral-500">{b.desc}</p>
            </div>
          ))}
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Elevation ───────────────────────────────────────────────────────

function ElevationSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Elevation" desc="Five shadow levels for depth hierarchy. NOVA is flat-first — shadow separates layers only when context requires it." />

      <div className="mb-10">
        <Label>Shadow Levels</Label>
        <div className="grid grid-cols-5 gap-4">
          {ELEVATION_LEVELS.map(lv => (
            <div key={lv.name} className="flex flex-col">
              <div className="aspect-square rounded-lg bg-white mb-4" style={{ boxShadow: lv.shadow, border: lv.shadow === 'none' ? '1px solid #E5E5E5' : 'none' }} />
              <p className="text-sm font-semibold text-neutral-800 mb-1">{lv.name}</p>
              <p className="font-mono text-[10px] text-nova-600 mb-2">{lv.token}</p>
              <p className="text-xs text-neutral-500" style={{ lineHeight: '18px' }}>{lv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Label>Elevation in Context</Label>
        <div className="bg-neutral-100 rounded-lg p-8 grid grid-cols-3 gap-5">
          {[
            { label: 'Input · Level 1', shadow: '0 1px 2px rgba(0,0,0,0.06)' },
            { label: 'Card · Level 2', shadow: '0 4px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)' },
            { label: 'Modal · Level 3', shadow: '0 10px 20px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.05)' },
          ].map(ex => (
            <div key={ex.label} className="bg-white rounded-lg p-5" style={{ boxShadow: ex.shadow }}>
              <div className="w-8 h-8 rounded-md bg-nova-50 flex items-center justify-center text-nova-600 mb-3">
                <Ico name="Dollar Sign" size={16} />
              </div>
              <p className="text-sm font-bold text-neutral-900 mb-1">$8,240.00</p>
              <p className="text-xs text-neutral-500">{ex.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section: Motion ──────────────────────────────────────────────────────────

function MotionSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Foundation" title="Motion" desc="Purposeful and precise — not decorative. Fast for micro-interactions, normal for transitions, slow only for meaningful moments." />

      <div className="mb-8">
        <Label>Duration Scale</Label>
        <Frame>
          {DURATION_TOKENS.map((t, i) => (
            <div key={t.name} className={`flex items-center gap-5 px-5 py-4 hover:bg-neutral-50 transition-colors ${i < DURATION_TOKENS.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <p className="w-44 shrink-0 font-mono text-xs text-nova-700">{t.name}</p>
              <p className="w-16 text-sm font-semibold text-neutral-800 shrink-0">{t.value}</p>
              <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-nova-600 rounded-full" style={{ width: `${(parseInt(t.value) / 700) * 100}%` }} />
              </div>
              <p className="w-72 text-xs text-neutral-500 shrink-0">{t.desc}</p>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Easing Curves</Label>
        <Frame>
          {EASING_TOKENS.map((t, i) => (
            <div key={t.name} className={`flex items-center gap-5 px-5 py-4 hover:bg-neutral-50 transition-colors ${i < EASING_TOKENS.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <p className="w-44 shrink-0 font-mono text-xs text-nova-700">{t.name}</p>
              <p className="w-60 font-mono text-xs text-neutral-500 shrink-0">{t.value}</p>
              <p className="text-xs text-neutral-500">{t.desc}</p>
            </div>
          ))}
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Buttons ─────────────────────────────────────────────────────────

function ButtonsSection() {
  const variants = [
    { variant: 'Primary', desc: 'Main call-to-action. Use once per view.', icon: 'Send' },
    { variant: 'Secondary', desc: 'Supporting action alongside Primary.', icon: 'Arrow Up' },
    { variant: 'Ghost', desc: 'Tertiary links and navigation.', icon: 'Search' },
    { variant: 'Outline', desc: 'Neutral framing, cancel, back.', icon: 'Settings' },
    { variant: 'Destructive', desc: 'Irreversible or dangerous actions.', icon: 'X Circle' },
    { variant: 'Black', desc: 'High-contrast, dark brand surface.', icon: 'Arrow Up' },
    { variant: 'White', desc: 'On dark/colored backgrounds, overlays.', icon: 'User' },
  ]

  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Buttons" desc="Seven variants, three sizes, five interactive states. All use radius MD (8px), weight 500, and scale on the 8px grid." />

      <div className="mb-10">
        <Label>Variants · Default · Hover · Disabled</Label>
        <Frame className="p-6 divide-y divide-neutral-100">
          {variants.map(row => (
            <div key={row.variant} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
              <div className="w-36 shrink-0">
                <p className="text-sm font-semibold text-neutral-700">{row.variant}</p>
                <p className="text-xs text-neutral-500 mt-0.5" style={{ lineHeight: '18px' }}>{row.desc}</p>
              </div>
              <div className="flex gap-3 items-center flex-wrap">
                {(['default', 'hover', 'disabled'] as const).map(state => (
                  <button
                    key={state}
                    disabled={state === 'disabled'}
                    className="inline-flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-md"
                    style={BTN_STYLES[row.variant][state]}
                  >
                    {state === 'default' && <Ico name={row.icon} size={14} />}
                    {state === 'default' ? row.variant : state.charAt(0).toUpperCase() + state.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Black & White on Colored Surface</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-6 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #166534 100%)' }}>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-white text-neutral-900 text-sm font-medium">
              <Ico name="Send" size={14} />Send Money
            </button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md text-white text-sm font-medium border border-white/30">
              Cancel
            </button>
          </div>
          <div className="rounded-lg p-6 flex items-center justify-center gap-3 bg-neutral-950">
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-nova-600 text-white text-sm font-medium hover:bg-nova-500 transition-colors">
              <Ico name="Wallet" size={14} />Add Funds
            </button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-neutral-700 text-neutral-300 text-sm font-medium hover:bg-neutral-800 transition-colors">
              View History
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <Label>Sizes</Label>
        <Frame className="p-6 flex items-end gap-4">
          <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-nova-600 text-white text-xs font-medium hover:bg-nova-700 transition-colors">SM · 32px</button>
          <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-nova-600 text-white text-sm font-medium hover:bg-nova-700 transition-colors">MD · 40px</button>
          <button className="inline-flex items-center gap-2 px-5 h-12 rounded-md bg-nova-600 text-white text-[15px] font-medium hover:bg-nova-700 transition-colors">LG · 48px</button>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Loading & State Feedback</Label>
        <Frame className="p-6 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-md bg-nova-600 text-white">
            <svg className="animate-spin" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Processing…
          </button>
          <button className="inline-flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-md bg-nova-50 text-nova-700 border border-nova-100">
            <Ico name="Check Circle" size={14} />Confirmed
          </button>
          <button className="inline-flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-md bg-red-50 text-red-700 border border-red-100">
            <Ico name="X Circle" size={14} />Failed
          </button>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Inputs ──────────────────────────────────────────────────────────

function InputsSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Form Inputs" desc="Radius MD (8px), 1px border, 40px height. When an input and button appear inline, both must share the same height regardless of icon usage." />

      <div className="mb-10">
        <Label>Input States</Label>
        <Frame className="p-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Default</p>
            <input type="text" placeholder="Enter amount" className="w-full h-10 px-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none" />
          </div>
          <div>
            <p className="text-xs font-medium text-nova-600 mb-2">Focus</p>
            <input type="text" defaultValue="$1,200.00" readOnly className="w-full h-10 px-3 rounded-md text-sm text-neutral-800 outline-none" style={{ border: '1px solid #16A34A', boxShadow: '0 0 0 3px rgba(22,163,74,0.12)' }} />
          </div>
          <div>
            <p className="text-xs font-medium text-red-600 mb-2">Error</p>
            <input type="text" defaultValue="$50,000.00" readOnly className="w-full h-10 px-3 rounded-md text-sm text-neutral-800 outline-none" style={{ border: '1px solid #DC2626', boxShadow: '0 0 0 3px rgba(220,38,38,0.08)' }} />
            <p className="text-xs text-red-600 mt-1.5">Exceeds daily limit of $25,000</p>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 mb-2">Disabled</p>
            <input type="text" defaultValue="N/A" disabled className="w-full h-10 px-3 rounded-md text-sm text-neutral-400 bg-neutral-50 border border-neutral-200 cursor-not-allowed" />
          </div>
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Inline Input + Button · Same Height (40px)</Label>
        <Frame className="p-6 space-y-4">
          <p className="text-xs text-neutral-500 pb-2 border-b border-neutral-100" style={{ lineHeight: '18px' }}>
            Rule: when a button and input sit in the same row — and either carries an icon — both must be a fixed <span className="font-mono bg-neutral-100 px-1 rounded-sm text-neutral-700">h-10</span> (40px). This prevents visual misalignment.
          </p>

          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Transfer · Input icon + Button icon · both h-10</p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"><Ico name="Dollar Sign" size={15} /></div>
                <input type="text" placeholder="0.00" className="w-full h-10 pl-9 pr-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-nova-600 transition-colors" />
              </div>
              <button className="h-10 px-4 rounded-md bg-nova-600 text-white text-sm font-medium flex items-center gap-2 shrink-0 hover:bg-nova-700 transition-colors">
                <Ico name="Send" size={15} />Send
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Search · Input icon + plain button · both h-10</p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"><Ico name="Search" size={15} /></div>
                <input type="text" placeholder="Search transactions…" className="w-full h-10 pl-9 pr-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-nova-600 transition-colors" />
              </div>
              <button className="h-10 px-4 rounded-md border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors shrink-0">Search</button>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Account add · plain input + button with icon · both h-10</p>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Enter account number or email" className="flex-1 h-10 px-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-nova-600 transition-colors" />
              <button className="h-10 px-4 rounded-md bg-neutral-950 text-white text-sm font-medium flex items-center gap-2 shrink-0 hover:bg-neutral-800 transition-colors">
                <Ico name="User" size={15} />Add
              </button>
            </div>
          </div>
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Input with Label + Prefix</Label>
        <Frame className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Transfer Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"><Ico name="Dollar Sign" size={15} /></div>
              <input type="text" placeholder="0.00" className="w-full h-10 pl-9 pr-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-nova-600 transition-colors" />
            </div>
            <p className="text-xs text-neutral-500 mt-1.5">Available: $24,580.00</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Recipient</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"><Ico name="User" size={15} /></div>
              <input type="text" placeholder="Account number or email" className="w-full h-10 pl-9 pr-3 rounded-md border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-nova-600 transition-colors" />
            </div>
            <p className="text-xs text-neutral-500 mt-1.5">NOVA accounts transfer instantly</p>
          </div>
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Select</Label>
        <Frame className="p-6">
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Transfer Type</label>
            <div className="relative">
              <select className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 text-sm text-neutral-800 outline-none appearance-none bg-white focus:border-nova-600 transition-colors">
                <option>Standard Transfer (1–3 days)</option>
                <option>Instant Transfer (fee applies)</option>
                <option>Scheduled Transfer</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Checkbox & Toggle</Label>
        <Frame className="p-6 flex gap-12">
          <div className="space-y-3">
            {[
              { label: 'Save card for future use', checked: true, disabled: false },
              { label: 'Enable two-factor auth', checked: false, disabled: false },
              { label: 'Paper statements (unavailable)', checked: false, disabled: true },
            ].map(cb => (
              <div key={cb.label} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 ${cb.checked ? 'border-nova-600 bg-nova-600' : cb.disabled ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-300 bg-white'}`}>
                  {cb.checked && <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span className={`text-sm ${cb.disabled ? 'text-neutral-400' : 'text-neutral-700'}`}>{cb.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[
              { label: 'Payment notifications', on: true },
              { label: 'Marketing emails', on: false },
              { label: 'Security alerts', on: true },
            ].map(tg => (
              <div key={tg.label} className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full relative shrink-0" style={{ backgroundColor: tg.on ? '#16A34A' : '#E5E5E5' }}>
                  <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all" style={{ left: tg.on ? '22px' : '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </div>
                <span className="text-sm text-neutral-700">{tg.label}</span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Cards ───────────────────────────────────────────────────────────

function CardsSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Cards" desc="Radius LG (12px), 24px internal padding. Five variants: Metric, Account, Payment (gradient), Transaction list, and Feature." />

      <div className="mb-10">
        <Label>Metric Cards</Label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Balance', value: '$24,580.00', delta: '+$1,240', up: true, sub: 'vs last month', icon: 'Wallet' },
            { label: 'Monthly Spend', value: '$3,421.00', delta: '-$340', up: false, sub: 'vs last month', icon: 'Arrow Up' },
            { label: 'Savings Rate', value: '18.4%', delta: '+2.1%', up: true, sub: 'vs last month', icon: 'Trending Up' },
          ].map(c => (
            <Frame key={c.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-md bg-nova-50 flex items-center justify-center text-nova-600">
                  <Ico name={c.icon} size={17} />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full" style={c.up ? { backgroundColor: '#F0FDF4', color: '#15803D' } : { backgroundColor: '#FEF2F2', color: '#B91C1C' }}>
                  {c.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-950 mb-1">{c.value}</p>
              <p className="text-sm text-neutral-500">{c.label}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{c.sub}</p>
            </Frame>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Account Cards</Label>
        <div className="grid grid-cols-2 gap-4">
          <Frame className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-nova-600 flex items-center justify-center text-white font-bold text-sm">JM</div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">James Mitchell</p>
                <p className="text-xs text-neutral-500">NOVA Premium · #8291</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-full bg-nova-50 text-nova-700 text-xs font-medium border border-nova-100">
                <span className="w-1.5 h-1.5 rounded-full bg-nova-600" />Active
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm"><span className="text-neutral-500">Available Balance</span><span className="font-semibold text-neutral-900">$24,580.00</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-500">Pending</span><span className="font-medium text-neutral-700">$340.00</span></div>
              <div className="border-t border-neutral-100 pt-2.5 flex justify-between text-sm"><span className="text-neutral-500">Total</span><span className="font-bold text-neutral-900">$24,920.00</span></div>
            </div>
          </Frame>

          <div className="rounded-lg p-6 text-white" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #166534 100%)' }}>
            <div className="flex items-center justify-between mb-8">
              <p className="text-green-100 text-sm font-medium">NOVA Premium</p>
              <div className="text-white/60"><Ico name="Credit Card" size={20} /></div>
            </div>
            <p className="text-2xl font-bold mb-1">$24,580.00</p>
            <p className="text-green-200 text-sm mb-8">Available balance</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-green-200 text-xs mb-0.5">Account holder</p>
                <p className="text-white text-sm font-medium">James Mitchell</p>
              </div>
              <div className="text-right">
                <p className="text-green-200 text-xs mb-0.5">Account No.</p>
                <p className="text-white text-sm font-mono">•••• 8291</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Label>Transaction List Card</Label>
        <Frame>
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <div>
              <p className="text-sm font-semibold text-neutral-800">Recent Transactions</p>
              <p className="text-xs text-neutral-500 mt-0.5">Aug 2026 · 24 transactions</p>
            </div>
            <button className="text-sm text-nova-600 font-medium hover:text-nova-700 transition-colors">View all</button>
          </div>
          {[
            { name: 'Stripe Inc.', amount: '+$2,400.00', date: 'Aug 16, 09:41', cat: 'Income', up: true },
            { name: 'AWS Services', amount: '-$340.00', date: 'Aug 16, 07:15', cat: 'Infrastructure', up: false },
            { name: 'Figma Pro', amount: '-$45.00', date: 'Aug 15, 15:22', cat: 'Subscription', up: false },
            { name: 'Transfer from Savings', amount: '+$5,000.00', date: 'Aug 14, 12:00', cat: 'Transfer', up: true },
          ].map((tx, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors">
              <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: tx.up ? '#F0FDF4' : '#F5F5F5', color: tx.up ? '#16A34A' : '#737373' }}>
                <Ico name={tx.up ? 'Arrow Down' : 'Arrow Up'} size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800">{tx.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{tx.date} · {tx.cat}</p>
              </div>
              <p className={`text-sm font-semibold ${tx.up ? 'text-nova-600' : 'text-neutral-700'}`}>{tx.amount}</p>
            </div>
          ))}
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Badges & Avatars ────────────────────────────────────────────────

function BadgesSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Badges & Avatars" desc="Badges communicate status at a glance. Avatars represent users with consistent sizing from XS (24px) to XL (56px)." />

      <div className="mb-10">
        <Label>Status Badges</Label>
        <Frame className="p-6 space-y-4">
          {[
            { group: 'Success', bg: '#F0FDF4', text: '#15803D', border: '#DCFCE7', dot: '#16A34A', examples: ['Completed', 'Verified', 'Active', 'Approved'] },
            { group: 'Warning', bg: '#FFFBEB', text: '#92400E', border: '#FEF3C7', dot: '#F59E0B', examples: ['Pending', 'Reviewing', 'Awaiting', 'Expiring'] },
            { group: 'Error', bg: '#FEF2F2', text: '#B91C1C', border: '#FEE2E2', dot: '#DC2626', examples: ['Failed', 'Declined', 'Blocked', 'Expired'] },
            { group: 'Info', bg: '#EFF6FF', text: '#1E40AF', border: '#DBEAFE', dot: '#2563EB', examples: ['Processing', 'Scheduled', 'Draft', 'New'] },
            { group: 'Neutral', bg: '#F5F5F5', text: '#525252', border: '#E5E5E5', dot: '#A3A3A3', examples: ['Archived', 'Paused', 'Inactive', 'Closed'] },
          ].map(g => (
            <div key={g.group} className="flex items-center gap-5">
              <p className="w-20 text-xs font-semibold text-neutral-500 shrink-0">{g.group}</p>
              <div className="flex gap-2 flex-wrap">
                {g.examples.map(ex => (
                  <span key={ex} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: g.bg, color: g.text, border: `1px solid ${g.border}` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: g.dot }} />{ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Avatar Sizes</Label>
        <Frame className="p-6 flex items-end gap-6">
          {[{ s: 24, l: 'XS' }, { s: 32, l: 'SM' }, { s: 40, l: 'MD' }, { s: 48, l: 'LG' }, { s: 56, l: 'XL' }].map(av => (
            <div key={av.l} className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-nova-600 flex items-center justify-center text-white font-semibold" style={{ width: av.s, height: av.s, fontSize: av.s * 0.34 }}>JM</div>
              <p className="text-xs font-semibold text-neutral-600">{av.l}</p>
              <p className="text-[10px] text-neutral-500 font-mono">{av.s}px</p>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Avatar Group & Status</Label>
        <Frame className="p-6 flex gap-12 flex-wrap">
          <div>
            <p className="text-xs text-neutral-500 mb-3">Stacked Group</p>
            <div className="flex">
              {['JM', 'AK', 'SR', 'MP'].map((init, i) => (
                <div key={init} className="rounded-full flex items-center justify-center text-white font-semibold text-xs border-2 border-white" style={{ width: 36, height: 36, backgroundColor: ['#16A34A', '#2563EB', '#F59E0B', '#DC2626'][i], marginLeft: i === 0 ? 0 : -10, zIndex: 4 - i, position: 'relative' }}>
                  {init}
                </div>
              ))}
              <div className="rounded-full flex items-center justify-center bg-neutral-100 text-neutral-600 font-semibold text-xs border-2 border-white" style={{ width: 36, height: 36, marginLeft: -10, position: 'relative', zIndex: 0 }}>+8</div>
            </div>
          </div>

          <div>
            <p className="text-xs text-neutral-500 mb-3">With Status</p>
            <div className="flex gap-4">
              {[{ dot: '#22C55E', lbl: 'Online' }, { dot: '#F59E0B', lbl: 'Away' }, { dot: '#E5E5E5', lbl: 'Offline' }].map(s => (
                <div key={s.lbl} className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-nova-600 flex items-center justify-center text-white font-semibold text-sm">JM</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: s.dot }} />
                  </div>
                  <p className="text-xs text-neutral-500">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Icons ───────────────────────────────────────────────────────────

function IconsSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Iconography" desc="Lucide-style stroke icons at 1.75px width, 24×24 viewport. Sized contextually: 16px inline, 20px standard, 24px standalone." />

      <div className="mb-10">
        <Label>Icon Library · {ICONS.length} icons</Label>
        <Frame className="p-4">
          <div className="grid grid-cols-5 gap-1">
            {ICONS.map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-2 p-4 rounded-md hover:bg-nova-50 transition-colors group cursor-default">
                <div className="text-neutral-600 group-hover:text-nova-600 transition-colors"><Ico name={icon.name} size={22} /></div>
                <p className="text-xs text-neutral-500 text-center leading-tight">{icon.name}</p>
              </div>
            ))}
          </div>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Size Variants</Label>
        <Frame className="p-6 flex items-end gap-8">
          {[{ s: 12, l: '12px', d: 'Badge' }, { s: 16, l: '16px', d: 'Button' }, { s: 20, l: '20px', d: 'Standard' }, { s: 24, l: '24px', d: 'Standalone' }, { s: 32, l: '32px', d: 'Feature' }, { s: 40, l: '40px', d: 'Display' }].map(sv => (
            <div key={sv.s} className="flex flex-col items-center gap-2">
              <div className="text-nova-600"><Ico name="Wallet" size={sv.s} /></div>
              <p className="text-xs font-semibold text-neutral-700">{sv.l}</p>
              <p className="text-xs text-neutral-500">{sv.d}</p>
            </div>
          ))}
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Empty & Loading States ─────────────────────────────────────────

function StatesSection() {
  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Empty & Loading States" desc="Empty states reassure users that the absence of content is intentional. Skeleton loaders reduce perceived wait time by mirroring the content structure." />

      <div className="mb-10">
        <Label>Empty States</Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: 'Trending Up',
              iconBg: '#F0FDF4',
              iconColor: '#16A34A',
              title: 'No transactions yet',
              desc: 'Your transaction history will appear here once you make your first payment or transfer.',
              cta: { label: 'Add Funds', style: { backgroundColor: '#16A34A', color: '#FFF' } as CSSProperties },
              ctaIcon: 'Arrow Down',
            },
            {
              icon: 'Search',
              iconBg: '#F5F5F5',
              iconColor: '#737373',
              title: "No results found",
              desc: 'We couldn\'t find anything matching your search. Try adjusting your filters or search terms.',
              cta: { label: 'Clear filters', style: { backgroundColor: 'transparent', color: '#16A34A' } as CSSProperties },
              ctaIcon: 'Refresh',
            },
            {
              icon: 'Bell',
              iconBg: '#EFF6FF',
              iconColor: '#2563EB',
              title: "You're all caught up",
              desc: 'You have no new notifications. We\'ll alert you when something requires your attention.',
              cta: null,
              ctaIcon: '',
            },
            {
              icon: 'Credit Card',
              iconBg: '#F0FDF4',
              iconColor: '#16A34A',
              title: 'No accounts connected',
              desc: 'Link a bank account or card to start sending, receiving, and managing your money with NOVA.',
              cta: { label: 'Connect Bank', style: { backgroundColor: '#0A0A0A', color: '#FFF' } as CSSProperties },
              ctaIcon: 'Arrow Up',
            },
          ].map((e, idx) => (
            <Frame key={idx} className="p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: e.iconBg, color: e.iconColor }}>
                <Ico name={e.icon} size={26} />
              </div>
              <p className="text-base font-semibold text-neutral-900 mb-2">{e.title}</p>
              <p className="text-sm text-neutral-500 max-w-xs mb-5" style={{ lineHeight: '21px' }}>{e.desc}</p>
              {e.cta && (
                <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md text-sm font-medium" style={e.cta.style}>
                  {e.ctaIcon && <Ico name={e.ctaIcon} size={14} />}
                  {e.cta.label}
                </button>
              )}
            </Frame>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Label>Skeleton Loading States</Label>
        <div className="grid grid-cols-2 gap-4">
          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Metric card skeleton</p>
            <div className="flex items-start justify-between mb-4">
              <Skel className="w-9 h-9 rounded-md" />
              <Skel className="w-12 h-5 rounded-full" />
            </div>
            <Skel className="w-32 h-7 rounded-md mb-2" />
            <Skel className="w-24 h-4 rounded-md mb-1" />
            <Skel className="w-20 h-3.5 rounded-md" />
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Transaction list skeleton</p>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Skel className="w-9 h-9 rounded-md shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skel className="h-4 rounded-md" style={{ width: `${65 + i * 8}%` } as CSSProperties} />
                    <Skel className="h-3 rounded-md w-1/3" />
                  </div>
                  <Skel className="w-16 h-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Account card skeleton</p>
            <div className="flex items-center gap-3 mb-5">
              <Skel className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skel className="h-4 rounded-md w-2/3" />
                <Skel className="h-3 rounded-md w-1/2" />
              </div>
              <Skel className="w-16 h-5 rounded-full" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between">
                  <Skel className="h-3.5 rounded-md w-1/3" />
                  <Skel className="h-3.5 rounded-md w-1/4" />
                </div>
              ))}
            </div>
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Spinner states</p>
            <div className="flex items-center gap-6 mb-6">
              {[16, 24, 32, 40].map(sz => (
                <div key={sz} className="flex flex-col items-center gap-2">
                  <svg className="animate-spin text-nova-600" width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <p className="text-[10px] text-neutral-500">{sz}px</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-2">Progress bar</p>
              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full animate-pulse" style={{ width: '65%', background: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)' }} />
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-[10px] text-neutral-500">Loading…</p>
                <p className="text-[10px] text-neutral-500">65%</p>
              </div>
            </div>
          </Frame>
        </div>
      </div>

      <div className="mb-4">
        <Label>Inline Loading Patterns</Label>
        <Frame className="p-6 flex flex-wrap gap-4 items-center">
          <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-nova-600 text-white text-sm font-medium">
            <svg className="animate-spin" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Sending payment…
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg className="animate-spin text-nova-600" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            <span className="text-sm text-neutral-500">Verifying account…</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-nova-50 border border-nova-100">
            <svg className="animate-spin text-nova-600" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-sm text-nova-700 font-medium">Processing transfer</span>
          </div>
        </Frame>
      </div>
    </div>
  )
}

// ─── Section: Tokens ──────────────────────────────────────────────────────────

function TokensSection() {
  const [tab, setTab] = useState<'primitive' | 'semantic' | 'component'>('primitive')

  const primGroups = [
    { group: 'Color · Green', rows: PRIMITIVE_TOKENS.filter(t => t.name.includes('nova') && t.type === 'Color') },
    { group: 'Color · Neutral', rows: PRIMITIVE_TOKENS.filter(t => t.name.includes('neutral') && t.type === 'Color') },
    { group: 'Spacing', rows: PRIMITIVE_TOKENS.filter(t => t.type === 'Spacing') },
    { group: 'Radius', rows: PRIMITIVE_TOKENS.filter(t => t.type === 'Radius') },
    { group: 'Typography', rows: PRIMITIVE_TOKENS.filter(t => t.type === 'Typography') },
  ]

  return (
    <div>
      <SectionHeader breadcrumb="Tokens" title="Design Tokens" desc="Three-tier architecture: Primitive (raw values) → Semantic (role-based) → Component (usage-specific). Components never reference primitives directly." />

      <div className="mb-8">
        <Frame className="p-5">
          <div className="flex items-stretch gap-2">
            {[
              { tier: 'Primitive', desc: 'Raw design values', ex: '--color-nova-600: #16A34A', bg: '#F0FDF4', text: '#15803D', border: '#DCFCE7' },
              { tier: '→', desc: '', ex: '', bg: 'transparent', text: '#D4D4D4', border: 'transparent' },
              { tier: 'Semantic', desc: 'Role-based aliases', ex: '--color-primary: var(--color-nova-600)', bg: '#EFF6FF', text: '#1E40AF', border: '#DBEAFE' },
              { tier: '→', desc: '', ex: '', bg: 'transparent', text: '#D4D4D4', border: 'transparent' },
              { tier: 'Component', desc: 'Usage-specific', ex: '--button-radius: var(--radius-md)', bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
            ].map((t, i) => (
              t.tier === '→'
                ? <div key={i} className="flex items-center text-neutral-300 text-lg font-light shrink-0">→</div>
                : <div key={t.tier} className="flex-1 rounded-md p-4 border" style={{ backgroundColor: t.bg, borderColor: t.border }}>
                    <p className="text-xs font-bold mb-1" style={{ color: t.text }}>{t.tier}</p>
                    <p className="text-xs mb-2" style={{ color: t.text, opacity: 0.7 }}>{t.desc}</p>
                    <p className="font-mono text-[10px] break-all leading-relaxed" style={{ color: t.text, opacity: 0.6 }}>{t.ex}</p>
                  </div>
            ))}
          </div>
        </Frame>
      </div>

      <div className="flex border border-neutral-200 rounded-md overflow-hidden mb-6 w-fit bg-white">
        {(['primitive', 'semantic', 'component'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-5 py-2.5 text-sm font-medium capitalize transition-colors" style={tab === t ? { backgroundColor: '#16A34A', color: '#FFF' } : { backgroundColor: 'transparent', color: '#737373' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'primitive' && (
        <div className="space-y-6">
          {primGroups.map(g => (
            <div key={g.group}>
              <Label>{g.group}</Label>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Token</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Value</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Type</th>
                      {g.group.startsWith('Color') && <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Preview</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-nova-700">{row.name}</td>
                        <td className="px-5 py-3 font-mono text-xs text-neutral-500">{row.value}</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-neutral-100 text-neutral-600 text-xs font-medium">{row.type}</span>
                        </td>
                        {g.group.startsWith('Color') && (
                          <td className="px-5 py-3">
                            <div className="w-8 h-5 rounded-sm border border-neutral-200" style={{ backgroundColor: row.value }} />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'semantic' && (
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Token</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Resolves To</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody>
              {SEMANTIC_TOKENS.map((row, i) => (
                <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-nova-700">{row.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-neutral-500">{row.value}</td>
                  <td className="px-5 py-3 text-xs text-neutral-500">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'component' && (
        <div className="space-y-6">
          {['Button', 'Input', 'Card', 'Badge', 'Avatar'].map(comp => (
            <div key={comp}>
              <Label>{comp}</Label>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Token</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Value</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Component</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPONENT_TOKENS.filter(t => t.component === comp).map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                        <td className="px-5 py-3 font-mono text-xs text-nova-700">{row.name}</td>
                        <td className="px-5 py-3 font-mono text-xs text-neutral-500">{row.value}</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-neutral-100 text-neutral-600 text-xs font-medium">{row.component}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState<NavId>('overview')

  const SECTIONS: Record<NavId, ReactNode> = {
    overview: <OverviewSection />,
    colors: <ColorsSection />,
    typography: <TypographySection />,
    spacing: <SpacingSection />,
    radius: <RadiusSection />,
    elevation: <ElevationSection />,
    motion: <MotionSection />,
    buttons: <ButtonsSection />,
    inputs: <InputsSection />,
    cards: <CardsSection />,
    badges: <BadgesSection />,
    icons: <IconsSection />,
    states: <StatesSection />,
    tokens: <TokensSection />,
  }

  return (
    <div className="flex min-h-screen font-sans bg-neutral-50">
      <aside className="fixed left-0 top-0 h-screen w-[230px] bg-neutral-950 flex flex-col overflow-hidden shrink-0">
        <div className="px-5 py-5 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white text-[15px] shrink-0" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)' }}>
              N
            </div>
            <div>
              <p className="text-white font-bold text-[15px] tracking-wider leading-none">NOVA</p>
              <p className="text-neutral-600 text-[10px] mt-0.5 font-medium">Design System · v1.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {NAV.map(group => (
            <div key={group.group}>
              <p className="px-3 pt-4 pb-1.5 text-[9px] font-bold text-neutral-600 uppercase tracking-[0.15em]">{group.group}</p>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="w-full text-left px-3 py-2 rounded-md text-[13px] transition-colors mb-0.5"
                  style={active === item.id
                    ? { backgroundColor: 'rgba(22,163,74,0.15)', color: '#4ADE80', fontWeight: 500 }
                    : { color: '#737373' }
                  }
                  onMouseEnter={e => { if (active !== item.id) { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#D4D4D4' } }}
                  onMouseLeave={e => { if (active !== item.id) { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#737373' } }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-neutral-800/80">
          <p className="text-[10px] text-neutral-700 leading-relaxed">Inter · 8px Grid<br />Tailwind CSS v4 · React 19</p>
        </div>
      </aside>

      <main className="ml-[230px] flex-1 min-h-screen">
        <div className="max-w-[880px] mx-auto px-8 py-10">
          {SECTIONS[active]}
        </div>
      </main>
    </div>
  )
}
