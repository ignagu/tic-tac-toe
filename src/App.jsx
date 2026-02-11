import './App.css'
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Don't allow clicking if square is already filled
    if (squares[i]) return;
    
    // Create a copy of squares array
    const nextSquares = squares.slice();
    
    // Set X or O based on whose turn it is
    nextSquares[i] = xIsNext ? 'X' : 'O';
    
    // Update state
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square 
          key={i}
          value={value} 
          onSquareClick={() => handleClick(i)} 
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default App;