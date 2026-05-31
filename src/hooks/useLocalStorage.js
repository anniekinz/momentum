import { useState, useEffect } from 'react'

// Tiny persistence layer. Local-first on purpose: no backend, no accounts,
// nothing between you and the loop. Swap this out for sync (Supabase, etc.)
// when you actually feel the need across devices — not before.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // private mode / quota — fail quietly, the app still works in-session
    }
  }, [key, value])

  return [value, setValue]
}
