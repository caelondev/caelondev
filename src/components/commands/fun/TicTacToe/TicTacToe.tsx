import { useEffect, useState } from "react";
import styles from "./TicTacToe.module.css";
import type { CommandContext } from "../../../../types";
import CaelonUtils from "../../../../CaelonUtils";

type Cell = "X" | "O" | "";

// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8

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

const PLAYER = "X";
const AI = "O";

function createBoard(): Cell[][] {
  return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""));
}

export default function TicTacToe({}: CommandContext) {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [turn, setTurn] = useState<"X" | "O">(PLAYER);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [isDraw, setIsDraw] = useState(false);

  const gameOver = winningCells.length > 0 || isDraw;

  function applyMove(row: number, col: number, mark: "X" | "O") {
    const next = board.map((r) => [...r]);
    next[row][col] = mark;
    setBoard(next);

    const { won, cells } = checkWin(next, winMatrix);
    if (won) {
      setWinningCells(cells);
      return;
    }

    if (next.flat().every((cell) => cell !== "")) {
      setIsDraw(true);
      return;
    }

    setTurn(mark === PLAYER ? AI : PLAYER);
  }

  function setCell(row: number, col: number) {
    if (turn !== PLAYER || board[row][col] !== "" || gameOver) return;
    applyMove(row, col, PLAYER);
  }

  useEffect(() => {
    if (turn !== AI || gameOver) return;

    const timeout = setTimeout(() => {
      const cell = getBestCell(board, winMatrix);
      if (cell !== null) applyMove(Math.floor(cell / 3), cell % 3, AI);
    }, 400); // small delay so it doesn't feel instant/robotic

    return () => clearTimeout(timeout);
  }, [turn, board, gameOver]);

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div className={styles.board}>
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isWinner = winningCells.includes(r * 3 + c);
            return (
              <button
                key={`${r}-${c}`}
                className={`${styles.cell} ${isWinner ? styles.winner : ""} ${isDraw ? styles.draw : ""}`}
                onClick={() => setCell(r, c)}
                disabled={gameOver || cell !== "" || turn !== PLAYER}
              >
                {cell}
              </button>
            );
          }),
        )}
      </div>
      {!gameOver && <p>{turn === PLAYER ? "Your" : "AI's"} turn</p>}
      {isDraw && <p>Draw!</p>}
    </div>
  );
}

function checkWin(
  board: Cell[][],
  winMatrix: number[][],
): { won: boolean; cells: number[] } {
  const flatBoard = board.flat();

  for (const [a, b, c] of winMatrix) {
    const cellA = flatBoard[a];
    if (cellA !== "" && cellA === flatBoard[b] && cellA === flatBoard[c]) {
      return { won: true, cells: [a, b, c] };
    }
  }

  return { won: false, cells: [] };
}

// AI Logic ---

function getBestCell(board: Cell[][], winMatrix: number[][]): number | null {
  const flatBoard = board.flat();
  const emptyCells = flatBoard
    .map((cell, i) => (cell === "" ? i : -1))
    .filter((i) => i !== -1);

  if (emptyCells.length === 0) return null;

  const winningMove = findCompletingMove(AI, flatBoard, winMatrix);
  if (winningMove !== null) return winningMove;

  const blockingMove = findCompletingMove(PLAYER, flatBoard, winMatrix);
  if (blockingMove !== null && Math.random() < 0.5) {
    return blockingMove;
  }

  return getHeuristicCell(emptyCells, flatBoard, winMatrix);
}

function findCompletingMove(
  symbol: "X" | "O",
  flatBoard: Cell[],
  winMatrix: number[][],
): number | null {
  for (const line of winMatrix) {
    const marks = line.map((i) => flatBoard[i]);
    const symbolCount = marks.filter((m) => m === symbol).length;

    if (symbolCount === 2 && marks.includes("")) {
      return line[marks.indexOf("")];
    }
  }
  return null;
}

function getHeuristicCell(
  emptyCells: number[],
  flatBoard: Cell[],
  winMatrix: number[][],
): number {
  const scores = new Map<number, number>();
  emptyCells.forEach((cell) => scores.set(cell, 0));

  for (const line of winMatrix) {
    if (isUsedByPlayer(line, flatBoard)) continue; // dead line

    const aiCount = line.filter((i) => flatBoard[i] === AI).length;
    const bias = aiCount + 1;

    for (const i of line) {
      if (flatBoard[i] === "") {
        scores.set(i, (scores.get(i) ?? 0) + bias);
      }
    }
  }

  const best = Math.max(...scores.values());
  const bestCells = [...scores.entries()]
    .filter(([, score]) => score === best)
    .map(([cell]) => cell);

  return bestCells[CaelonUtils.randomRange(0, bestCells.length)];
}

function isUsedByPlayer(line: number[], flatBoard: Cell[]): boolean {
  return line.some((i) => flatBoard[i] === PLAYER);
}
