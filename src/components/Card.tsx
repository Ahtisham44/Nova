import type { HTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'
import { gradients } from '@/tokens'
import Badge from './Badge'

/**
 * NOVA 2 · Cards.
 * Radius LG (12px), 24px internal padding. Variants: Container, Metric,
 * Account, Payment (gradient), and Transaction list.
 */

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const PADDING: Record<CardPadding, string> = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-8',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
}

export default function Card({ padding = 'md', className = '', ...rest }: CardProps) {
  return <div className={`bg-surface-elevated border border-border rounded-lg ${PADDING[padding]} ${className}`} {...rest} />
}

export interface MetricCardProps {
  icon: string
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down'
  sub?: string
}

export function MetricCard({ icon, label, value, delta, trend = 'up', sub }: MetricCardProps) {
  const up = trend === 'up'

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-md bg-primary-surface flex items-center justify-center text-nova-600">
          <Icon name={icon} size={17} />
        </div>
        {delta && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              up ? 'bg-primary-surface text-primary' : 'bg-error/10 text-error'
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text mb-1">{value}</p>
      <p className="text-sm text-text-muted">{label}</p>
      {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
    </Card>
  )
}

export interface AccountRow {
  label: string
  value: string
  emphasis?: 'normal' | 'strong' | 'bold'
  divider?: boolean
}

export interface AccountCardProps {
  name: string
  meta: string
  initials?: string
  status?: string
  rows?: AccountRow[]
}

export function AccountCard({ name, meta, initials = 'JM', status = 'Active', rows = [] }: AccountCardProps) {
  const emphasisCls = { normal: 'font-medium text-text', strong: 'font-semibold text-text', bold: 'font-bold text-text' }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-nova-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text truncate">{name}</p>
          <p className="text-xs text-text-muted truncate">{meta}</p>
        </div>
        {status && <Badge variant="success" dot className="ml-auto shrink-0">{status}</Badge>}
      </div>
      <div className="space-y-2.5">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex justify-between text-sm ${row.divider ? 'border-t border-border pt-2.5' : ''}`}
          >
            <span className="text-text-muted">{row.label}</span>
            <span className={emphasisCls[row.emphasis ?? 'normal']}>{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export interface GradientCardProps {
  brand: string
  amount: string
  amountLabel: string
  holder: string
  accountNo: string
  className?: string
}

export function GradientCard({ brand, amount, amountLabel, holder, accountNo, className = '' }: GradientCardProps) {
  return (
    <div
      className={`rounded-lg p-6 text-white relative overflow-hidden ${className}`}
      style={{ background: gradients.hero }}
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <p className="text-green-100 text-sm font-medium">{brand}</p>
        <div className="text-white/60">
          <Icon name="credit-card" size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-1 relative z-10">{amount}</p>
      <p className="text-green-100 text-sm mb-8 relative z-10">{amountLabel}</p>
      <div className="flex justify-between items-end relative z-10">
        <div>
          <p className="text-green-100 text-xs mb-0.5">Account holder</p>
          <p className="text-white text-sm font-medium">{holder}</p>
        </div>
        <div className="text-right">
          <p className="text-green-100 text-xs mb-0.5">Account No.</p>
          <p className="text-white text-sm font-mono">{accountNo}</p>
        </div>
      </div>
      <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #4ADE80 0%, transparent 70%)' }} />
    </div>
  )
}

export interface Transaction {
  name: string
  amount: string
  date: string
  category?: string
  direction?: 'in' | 'out'
}

export function TransactionItem({ tx }: { tx: Transaction }) {
  const income = tx.direction !== 'out'

  return (
    <div className="flex items-center gap-4 px-6 py-3.5 border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
      <div
        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
          income ? 'bg-primary-surface text-primary' : 'bg-surface-active text-text-muted'
        }`}
      >
        <Icon name={income ? 'arrow-down' : 'arrow-up'} size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">{tx.name}</p>
        <p className="text-xs text-text-muted mt-0.5 truncate">
          {tx.date}
          {tx.category ? ` · ${tx.category}` : ''}
        </p>
      </div>
      <p className={`text-sm font-semibold shrink-0 ${income ? 'text-primary' : 'text-text'}`}>{tx.amount}</p>
    </div>
  )
}

export interface TransactionListProps {
  title?: string
  meta?: string
  transactions: Transaction[]
  onViewAll?: () => void
}

export function TransactionList({ title = 'Recent Transactions', meta, transactions, onViewAll }: TransactionListProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-text">{title}</p>
          {meta && <p className="text-xs text-text-muted mt-0.5">{meta}</p>}
        </div>
        {onViewAll && (
          <button className="text-sm text-primary font-medium hover:text-primary-hover transition-colors" onClick={onViewAll}>
            View all
          </button>
        )}
      </div>
      {transactions.map((tx, i) => (
        <TransactionItem key={i} tx={tx} />
      ))}
    </Card>
  )
}