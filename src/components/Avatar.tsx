/**
 * NOVA 2 · Avatar.
 * Sizes XS (24px) to XL (56px). Supports status indicators and
 * stacked groups.
 */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZES: Record<AvatarSize, { px: number; font: number }> = {
  xs: { px: 24, font: 8 },
  sm: { px: 32, font: 11 },
  md: { px: 40, font: 14 },
  lg: { px: 48, font: 16 },
  xl: { px: 56, font: 19 },
}

export type AvatarStatus = 'online' | 'away' | 'offline'

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: '#22C55E',
  away: '#F59E0B',
  offline: '#E5E5E5',
}

export interface AvatarProps {
  label: string
  size?: AvatarSize
  color?: string
  status?: AvatarStatus
  className?: string
}

export default function Avatar({ label, size = 'md', color = '#16A34A', status, className = '' }: AvatarProps) {
  const { px, font } = SIZES[size]
  const initials = label.trim().slice(0, 2).toUpperCase()

  return (
    <div className={`relative inline-flex shrink-0 ${className}`} style={{ width: px, height: px }}>
      <div
        className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold select-none"
        style={{ backgroundColor: color, fontSize: font }}
        aria-label={label}
      >
        {initials}
      </div>
      {status && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-white"
          style={{ width: px * 0.3, height: px * 0.3, backgroundColor: STATUS_COLORS[status] }}
        />
      )}
    </div>
  )
}

export interface AvatarGroupProps {
  items: { label: string; color?: string }[]
  size?: AvatarSize
  max?: number
  more?: number
}

export function AvatarGroup({ items, size = 'md', max = 4, more = 0 }: AvatarGroupProps) {
  const { px, font } = SIZES[size]
  const visible = items.slice(0, max)
  const overlap = -(px * 0.28)

  return (
    <div className="flex items-center">
      {visible.map((item, i) => (
        <div key={i} className="relative border-2 border-white rounded-full" style={{ marginLeft: i === 0 ? 0 : overlap, zIndex: visible.length - i }}>
          <Avatar label={item.label} size={size} color={item.color ?? '#16A34A'} />
        </div>
      ))}
      {(more > 0 || items.length > max) && (
        <div
          className="relative rounded-full border-2 border-white bg-neutral-100 text-neutral-600 font-semibold flex items-center justify-center select-none"
          style={{ width: px, height: px, marginLeft: overlap, zIndex: 0, fontSize: font * 0.85 }}
        >
          +{more > 0 ? more : items.length - max}
        </div>
      )}
    </div>
  )
}