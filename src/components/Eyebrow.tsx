import type { ReactNode } from 'react'

/** A tracked all-caps label — the editorial eyebrow that sits above sections. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-sans text-[11px] uppercase tracking-[0.22em] text-ink-muted ${className}`}>
      {children}
    </span>
  )
}
