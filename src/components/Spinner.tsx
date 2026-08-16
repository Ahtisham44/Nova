/**
 * NOVA 2 · Spinner.
 * Loading indicator used across buttons, inputs and inline patterns.
 */

export interface SpinnerProps {
  size?: number
  strokeWidth?: number
  className?: string
}

export default function Spinner({ size = 16, strokeWidth = 2, className = '' }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}