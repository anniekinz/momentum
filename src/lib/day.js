// Stable key for "today" so the win counter resets at midnight (local time).
export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
