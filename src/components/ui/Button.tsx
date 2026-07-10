import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'accent'
  children: ReactNode
}

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover active:scale-[0.98]',
  accent:
    'rounded-full bg-accent text-white hover:bg-accent-hover active:scale-[0.98]',
  gold:
    'rounded-full bg-ink text-white hover:bg-ink-soft active:scale-[0.98]',
  secondary:
    'rounded-full border border-line-strong bg-white text-ink hover:bg-surface active:scale-[0.98]',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface rounded-full',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-apple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
