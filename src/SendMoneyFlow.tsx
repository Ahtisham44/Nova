import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Icon,
  Spinner,
  Button,
  TextInput,
  Badge,
  Avatar,
  Card,
  GradientCard,
  TransactionList,
  EmptyState,
  Skeleton,
} from '@/components'
import { nova, semantic, intentPalette, gradients, shadow, ease } from '@/tokens'

/**
 * NOVA 2 · Send Money Flow.
 * End-to-end mobile transfer journey rebuilt entirely from NOVA components
 * and tokens: Loading → Home → Amount → Recipient → Review → Success.
 */

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'home', label: 'Home', sub: 'Entry point' },
  { id: 'amount', label: 'Enter Amount', sub: 'Keypad + CTA' },
  { id: 'recipient', label: 'Select Recipient', sub: 'List · Add · Sync' },
  { id: 'review', label: 'Review', sub: 'Confirm details' },
  { id: 'success', label: 'Success', sub: 'Receipt + next' },
] as const

type ScreenId = (typeof STEPS)[number]['id'] | 'loading'

interface Recipient {
  id: string
  name: string
  detail: string
  color: string
  freq?: boolean
  group: 'recent' | 'contact'
}

const INITIAL_RECIPIENTS: Recipient[] = [
  { id: 'r1', name: 'Sarah Chen', detail: 'schen@example.com', color: nova[700], freq: true, group: 'recent' },
  { id: 'r2', name: 'Marcus Johnson', detail: '+1 (415) 555-0132', color: semantic.info, freq: true, group: 'recent' },
  { id: 'r3', name: 'Priya Sharma', detail: 'priya.sharma@email.com', color: '#9333EA', freq: false, group: 'recent' },
  { id: 'c1', name: 'Amelia Rodriguez', detail: '+1 (628) 555-0174', color: semantic.warning, group: 'contact' },
  { id: 'c2', name: 'David Park', detail: 'd.park@email.com', color: semantic.error, group: 'contact' },
  { id: 'c3', name: 'Emily Watson', detail: '+1 (415) 555-0192', color: '#0891B2', group: 'contact' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (c: number) => (c / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const centsOf = (s: string) => Math.round(parseFloat(s || '0') * 100)

// ─── Screen shell ─────────────────────────────────────────────────────────────

function Screen({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col transition-all ${
        active ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-7'
      }`}
      style={{
        transitionTimingFunction: ease.out,
        transitionDuration: '320ms',
        ...(active ? { animation: 'nova-wash-in 0.5s cubic-bezier(0,0,0.2,1)' } : {}),
      }}
    >
      {children}
    </div>
  )
}

function StatusBar() {
  return (
    <div className="h-[46px] px-6 flex items-center justify-between flex-shrink-0 text-[13px] font-semibold" style={{ color: 'var(--color-neutral-950)' }}>
      <span>09:41</span>
      <div className="flex items-center gap-1.5">
        <span>5G</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M17.5 17.5a6 6 0 0 0 0-11" opacity=".5" />
          <path d="M14 14.5a2.5 2.5 0 0 0 0-5" opacity=".5" />
          <path d="M5 12.5a8 8 0 0 1 14 0" opacity=".4" />
          <path d="M8.5 15.5a4.5 4.5 0 0 1 7 0" opacity=".7" />
          <circle cx="12" cy="18" r="1" />
        </svg>
        <div className="w-5 h-2.5 border rounded-[3px] relative" style={{ borderColor: 'var(--color-neutral-950)' }}>
          <span className="absolute inset-y-[1.5px] left-[1.5px] w-[60%] rounded-[1px]" style={{ background: 'var(--color-neutral-950)' }} />
        </div>
      </div>
    </div>
  )
}

function NavBar({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="h-[52px] px-5 flex items-center gap-2 flex-shrink-0">
      {onBack && (
        <Button variant="ghost" size="sm" className="!h-[38px] !w-[38px] !rounded-md !p-0" onClick={onBack} aria-label="Back">
          <Icon name="arrow-right" size={20} className="rotate-180" />
        </Button>
      )}
      <span className="text-[16px] font-semibold" style={{ color: 'var(--color-neutral-900)' }}>{title}</span>
      {right}
    </div>
  )
}

function Progress({ value }: { value: number }) {
  return (
    <div className="px-5 pb-3.5 flex-shrink-0">
      <div className="h-1 rounded-full bg-surface-active overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: gradients.accent }} />
      </div>
    </div>
  )
}

function DetailRow({ k, v, mono, green }: { k: string; v: string; mono?: boolean; green?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-[13px]" style={{ color: 'var(--color-neutral-500)' }}>{k}</span>
      <span
        className="text-right font-medium"
        style={{
          color: green ? nova[600] : 'var(--color-neutral-900)',
          fontSize: mono ? 12 : 13,
          fontFamily: mono ? 'ui-monospace, monospace' : undefined,
        }}
      >
        {v}
      </span>
    </div>
  )
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-12 h-12 rounded-md grid place-items-center text-white text-lg font-bold mb-5" style={{ background: gradients.hero }}>
          N
        </div>
        <p className="text-[15px] font-bold tracking-[0.08em] leading-none mb-1.5" style={{ color: 'var(--color-neutral-950)' }}>NOVA</p>
        <p className="text-[11px] font-medium mb-9" style={{ color: 'var(--color-neutral-400)' }}>Securing your account…</p>
        <Spinner size={26} className="text-nova-600" />
      </div>
      <div className="px-5 pb-6 space-y-3">
        <Skeleton className="h-[132px] rounded-[16px]" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-[64px] rounded-md" />
          ))}
        </div>
        <Skeleton className="h-3 w-28 rounded-full" />
        {[1, 2].map(i => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 rounded-md w-2/3" />
              <Skeleton className="h-3 rounded-md w-1/3" />
            </div>
            <Skeleton className="w-14 h-4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickTile({
  icon,
  label,
  featured = false,
  onClick,
}: {
  icon: string
  label: string
  featured?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 py-3.5 rounded-lg transition-all"
      style={{
        background: featured ? 'var(--gradient-card)' : 'transparent',
        border: featured ? `1px solid ${nova[100]}` : '1px solid transparent',
      }}
    >
      <div
        className="w-12 h-12 rounded-md grid place-items-center transition-all"
        style={
          featured
            ? { background: nova[600], color: '#fff', boxShadow: shadow.sm }
            : { background: 'var(--color-neutral-100)', color: 'var(--color-neutral-600)' }
        }
      >
        <Icon name={icon} size={20} />
      </div>
      <span className="text-[11px] font-medium" style={{ color: 'var(--color-neutral-600)' }}>{label}</span>
    </button>
  )
}

function KeyButton({ children, onClick, ariaLabel }: { children: ReactNode; onClick: () => void; ariaLabel?: string }) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="!h-[60px] !w-full !rounded-md !px-0 !text-[22px]"
      style={{ color: 'var(--color-neutral-800)' }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  )
}

function RecipientGroup({
  title,
  count,
  items,
  onPick,
}: {
  title: string
  count: number
  items: Recipient[]
  onPick: (r: Recipient) => void
}) {
  if (items.length === 0) return null
  return (
    <div className="px-5 pb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-neutral-400)' }}>{title}</span>
        <span className="text-[11px]" style={{ color: 'var(--color-neutral-400)' }}>{count}</span>
      </div>
      {items.map(r => (
        <Button
          key={r.id}
          variant="ghost"
          className="!w-full !justify-start !h-auto !gap-3 !px-3 !py-2.5 !rounded-lg hover:!bg-surface-hover"
          onClick={() => onPick(r)}
        >
          <Avatar label={r.name} size="md" color={r.color} />
          <span className="flex-1 min-w-0 text-left">
            <span className="block text-[14px] font-medium truncate" style={{ color: 'var(--color-neutral-900)' }}>{r.name}</span>
            <span className="block text-[12px] truncate" style={{ color: 'var(--color-neutral-400)' }}>{r.detail}</span>
            {r.freq && <Badge variant="success" className="mt-1">Frequent</Badge>}
          </span>
          <Icon name="chevron-right" size={16} className="flex-shrink-0" style={{ color: 'var(--color-neutral-300)' }} />
        </Button>
      ))}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SendMoneyFlow() {
  const [screen, setScreen] = useState<ScreenId>('loading')
  const [stack, setStack] = useState<ScreenId[]>([])
  const [amtStr, setAmtStr] = useState('')
  const [selected, setSelected] = useState<Recipient | null>(null)
  const [recipients, setRecipients] = useState<Recipient[]>(INITIAL_RECIPIENTS)
  const [search, setSearch] = useState('')
  const [sheet, setSheet] = useState<'add' | null>(null)
  const [nrName, setNrName] = useState('')
  const [nrDetail, setNrDetail] = useState('')
  const [ref, setRef] = useState('NO-000000')
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const t = window.setTimeout(() => setScreen('home'), 1800)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const toast = (msg: string) => {
    setToastMsg(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2200)
  }

  const go = (id: ScreenId) => {
    if (screen === id) return
    setStack(s => [...s, screen])
    setScreen(id)
  }

  const back = () => {
    const prev = stack[stack.length - 1]
    if (prev && prev !== screen) setScreen(prev)
    else setScreen('home')
    setStack(s => s.slice(0, -1))
  }

  const pressKey = (k: string) => {
    let next = amtStr
    if (k === '⌫') {
      next = next.slice(0, -1)
    } else if (k === '.') {
      next = next.includes('.') ? next : next ? next + '.' : '0.'
    } else {
      if (next.includes('.')) {
        const dec = next.split('.')[1] || ''
        if (dec.length >= 2) return
        next += k
      } else {
        if (next.length >= 7) return
        next = next === '0' ? k : next + k
      }
    }
    setAmtStr(next)
  }

  const continueAmount = () => {
    if (centsOf(amtStr) === 0) {
      toast('Enter an amount to continue')
      return
    }
    go('recipient')
  }

  const pickRecipient = (r: Recipient) => {
    setSelected(r)
    go('review')
  }

  const syncContacts = () => {
    toast('Syncing contacts…')
    window.setTimeout(() => {
      const extras: Recipient[] = [
        { id: 'c4', name: 'Liam Foster', detail: '+1 (510) 555-0168', color: '#0F766E', group: 'contact' },
        { id: 'c5', name: 'Nina Patel', detail: 'nina.patel@email.com', color: '#BE185D', group: 'contact' },
      ]
      setRecipients(prev => {
        const merged = [...prev]
        extras.forEach(e => {
          if (!merged.find(r => r.id === e.id)) merged.push(e)
        })
        return merged
      })
      toast('Contacts synced · 5 added')
    }, 1200)
  }

  const addRecipient = () => {
    const name = nrName.trim()
    const detail = nrDetail.trim()
    if (!name || !detail) {
      toast('Please fill in both fields')
      return
    }
    const r: Recipient = {
      id: 'n' + Date.now(),
      name,
      detail,
      color: nova[600],
      freq: false,
      group: 'recent',
    }
    setRecipients(prev => [r, ...prev])
    setSelected(r)
    setNrName('')
    setNrDetail('')
    setSheet(null)
    go('review')
  }

  const confirmTransfer = () => {
    if (!selected) {
      go('recipient')
      return
    }
    setRef('NO-' + Math.floor(100000 + Math.random() * 900000))
    go('success')
  }

  const anotherTransfer = () => {
    setSelected(null)
    setAmtStr('')
    go('amount')
  }

  const exportReceipt = () => toast('Receipt exported as NOVA-Receipt.pdf')

  const q = search.trim().toLowerCase()
  const filtered = q
    ? recipients.filter(r => (r.name + ' ' + r.detail).toLowerCase().includes(q))
    : recipients
  const recent = filtered.filter(r => r.group === 'recent')
  const contacts = filtered.filter(r => r.group === 'contact')
  const amt = fmt(centsOf(amtStr))
  const activeIdx = screen === 'loading' ? -1 : STEPS.findIndex(s => s.id === screen)

  return (
    <div
      className="font-sans min-h-screen flex justify-center px-6 py-10"
      style={{
        background: `radial-gradient(1200px 600px at 85% -10%, rgba(22,163,74,0.08), transparent 60%), var(--color-neutral-50)`,
        color: 'var(--color-neutral-950)',
      }}
    >
      <style>{`
        .nova-scroll::-webkit-scrollbar { display: none; }
        .nova-scroll { scrollbar-width: none; }
        @keyframes nova-wash-in { from { opacity: 0; transform: scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes nova-pop { from { transform: scale(.4); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes nova-toast { from { opacity: 0; transform: translate(-50%, -16px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes nova-sheet-up { from { transform: translateY(40px); } to { transform: none; } }
      `}</style>

      {/* ─── Left panel ─── */}
      <div className="w-[360px] pt-3 mr-14">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-md grid place-items-center text-white font-bold text-[17px]" style={{ background: gradients.hero }}>
            N
          </div>
          <div>
            <div className="font-extrabold tracking-[0.08em] text-[16px] leading-none" style={{ color: 'var(--color-neutral-950)' }}>NOVA</div>
            <div className="text-[10px] font-medium mt-1" style={{ color: 'var(--color-neutral-400)' }}>Design System · v1.0</div>
          </div>
        </div>

        <h1 className="text-[28px] font-bold tracking-tight leading-[1.15] mb-2.5" style={{ color: 'var(--color-neutral-950)' }}>Send Money Flow</h1>
        <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>
          End-to-end mobile transfer journey, built entirely from NOVA tokens &amp; components: Home → Amount → Recipient → Review → Success.
        </p>

        <Card padding="none" className="!rounded-lg overflow-hidden mb-8">
          {STEPS.map((s, i) => {
            const state = i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'todo'
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 px-3 py-2.5 border-b border-border last:border-0"
                style={state === 'active' ? { background: '#fff', boxShadow: shadow.xs } : {}}
              >
                <span
                  className="w-[22px] h-[22px] rounded-full grid place-items-center text-[11px] font-semibold border flex-shrink-0"
                  style={
                    state === 'active'
                      ? { background: nova[600], color: '#fff', borderColor: nova[600] }
                      : state === 'done'
                        ? { background: nova[50], color: nova[700], borderColor: nova[100] }
                        : { background: 'var(--color-neutral-100)', color: 'var(--color-neutral-400)', borderColor: 'var(--color-neutral-200)' }
                  }
                >
                  {state === 'done' ? '✓' : i + 1}
                </span>
                <span className="flex-1 text-[13px] font-medium" style={{ color: state === 'active' ? 'var(--color-neutral-900)' : 'var(--color-neutral-400)' }}>
                  {s.label}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--color-neutral-400)' }}>{s.sub}</span>
              </div>
            )
          })}
        </Card>

        <div className="flex flex-wrap gap-2 mb-7">
          {STEPS.map((s, i) => (
            <Button key={s.id} variant="outline" size="sm" className="!rounded-full" onClick={() => go(s.id)}>
              {i + 1} · {s.label}
            </Button>
          ))}
        </div>

        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-neutral-400)' }}>
          Interactive — tap through the phone, or use the quick-jump buttons above to inspect any screen. Amount keypad, recipient picker, add-new sheet, empty search state, and receipt export are all wired up.
        </p>
      </div>

      {/* ─── Phone ─── */}
      <div
        className="w-[393px] h-[806px] flex-shrink-0 bg-surface-inverse rounded-[54px] p-3 relative"
        style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.22), 0 12px 24px rgba(0,0,0,0.10)' }}
      >
        <div className="relative w-full h-full bg-surface-elevated rounded-[44px] overflow-hidden">
          {toastMsg && (
            <div
              className="absolute left-1/2 top-5 z-[60] flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium text-white max-w-[88%] text-center"
              style={{ background: 'var(--color-surface-inverse)', boxShadow: shadow.md, animation: 'nova-toast 0.3s cubic-bezier(0,0,0.2,1)' }}
            >
              {toastMsg}
            </div>
          )}

          {/* Loading */}
          <Screen active={screen === 'loading'}>
            <LoadingScreen />
          </Screen>

          {/* Home */}
          <Screen active={screen === 'home'}>
            <div className="flex flex-col h-full">
              <StatusBar />
              <div className="px-5 pt-1.5 pb-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-[18px] font-bold tracking-tight" style={{ color: 'var(--color-neutral-900)' }}>Good morning, James</h2>
                  <p className="text-[12px]" style={{ color: 'var(--color-neutral-400)' }}>Sunday, Aug 16 2026 · San Francisco</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!h-[38px] !w-[38px] !rounded-md !p-0 relative"
                  onClick={() => toast('No new notifications')}
                  aria-label="Notifications"
                >
                  <Icon name="bell" size={20} />
                  <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full border-[1.5px] border-surface-elevated" style={{ background: semantic.error }} />
                </Button>
                <Avatar label="James Mitchell" size="md" color={nova[600]} />
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto nova-scroll px-5 pb-5">
                <GradientCard
                  brand="NOVA Premium · Main Account"
                  amount="$24,580.00"
                  amountLabel="Available balance"
                  holder="James Mitchell"
                  accountNo="•••• 8291"
                  className="!rounded-[16px] mb-2"
                />
                <div className="flex items-center gap-2 mb-6 mt-4 px-1">
                  <Badge variant="success" dot>Active</Badge>
                  <span className="text-[12px]" style={{ color: 'var(--color-neutral-500)' }}>+$1,240 this month</span>
                </div>

                <p className="text-[15px] font-semibold tracking-tight mb-3" style={{ color: 'var(--color-neutral-950)' }}>Quick actions</p>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  <QuickTile icon="send" label="Send Money" featured onClick={() => go('amount')} />
                  <QuickTile icon="arrow-up" label="Request" onClick={() => toast('Request money — coming soon')} />
                  <QuickTile icon="receipt" label="Pay Bills" onClick={() => toast('Pay bills — coming soon')} />
                  <QuickTile icon="dollar-sign" label="Top Up" onClick={() => toast('Top up — coming soon')} />
                </div>

                <TransactionList
                  title="Recent Transactions"
                  meta="This week · 3"
                  transactions={[
                    { name: 'Sarah Chen', amount: '-$250.00', date: 'Today, 08:15', category: 'Send', direction: 'out' },
                    { name: 'Stripe Inc.', amount: '+$2,400.00', date: 'Yesterday, 09:41', category: 'Income', direction: 'in' },
                    { name: 'Figma Pro', amount: '-$45.00', date: 'Aug 15', category: 'Subscription', direction: 'out' },
                  ]}
                  onViewAll={() => toast('Full history — coming soon')}
                />

                <div className="mt-5 flex items-center gap-3 rounded-lg border px-4 py-4" style={{ background: 'var(--gradient-card)', borderColor: nova[100] }}>
                  <div className="w-[38px] h-[38px] rounded-md grid place-items-center flex-shrink-0 text-white" style={{ background: nova[600] }}>
                    <Icon name="shield" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: nova[800] }}>Bank-level security</p>
                    <p className="text-[11px] mt-0.5" style={{ color: nova[700], opacity: 0.75 }}>
                      Every transfer is encrypted &amp; FDIC insured up to $250,000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Screen>

          {/* Amount */}
          <Screen active={screen === 'amount'}>
            <div className="flex flex-col h-full">
              <StatusBar />
              <NavBar title="Send Money" onBack={() => back()} />
              <Progress value={25} />

              <div className="flex-1 min-h-0 flex flex-col px-5 pb-5">
                <div className="text-center pt-6 pb-1.5">
                  <div>
                    <span className="text-[20px] font-medium mr-1.5" style={{ color: 'var(--color-neutral-400)' }}>$</span>
                    <span
                      className="text-[52px] font-bold leading-[1.1] tracking-tighter"
                      style={{ fontVariantNumeric: 'tabular-nums', color: amtStr ? 'var(--color-neutral-950)' : 'var(--color-neutral-300)' }}
                    >
                      {amtStr || '0.00'}
                    </span>
                  </div>
                  <p className="text-[13px] mt-2" style={{ color: 'var(--color-neutral-400)' }}>
                    Available: <b style={{ color: 'var(--color-neutral-700)', fontWeight: 600 }}>$24,580.00</b>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mt-auto pt-4">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(k => (
                    <KeyButton key={k} onClick={() => pressKey(k)}>{k}</KeyButton>
                  ))}
                  <KeyButton onClick={() => pressKey('⌫')} ariaLabel="Delete">
                    <span className="text-[20px]">⌫</span>
                  </KeyButton>
                </div>

                <div className="mt-2.5 pb-2.5">
                  <Button variant="primary" size="lg" className="w-full" disabled={centsOf(amtStr) === 0} onClick={continueAmount}>
                    Continue
                    <Icon name="arrow-right" size={16} />
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] mt-2" style={{ color: 'var(--color-neutral-400)' }}>
                    <Icon name="shield" size={12} />
                    Free for NOVA accounts · Instant delivery
                  </div>
                </div>
              </div>
            </div>
          </Screen>

          {/* Recipient */}
          <Screen active={screen === 'recipient'}>
            <div className="flex flex-col h-full">
              <StatusBar />
              <NavBar
                title="Select Recipient"
                onBack={() => back()}
                right={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!h-[38px] !w-[38px] !rounded-md !p-0"
                    onClick={() => toast('Sync contacts — coming soon')}
                    aria-label="Sync contacts"
                  >
                    <Icon name="refresh" size={20} />
                  </Button>
                }
              />
              <Progress value={50} />

              <div className="flex-1 min-h-0 overflow-y-auto nova-scroll pb-5">
                <div className="px-5 pb-4">
                  <TextInput icon="search" placeholder="Search name, phone, or email" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-2.5 px-5 pb-6">
                  <Button variant="outline" className="!h-auto !justify-start !px-4 !py-3" onClick={() => setSheet('add')}>
                    <span className="w-9 h-9 rounded-md grid place-items-center text-white flex-shrink-0" style={{ background: nova[600] }}>
                      <Icon name="plus" size={18} />
                    </span>
                    <span className="text-left">
                      <span className="block text-[13px] font-semibold" style={{ color: 'var(--color-neutral-800)' }}>Add New</span>
                      <span className="block text-[11px] font-normal" style={{ color: 'var(--color-neutral-400)' }}>Bank or phone</span>
                    </span>
                  </Button>
                  <Button variant="outline" className="!h-auto !justify-start !px-4 !py-3" onClick={syncContacts}>
                    <span className="w-9 h-9 rounded-md grid place-items-center flex-shrink-0" style={{ background: 'var(--color-neutral-100)', color: 'var(--color-neutral-600)' }}>
                      <Icon name="refresh" size={18} />
                    </span>
                    <span className="text-left">
                      <span className="block text-[13px] font-semibold" style={{ color: 'var(--color-neutral-800)' }}>Sync Contacts</span>
                      <span className="block text-[11px] font-normal" style={{ color: 'var(--color-neutral-400)' }}>From this device</span>
                    </span>
                  </Button>
                </div>

                {filtered.length === 0 ? (
                  <EmptyState
                    icon="search"
                    iconBackground={intentPalette.neutral.bg}
                    iconColor={intentPalette.neutral.dot}
                    title="No results found"
                    description="We couldn't find anyone matching your search. Try a different name, phone, or email."
                    action={{ label: 'Clear search', icon: 'refresh', variant: 'ghost', onClick: () => setSearch('') }}
                  />
                ) : (
                  <>
                    <RecipientGroup title="Recent" count={recent.length} items={recent} onPick={pickRecipient} />
                    <RecipientGroup title="From Contacts" count={contacts.length} items={contacts} onPick={pickRecipient} />
                  </>
                )}
              </div>
            </div>
          </Screen>

          {/* Review */}
          <Screen active={screen === 'review'}>
            <div className="flex flex-col h-full">
              <StatusBar />
              <NavBar title="Review Transfer" onBack={() => back()} />
              <Progress value={75} />

              <div className="flex-1 min-h-0 overflow-y-auto nova-scroll pb-5">
                <div className="text-center pt-2 pb-5">
                  <p className="text-[13px]" style={{ color: 'var(--color-neutral-500)' }}>You're sending</p>
                  <p className="text-[42px] font-bold tracking-tighter mt-1" style={{ color: 'var(--color-neutral-950)' }}>{amt}</p>
                  <p className="text-[12px]" style={{ color: 'var(--color-neutral-400)' }}>Instant · Free</p>
                </div>

                <Card padding="none" className="!rounded-lg">
                  <div className="flex items-center gap-3 px-5 py-3.5">
                    <Avatar label={selected?.name ?? '?'} size="md" color={selected?.color ?? nova[600]} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px]" style={{ color: 'var(--color-neutral-400)' }}>To</div>
                      <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--color-neutral-900)' }}>{selected?.name ?? 'No recipient selected'}</div>
                      {selected && <div className="text-[13px] font-medium truncate" style={{ color: 'var(--color-neutral-500)' }}>{selected.detail}</div>}
                    </div>
                    <Button variant="ghost" size="sm" className="!shrink-0" onClick={() => go('recipient')}>Change</Button>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5 border-t border-border">
                    <div className="w-10 h-10 rounded-md grid place-items-center flex-shrink-0" style={{ background: nova[50], color: nova[600] }}>
                      <Icon name="wallet" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px]" style={{ color: 'var(--color-neutral-400)' }}>From</div>
                      <div className="text-[14px] font-semibold" style={{ color: 'var(--color-neutral-900)' }}>Main Account</div>
                      <div className="text-[13px] font-medium" style={{ color: 'var(--color-neutral-500)' }}>•••• 8291 · $24,580.00 available</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5 border-t border-border">
                    <div className="w-10 h-10 rounded-md grid place-items-center flex-shrink-0" style={{ background: 'var(--color-neutral-100)', color: 'var(--color-neutral-600)' }}>
                      <Icon name="clock" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px]" style={{ color: 'var(--color-neutral-400)' }}>Arrival</div>
                      <div className="text-[14px] font-semibold" style={{ color: 'var(--color-neutral-900)' }}>Instantly</div>
                      <div className="text-[13px] font-medium" style={{ color: 'var(--color-neutral-500)' }}>Estimated within seconds</div>
                    </div>
                  </div>
                </Card>

                <div className="mt-4">
                  <div className="flex justify-between items-center px-5 text-[13px]" style={{ color: 'var(--color-neutral-500)' }}>
                    <span>Transfer amount</span>
                    <span className="font-bold" style={{ color: 'var(--color-neutral-950)' }}>{amt}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 mt-1.5 text-[13px]" style={{ color: 'var(--color-neutral-500)' }}>
                    <span>NOVA fee</span>
                    <span className="font-medium" style={{ color: nova[600] }}>Free</span>
                  </div>
                  <div className="mt-3 rounded-lg border px-5 py-3.5" style={{ background: 'var(--gradient-card)', borderColor: nova[100] }}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold" style={{ color: 'var(--color-neutral-900)' }}>Total</span>
                      <span className="text-[16px] font-bold" style={{ color: 'var(--color-neutral-950)' }}>{amt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-[11px]" style={{ color: 'var(--color-neutral-400)' }}>
                  <Icon name="lock" size={13} style={{ color: nova[600] }} />
                  Bank-level security · 2FA enabled
                </div>
              </div>

              <div className="px-5 pt-4 pb-3.5 border-t border-border bg-surface-elevated">
                <Button variant="primary" size="lg" icon="send" className="w-full" onClick={confirmTransfer}>
                  <span>Confirm &amp; Send {amt}</span>
                </Button>
              </div>
            </div>
          </Screen>

          {/* Success */}
          <Screen active={screen === 'success'}>
            <div className="flex flex-col h-full">
              <StatusBar />
              <div className="flex-1 min-h-0 overflow-y-auto nova-scroll pb-5">
                <div className="text-center px-5 pt-7 pb-6" style={{ background: 'var(--gradient-surface)' }}>
                  <div
                    className="w-[92px] h-[92px] mx-auto mb-4 rounded-full border-2 grid place-items-center"
                    style={{ background: nova[50], borderColor: nova[100], color: nova[600] }}
                  >
                    <Icon name="check-circle" size={40} strokeWidth={2.25} style={{ animation: 'nova-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }} />
                  </div>
                  <h2 className="text-[24px] font-bold tracking-tight" style={{ color: 'var(--color-neutral-950)' }}>Payment Sent</h2>
                  <p className="text-[34px] font-bold tracking-tighter mt-1.5" style={{ color: 'var(--color-neutral-950)' }}>{amt}</p>
                  <p className="text-[13px] mt-2" style={{ color: 'var(--color-neutral-500)' }}>
                    To <b style={{ color: 'var(--color-neutral-700)' }}>{selected?.name ?? '—'}</b> · Today, 09:41 AM
                  </p>
                </div>

                <Card padding="none" className="!rounded-lg relative z-10 -mt-[18px] mx-5 mb-4 !px-4 !py-3.5 flex items-center gap-3" style={{ boxShadow: shadow.sm }}>
                  <Avatar label={selected?.name ?? '?'} size="md" color={selected?.color ?? nova[600]} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px]" style={{ color: 'var(--color-neutral-400)' }}>Recipient</div>
                    <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--color-neutral-900)' }}>{selected?.name ?? '—'}</div>
                    <div className="text-[12px] truncate" style={{ color: 'var(--color-neutral-400)' }}>{selected?.detail ?? '—'}</div>
                  </div>
                  <Badge variant="success" dot className="shrink-0">Delivered</Badge>
                </Card>

                <Card padding="none" className="!rounded-lg mx-5 overflow-hidden">
                  <div className="px-4 py-3">
                    <DetailRow k="Transaction ID" v={ref} mono />
                    <DetailRow k="From" v="Main Account •••• 8291" />
                    <DetailRow k="Transfer fee" v="Free" green />
                    <DetailRow k="Delivery" v="Instant · Confirmed" />
                    <DetailRow k="Reference" v="Send · Mobile" />
                  </div>
                </Card>
              </div>

              <div className="px-5 pb-5 pt-2 flex flex-col gap-2.5">
                <Button variant="outline" size="lg" icon="download" className="w-full" onClick={exportReceipt}>Export Receipt</Button>
                <Button variant="primary" size="lg" icon="send" className="w-full" onClick={anotherTransfer}>Make Another Transfer</Button>
                <Button variant="ghost" size="lg" className="w-full" onClick={() => go('home')}>Back to home</Button>
              </div>
            </div>
          </Screen>

          {/* Add recipient bottom sheet */}
          {sheet === 'add' && (
            <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(10,10,10,0.5)' }} onClick={() => setSheet(null)}>
              <div
                className="w-full bg-surface-elevated rounded-t-[24px] px-5 pb-10 pt-2"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'nova-sheet-up 0.3s cubic-bezier(0,0,0.2,1)' }}
              >
                <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: 'var(--color-neutral-200)' }} />
                <p className="text-[17px] font-bold mb-1" style={{ color: 'var(--color-neutral-900)' }}>Add New Recipient</p>
                <p className="text-[13px] mb-4" style={{ color: 'var(--color-neutral-500)' }}>They'll be saved to your recipients for future transfers.</p>
                <div className="space-y-3.5">
                  <TextInput id="nrName" label="Full name" placeholder="e.g. Alex Rivera" autoComplete="off" value={nrName} onChange={e => setNrName(e.target.value)} />
                  <TextInput id="nrDetail" label="Phone number or email" placeholder="+1 (555) 000-0000" autoComplete="off" value={nrDetail} onChange={e => setNrDetail(e.target.value)} />
                </div>
                <div className="flex gap-2.5 mt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSheet(null)}>Cancel</Button>
                  <Button variant="primary" className="flex-1" onClick={addRecipient}>Save &amp; Continue</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}