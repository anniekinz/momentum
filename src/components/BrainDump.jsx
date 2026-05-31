import { useState, useRef, useEffect } from 'react'

export default function BrainDump({ tasks, onAdd, onFocus, onComplete, onRemove }) {
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)

  // Autofocus on open so capture is zero-friction: open app, start typing.
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function submit(e) {
    e.preventDefault()
    onAdd(draft)
    setDraft('')
  }

  return (
    <section className="dump">
      <div className="dump-head">
        <h1 className="dump-title">What&rsquo;s in your head?</h1>
        <p className="dump-sub">Dump it all out, one line at a time. Sort it later.</p>
      </div>

      <form className="capture" onSubmit={submit}>
        <input
          ref={inputRef}
          className="capture-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a thought, hit Enter&hellip;"
          autoComplete="off"
        />
        <button className="capture-btn" type="submit" aria-label="Add to list">
          +
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty">
          <p className="empty-title">Head&rsquo;s empty. Nice.</p>
          <p className="empty-sub">Add something above, or go enjoy the quiet.</p>
        </div>
      ) : (
        <ul className="tasklist">
          {tasks.map((t, i) => (
            <li className="task" key={t.id} style={{ animationDelay: `${i * 45}ms` }}>
              <button
                className="task-check"
                onClick={() => onComplete(t.id)}
                aria-label="Mark done"
              >
                <span className="check-ring" />
              </button>
              <span className="task-text">{t.text}</span>
              <div className="task-actions">
                <button className="focus-btn" onClick={() => onFocus(t.id)}>
                  Focus
                </button>
                <button
                  className="trash-btn"
                  onClick={() => onRemove(t.id)}
                  aria-label="Delete"
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
