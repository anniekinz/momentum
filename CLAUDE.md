# Momentum — context for Claude Code

A local-first ADHD/focus app built around a single loop:
**brain dump → pick one → focus timer → win.**

## Stack
- Vite + React 18 (plain JSX, no TypeScript)
- Plain CSS in `src/index.css` (CSS variables, no framework)
- `vite-plugin-pwa` for installability
- State persisted to `localStorage` via `src/hooks/useLocalStorage.js`

## Design principles (hold the line on these)
1. **Low friction to start.** Open app → start typing. The capture input
   autofocuses. Never add a step between the user and capturing a thought.
2. **One clear action at a time.** Reduce decision load. The screen is either
   "dump" or "focus," never a cluttered everything-view.
3. **Visible wins.** The "done today" counter and the confetti payoff are
   load-bearing — they're the dopamine. Don't water them down.
4. **Keep v1 to the one loop.** New feature ideas belong in `ideas.md` until the
   loop is shipped and used for real. Resist scope creep; it's the main risk.

## Conventions
- Components in `src/components/`, one concern each.
- Keep it dependency-light. Justify any new package.
- Respect `prefers-reduced-motion` (already wired in the CSS).

## Good next steps (only after v1 is deployed and used)
See `ideas.md`. Pull one at a time. Ship it. Then the next.
