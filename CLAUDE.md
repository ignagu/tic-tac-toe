# Tic-Tac-Toe — Project Context

## What this project is
A React + Vite tic-tac-toe game with a "Best of 5" tournament mode. Two named players compete across rounds; first to 3 wins takes the tournament.

## Build status: ✅ COMPLETE

**Live at:** https://ignagu.github.io/tic-tac-toe/

**All done:**
- `Square` — reusable button, receives `value`, `onSquareClick`, `isWinner` via props; applies `square-x`/`square-o`/`square-winner` classes
- `Board` — manages board state, turn switching, win/draw detection, passes `isWinner` to each Square
- `PlayerSetup` — name entry screen
- `App` — tournament orchestration: scores, winner detection (first to 3), Play Again / Change Players
- `calculateWinner(squares)` — returns `{ winner, line }` so winning squares can be highlighted
- `App.css` — full bold/playful redesign: purple gradient bg, blue X, hot-pink O, gold winning squares, fluid clamp() sizing, mobile-first
- `index.css` — stripped Vite dark-theme defaults; App.css owns all visual design

## Component hierarchy
```
App                          ← tournament state: playerX/O names, scoreX/O
  ├── PlayerSetup            ← shown when gameStarted = false
  ├── Board                  ← shown during active game
  │     └── Square × 9
  └── tournament-end div     ← shown when a player reaches 3 wins
```

## Key decisions already made — do not change without discussion
- State lives in `Board` (not in individual `Square` components) — single source of truth
- `calculateWinner` is a plain function outside any component — easier to test and read
- Tournament logic lives in `App`, round logic lives in `Board` — clean separation
- Win threshold is `maxScore = 3` (first to 3, not 5 — "Best of 5" means up to 5 rounds)

## Commands
```bash
npm run dev       # start dev server with hot reload
npm run build     # production build to /dist
npm run deploy    # build + push to GitHub Pages
```

## What to focus on next
Styling and polish phase. The logic is complete.
