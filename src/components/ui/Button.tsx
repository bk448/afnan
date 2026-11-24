import { cva, type VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Rectangular, 4px radius. Solid ink (primary), hairline outline (secondary),
 * underlined text (tertiary). No pills, no gradients.
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-ink-800 text-paper hover:bg-ink-700 rounded-sm',
        secondary:
          'border border-ink-800 text-ink-800 hover:bg-ink-800 hover:text-paper rounded-sm bg-transparent',
        accent: 'bg-accent text-white hover:bg-accent-700 rounded-sm',
        ghost: 'text-ink-800 hover:bg-surface rounded-sm',
        link: 'text-accent underline underline-offset-4 decoration-1 hover:text-accent-700',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-12 px-6 text-base',
        none: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: ReactNode
  className?: string
  /** Render as a router link when provided. */
  to?: string
  /** Render as an anchor when provided. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  className,
  variant,
  size,
  to,
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
