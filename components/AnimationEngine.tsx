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
        position:fixed;top:0;left:0;right:0;height:3px;z-index:99999;
        pointer-events:none;transform-origin:left;transform:scaleX(0);
        background:linear-gradient(90deg,#C9A84C 0%,#E8C96A 40%,#FAF7F2 60%,#E8C96A 80%,#C9A84C 100%);
        background-size:300% 100%;animation:shimmerBar 2.2s linear infinite;
        box-shadow:0 0 8px rgba(201,168,76,0.5);
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
        ring.style.width = '58px'
        ring.style.height = '58px'
        ring.style.background = 'rgba(201,168,76,0.1)'
        ring.style.borderColor = '#C9A84C'
        ring.style.opacity = '0.9'
      } else {
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.background = 'transparent'
        ring.style.borderColor = 'rgba(201,168,76,0.55)'
        ring.style.opacity = '0.6'
      }
    }

    // ─── 3. SCROLL HANDLER ────────────────────────────────────
    const onScroll = () => {
      const cy  = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${max > 0 ? cy / max : 0})`
    }

    // ─── 4. SCROLL REVEAL — blur + scale + 3D ────────────────
    const setupScrollReveal = () => {
      const SEL = '.rv,.rv-left,.rv-right,.rv-scale,.rv-fade'
      const els = document.querySelectorAll(SEL)
      if (!els.length) return undefined

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          ;(e.target as HTMLElement).classList.add('is-visible')
          obs.unobserve(e.target)
        })
      }, { threshold: isMobile ? 0.08 : 0.12, rootMargin: '0px 0px -40px 0px' })

      els.forEach(el => {
        if (!(el as HTMLElement).classList.contains('is-visible')) {
          obs.observe(el)
        }
      })

      return obs
    }

    // ─── 5. COUNTER ANIMATION ─────────────────────────────────
    const setupCounters = () => {
      document.querySelectorAll('[data-count]').forEach(el => {
        if ((el as HTMLElement).dataset.counted) return
        ;(el as HTMLElement).dataset.counted = '1'

        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (!e.isIntersecting) return
            obs.unobserve(e.target)
            const raw = (e.target as HTMLElement).dataset.count || ''
            const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
            const suf = raw.replace(/^[\d.]+/, '')
            if (isNaN(num)) return
            const dur = 2200, t0 = performance.now()
            const tick = (now: number) => {
              const p = Math.min((now - t0) / dur, 1)
              const v = 1 - Math.pow(1 - p, 4)           // ease-out quartic
              const n = Number.isInteger(num) ? Math.round(v * num) : +(v * num).toFixed(1)
              e.target.textContent = n + suf
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          })
        }, { threshold: 0.5 })
        obs.observe(el)
      })
    }

    // ─── 6. MAGNETIC BUTTONS ──────────────────────────────────
    const setupMagnetic = () => {
      if (isMobile) return
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        if ((el as HTMLElement).dataset.magneticInit) return
        ;(el as HTMLElement).dataset.magneticInit = '1'
        const h = el as HTMLElement
        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r  = h.getBoundingClientRect()
          const dx = (me.clientX - (r.left + r.width  / 2)) * 0.38
          const dy = (me.clientY - (r.top  + r.height / 2)) * 0.38
          h.style.transition = 'transform 0.12s ease'
          h.style.transform  = `translate(${dx}px,${dy}px)`
        })
        h.addEventListener('mouseleave', () => {
          h.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1)'
          h.style.transform  = ''
        })
      })
    }

    // ─── 7. 3D CARD TILT ──────────────────────────────────────
    const setupTilt = () => {
      if (isMobile) return
      const SEL = '.book-card,.ministry-card,.book-slot,.stat-block,[data-tilt]'
      document.querySelectorAll(SEL).forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.tiltInit) return
        h.dataset.tiltInit = '1'

        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r  = h.getBoundingClientRect()
          const xP = (me.clientX - r.left) / r.width
          const yP = (me.clientY - r.top)  / r.height
          const rX = (yP - 0.5) * -16
          const rY = (xP - 0.5) * 16
          h.style.transition = 'transform 0.08s ease,box-shadow 0.08s ease'
          h.style.transform  = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.03)`
          h.style.boxShadow  = `${-rY * 1.2}px ${rX * 1.2}px 48px rgba(0,0,0,0.16),0 0 0 1px rgba(201,168,76,0.1)`
        })
        h.addEventListener('mouseleave', () => {
          h.style.transition = 'transform 0.75s cubic-bezier(0.16,1,0.3,1),box-shadow 0.75s'
          h.style.transform  = ''
          h.style.boxShadow  = ''
        })
      })
    }

    // ─── 8. GLARE ON HOVER ────────────────────────────────────
    const setupGlare = () => {
      if (isMobile) return
      document.querySelectorAll('[data-glare]').forEach(el => {
        const h = el as HTMLElement
        if (h.dataset.glareInit) return
        h.dataset.glareInit = '1'
        h.style.position = 'relative'
        h.style.overflow = 'hidden'

        const g = document.createElement('div')
        g.style.cssText = `
          position:absolute;inset:0;pointer-events:none;z-index:20;opacity:0;
          background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),
            rgba(255,255,255,0.15) 0%,rgba(201,168,76,0.06) 30%,transparent 60%);
          transition:opacity 0.4s ease;
        `
        h.appendChild(g)
        h.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent
          const r  = h.getBoundingClientRect()
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
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).classList.add('line-drawn')
            obs.unobserve(e.target)
          }
        })
      }, { threshold: 0.4 })
      document.querySelectorAll('.draw-line').forEach(el => {
        if (!(el as HTMLElement).classList.contains('line-drawn')) obs.observe(el)
      })
    }

    // ─── 10. STAGGER CHILD REVEALS ────────────────────────────
    const setupStagger = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const children = e.target.querySelectorAll(':scope > .rv, :scope > [class*="rv"]')
          children.forEach((ch, i) => {
            ;(ch as HTMLElement).style.transitionDelay = `${i * (isMobile ? 0.06 : 0.11)}s`
          })
          obs.unobserve(e.target)
        })
      }, { threshold: 0.1 })
      document.querySelectorAll('[data-stagger]').forEach(el => obs.observe(el))
    }

    // ─── 11. TEXT CHAR SPLIT REVEALS ──────────────────────────
    const setupCharSplit = () => {
      document.querySelectorAll('[data-split]').forEach(el => {
        if ((el as HTMLElement).dataset.splitDone) return
        ;(el as HTMLElement).dataset.splitDone = '1'
        const text = el.textContent || ''
        el.innerHTML = text.split('').map((ch, i) =>
          `<span class="ch" style="
            display:inline-block;
            animation:charIn 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.028}s both;
          ">${ch === ' ' ? '&nbsp;' : ch}</span>`
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

    // ─── INIT ────────────────────────────────────────────────
    let rvObs: IntersectionObserver | undefined

    const init = () => {
      rvObs = setupScrollReveal()
      setupCounters()
      setupMagnetic()
      setupTilt()
      setupGlare()
      setupLines()
      setupStagger()
      setupCharSplit()
    }

    const timer = setTimeout(init, 120)

    // Re-run interactive & reveal effects on SPA navigation
    const mutObs = new MutationObserver(() => {
      setupTilt()
      setupGlare()
      setupMagnetic()
      setupScrollReveal()
      setupLines()
    })
    mutObs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('scroll', onScroll, { passive: true })
    if (!isMobile) window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (!isMobile) window.removeEventListener('mousemove', onMouseMove)
      if (pxHandler) window.removeEventListener('scroll', pxHandler)
      cancelAnimationFrame(cursorRaf)
      clearTimeout(timer)
      mutObs.disconnect()
      rvObs?.disconnect()
      bar?.remove()
    }
  }, [])

  return null
}
