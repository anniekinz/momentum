import { useEffect, useRef } from 'react'

const COLORS = ['#ff8a5c', '#8ce99a', '#ffd166', '#9bdfff', '#f4ede4']

// The payoff. This is the whole point of the loop — make finishing feel good.
export default function WinBurst({ winsToday, onDone }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const pieces = []
    const N = 90
    for (let i = 0; i < N; i++) {
      const el = document.createElement('span')
      el.className = 'confetti'
      const angle = Math.random() * Math.PI * 2
      const dist = 120 + Math.random() * 280
      el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
      el.style.setProperty('--dy', `${Math.sin(angle) * dist - 90}px`)
      el.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`)
      el.style.setProperty('--delay', `${Math.random() * 90}ms`)
      const size = 6 + Math.random() * 9
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.background = COLORS[i % COLORS.length]
      layer.appendChild(el)
      pieces.push(el)
    }
    const timer = setTimeout(onDone, 1700)
    return () => {
      clearTimeout(timer)
      pieces.forEach((p) => p.remove())
    }
  }, [onDone])

  return (
    <div className="winburst" onClick={onDone}>
      <div className="confetti-layer" ref={layerRef} />
      <div className="win-card">
        <div className="win-check">&#10003;</div>
        <p className="win-title">Nice.</p>
        <p className="win-count">
          <strong>{winsToday}</strong> done today
        </p>
      </div>
    </div>
  )
}
