import { useEffect, useRef, useState } from "react";
import type { CommandContext } from "../../../../types";
import styles from "./FlappyBird.module.css";
import CaelonUtils from "../../../../CaelonUtils";

const ROWS = 20;

const BIRD = ">";
const PIPE = "|";
const EMPTY = ".";

const GRAVITY = 1;
const FLAP_STRENGTH = -3;

const FPS = 5;
const FRAME_INTERVAL = 1000 / FPS;

const TUBE_GAP = 7;
const TUBE_WIDTH = 2;

const TUBE_SPAWN_INTERVAL = 1800;
const TUBE_MIN_DISTANCE = 14;

const TUBE_SPEED_FACTOR = 0.03;

export default function FlappyBird({}: CommandContext) {
  const preRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [footer, setFooter] = useState("Click on the game to start");

  useEffect(() => {
    const pre = preRef.current;
    const container = containerRef.current;
    if (!pre || !container) return;

    const measure = document.createElement("pre");
    measure.style.cssText =
      "visibility:hidden;position:absolute;font-size:inherit;font-family:inherit";
    measure.textContent = "X";
    document.body.appendChild(measure);

    const charWidth = measure.getBoundingClientRect().width;
    document.body.removeChild(measure);

    const COLS = Math.floor(pre.clientWidth / charWidth);

    const TUBE_SPEED = Math.max(0.3, COLS * TUBE_SPEED_FACTOR);

    const createGrid = () =>
      Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));

    const render = (grid: string[][]) => {
      pre.innerHTML = grid
        .map((row) =>
          row
            .map((cell) => {
              if (cell === BIRD)
                return `<span class="${styles.bird}">${cell}</span>`;
              if (cell === PIPE)
                return `<span class="${styles.pipe}">${cell}</span>`;
              return cell;
            })
            .join(""),
        )
        .join("\n");
    };

    const bird = {
      x: Math.floor(ROWS / 4),
      y: Math.floor(ROWS / 2),
      velocity: 0,
    };

    let started = false;
    let gameOver = false;
    let score = 0;

    let tubes: { x: number; gapY: number; passed: boolean }[] = [];

    let lastFrame = 0;
    let frameId: number;

    const spawnTube = () => {
      const gapY = CaelonUtils.randomRange(2, ROWS - TUBE_GAP - 2, false);
      const x = COLS - 1;

      const last = tubes[tubes.length - 1];
      if (last && x - last.x < TUBE_MIN_DISTANCE) return;

      tubes.push({ x, gapY, passed: false });
    };

    const updateBird = () => {
      bird.velocity += GRAVITY;
      bird.y += Math.sign(bird.velocity) * Math.floor(Math.abs(bird.velocity));

      bird.y = Math.max(0, Math.min(ROWS - 1, bird.y));
    };

    const updateTubes = (grid: string[][]) => {
      for (let i = tubes.length - 1; i >= 0; i--) {
        const tube = tubes[i];
        tube.x -= TUBE_SPEED;

        if (tube.x < 0) {
          tubes.splice(i, 1);
          continue;
        }

        const col = Math.floor(tube.x);
        const colEnd = col + TUBE_WIDTH - 1;

        if (!tube.passed && colEnd < bird.x) {
          tube.passed = true;
          score += 1;
        }

        if (bird.x >= col && bird.x <= colEnd) {
          const inGap = bird.y >= tube.gapY && bird.y < tube.gapY + TUBE_GAP;
          if (!inGap) {
            gameOver = true;
          }
        }

        for (let c = col; c <= colEnd; c++) {
          if (c < 0 || c >= COLS) continue;

          for (let r = 0; r < ROWS; r++) {
            const inGap = r >= tube.gapY && r < tube.gapY + TUBE_GAP;

            if (!inGap) {
              grid[r][c] = PIPE;
            }
          }
        }
      }
    };

    const loop = (t: number) => {
      frameId = requestAnimationFrame(loop);

      if (t - lastFrame < FRAME_INTERVAL) return;
      lastFrame = t;

      const grid = createGrid();

      if (!started) {
        grid[bird.y][bird.x] = BIRD;
        render(grid);
        return;
      }

      if (gameOver) return;

      updateBird();
      updateTubes(grid);

      if (bird.y >= ROWS - 1 || bird.y <= 0) {
        gameOver = true;
      }

      grid[bird.y][bird.x] = BIRD;

      if (gameOver) {
        setFooter(`Game over! Score: ${score}`);
      } else {
        setFooter(`Score: ${score}`);
      }
      render(grid);
    };

    frameId = requestAnimationFrame(loop);

    const spawnInterval = setInterval(() => {
      if (!started || gameOver) return;
      spawnTube();
    }, TUBE_SPAWN_INTERVAL);

    const jump = (e: Event) => {
      e.preventDefault();

      if (gameOver) return;

      started = true;
      bird.velocity = FLAP_STRENGTH;
    };

    container.addEventListener("click", jump);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnInterval);
      container.removeEventListener("click", jump);
    };
  }, []);

  return (
    <div className={`no-keyboard ${styles.container}`} ref={containerRef}>
      <pre ref={preRef} />
      <p>{footer}</p>
    </div>
  );
}
