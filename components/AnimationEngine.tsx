'use client'

import { useEffect } from 'react'

export default function AnimationEngine() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window

    // ─── 1. SCROLL PROGRESS BAR ───────────────────────────────
    let bar = document.getElementById('scroll-progress') as HTMLElement | null
    if (!bar) {
      bar = document.createElement('div')
      bar.id = 'scroll-progress'
      bar.style.cssText = `
        position:fixed;top:0;left:0;right:0;height:2px;z-index:99999;
        pointer-events:none;transform-origin:left;transform:scaleX(0);
        background:linear-gradient(90deg,#C9A84C 0%,#E8C96A 50%,#C9A84C 100%);
        box-shadow:0 0 8px rgba(201,168,76,0.6);transition:transform 0.1s linear;
      `
      document.body.appendChild(bar)
    }

    // ─── 2. LERP CURSOR (desktop only) ────────────────────────
    const dot  = document.querySelector('.cursor-dot')  as HTMLElement | null
    const ring = document.querySelector('.cursor-ring') as HTMLElement | null
    let mx = -200, my = -200, rx = -200, ry = -200
    let cursorRaf = 0

    const lerpCursor = () => {
      rx += (mx - rx) * 0.09
      ry += (my - ry) * 0.09
      if (ring) {
        ring.style.left = `${rx}px`
        ring.style.top  = `${ry}px`
      }
      cursorRaf = requestAnimationFrame(lerpCursor)
    }
    if (!isMobile) lerpCursor()

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) { dot.style.left = `${mx}px`; dot.style.top = `${my}px` }
      if (!ring) return
      const el = document.elementFromPoint(mx, my)
      const isHot = !!el?.closest('a,button,input,textarea,[role="button"],[data-magnetic]')
      if (isHot) {
        ring.style.width = '58px'; ring.style.height = '58px'
        ring.style.background = 'rgba(201,168,76,0.1)'
        ring.style.borderColor = '#C9A84C'; ring.style.opacity = '0.9'
      } else {
        ring.style.width = '36px'; ring.style.height = '36px'
        ring.style.background = 'transparent'
        ring.style.borderColor = 'rgba(201,168,76,0.55)'; ring.style.opacity = '0.6'
      }
    }

    // ─── 3. SCROLL HANDLER ────────────────────────────────────
    const onScroll = () => {
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (bar) bar.style.transform = `scaleX(${Math.min(p, 1)})`
    }

    // ─── 4. SCROLL REVEAL ─────────────────────────────────────
    const setupScrollReveal = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })
      document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale,.anim-up,.anim-wipe,.anim-twist,.anim-flip,.anim-left,.anim-scale')
        .forEach(el => { if (!el.classList.contains('is-visible')) obs.observe(el) })
      return obs
    }

    // ─── 5. COUNTER ANIMATION ─────────────────────────────────
    const setupCounters = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.count || '0', 10)
          if (!target) return
          let start = 0
          const dur = 1800
          const step = (ts: number, st: number) => {
            const prog = Math.min((ts - st) / dur, 1)
            const ease = 1 - Math.pow(1 - prog, 3)
            el.textContent = Math.round(ease * target).toLocaleString() + (el.dataset.suffix || '')
            if (prog < 1) requestAnimationFrame(t => step(t, st))
          }
          requestAnimationFrame(t => { start = t; step(t, start) })
          obs.unobserve(el)
        })
      }, { threshold: 0.5 })
      document.querySelectorAll('[data-count]').forEach(el => obs.observe(el))
    }

    // ─── 6. MAGNETIC BUTTONS (auto-detect + data-magnetic) ────
    const setupMagnetic = () => {
      if (isMobile) return
      // Auto-detect common button/CTA selectors + explicit data-magnetic
      const sel = [
        '[data-magnetic]',
        '.nav-cta',
        '.btn-gold',
        '.btn-ghost-dark',
        '.stream-pill',
        '.stream-spotify',
        '.stream-apple',
        '.stream-youtube',
      ].join(',')
      document.querySelectorAll(sel).forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.magInit) return
        h.dataset.magInit = '1'
        h.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1)'
        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r  = h.getBoundingClientRect()
          const dx = (me.clientX - (r.left + r.width  / 2)) * 0.32
          const dy = (me.clientY - (r.top  + r.height / 2)) * 0.32
          h.style.transform = `translate(${dx}px,${dy}px)`
        })
        h.addEventListener('mouseleave', () => { h.style.transform = '' })
      })
    }

    // ─── 7. 3D TILT (auto-detect cards + data-tilt) ───────────
    const setupTilt = () => {
      if (isMobile) return
      const sel = [
        '[data-tilt]',
        '.port-card',
        '.book-card',
        '.book-strip',
        '.portfolio-card',
      ].join(',')
      document.querySelectorAll(sel).forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.tiltInit) return
        h.dataset.tiltInit = '1'
        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r  = h.getBoundingClientRect()
          const xP = (me.clientX - r.left) / r.width
          const yP = (me.clientY - r.top)  / r.height
          const rX = (yP - 0.5) * -14
          const rY = (xP - 0.5) * 14
          h.style.transition = 'transform 0.08s ease,box-shadow 0.08s ease'
          h.style.transform  = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.02)`
          h.style.boxShadow  = `${-rY * 1.2}px ${rX * 1.2}px 40px rgba(0,0,0,0.14),0 0 0 1px rgba(201,168,76,0.08)`
        })
        h.addEventListener('mouseleave', () => {
          h.style.transition = 'transform 0.75s cubic-bezier(0.16,1,0.3,1),box-shadow 0.75s'
          h.style.transform  = ''
          h.style.boxShadow  = ''
        })
      })
    }

    // ─── 8. GLARE ON HOVER (auto-detect + data-glare) ─────────
    const setupGlare = () => {
      if (isMobile) return
      const sel = ['[data-glare]','.port-card','.portfolio-card','.book-card'].join(',')
      document.querySelectorAll(sel).forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.glareInit) return
        h.dataset.glareInit = '1'
        h.style.position = 'relative'
        h.style.overflow = 'hidden'
        const g = document.createElement('div')
        g.style.cssText = `
          position:absolute;inset:0;pointer-events:none;z-index:20;opacity:0;
          background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),
            rgba(255,255,255,0.13) 0%,rgba(201,168,76,0.05) 35%,transparent 65%);
          transition:opacity 0.4s ease;
        `
        h.appendChild(g)
        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent; const r = h.getBoundingClientRect()
          h.style.setProperty('--gx', ((me.clientX - r.left) / r.width  * 100).toFixed(1) + '%')
          h.style.setProperty('--gy', ((me.clientY - r.top)  / r.height * 100).toFixed(1) + '%')
          g.style.opacity = '1'
        })
        h.addEventListener('mouseleave', () => { g.style.opacity = '0' })
      })
    }

    // ─── 9. GOLD LINE DRAWS ───────────────────────────────────
    const setupLines = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { (e.target as HTMLElement).classList.add('line-drawn'); obs.unobserve(e.target) }
        })
      }, { threshold: 0.4 })
      document.querySelectorAll('.draw-line').forEach(el => {
        if (!(el as HTMLElement).classList.contains('line-drawn')) obs.observe(el)
      })
    }

    // ─── 10. STAGGER CHILDREN ─────────────────────────────────
    const setupStagger = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          e.target.querySelectorAll(':scope > .rv, :scope > [class*="rv"]').forEach((ch, i) => {
            (ch as HTMLElement).style.transitionDelay = `${i * (isMobile ? 0.06 : 0.1)}s`
          })
          obs.unobserve(e.target)
        })
      }, { threshold: 0.1 })
      document.querySelectorAll('[data-stagger]').forEach(el => obs.observe(el))
    }

    // ─── 11. CHAR SPLIT REVEALS ───────────────────────────────
    const setupCharSplit = () => {
      document.querySelectorAll('[data-split]').forEach(el => {
        if ((el as HTMLElement).dataset.splitDone) return
        ;(el as HTMLElement).dataset.splitDone = '1'
        const text = el.textContent || ''
        el.innerHTML = text.split('').map((ch, i) =>
          `<span class="ch" style="display:inline-block;animation:charIn 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.028}s both">${ch === ' ' ? '&nbsp;' : ch}</span>`
        ).join('')
      })
    }

    // ─── 12. PARALLAX DEPTH (desktop only) ────────────────────
    let pxHandler: (() => void) | undefined
    if (!isMobile) {
      const layers = document.querySelectorAll('[data-parallax]') as NodeListOf<HTMLElement>
      if (layers.length) {
        pxHandler = () => {
          const sy = window.scrollY
          layers.forEach(el => {
            const speed = parseFloat(el.dataset.parallax || '0.15')
            el.style.transform = `translateY(${sy * speed}px)`
          })
        }
        window.addEventListener('scroll', pxHandler, { passive: true })
      }
    }

    // ─── 13. TOUCH RIPPLE (mobile) ────────────────────────────
    const setupTouchRipple = () => {
      if (!isMobile) return
      const style = document.createElement('style')
      style.textContent = `
        @keyframes ripple{0%{transform:scale(0);opacity:0.5}100%{transform:scale(4);opacity:0}}
        .ripple-el{position:relative;overflow:hidden}
        .ripple-wave{position:absolute;border-radius:50%;background:rgba(201,168,76,0.25);
          animation:ripple 0.55s ease-out forwards;pointer-events:none;transform:scale(0);}
      `
      document.head.appendChild(style)

      const addRipple = (e: TouchEvent) => {
        const target = e.currentTarget as HTMLElement
        const r = target.getBoundingClientRect()
        const touch = e.touches[0]
        const size = Math.max(r.width, r.height) * 2
        const x = touch.clientX - r.left - size / 2
        const y = touch.clientY - r.top  - size / 2
        const wave = document.createElement('span')
        wave.className = 'ripple-wave'
        wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
        target.appendChild(wave)
        setTimeout(() => wave.remove(), 600)
      }

      document.querySelectorAll('a,button,.nav-cta,.stream-pill,.stream-spotify,.stream-apple,.stream-youtube').forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.rippleInit) return
        h.dataset.rippleInit = '1'
        h.classList.add('ripple-el')
        h.addEventListener('touchstart', addRipple as EventListener, { passive: true })
      })
    }

    // ─── 14. TOUCH SWIPE MOMENTUM (horizontal containers) ─────
    const setupTouchSwipe = () => {
      if (!isMobile) return
      document.querySelectorAll('[data-swipe]').forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.swipeInit) return
        h.dataset.swipeInit = '1'
        let startX = 0, startScroll = 0, isDragging = false, vel = 0, lastX = 0, lastT = 0

        h.addEventListener('touchstart', (e: TouchEvent) => {
          startX = e.touches[0].clientX
          startScroll = h.scrollLeft
          isDragging = true
          vel = 0
        }, { passive: true })

        h.addEventListener('touchmove', (e: TouchEvent) => {
          if (!isDragging) return
          const now = Date.now()
          const dx = e.touches[0].clientX - startX
          vel = (e.touches[0].clientX - lastX) / (now - lastT + 1) * 16
          lastX = e.touches[0].clientX; lastT = now
          h.scrollLeft = startScroll - dx
        }, { passive: true })

        h.addEventListener('touchend', () => {
          isDragging = false
          const momentum = () => {
            if (Math.abs(vel) < 0.5) return
            h.scrollLeft -= vel
            vel *= 0.88
            requestAnimationFrame(momentum)
          }
          momentum()
        })
      })
    }

    // ─── 15. HERO MOUSE PARALLAX (desktop) ────────────────────
    const setupHeroParallax = () => {
      if (isMobile) return
      const heroes = document.querySelectorAll('[data-hero-parallax]') as NodeListOf<HTMLElement>
      if (!heroes.length) return
      const onMove = (e: MouseEvent) => {
        const cx = (e.clientX / window.innerWidth  - 0.5) * 2
        const cy = (e.clientY / window.innerHeight - 0.5) * 2
        heroes.forEach(h => {
          h.style.transform = `translate(${cx * 8}px, ${cy * 5}px) scale(1.03)`
        })
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      return onMove
    }

    // ─── INIT ─────────────────────────────────────────────────
    let rvObs: IntersectionObserver | undefined
    let heroParallaxHandler: ((e: MouseEvent) => void) | undefined

    const init = () => {
      rvObs = setupScrollReveal()
      setupCounters()
      setupMagnetic()
      setupTilt()
      setupGlare()
      setupLines()
      setupStagger()
      setupCharSplit()
      setupTouchRipple()
      setupTouchSwipe()
      heroParallaxHandler = setupHeroParallax()
    }

    const timer = setTimeout(init, 120)

    // Re-run on SPA navigation
    const mutObs = new MutationObserver(() => {
      setupTilt(); setupGlare(); setupMagnetic()
      setupScrollReveal(); setupLines()
      setupTouchRipple(); setupTouchSwipe()
    })
    mutObs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('scroll', onScroll, { passive: true })
    if (!isMobile) window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (!isMobile) window.removeEventListener('mousemove', onMouseMove)
      if (pxHandler) window.removeEventListener('scroll', pxHandler)
      if (heroParallaxHandler) window.removeEventListener('mousemove', heroParallaxHandler)
      cancelAnimationFrame(cursorRaf)
      clearTimeout(timer)
      mutObs.disconnect()
      rvObs?.disconnect()
      bar?.remove()
    }
  }, [])

  return null
}
