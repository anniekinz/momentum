import { useState, useEffect, useRef } from 'react'

const PRESETS = [
  { label: '5m', sec: 5 * 60 },
  { label: '15m', sec: 15 * 60 },
  { label: '25m', sec: 25 * 60 },
]

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function FocusTimer({ task, onDone, onBack }) {
  const [total, setTotal] = useState(PRESETS[1].sec)
  const [left, setLeft] = useState(PRESETS[1].sec)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  function choosePreset(sec) {
    setRunning(false)
    setTotal(sec)
    setLeft(sec)
  }

  const finished = left === 0
  const progress = total > 0 ? 1 - left / total : 0
  const R = 130
  const C = 2 * Math.PI * R

  return (
    <section className="focus">
      <button className="back-btn" onClick={onBack}>
        &larr; back to dump
      </button>

      <p className="focus-label">Focusing on</p>
      <h1 className="focus-task">{task.text}</h1>

      <div className="ring-wrap">
        <svg className="ring" viewBox="0 0 300 300" width="300" height="300">
          <circle className="ring-track" cx="150" cy="150" r={R} />
          <circle
            className="ring-fill"
            cx="150"
            cy="150"
            r={R}
            style={{ strokeDasharray: C, strokeDashoffset: C * (1 - progress) }}
          />
        </svg>
        <div className="ring-center">
          <span className={`time ${finished ? 'time-done' : ''}`}>
            {finished ? 'time!' : fmt(left)}
          </span>
        </div>
      </div>

      <div className="presets">
        {PRESETS.map((p) => (
          <button
            key={p.sec}
            className={`preset ${total === p.sec ? 'preset-on' : ''}`}
            onClick={() => choosePreset(p.sec)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="focus-controls">
        {!finished && (
          <button className="ctrl ctrl-primary" onClick={() => setRunning((r) => !r)}>
            {running ? 'Pause' : left === total ? 'Start' : 'Resume'}
          </button>
        )}
        <button className="ctrl ctrl-done" onClick={onDone}>
          &#10003; Done
        </button>
      </div>
    </section>
  )
}
