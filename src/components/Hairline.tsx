/** A 1px ink rule. `bleed` runs it to the screen edges past the page gutter. */
export function Hairline({ bleed = false, className = '' }: { bleed?: boolean; className?: string }) {
  return <div className={`h-px bg-line ${bleed ? '-mx-6' : ''} ${className}`} />
}
