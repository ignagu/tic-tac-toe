# Tic-Tac-Toe Game

An interactive Tic-Tac-Toe game with named players and tournament mode, built with React to learn component-based UI development.

**Status:** 🚧 In Progress — logic complete, styling and deployment remaining

---

## Project Overview

This is my second web development project, focusing on learning React fundamentals through building a classic game.

**Part of my 11-project full-stack learning journey** - [View all projects](https://github.com/ignagu/my-first-repo/blob/main/PROJECTS.md)

---

## Learning Objectives

### React Fundamentals
- Understanding components and component hierarchy
- Props (passing data down to child components)
- State management (useState hook)
- Side effects (useEffect hook)
- Event handling in React
- Conditional rendering

### JavaScript ES6+
- Arrow functions
- Array methods (map, slice)
- Destructuring
- Spread operator

### Development Tools
- Vite (modern build tool)
- npm (package management)
- Hot module replacement (instant updates while coding)

### Concepts
- Component reusability (one Square component used 9 times)
- Lifting state up (parent manages data, children just display)
- Single source of truth (board state lives in one place)
- Separation of concerns (round logic in Board, tournament logic in App)

---

## Game Features

### Core Game Logic
- **Board:** 3x3 grid with 9 squares
- **Players:** Two named players (X and O) take turns
- **Moves:** Players can only click empty squares
- **Turn switching:** Alternates between X and O after each valid move
- **Win conditions:** 3 in a row horizontally, vertically, or diagonally
- **Draw detection:** All 9 squares filled with no winner

### Tournament Mode
- Players enter names before the game starts
- Scoreboard tracks wins across rounds
- First player to 3 wins takes the tournament
- "Next Round" button resets the board while keeping scores
- "Play Again (Same Players)" and "Change Players" options at tournament end

---

## Component Architecture

### Actual Structure Built
```
App                          ← tournament state: names, scoreX, scoreO
  ├── PlayerSetup            ← name entry screen (shown before game starts)
  ├── Board                  ← round state: squares array, turn, win/draw detection
  │     └── Square × 9      ← single clickable cell, receives value + onClick
  └── tournament-end div     ← shown when a player reaches 3 wins
```

### Key Design Decisions

**Why Square is a reusable component:**
State lives in Board, not in Square. Square just receives a value (`null`, `'X'`, or `'O'`) and an `onSquareClick` function as props. It has no logic of its own — it only displays and reports clicks back to its parent.

**Why Board manages round state:**
Board needs to see the full grid to detect wins. Keeping state centralised (single source of truth) means one place to read and one place to update.

**Why App manages tournament state:**
Tournament concerns (player names, scores across rounds, detecting the overall winner) are separate from a single round. Splitting them keeps each component focused.

**`calculateWinner` is a plain function, not inside a component:**
It has no dependency on React state or props — it's pure logic. Pure functions are easier to understand, test, and reuse.

---

## Data Structure

### Board State
```javascript
// Array representing the 3x3 grid (positions 0-8)
[null, null, null,  // Row 1: positions 0, 1, 2
 null, null, null,  // Row 2: positions 3, 4, 5
 null, null, null]  // Row 3: positions 6, 7, 8

// After some moves:
['X', 'O', null,
 'X', null, null,
 null, null, null]
```

### Win Patterns Checked
```javascript
Rows:      [0,1,2], [3,4,5], [6,7,8]
Columns:   [0,3,6], [1,4,7], [2,5,8]
Diagonals: [0,4,8], [2,4,6]
```

---

## Development Progress

1. ✅ **Planning Phase**
   - Identified game requirements
   - Designed component architecture
   - Determined data structures

2. ✅ **Setup Phase**
   - Created React app with Vite
   - Configured gh-pages for deployment
   - Set up project structure

3. ✅ **Build Square Component**
   - Reusable button that receives `value` and `onSquareClick` via props
   - No state — purely controlled by parent

4. ✅ **Build Board Component**
   - Manages `squares` array state
   - Handles click events and turn switching
   - Detects win and draw conditions using `calculateWinner`

5. ✅ **Add Win Detection**
   - Checks all 8 win patterns after each move
   - Prevents clicks after round ends
   - Reports winner to App via `onGameEnd` callback

6. ✅ **Add Game Status + Tournament Mode**
   - PlayerSetup screen with name inputs
   - Live scoreboard during play
   - Status message: current player's turn / round winner / draw
   - Tournament winner screen with Play Again / Change Players options

7. **Polish & Deploy** ← currently here
   - Styling and visual improvements
   - Edge case testing
   - Deploy to GitHub Pages (`npm run deploy`)

---

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **JavaScript ES6+** - Programming language
- **CSS** - Styling
- **GitHub Pages** - Deployment target

---

## Commands

```bash
npm run dev       # start dev server with hot reload
npm run build     # production build to /dist
npm run deploy    # build + push to GitHub Pages
```

---

## Key Learnings (Updated as I Build)

### Planning
- Thinking through architecture before coding avoids costly rewrites
- Choosing the right data structure (flat array vs. 2D array) simplifies the logic significantly

### React Components
- A component is just a function that returns JSX
- Props flow down (parent → child), events flow up (child calls parent's function)
- "Dumb" components that only display data are easier to reuse and debug

### State Management
- `useState` returns the current value and a setter function: `const [value, setValue] = useState(initialValue)`
- Never mutate state directly — always create a new copy (`squares.slice()`) before updating
- When you call a setter, React re-renders the component with the new value

### useEffect
- Used to run side effects (things outside of rendering) in response to state changes
- Dependency array `[winner, roundEnded, onGameEnd]` controls when the effect runs

### Lifting State Up
- When multiple components need the same data, move state to their closest common parent
- Children receive data as props and report changes via callback functions passed as props

### Separation of Concerns
- Splitting round logic (Board) from tournament logic (App) made each piece simpler
- Pure helper functions (`calculateWinner`) outside components are cleaner and easier to test

---

## Timeline

- **Started:** February 10, 2026
- **Target Completion:** ~2 weeks (30 min/day habit)

---

**Previous Project:** [Portfolio Website](https://github.com/ignagu/portfolio-website) - [Live Site](https://ignagu.github.io/portfolio-website/)
