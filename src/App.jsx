import { useState } from 'react';
import './App.css'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Returns 'X' or 'O'
    }
  }
  return null; // No winner
}

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
    // Check if game is already won or square is filled
    if (squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="status">
        {calculateWinner(squares) 
          ? `Winner: ${calculateWinner(squares)}!` 
          : squares.every(square => square !== null)
          ? "It's a draw!"
          : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {squares.map((value, i) => (
          <Square 
            key={i}
            value={value} 
            onSquareClick={() => handleClick(i)} 
          />
        ))}
      </div>
      {(calculateWinner(squares) || squares.every(square => square !== null)) && (
        <button className="reset" onClick={() => {
          setSquares(Array(9).fill(null));
          setXIsNext(true);
        }}>
          New Game
        </button>
      )}
    </>
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