"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface SnakeGameProps {
  rows: number;
  cols: number;
  onClose: () => void;
}

const GAME_SPEED = 120;
const CELL_SIZE = 12;
const CELL_GAP = 3;
const RENDER_FPS = 30;
const RENDER_INTERVAL = 1000 / RENDER_FPS;

const SnakeGame = ({ rows, cols, onClose }: SnakeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundDirtyRef = useRef(true);
  const lastRenderRef = useRef(0);
  const needsRenderRef = useRef(true);
  const colorProbeRef = useRef<HTMLSpanElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const snakeRef = useRef<Position[]>([{ x: 3, y: 3 }]);
  const foodRef = useRef<Position>({ x: 10, y: 3 });
  const directionRef = useRef<Direction>("RIGHT");
  const scoreRef = useRef(0);
  const colorsRef = useRef({
    foreground: "",
    foreground70: "",
    foreground50: "",
    muted: "",
  });

  const generateFood = useCallback(
    (currentSnake: Position[]): Position => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
      } while (
        currentSnake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y,
        )
      );
      return newFood;
    },
    [cols, rows],
  );

  const cellWithGap = CELL_SIZE + CELL_GAP;
  const canvasWidth = cols * cellWithGap - CELL_GAP;
  const canvasHeight = rows * cellWithGap - CELL_GAP;

  const resolveCssColor = useCallback((cssValue: string, alpha = 1) => {
    if (!colorProbeRef.current) {
      const probe = document.createElement("span");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.pointerEvents = "none";
      probe.style.top = "-9999px";
      probe.style.left = "-9999px";
      document.body.appendChild(probe);
      colorProbeRef.current = probe;
    }

    const probe = colorProbeRef.current;
    probe.style.color = cssValue;
    const computed = getComputedStyle(probe).color;

    if (alpha === 1) return computed;

    const match = computed.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/i
    );
    if (!match) return computed;

    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  const updateColors = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    const foreground = style.getPropertyValue("--foreground").trim();
    const muted = style.getPropertyValue("--muted").trim();

    colorsRef.current = {
      foreground: resolveCssColor(foreground),
      foreground70: resolveCssColor(foreground, 0.7),
      foreground50: resolveCssColor(foreground, 0.5),
      muted: resolveCssColor(muted),
    };
    backgroundDirtyRef.current = true;
  }, [resolveCssColor]);

  const ensureBackground = useCallback(() => {
    if (!backgroundDirtyRef.current) {
      const existing = backgroundCanvasRef.current;
      if (
        existing &&
        existing.width === canvasWidth &&
        existing.height === canvasHeight
      ) {
        return;
      }
    }

    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.width = canvasWidth;
    backgroundCanvas.height = canvasHeight;
    const bgCtx = backgroundCanvas.getContext("2d");
    if (!bgCtx) return;

    bgCtx.fillStyle = colorsRef.current.muted;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * cellWithGap;
        const y = row * cellWithGap;
        bgCtx.beginPath();
        bgCtx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 2);
        bgCtx.fill();
      }
    }

    backgroundCanvasRef.current = backgroundCanvas;
    backgroundDirtyRef.current = false;
  }, [canvasWidth, canvasHeight, cols, rows, cellWithGap]);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 3, y: 3 }];
    snakeRef.current = initialSnake;
    foodRef.current = generateFood(initialSnake);
    directionRef.current = "RIGHT";
    setGameOver(false);
    scoreRef.current = 0;
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
    needsRenderRef.current = true;
  }, [generateFood]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ensureBackground();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundCanvas = backgroundCanvasRef.current;
    if (backgroundCanvas) {
      ctx.drawImage(backgroundCanvas, 0, 0);
    }

    const snake = snakeRef.current;
    ctx.fillStyle = colorsRef.current.foreground70;
    for (let i = 1; i < snake.length; i++) {
      const segment = snake[i];
      const x = segment.x * cellWithGap;
      const y = segment.y * cellWithGap;
      ctx.beginPath();
      ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 2);
      ctx.fill();
    }

    if (snake.length > 0) {
      ctx.fillStyle = colorsRef.current.foreground;
      const head = snake[0];
      const x = head.x * cellWithGap;
      const y = head.y * cellWithGap;
      ctx.beginPath();
      ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 2);
      ctx.fill();
    }

    const food = foodRef.current;
    const pulse = Math.sin(Date.now() / 300) * 0.1 + 1;
    const foodSize = CELL_SIZE * pulse;
    const offset = (CELL_SIZE - foodSize) / 2;
    ctx.fillStyle = colorsRef.current.foreground50;
    ctx.beginPath();
    ctx.roundRect(
      food.x * cellWithGap + offset,
      food.y * cellWithGap + offset,
      foodSize,
      foodSize,
      2
    );
    ctx.fill();
  }, [ensureBackground, cellWithGap]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const gameKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "w",
        "a",
        "s",
        "d",
        "W",
        "A",
        "S",
        "D",
      ];
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (gameOver) {
        if (e.key === " " || e.key === "Enter") {
          resetGame();
        }
        return;
      }

      if (!gameStarted) {
        if (e.key === " " || e.key === "Enter") {
          setGameStarted(true);
        }
        return;
      }

      if (e.key === " ") {
        setIsPaused((p) => !p);
        needsRenderRef.current = true;
        return;
      }

      const keyDirections: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
        W: "UP",
        S: "DOWN",
        A: "LEFT",
        D: "RIGHT",
      };

      const newDirection = keyDirections[e.key];
      if (!newDirection) return;

      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposites[newDirection] !== directionRef.current) {
        directionRef.current = newDirection;
      }
    },
    [gameOver, gameStarted, onClose, resetGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    updateColors();
    ensureBackground();
    draw();

    const observer = new MutationObserver(() => {
      updateColors();
      ensureBackground();
      draw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => observer.disconnect();
  }, [updateColors, ensureBackground, draw]);

  useEffect(() => {
    return () => {
      if (colorProbeRef.current?.parentNode) {
        colorProbeRef.current.parentNode.removeChild(colorProbeRef.current);
      }
      colorProbeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) {
      needsRenderRef.current = true;
      draw();
      return;
    }

    let animationFrameId: number;
    let lastMoveTime = 0;

    const gameLoop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(gameLoop);

      if (
        currentTime - lastRenderRef.current >= RENDER_INTERVAL ||
        needsRenderRef.current
      ) {
        draw();
        lastRenderRef.current = currentTime;
        needsRenderRef.current = false;
      }

      if (currentTime - lastMoveTime >= GAME_SPEED) {
        lastMoveTime = currentTime;

        const snake = snakeRef.current;
        const head = snake[0];
        const dir = directionRef.current;

        const newHead: Position = {
          x:
            dir === "LEFT" ? head.x - 1 : dir === "RIGHT" ? head.x + 1 : head.x,
          y: dir === "UP" ? head.y - 1 : dir === "DOWN" ? head.y + 1 : head.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= cols ||
          newHead.y < 0 ||
          newHead.y >= rows
        ) {
          setGameOver(true);
          needsRenderRef.current = true;
          return;
        }

        const snakeWithoutTail = snake.slice(0, -1);
        if (
          snakeWithoutTail.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          needsRenderRef.current = true;
          return;
        }

        const newSnake = [newHead, ...snake];
        const food = foodRef.current;

        if (newHead.x === food.x && newHead.y === food.y) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          foodRef.current = generateFood(newSnake);
          snakeRef.current = newSnake;
          needsRenderRef.current = true;
        } else {
          newSnake.pop();
          snakeRef.current = newSnake;
          needsRenderRef.current = true;
        }
      }
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, gameOver, isPaused, cols, rows, generateFood, draw]);

  useEffect(() => {
    updateColors();
    ensureBackground();
    draw();
  }, [updateColors, ensureBackground, draw]);

  return (
    <div className="relative w-full focus:outline-none" tabIndex={0}>
      <div className="overflow-x-auto py-1">
        <div className="min-w-[700px]">
          {/* Header */}
          <div className="h-4 mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Snake
            </span>
            <span className="text-xs text-muted-foreground">
              Score: {score}
            </span>
          </div>

          {/* Game canvas */}
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] rounded-md"
          >
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                Press Space to Start
              </p>
              <p className="text-xs text-muted-foreground">
                Arrow keys or WASD to move
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaused && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] rounded-md"
          >
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Paused</p>
              <p className="text-xs text-muted-foreground mt-1">
                Space to resume
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px] rounded-md"
          >
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Game Over</p>
              <p className="text-xs text-muted-foreground mt-1">
                Score: {score}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Press Space to restart
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-medium text-muted-foreground sm:tracking-normal tracking-tighter">
          Esc to exit
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Space to pause</span>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
