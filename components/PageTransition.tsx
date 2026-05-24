'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'in' | 'out'>('idle')
  const prevPathRef = useRef(pathname)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (pathname === prevPathRef.current) return

    // Route changed: sweep curtain out (reveal new page)
    setPhase('out')
    prevPathRef.current = pathname

    timerRef.current = setTimeout(() => {
      setPhase('idle')
    }, 600)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [pathname])

  // On first load: sweep curtain out
  useEffect(() => {
    setPhase('in')
    timerRef.current = setTimeout(() => {
      setPhase('out')
      timerRef.current = setTimeout(() => setPhase('idle'), 600)
    }, 80)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'idle') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'linear-gradient(135deg, #1A2E1A 0%, #0d1c0e 50%, #060e06 100%)',
        pointerEvents: 'none',
        transformOrigin: 'bottom',
      }}
      className={phase === 'in' ? 'curtain-enter' : 'curtain-exit'}
    />
  )
}
