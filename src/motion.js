import { useEffect, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Fades/slides `.reveal` elements in as they enter the viewport. Re-scans when `key` changes (route change).
export function useReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach(el => io.observe(el))
    // Safety net: anything already on screen is shown even if the observer is late.
    const frame = requestAnimationFrame(() => {
      const h = window.innerHeight
      els.forEach(el => {
        if (el.getBoundingClientRect().top < h) { el.classList.add('in'); io.unobserve(el) }
      })
    })
    return () => { cancelAnimationFrame(frame); io.disconnect() }
  }, [key])
}

// Scroll progress bar + "scrolled" header state. Progress is written straight to the DOM (no re-renders).
export function useScrollState(barRef) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      setScrolled(y > 24)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [barRef])
  return scrolled
}

// Pointer effects via event delegation:
//   .glow  -> sets --mx/--my for a cursor spotlight
//   .tilt  -> sets --rx/--ry for a subtle 3D tilt
// Only runs for fine pointers (mouse/trackpad) and batches writes per animation frame.
export function usePointerFx() {
  useEffect(() => {
    if (reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    let last = null
    let tilted = null
    const apply = () => {
      frame = 0
      const { x, y, target } = last
      const glow = target.closest?.('.glow')
      if (glow) {
        const r = glow.getBoundingClientRect()
        glow.style.setProperty('--mx', `${x - r.left}px`)
        glow.style.setProperty('--my', `${y - r.top}px`)
      }
      const tilt = target.closest?.('.tilt')
      if (tilted && tilted !== tilt) {
        tilted.style.setProperty('--rx', '0deg')
        tilted.style.setProperty('--ry', '0deg')
      }
      tilted = tilt
      if (tilt) {
        const r = tilt.getBoundingClientRect()
        const px = (x - r.left) / r.width - 0.5
        const py = (y - r.top) / r.height - 0.5
        tilt.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`)
        tilt.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`)
      }
    }
    const onMove = e => {
      last = { x: e.clientX, y: e.clientY, target: e.target }
      if (!frame) frame = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}
