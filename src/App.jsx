import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { todayKey } from './lib/day'
import BrainDump from './components/BrainDump'
import FocusTimer from './components/FocusTimer'
import WinBurst from './components/WinBurst'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('momentum.tasks', [])
  const [wins, setWins] = useLocalStorage('momentum.wins', {
    date: todayKey(),
    count: 0,
    total: 0,
  })
  const [focusId, setFocusId] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  const today = todayKey()
  const winsToday = wins.date === today ? wins.count : 0

  function addTask(text) {
    const t = text.trim()
    if (!t) return
    setTasks((prev) => [
      { id: crypto.randomUUID(), text: t, createdAt: Date.now() },
      ...prev,
    ])
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (focusId === id) setFocusId(null)
  }

  function completeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setWins((prev) => {
      const base =
        prev.date === today ? prev : { date: today, count: 0, total: prev.total || 0 }
      return {
        date: today,
        count: base.count + 1,
        total: (base.total || 0) + 1,
      }
    })
    setFocusId(null)
    setCelebrating(true)
  }

  const focusTask = tasks.find((t) => t.id === focusId) || null

  return (
    <div className="app">
      <Header winsToday={winsToday} total={wins.total || 0} />

      <main className="stage">
        {focusTask ? (
          <FocusTimer
            task={focusTask}
            onDone={() => completeTask(focusTask.id)}
            onBack={() => setFocusId(null)}
          />
        ) : (
          <BrainDump
            tasks={tasks}
            onAdd={addTask}
            onFocus={setFocusId}
            onComplete={completeTask}
            onRemove={removeTask}
          />
        )}
      </main>

      {celebrating && (
        <WinBurst winsToday={winsToday} onDone={() => setCelebrating(false)} />
      )}
    </div>
  )
}

function Header({ winsToday, total }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">Momentum</span>
      </div>
      <div className="wins" title={`${total} done all-time`}>
        <span className="wins-count">{winsToday}</span>
        <span className="wins-label">done today</span>
      </div>
    </header>
  )
}
