import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  Icon,
  Spinner,
  Button,
  TextInput,
  Select,
  Checkbox,
  Toggle,
  Badge,
  Avatar,
  AvatarGroup,
  Card,
  MetricCard,
  AccountCard,
  GradientCard,
  TransactionList,
  EmptyState,
  Skeleton,
  ICON_PATHS,
} from '@/components'
import type { ButtonVariant, BadgeVariant } from '@/components'
import { nova, neutral, semantic, intentPalette, gradients, spacing, radius, shadow, typeScale, duration, ease } from '@/tokens'
import { useTheme } from './providers/ThemeProvider'
import SendMoneyFlow from './SendMoneyFlow'

// ─── Navigation ───────────────────────────────────────────────────────────────

type NavId =
  | 'overview' | 'colors' | 'typography' | 'spacing'
  | 'radius' | 'elevation' | 'motion'
  | 'buttons' | 'inputs' | 'cards' | 'badges' | 'icons' | 'states'
  | 'tokens' | 'flow'

const NAV: { group: string; items: { id: NavId; label: string }[] }[] = [
  {
    group: 'Demo',
    items: [{ id: 'flow', label: 'Send Money Flow' }],
  },
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

// ─── Color Data (sourced from tokens) ─────────────────────────────────────────

const GREEN_SCALE = [
  { name: 'Green 50', token: '--color-nova-50', hex: nova[50], dark: false },
  { name: 'Green 100', token: '--color-nova-100', hex: nova[100], dark: false },
  { name: 'Green 200', token: '--color-nova-200', hex: nova[200], dark: false },
  { name: 'Green 300', token: '--color-nova-300', hex: nova[300], dark: false },
  { name: 'Green 400', token: '--color-nova-400', hex: nova[400], dark: false },
  { name: 'Green 500', token: '--color-nova-500', hex: nova[500], dark: false },
  { name: 'Green 600', token: '--color-nova-600', hex: nova[600], dark: true },
  { name: 'Green 700', token: '--color-nova-700', hex: nova[700], dark: true },
  { name: 'Green 800', token: '--color-nova-800', hex: nova[800], dark: true },
  { name: 'Green 900', token: '--color-nova-900', hex: nova[900], dark: true },
]

const NEUTRAL_SCALE = [
  { name: '50', hex: neutral[50], dark: false },
  { name: '100', hex: neutral[100], dark: false },
  { name: '200', hex: neutral[200], dark: false },
  { name: '300', hex: neutral[300], dark: false },
  { name: '400', hex: neutral[400], dark: false },
  { name: '500', hex: neutral[500], dark: true },
  { name: '600', hex: neutral[600], dark: true },
  { name: '700', hex: neutral[700], dark: true },
  { name: '800', hex: neutral[800], dark: true },
  { name: '900', hex: neutral[900], dark: true },
  { name: '950', hex: neutral[950], dark: true },
]

const SEMANTIC_COLORS = [
  { name: 'Success', hex: semantic.success, bg: intentPalette.success.bg, border: intentPalette.success.border, textColor: intentPalette.success.text, desc: 'Positive outcomes and confirmed states' },
  { name: 'Warning', hex: semantic.warning, bg: intentPalette.warning.bg, border: intentPalette.warning.border, textColor: intentPalette.warning.text, desc: 'Caution and pending states' },
  { name: 'Error', hex: semantic.error, bg: intentPalette.error.bg, border: intentPalette.error.border, textColor: intentPalette.error.text, desc: 'Failures and destructive actions' },
  { name: 'Info', hex: semantic.info, bg: intentPalette.info.bg, border: intentPalette.info.border, textColor: intentPalette.info.text, desc: 'Informational alerts and guidance' },
]

const GRADIENTS = [
  { name: 'Hero', token: '--gradient-hero', value: gradients.hero, desc: 'Hero sections, primary CTAs', gradient: gradients.hero },
  { name: 'Surface', token: '--gradient-surface', value: gradients.surface, desc: 'Section backgrounds, page zones', gradient: gradients.surface },
  { name: 'Card', token: '--gradient-card', value: gradients.card, desc: 'Featured and premium cards', gradient: gradients.card },
  { name: 'Accent', token: '--gradient-accent', value: gradients.accent, desc: 'Progress bars, accent elements', gradient: gradients.accent },
]

// ─── Typography Data (sourced from tokens) ────────────────────────────────────
// Line-height: 100% for size >= 32px · 130% for size < 32px

const TYPE_SCALE = [
  { name: 'Display', size: typeScale.display.fontSize, lh: typeScale.display.lineHeight, weight: typeScale.display.fontWeight, rule: '100%', sample: 'Financial clarity, engineered.' },
  { name: 'Heading 1', size: typeScale.h1.fontSize, lh: typeScale.h1.lineHeight, weight: typeScale.h1.fontWeight, rule: '100%', sample: 'Account Overview' },
  { name: 'Heading 2', size: typeScale.h2.fontSize, lh: typeScale.h2.lineHeight, weight: typeScale.h2.fontWeight, rule: '130%', sample: 'Transaction History' },
  { name: 'Heading 3', size: typeScale.h3.fontSize, lh: typeScale.h3.lineHeight, weight: typeScale.h3.fontWeight, rule: '130%', sample: 'Payment Methods' },
  { name: 'Heading 4', size: typeScale.h4.fontSize, lh: typeScale.h4.lineHeight, weight: typeScale.h4.fontWeight, rule: '130%', sample: 'Card Details' },
  { name: 'Body LG', size: typeScale.bodyLg.fontSize, lh: typeScale.bodyLg.lineHeight, weight: typeScale.bodyLg.fontWeight, rule: '130%', sample: 'Your NOVA balance reflects all confirmed transactions as of today.' },
  { name: 'Body SM', size: typeScale.bodySm.fontSize, lh: typeScale.bodySm.lineHeight, weight: typeScale.bodySm.fontWeight, rule: '130%', sample: 'Transfers may take up to 3 business days to process and appear in your account.' },
  { name: 'Caption', size: typeScale.caption.fontSize, lh: typeScale.caption.lineHeight, weight: typeScale.caption.fontWeight, rule: '130%', sample: 'Last updated: Aug 16, 2026 · 09:41 AM EST · FDIC insured up to $250,000' },
]

// ─── Spacing / Radius / Elevation / Motion Data (sourced from tokens) ─────────

const SPACING_SCALE = Object.entries(spacing).map(([step, value]) => ({
  token: `space-${step}`,
  value,
  px: parseInt(value),
}))

const RADIUS_SCALE = [
  { name: 'SM', token: '--radius-sm', value: radius.sm, px: 4, usage: 'Tags, small chips, minor accents' },
  { name: 'MD', token: '--radius-md', value: radius.md, px: 8, usage: 'Buttons, inputs, dropdowns, nav items' },
  { name: 'LG', token: '--radius-lg', value: radius.lg, px: 12, usage: 'Cards, panels, modals, page sections' },
  { name: 'Full', token: '--radius-full', value: radius.full, px: 9999, usage: 'Badges, pills, avatars, toggles' },
]

const ELEVATION_LEVELS = [
  { name: 'Level 0', token: '--shadow-none', value: shadow.none, desc: 'Flat, inline elements', shadow: shadow.none },
  { name: 'Level 1', token: '--shadow-xs', value: shadow.xs, desc: 'Inputs, chips', shadow: shadow.xs },
  { name: 'Level 2', token: '--shadow-sm', value: shadow.sm, desc: 'Cards, panels', shadow: shadow.sm },
  { name: 'Level 3', token: '--shadow-md', value: shadow.md, desc: 'Modals, floating', shadow: shadow.md },
  { name: 'Level 4', token: '--shadow-lg', value: shadow.lg, desc: 'Overlays, commands', shadow: shadow.lg },
]

const DURATION_TOKENS = [
  { name: '--duration-instant', value: duration.instant, desc: 'Micro-interactions, icon swaps, toggle snaps' },
  { name: '--duration-fast', value: duration.fast, desc: 'Hover states, badge changes, focus rings' },
  { name: '--duration-normal', value: duration.normal, desc: 'Panel slides, card reveals, dropdowns' },
  { name: '--duration-slow', value: duration.slow, desc: 'Page transitions, loader progress' },
  { name: '--duration-slower', value: duration.slower, desc: 'Onboarding, celebration feedback' },
]

const EASING_TOKENS = [
  { name: '--ease-out', value: ease.out, desc: 'Elements entering the screen' },
  { name: '--ease-in', value: ease.in, desc: 'Elements leaving the screen' },
  { name: '--ease-in-out', value: ease.inOut, desc: 'Persistent, cycling transitions' },
  { name: '--ease-spring', value: ease.spring, desc: 'Playful, confirmation feedback' },
]

// ─── Token Data (documentation surface) ───────────────────────────────────────

const PRIMITIVE_TOKENS = [
  { name: '--color-nova-50', value: nova[50], type: 'Color' },
  { name: '--color-nova-100', value: nova[100], type: 'Color' },
  { name: '--color-nova-200', value: nova[200], type: 'Color' },
  { name: '--color-nova-300', value: nova[300], type: 'Color' },
  { name: '--color-nova-400', value: nova[400], type: 'Color' },
  { name: '--color-nova-500', value: nova[500], type: 'Color' },
  { name: '--color-nova-600', value: nova[600], type: 'Color' },
  { name: '--color-nova-700', value: nova[700], type: 'Color' },
  { name: '--color-nova-800', value: nova[800], type: 'Color' },
  { name: '--color-nova-900', value: nova[900], type: 'Color' },
  { name: '--color-neutral-50', value: neutral[50], type: 'Color' },
  { name: '--color-neutral-100', value: neutral[100], type: 'Color' },
  { name: '--color-neutral-200', value: neutral[200], type: 'Color' },
  { name: '--color-neutral-300', value: neutral[300], type: 'Color' },
  { name: '--color-neutral-400', value: neutral[400], type: 'Color' },
  { name: '--color-neutral-500', value: neutral[500], type: 'Color' },
  { name: '--color-neutral-700', value: neutral[700], type: 'Color' },
  { name: '--color-neutral-900', value: neutral[900], type: 'Color' },
  { name: '--color-neutral-950', value: neutral[950], type: 'Color' },
  { name: '--space-0', value: spacing[0], type: 'Spacing' },
  { name: '--space-0.5', value: spacing['0.5'], type: 'Spacing' },
  { name: '--space-1', value: spacing[1], type: 'Spacing' },
  { name: '--space-2', value: spacing[2], type: 'Spacing' },
  { name: '--space-4', value: spacing[4], type: 'Spacing' },
  { name: '--space-6', value: spacing[6], type: 'Spacing' },
  { name: '--space-8', value: spacing[8], type: 'Spacing' },
  { name: '--space-12', value: spacing[12], type: 'Spacing' },
  { name: '--space-16', value: spacing[16], type: 'Spacing' },
  { name: '--radius-sm', value: radius.sm, type: 'Radius' },
  { name: '--radius-md', value: radius.md, type: 'Radius' },
  { name: '--radius-lg', value: radius.lg, type: 'Radius' },
  { name: '--radius-full', value: radius.full, type: 'Radius' },
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

// ─── Reusable Primitives ──────────────────────────────────────────────────────

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

/** Frame = Card component without extra padding, padding carried by className. */
function Frame({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <Card padding="none" className={className} style={style}>
      {children}
    </Card>
  )
}

const THEME_META = {
  light: { icon: 'sun', label: 'Light' },
  dark: { icon: 'moon', label: 'Dark' },
} as const

/** Sidebar theme switcher — cycles Light → Dark. */
function ThemeToggle() {
  const { theme, cycle } = useTheme()
  const meta = THEME_META[theme]
  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${meta.label}. Click to switch.`}
      title={`Theme: ${meta.label}`}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-white/70 hover:bg-white/10 active:bg-white/15 transition-colors"
    >
      <Icon name={meta.icon} size={15} className="text-white/80" />
      <span className="font-medium">{meta.label}</span>
      <span className="ml-auto text-[10px] text-white/40">Toggle</span>
    </button>
  )
}

// ─── Section: Overview ────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div>
      <div className="rounded-2xl p-10 mb-6 relative overflow-hidden" style={{ background: gradients.hero }}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg tracking-tight">N</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl tracking-wider leading-none">NOVA</p>
              <p className="text-green-100 text-[11px] font-medium mt-0.5">Design System · v1.0</p>
            </div>
          </div>
          <h1 className="text-white font-bold leading-none mb-3 max-w-md" style={{ fontSize: typeScale.display.fontSize, lineHeight: '40px' }}>
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
          <Frame className="p-5" style={{ boxShadow: shadow.sm }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-nova-50 flex items-center justify-center text-nova-600">
                  <Icon name="wallet" size={15} />
                </div>
                <span className="text-sm font-medium text-neutral-800">Main Account</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">•••• 8291</span>
            </div>
            <p className="text-xs text-neutral-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-neutral-950 mb-3">$24,580.00</p>
            <div className="flex items-center gap-2">
              <Badge variant="success" dot>Active</Badge>
              <span className="text-xs text-neutral-500">+$1,240 this month</span>
            </div>
          </Frame>
        </Frame>

        <Frame className="p-6">
          <Label>Badges & Buttons Preview</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="success" dot>Completed</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="error" dot>Failed</Badge>
            <Badge variant="info" dot>Processing</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" icon="send">Send Money</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="black">Confirm</Button>
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
              <div className="p-4 bg-surface-elevated">
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
              <div className="p-4 bg-surface-elevated">
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
              <p className="font-bold text-neutral-950 mb-2" style={{ fontSize: typeScale.display.fontSize, lineHeight: '40px' }}>$24,580.00</p>
              <p className="font-bold text-neutral-950" style={{ fontSize: typeScale.h1.fontSize, lineHeight: '32px' }}>Account Balance</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{"< 32px · 130% line height"}</p>
              <p className="font-semibold text-neutral-900 mb-2" style={{ fontSize: typeScale.h2.fontSize, lineHeight: '31px' }}>Transaction History</p>
              <p className="text-neutral-700" style={{ fontSize: typeScale.bodyLg.fontSize, lineHeight: '21px' }}>
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
            <Button size="md">Button · MD</Button>
            <p className="text-[10px] text-neutral-500">8px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TextInput className="w-32" defaultValue="Input · MD" readOnly />
            <p className="text-[10px] text-neutral-500">8px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="px-5 h-12 rounded-lg border border-neutral-200 text-sm text-neutral-700 flex items-center">Card · LG</div>
            <p className="text-[10px] text-neutral-500">12px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="success" className="bg-nova-50 border-nova-100">Badge · Full</Badge>
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
              <div className="aspect-square rounded-lg bg-surface-elevated mb-4" style={{ boxShadow: lv.shadow, border: lv.shadow === 'none' ? '1px solid var(--color-border)' : 'none' }} />
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
            { label: 'Input · Level 1', shadow: shadow.xs },
            { label: 'Card · Level 2', shadow: shadow.sm },
            { label: 'Modal · Level 3', shadow: shadow.md },
          ].map(ex => (
            <div key={ex.label} className="bg-surface-elevated rounded-lg p-5" style={{ boxShadow: ex.shadow }}>
              <div className="w-8 h-8 rounded-md bg-nova-50 flex items-center justify-center text-nova-600 mb-3">
                <Icon name="dollar-sign" size={16} />
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
  const variants: { variant: ButtonVariant; desc: string; icon: string }[] = [
    { variant: 'primary', desc: 'Main call-to-action. Use once per view.', icon: 'send' },
    { variant: 'secondary', desc: 'Supporting action alongside Primary.', icon: 'arrow-up' },
    { variant: 'ghost', desc: 'Tertiary links and navigation.', icon: 'search' },
    { variant: 'outline', desc: 'Neutral framing, cancel, back.', icon: 'settings' },
    { variant: 'destructive', desc: 'Irreversible or dangerous actions.', icon: 'x-circle' },
    { variant: 'black', desc: 'High-contrast, dark brand surface.', icon: 'arrow-up' },
    { variant: 'white', desc: 'On dark/colored backgrounds, overlays.', icon: 'user' },
  ]

  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Buttons" desc="Seven variants, three sizes, five interactive states. All use radius MD (8px), weight 500, and scale on the 8px grid." />

      <div className="mb-10">
        <Label>Variants · Default · Loading · Disabled</Label>
        <Frame className="p-6 divide-y divide-neutral-100">
          {variants.map(row => (
            <div key={row.variant} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
              <div className="w-36 shrink-0">
                <p className="text-sm font-semibold text-neutral-700 capitalize">{row.variant}</p>
                <p className="text-xs text-neutral-500 mt-0.5" style={{ lineHeight: '18px' }}>{row.desc}</p>
              </div>
              <div className="flex gap-3 items-center flex-wrap">
                <Button variant={row.variant} icon={row.icon}>{row.variant}</Button>
                <Button variant={row.variant} loading>Processing</Button>
                <Button variant={row.variant} disabled>Disabled</Button>
              </div>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Black & White on Colored Surface</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-6 flex items-center justify-center gap-3" style={{ background: gradients.hero }}>
            <Button variant="white" icon="send">Send Money</Button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md text-white text-sm font-medium border border-white/30 hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
          <div className="rounded-lg p-6 flex items-center justify-center gap-3 bg-surface-inverse">
            <Button variant="primary" icon="wallet">Add Funds</Button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-white/20 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors">
              View History
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <Label>Sizes</Label>
        <Frame className="p-6 flex items-end gap-4">
          <Button size="sm" icon="send">SM · 32px</Button>
          <Button size="md" icon="send">MD · 40px</Button>
          <Button size="lg" icon="send">LG · 48px</Button>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Loading & State Feedback</Label>
        <Frame className="p-6 flex flex-wrap gap-3">
          <Button icon="send" loading>Processing…</Button>
          <Button variant="secondary" icon="check-circle">Confirmed</Button>
          <Button variant="destructive" icon="x-circle">Failed</Button>
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
            <TextInput placeholder="Enter amount" />
          </div>
          <div>
            <p className="text-xs font-medium text-nova-600 mb-2">Focus</p>
            <TextInput defaultValue="$1,200.00" readOnly autoFocus />
          </div>
          <div>
            <p className="text-xs font-medium text-error mb-2">Error</p>
            <TextInput defaultValue="$50,000.00" readOnly error="Exceeds daily limit of $25,000" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 mb-2">Disabled</p>
            <TextInput defaultValue="N/A" disabled />
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
              <div className="flex-1">
                <TextInput icon="dollar-sign" placeholder="0.00" />
              </div>
              <Button icon="send">Send</Button>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Search · Input icon + plain button · both h-10</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <TextInput icon="search" placeholder="Search transactions…" />
              </div>
              <Button variant="outline">Search</Button>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Account add · plain input + button with icon · both h-10</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <TextInput placeholder="Enter account number or email" />
              </div>
              <Button variant="black" icon="user">Add</Button>
            </div>
          </div>
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Input with Label + Prefix</Label>
        <Frame className="p-6 grid grid-cols-2 gap-6">
          <TextInput label="Transfer Amount" icon="dollar-sign" placeholder="0.00" hint="Available: $24,580.00" />
          <TextInput label="Recipient" icon="user" placeholder="Account number or email" hint="NOVA accounts transfer instantly" />
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Select</Label>
        <Frame className="p-6">
          <div className="max-w-xs">
            <Select label="Transfer Type" defaultValue="Standard">
              <option>Standard Transfer (1–3 days)</option>
              <option>Instant Transfer (fee applies)</option>
              <option>Scheduled Transfer</option>
            </Select>
          </div>
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Checkbox & Toggle</Label>
        <Frame className="p-6 flex gap-12">
          <div className="space-y-3">
            <Checkbox label="Save card for future use" defaultChecked />
            <Checkbox label="Enable two-factor auth" />
            <Checkbox label="Paper statements (unavailable)" disabled />
          </div>
          <div className="space-y-4">
            <Toggle label="Payment notifications" defaultChecked />
            <Toggle label="Marketing emails" />
            <Toggle label="Security alerts" defaultChecked />
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
          <MetricCard icon="wallet" label="Total Balance" value="$24,580.00" delta="+$1,240" trend="up" sub="vs last month" />
          <MetricCard icon="arrow-up" label="Monthly Spend" value="$3,421.00" delta="- $340" trend="down" sub="vs last month" />
          <MetricCard icon="trending-up" label="Savings Rate" value="18.4%" delta="+2.1%" trend="up" sub="vs last month" />
        </div>
      </div>

      <div className="mb-10">
        <Label>Account Cards</Label>
        <div className="grid grid-cols-2 gap-4">
          <AccountCard
            name="James Mitchell"
            meta="NOVA Premium · #8291"
            initials="JM"
            status="Active"
            rows={[
              { label: 'Available Balance', value: '$24,580.00', emphasis: 'strong' },
              { label: 'Pending', value: '$340.00', emphasis: 'normal' },
              { label: 'Total', value: '$24,920.00', emphasis: 'bold', divider: true },
            ]}
          />
          <GradientCard
            brand="NOVA Premium"
            amount="$24,580.00"
            amountLabel="Available balance"
            holder="James Mitchell"
            accountNo="•••• 8291"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label>Transaction List Card</Label>
        <TransactionList
          title="Recent Transactions"
          meta="Aug 2026 · 24 transactions"
          transactions={[
            { name: 'Stripe Inc.', amount: '+$2,400.00', date: 'Aug 16, 09:41', category: 'Income', direction: 'in' },
            { name: 'AWS Services', amount: '-$340.00', date: 'Aug 16, 07:15', category: 'Infrastructure', direction: 'out' },
            { name: 'Figma Pro', amount: '-$45.00', date: 'Aug 15, 15:22', category: 'Subscription', direction: 'out' },
            { name: 'Transfer from Savings', amount: '+$5,000.00', date: 'Aug 14, 12:00', category: 'Transfer', direction: 'in' },
          ]}
        />
      </div>
    </div>
  )
}

// ─── Section: Badges & Avatars ────────────────────────────────────────────────

function BadgesSection() {
  const badgeGroups: { variant: BadgeVariant; label: string; examples: string[] }[] = [
    { variant: 'success', label: 'Success', examples: ['Completed', 'Verified', 'Active', 'Approved'] },
    { variant: 'warning', label: 'Warning', examples: ['Pending', 'Reviewing', 'Awaiting', 'Expiring'] },
    { variant: 'error', label: 'Error', examples: ['Failed', 'Declined', 'Blocked', 'Expired'] },
    { variant: 'info', label: 'Info', examples: ['Processing', 'Scheduled', 'Draft', 'New'] },
    { variant: 'neutral', label: 'Neutral', examples: ['Archived', 'Paused', 'Inactive', 'Closed'] },
  ]

  return (
    <div>
      <SectionHeader breadcrumb="Components" title="Badges & Avatars" desc="Badges communicate status at a glance. Avatars represent users with consistent sizing from XS (24px) to XL (56px)." />

      <div className="mb-10">
        <Label>Status Badges</Label>
        <Frame className="p-6 space-y-4">
          {badgeGroups.map(g => (
            <div key={g.label} className="flex items-center gap-5">
              <p className="w-20 text-xs font-semibold text-neutral-500 shrink-0">{g.label}</p>
              <div className="flex gap-2 flex-wrap">
                {g.examples.map(ex => (
                  <Badge key={ex} variant={g.variant} dot>{ex}</Badge>
                ))}
              </div>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-10">
        <Label>Avatar Sizes</Label>
        <Frame className="p-6 flex items-end gap-6">
          {[{ size: 'xs' as const, label: 'XS' }, { size: 'sm' as const, label: 'SM' }, { size: 'md' as const, label: 'MD' }, { size: 'lg' as const, label: 'LG' }, { size: 'xl' as const, label: 'XL' }].map(av => (
            <div key={av.label} className="flex flex-col items-center gap-2">
              <Avatar label="JM" size={av.size} />
              <p className="text-xs font-semibold text-neutral-600">{av.label}</p>
              <p className="text-[10px] text-neutral-500 font-mono">
                {av.size === 'xs' ? '24' : av.size === 'sm' ? '32' : av.size === 'md' ? '40' : av.size === 'lg' ? '48' : '56'}px
              </p>
            </div>
          ))}
        </Frame>
      </div>

      <div className="mb-4">
        <Label>Avatar Group & Status</Label>
        <Frame className="p-6 flex gap-12 flex-wrap">
          <div>
            <p className="text-xs text-neutral-500 mb-3">Stacked Group</p>
            <AvatarGroup
              size="md"
              items={[
                { label: 'JM', color: nova[600] },
                { label: 'AK', color: '#2563EB' },
                { label: 'SR', color: '#F59E0B' },
                { label: 'MP', color: '#DC2626' },
              ]}
              more={8}
            />
          </div>

          <div>
            <p className="text-xs text-neutral-500 mb-3">With Status</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <Avatar label="JM" status="online" />
                <p className="text-xs text-neutral-500">Online</p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar label="JM" status="away" />
                <p className="text-xs text-neutral-500">Away</p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar label="JM" status="offline" />
                <p className="text-xs text-neutral-500">Offline</p>
              </div>
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
        <Label>Icon Library · {Object.keys(ICON_PATHS).length} icons</Label>
        <Frame className="p-4">
          <div className="grid grid-cols-5 gap-1">
            {Object.keys(ICON_PATHS).map(name => (
              <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-md hover:bg-nova-50 transition-colors group cursor-default">
                <div className="text-neutral-600 group-hover:text-nova-600 transition-colors"><Icon name={name} size={22} /></div>
                <p className="text-xs text-neutral-500 text-center leading-tight">{name}</p>
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
              <div className="text-nova-600"><Icon name="wallet" size={sv.s} /></div>
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
          <Frame>
            <EmptyState
              icon="trending-up"
              iconBackground={intentPalette.success.bg}
              iconColor={intentPalette.success.dot}
              title="No transactions yet"
              description="Your transaction history will appear here once you make your first payment or transfer."
              action={{ label: 'Add Funds', icon: 'arrow-down' }}
            />
          </Frame>
          <Frame>
            <EmptyState
              icon="search"
              iconBackground={intentPalette.neutral.bg}
              iconColor={intentPalette.neutral.dot}
              title="No results found"
              description="We couldn't find anything matching your search. Try adjusting your filters or search terms."
              action={{ label: 'Clear filters', icon: 'refresh', variant: 'ghost' }}
            />
          </Frame>
          <Frame>
            <EmptyState
              icon="bell"
              iconBackground={intentPalette.info.bg}
              iconColor={intentPalette.info.dot}
              title="You're all caught up"
              description="You have no new notifications. We'll alert you when something requires your attention."
            />
          </Frame>
          <Frame>
            <EmptyState
              icon="credit-card"
              iconBackground={intentPalette.success.bg}
              iconColor={intentPalette.success.dot}
              title="No accounts connected"
              description="Link a bank account or card to start sending, receiving, and managing your money with NOVA."
              action={{ label: 'Connect Bank', icon: 'arrow-up', variant: 'black' }}
            />
          </Frame>
        </div>
      </div>

      <div className="mb-10">
        <Label>Skeleton Loading States</Label>
        <div className="grid grid-cols-2 gap-4">
          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Metric card skeleton</p>
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="w-9 h-9 rounded-md" />
              <Skeleton className="w-12 h-5 rounded-full" />
            </div>
            <Skeleton className="w-32 h-7 rounded-md mb-2" />
            <Skeleton className="w-24 h-4 rounded-md mb-1" />
            <Skeleton className="w-20 h-3.5 rounded-md" />
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Transaction list skeleton</p>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-md shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 rounded-md" style={{ width: `${65 + i * 8}%` }} />
                    <Skeleton className="h-3 rounded-md w-1/3" />
                  </div>
                  <Skeleton className="w-16 h-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Account card skeleton</p>
            <div className="flex items-center gap-3 mb-5">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 rounded-md w-2/3" />
                <Skeleton className="h-3 rounded-md w-1/2" />
              </div>
              <Skeleton className="w-16 h-5 rounded-full" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-3.5 rounded-md w-1/3" />
                  <Skeleton className="h-3.5 rounded-md w-1/4" />
                </div>
              ))}
            </div>
          </Frame>

          <Frame className="p-6">
            <p className="text-xs font-medium text-neutral-500 mb-4">Spinner states</p>
            <div className="flex items-center gap-6 mb-6">
              {[16, 24, 32, 40].map(sz => (
                <div key={sz} className="flex flex-col items-center gap-2">
                  <Spinner size={sz} className="text-nova-600" />
                  <p className="text-[10px] text-neutral-500">{sz}px</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-2">Progress bar</p>
              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full animate-pulse" style={{ width: '65%', background: gradients.accent }} />
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
          <Button loading>Sending payment…</Button>
          <div className="flex items-center gap-2">
            <Spinner size={16} className="text-nova-600" />
            <span className="text-sm text-neutral-500">Verifying account…</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-nova-50 border border-nova-100">
            <Spinner size={14} className="text-nova-600" />
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

      <div className="flex border border-border rounded-md overflow-hidden mb-6 w-fit bg-surface-elevated">
        {(['primitive', 'semantic', 'component'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-5 py-2.5 text-sm font-medium capitalize transition-colors" style={tab === t ? { backgroundColor: semantic.primary, color: '#FFF' } : { backgroundColor: 'transparent', color: 'var(--color-text-muted)' }}>
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
    flow: <SendMoneyFlow />,
  }

  return (
    <div className="flex min-h-screen font-sans bg-neutral-50">
      <aside className="fixed left-0 top-0 h-screen w-[230px] bg-surface-inverse flex flex-col overflow-hidden shrink-0">
        <div className="px-5 py-5 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white text-[15px] shrink-0" style={{ background: gradients.hero }}>
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

        <div className="px-3 pb-3">
          <ThemeToggle />
        </div>
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[10px] text-white/40 leading-relaxed">Inter · 8px Grid<br />Tailwind CSS v4 · React 19</p>
        </div>
      </aside>

      <main className="ml-[230px] flex-1 min-h-screen">
        {active === 'flow' ? (
          <SendMoneyFlow />
        ) : (
          <div className="max-w-[880px] mx-auto px-8 py-10">
            {SECTIONS[active]}
          </div>
        )}
      </main>
    </div>
  )
}