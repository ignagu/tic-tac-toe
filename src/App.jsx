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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

function Square({ value, onSquareClick, isWinner }) {
  const cls = [
    'square',
    value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '',
    isWinner ? 'square-winner' : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} onClick={onSquareClick}>
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
      <h2>Tic-Tac-Toe</h2>
      <p className="setup-subtitle">Best of 5 — first to 3 wins!</p>
      <div className="input-group">
        <label>Player X</label>
        <input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div className="input-group">
        <label>Player O</label>
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

  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line ?? [];
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
        <div className={`score ${xIsNext && !winner && !isDraw ? 'score-active-x' : ''} ${winner === 'X' ? 'score-winner' : ''}`}>
          <div className="player-name player-name-x">{playerX}</div>
          <div className="player-letter">X</div>
          <div className="player-score">{scoreX}</div>
        </div>
        <div className="vs">VS</div>
        <div className={`score ${!xIsNext && !winner && !isDraw ? 'score-active-o' : ''} ${winner === 'O' ? 'score-winner' : ''}`}>
          <div className="player-name player-name-o">{playerO}</div>
          <div className="player-letter">O</div>
          <div className="player-score">{scoreO}</div>
        </div>
      </div>

      <div className="status">
        {winner
          ? `🎉 ${winnerName} wins this round!`
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
            isWinner={winningLine.includes(i)}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <button className="btn-next" onClick={handleNextRound}>
          Next Round →
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
        <div className="trophy">🏆</div>
        <h1>{tournamentWinner} wins the tournament!</h1>
        <div className="final-score">
          <div className="final-score-row">
            <span className="final-name-x">{playerX}</span>
            <span className="final-num">{scoreX} – {scoreO}</span>
            <span className="final-name-o">{playerO}</span>
          </div>
        </div>
        <div className="tournament-buttons">
          <button onClick={() => { setScoreX(0); setScoreO(0); }}>
            Play Again
          </button>
          <button className="btn-secondary" onClick={handleResetTournament}>
            Change Players
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
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
