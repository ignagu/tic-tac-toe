import { useState, useEffect } from 'react';
import './App.css'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function PlayerSetup({ onStart }) {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const handleStart = () => {
    if (playerX.trim() && playerO.trim()) {
      onStart(playerX.trim(), playerO.trim());
    }
  };

  return (
    <div className="player-setup">
      <h2>Tic-Tac-Toe - Best of 5</h2>
      <div className="input-group">
        <label>Player X Name:</label>
        <input 
          type="text" 
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div className="input-group">
        <label>Player O Name:</label>
        <input 
          type="text" 
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <button onClick={handleStart} disabled={!playerX.trim() || !playerO.trim()}>
        Start Game
      </button>
    </div>
  );
}

function Board({ playerX, playerO, scoreX, scoreO, onGameEnd }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [roundEnded, setRoundEnded] = useState(false);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  useEffect(() => {
    if (winner && !roundEnded) {
      setRoundEnded(true);
      onGameEnd(winner);
    }
  }, [winner, roundEnded, onGameEnd]);

  function handleClick(i) {
    if (squares[i] || winner || roundEnded) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleNextRound() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setRoundEnded(false);
  }

  const currentPlayer = xIsNext ? playerX : playerO;
  const winnerName = winner === 'X' ? playerX : winner === 'O' ? playerO : null;

  return (
    <>
      <div className="scoreboard">
        <div className="score">
          <div className="player-name">{playerX} (X)</div>
          <div className="player-score">{scoreX}</div>
        </div>
        <div className="vs">VS</div>
        <div className="score">
          <div className="player-name">{playerO} (O)</div>
          <div className="player-score">{scoreO}</div>
        </div>
      </div>

      <div className="status">
        {winner 
          ? `${winnerName} wins this round!` 
          : isDraw
          ? "It's a draw!"
          : `${currentPlayer}'s turn`}
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

      {(winner || isDraw) && (
        <button className="reset" onClick={handleNextRound}>
          Next Round
        </button>
      )}
    </>
  );
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const handleStart = (nameX, nameO) => {
    setPlayerX(nameX);
    setPlayerO(nameO);
    setGameStarted(true);
  };

  const handleGameEnd = (winner) => {
    if (winner === 'X') {
      setScoreX(prev => prev + 1);
    } else if (winner === 'O') {
      setScoreO(prev => prev + 1);
    }
  };

  const handleResetTournament = () => {
    setScoreX(0);
    setScoreO(0);
    setGameStarted(false);
    setPlayerX('');
    setPlayerO('');
  };

  const maxScore = 3;
  const tournamentWinner = scoreX >= maxScore ? playerX : scoreO >= maxScore ? playerO : null;

  if (!gameStarted) {
    return <PlayerSetup onStart={handleStart} />;
  }

  if (tournamentWinner) {
    return (
      <div className="tournament-end">
        <h1>🎉 {tournamentWinner} Wins the Tournament! 🎉</h1>
        <div className="final-score">
          <div>{playerX}: {scoreX}</div>
          <div>{playerO}: {scoreO}</div>
        </div>
        <button onClick={() => {
          setScoreX(0);
          setScoreO(0);
        }}>
          Play Again (Same Players)
        </button>
        <button onClick={handleResetTournament}>
          Change Players
        </button>
      </div>
    );
  }

  return (
    <div>
      <Board 
        playerX={playerX}
        playerO={playerO}
        scoreX={scoreX}
        scoreO={scoreO}
        onGameEnd={handleGameEnd}
      />
    </div>
  );
}

export default App;