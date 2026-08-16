import type { CSSProperties } from 'react'
import Icon from './Icon'
import Button, { type ButtonVariant } from './Button'

/**
 * NOVA 2 · Empty State.
 * Intentional empty surfaces with a CTA, reassuring users that the
 * absence of content is by design.
 */

export interface EmptyStateAction {
  label: string
  icon?: string
  variant?: ButtonVariant
  onClick?: () => void
}

export interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: EmptyStateAction
  iconBackground?: string
  iconColor?: string
}

export default function EmptyState({
  icon = 'search',
  title,
  description,
  action,
  iconBackground = '#F5F5F5',
  iconColor = '#737373',
}: EmptyStateProps) {
  return (
    <div className="p-8 flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: iconBackground, color: iconColor }}
      >
        <Icon name={icon} size={26} />
      </div>
      <p className="text-base font-semibold text-neutral-900 mb-2">{title}</p>
      <p className="text-sm text-neutral-500 max-w-xs mb-5" style={{ lineHeight: '21px' }}>
        {description}
      </p>
      {action && (
        <Button variant={action.variant ?? 'primary'} size="md" icon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

/**
 * NOVA 2 · Skeleton loader.
 * Neutral pulse blocks that mirror the structure of the content
 * being loaded.
 */
export function Skeleton({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`bg-neutral-100 rounded-md animate-pulse ${className}`} style={style} />
}