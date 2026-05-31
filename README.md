# Momentum

**Dump it. Pick one. Do it.** A tiny local-first app built around one loop:

> brain dump → pick one → focus timer → win

That's the whole v1. On purpose. The discipline of keeping it to one loop is the
point — it's what makes it shippable, and what keeps an ADHD brain from drowning
the project in features before it ever gets used.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Add a few thoughts, hit
**Focus** on one, run the timer, hit **Done**, and enjoy the confetti.

## Put it on your phone (the dopamine step)

This is a PWA, so once it's deployed you can install it to your home screen.

```bash
npm run build      # outputs to /dist
npm run preview    # test the production build locally
```

Deploy `/dist` to Vercel or Netlify (both have a free tier and a 2-minute setup).
Then open the live URL on your phone → "Add to Home Screen". Now it's a real app
you'll actually open in the morning. Do this **early** — seeing it live is half
the motivation.

## What's where

```
src/
  App.jsx                  state + the loop's routing + persistence
  components/
    BrainDump.jsx          capture + task list
    FocusTimer.jsx         one task, ring countdown, done button
    WinBurst.jsx           the payoff (confetti + win count)
  hooks/useLocalStorage.js local-first persistence
  lib/day.js               daily reset for the win counter
  index.css                the whole look (warm dark theme)
```

Data lives in `localStorage` — no backend, no accounts, nothing between you and
the loop. Add sync (Supabase, etc.) only when you genuinely feel the need across
devices, not before.

## Rules for keeping momentum (read this, it's the actual product)

- **End every session with something that runs** and a one-line note of the next
  tiny step. You sit back down to "add the streak counter," not "work on the app."
- **New ideas go in `ideas.md`**, never into the code mid-loop. This protects
  scope and quiets the "but what about…" itch.
- **v1 is done when:** the loop works, it's deployed, and you've used it for real.
  Everything else is v2.

## Working with Claude Code

`CLAUDE.md` gives Claude Code the context and guardrails for this project. Good
first asks: "add a gentle sound when the timer ends," "let me reorder tasks by
drag," "add a 3-day streak indicator to the header."
