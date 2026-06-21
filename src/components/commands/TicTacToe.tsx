import { useEffect, useState } from "react";
import styles from "./TicTacToe.module.css";
import type { CommandMetadata } from "../../types";

type Cell = "X" | "O" | null;
type Mark = "X" | "O";

const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe({ args }: CommandMetadata) {
  const spectate = args?.includes("--spectate") ?? false;

  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Mark>("X");
  const [winCells, setWinCells] = useState<number[]>([]);
  const [isDraw, setIsDraw] = useState(false);

  const winner = winCells.length ? board[winCells[0]] : null;
  const gameOver = winCells.length > 0 || isDraw;

  useEffect(() => {
    if (gameOver) {
      if (spectate) {
        const restart = setTimeout(() => {
          setBoard(Array(9).fill(null));
          setTurn("X");
          setWinCells([]);
          setIsDraw(false);
        }, 1500);
        return () => clearTimeout(restart);
      }
      return;
    }

    const aiTurn = spectate || turn === "O";
    if (!aiTurn) return;

    const timer = setTimeout(() => {
      const move = getBestMove(board, turn);
      applyMove(move, turn);
    }, 400);
    return () => clearTimeout(timer);
  }, [board, turn, gameOver, spectate]);

  function applyMove(i: number, mark: Mark) {
    const next = board.slice();
    next[i] = mark;

    const result = checkWin(next);
    if (result.didWin) {
      setBoard(next);
      setWinCells(result.winCell);
      return;
    }

    if (next.every(Boolean)) {
      setBoard(next);
      setIsDraw(true);
      return;
    }

    setBoard(next);
    setTurn(mark === "X" ? "O" : "X");
  }

  function handleClick(i: number) {
    if (spectate || board[i] || gameOver || turn !== "X") return;
    applyMove(i, "X");
  }

  const footer = gameOver
    ? winner
      ? `${winner} won `
      : "Draw."
    : spectate
      ? `${turn} thinking...`
      : turn === "X"
        ? "Your turn."
        : "AI's turn.";

  return (
    <div className={styles.parent}>
      <div className={styles.frame}>
        <div className={styles.board}>
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`${styles.cell} ${winCells.includes(i) ? styles.winCell : ""}`}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      <p>{footer}</p>
    </div>
  );
}

function checkWin(board: Cell[]): {
  didWin: boolean;
  winCell: number[];
  winner: Cell;
} {
  for (const [a, b, c] of winMatrix) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { didWin: true, winCell: [a, b, c], winner: board[a] };
    }
  }
  return { didWin: false, winCell: [], winner: null };
}

function emptyCells(board: Cell[]): number[] {
  return board
    .map((v, i) => (v === null ? i : null))
    .filter((v): v is number => v !== null);
}

function opponentOf(mark: Mark): Mark {
  return mark === "X" ? "O" : "X";
}

function minimax(
  board: Cell[],
  depth: number,
  currentMark: Mark,
  aiMark: Mark,
): number {
  const result = checkWin(board);
  if (result.didWin) {
    return result.winner === aiMark ? 10 - depth : depth - 10;
  }

  const empty = emptyCells(board);
  if (empty.length === 0) return 0;

  const isAiTurn = currentMark === aiMark;
  let best = isAiTurn ? -Infinity : Infinity;

  for (const i of empty) {
    const sim = board.slice();
    sim[i] = currentMark;
    const score = minimax(sim, depth + 1, opponentOf(currentMark), aiMark);
    best = isAiTurn ? Math.max(best, score) : Math.min(best, score);
  }

  return best;
}

function randomFrom(options: number[]): number {
  return options[Math.floor(Math.random() * options.length)];
}

const MISTAKE_CHANCE = 0.2;

function getBestMove(board: Cell[], mark: Mark): number {
  const empty = emptyCells(board);

  if (Math.random() < MISTAKE_CHANCE) {
    return randomFrom(empty);
  }

  let bestScore = -Infinity;
  const scored: { i: number; score: number }[] = [];

  for (const i of empty) {
    const sim = board.slice();
    sim[i] = mark;
    const score = minimax(sim, 1, opponentOf(mark), mark);
    scored.push({ i, score });
    if (score > bestScore) bestScore = score;
  }

  const bestMoves = scored.filter((s) => s.score === bestScore).map((s) => s.i);
  return randomFrom(bestMoves);
}
