import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  children: ReactNode
}

const variants = {
  primary:
    'btn-shine bg-ink text-white shadow-lg shadow-ink/20 hover:bg-ink-soft hover:shadow-xl hover:-translate-y-0.5',
  gold:
    'btn-shine bg-gradient-to-r from-gold-dark via-gold to-gold-light text-ink shadow-glow hover:brightness-105 hover:-translate-y-0.5',
  secondary:
    'glass text-ink hover:bg-white hover:shadow-card-hover hover:-translate-y-0.5',
  ghost: 'text-ink-muted hover:bg-ink/5 hover:text-ink',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
