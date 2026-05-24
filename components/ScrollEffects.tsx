'use client'

import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    // ── 1. Scroll Reveal (fade-up sections) ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-children').forEach((el) =>
      revealObserver.observe(el)
    )

    // ── 2. Staggered card reveals ──
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.stagger-card')
            cards.forEach((card, i) => {
              setTimeout(() => {
                ;(card as HTMLElement).style.opacity = '1'
                ;(card as HTMLElement).style.transform = 'translateY(0)'
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    document.querySelectorAll('.stagger-grid').forEach((el) =>
      cardObserver.observe(el)
    )

    // ── 3. Parallax on hero backgrounds ──
    const parallaxEls = document.querySelectorAll('[data-parallax]')
    const handleParallax = () => {
      parallaxEls.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect()
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.3')
        const offset = rect.top * speed
        ;(el as HTMLElement).style.transform = `translateY(${offset}px)`
      })
    }

    // ── 4. Button ripple click effect ──
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const ripple = document.createElement('span')
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.25);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.5s ease-out forwards;
        pointer-events: none;
      `
      target.style.position = 'relative'
      target.style.overflow = 'hidden'
      target.appendChild(ripple)
      setTimeout(() => ripple.remove(), 500)
    }

    const buttons = document.querySelectorAll('.btn-gold-pill, .btn-outline-pill, .btn-gold, .btn-outline-gold')
    buttons.forEach((btn) => btn.addEventListener('click', handleClick as EventListener))

    window.addEventListener('scroll', handleParallax, { passive: true })
    handleParallax()

    return () => {
      revealObserver.disconnect()
      cardObserver.disconnect()
      window.removeEventListener('scroll', handleParallax)
      buttons.forEach((btn) => btn.removeEventListener('click', handleClick as EventListener))
    }
  }, [])

  return null
}
