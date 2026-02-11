# Tic-Tac-Toe Game

An interactive Tic-Tac-Toe game built with React to learn component-based UI development.

**Status:** 🚧 In Progress

---

## Project Overview

This is my second web development project, focusing on learning React fundamentals through building a classic game.

**Part of my 8-project full-stack learning journey** - [View all projects](https://github.com/ignagu/my-first-repo/blob/main/PROJECTS.md)

---

## Learning Objectives

### React Fundamentals
- Understanding components and component hierarchy
- Props (passing data to components)
- State management (useState hook)
- Event handling in React
- Conditional rendering

### JavaScript ES6+
- Arrow functions
- Array methods (map, filter)
- Destructuring
- Spread operator

### Development Tools
- Vite (modern build tool)
- npm (package management)
- Hot module replacement (instant updates while coding)

### Concepts
- Component reusability (one Square component used 9 times)
- Lifting state up (parent manages data)
- Single source of truth (data lives in one place)

---

## Game Requirements

### Core Game Logic
- **Board:** 3x3 grid with 9 squares
- **Players:** Two players (X and O) take turns
- **Moves:** Players can only click empty squares
- **Turn switching:** Alternates between X and O after each valid move
- **Win conditions:**
  - 3 in a row horizontally (3 possibilities)
  - 3 in a row vertically (3 possibilities)  
  - 3 in a row diagonally (2 possibilities)
- **Draw:** All 9 squares filled with no winner

### Features to Build
- Interactive game board
- Click to place X or O
- Display current player's turn
- Detect and announce winner
- Detect and announce draw
- Reset/new game button
- Move history (stretch goal)

---

## Component Architecture

### Planned Structure
```
Game (top-level component)
  ├── Board (manages game state and logic)
  │     ├── Square × 9 (individual cells)
  └── Status (displays current player or winner)
```

### Design Decisions

**Why Square is a reusable component:**
- Same visual and behavior for all 9 squares
- Just displays different data (null, 'X', or 'O')
- Receives props: value and position
- Reports clicks back to parent

**Why Board manages the state:**
- Board holds the array: `[null, 'X', 'O', null, ...]`
- Board tracks current player
- Board checks for winners (needs view of entire board)
- Squares are "dumb" - they just display and report clicks
- Single source of truth makes logic simpler

**Alternative considered (rejected):**
- Having each Square aware of other Squares would be complex
- 9 components each checking 8 others = messy
- Centralized state is cleaner and easier to debug

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

### Win Patterns to Check
```javascript
Rows:      [0,1,2], [3,4,5], [6,7,8]
Columns:   [0,3,6], [1,4,7], [2,5,8]
Diagonals: [0,4,8], [2,4,6]
```

---

## Development Plan

1. ✅ **Planning Phase**
   - Identified game requirements
   - Designed component architecture
   - Determined data structures

2. **Setup Phase**
   - Create React app with Vite
   - Set up project structure
   - Install dependencies

3. **Build Square Component**
   - Create reusable Square component
   - Handle click events
   - Display X, O, or empty

4. **Build Board Component**
   - Create 3x3 grid of Squares
   - Manage board state
   - Handle square clicks
   - Implement turn switching

5. **Add Win Detection**
   - Check all win patterns after each move
   - Announce winner
   - Prevent moves after game ends

6. **Add Game Status**
   - Display current player's turn
   - Show winner or draw message
   - Add reset button

7. **Polish & Deploy**
   - Styling and UX improvements
   - Test all edge cases
   - Deploy to GitHub Pages

---

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript ES6+** - Programming language
- **CSS** - Styling
- **GitHub Pages** - Deployment

---

## Key Learnings (Updated as I Build)

### Planning Insights
- Thinking through the problem before coding saves time
- Component architecture design is crucial
- Data structure choice impacts implementation complexity
- Parent components managing state keeps logic centralized

---

## Timeline

- **Started:** February 10, 2026
- **Target Completion:** ~2 weeks (30 min/day habit)

---

**Previous Project:** [Portfolio Website](https://github.com/ignagu/portfolio-website) - [Live Site](https://ignagu.github.io/portfolio-website/)