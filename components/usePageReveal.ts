'use client'
import { useEffect } from 'react'

export function usePageReveal() {
  useEffect(() => {
    const SELECTOR = '.rv, .rv-left, .rv-right, .rv-scale, .rv-up'

    const revealEl = (el: Element) => {
      el.classList.add('rv-in')
      obs.unobserve(el)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealEl(entry.target)
        })
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const t = setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        // Immediately reveal elements already visible in the viewport on load
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          revealEl(el)
        } else {
          obs.observe(el)
        }
      })
    }, 80)

    let scrollT: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(scrollT)
      scrollT = setTimeout(() => {
        document.querySelectorAll(
          '.rv:not(.rv-in), .rv-left:not(.rv-in), .rv-right:not(.rv-in), .rv-scale:not(.rv-in), .rv-up:not(.rv-in)'
        ).forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.top < window.innerHeight - 40 && r.bottom > 0) {
            revealEl(el)
          }
        })
      }, 14)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(t)
      clearTimeout(scrollT)
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
