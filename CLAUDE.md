# Tic-Tac-Toe — Project Context

## What this project is
A React + Vite tic-tac-toe game with a "Best of 5" tournament mode. Two named players compete across rounds; first to 3 wins takes the tournament.

## Current build status

**Done:**
- `Square` — reusable button component, receives `value` and `onSquareClick` via props
- `Board` — manages board state (`squares` array), turn switching, win/draw detection, "Next Round" reset
- `PlayerSetup` — name entry screen shown before the game starts
- `App` — tournament orchestration: tracks scores, detects tournament winner (first to 3), handles "Play Again" and "Change Players"
- `calculateWinner(squares)` — standalone helper that checks all 8 win patterns

**Remaining (from README plan):**
- Styling and visual polish (App.css exists but not yet reviewed)
- Edge case testing
- Deploy to GitHub Pages (`npm run deploy` is already configured)

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
