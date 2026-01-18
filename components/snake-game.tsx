"use client";

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

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

// Memoized cell component to prevent unnecessary rerenders
const Cell = memo(function Cell({
  isHead,
  isBody,
  isFoodCell,
}: {
  isHead: boolean;
  isBody: boolean;
  isFoodCell: boolean;
}) {
  // Only use motion.div for food cell (which animates), regular div otherwise
  if (isFoodCell) {
    return (
      <motion.div
        className="aspect-square rounded-[2px] bg-foreground/50"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        "aspect-square rounded-[2px] transition-colors duration-75",
        isHead && "bg-foreground",
        isBody && "bg-foreground/70",
        !isHead && !isBody && "bg-muted",
      )}
    />
  );
});

const SnakeGame = ({ rows, cols, onClose }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 3, y: 3 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const directionRef = useRef<Direction>("RIGHT");
  const gameContainerRef = useRef<HTMLDivElement>(null);

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

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 3, y: 3 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  }, [generateFood]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent page scrolling for game keys
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
    [gameOver, gameStarted, onClose, resetGame],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const dir = directionRef.current;

        const newHead: Position = {
          x:
            dir === "LEFT" ? head.x - 1 : dir === "RIGHT" ? head.x + 1 : head.x,
          y: dir === "UP" ? head.y - 1 : dir === "DOWN" ? head.y + 1 : head.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= cols ||
          newHead.y < 0 ||
          newHead.y >= rows
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y,
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused, food, cols, rows, generateFood]);

  useEffect(() => {
    gameContainerRef.current?.focus();
  }, []);

  // O(1) lookup Set for snake body positions - avoids O(n) iteration per cell
  const snakeBodySet = useMemo(() => {
    const set = new Set<string>();
    for (let i = 1; i < snake.length; i++) {
      set.add(`${snake[i].x},${snake[i].y}`);
    }
    return set;
  }, [snake]);

  const head = snake[0];

  return (
    <div
      ref={gameContainerRef}
      className="relative w-full focus:outline-none"
      tabIndex={0}
    >
      <div className="overflow-x-auto py-1">
        <div className="min-w-[700px]">
          {/* Header row matching month labels height */}
          <div className="h-4 mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Snake
            </span>
            <span className="text-xs text-muted-foreground">
              Score: {score}
            </span>
          </div>

          {/* Game grid */}
          <div className="grid grid-flow-col auto-cols-fr gap-[3px] w-full">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className="grid grid-rows-7 gap-[3px]">
                {Array.from({ length: rows }).map((_, rowIndex) => {
                  const isHead = head?.x === colIndex && head?.y === rowIndex;
                  const isBody = snakeBodySet.has(`${colIndex},${rowIndex}`);
                  const isFoodCell = food.x === colIndex && food.y === rowIndex;

                  return (
                    <Cell
                      key={`${colIndex}-${rowIndex}`}
                      isHead={isHead}
                      isBody={isBody}
                      isFoodCell={isFoodCell}
                    />
                  );
                })}
              </div>
            ))}
          </div>
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
