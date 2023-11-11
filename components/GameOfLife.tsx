import React, { useState, useEffect } from 'react';

const generateEmptyBoard = (): boolean[][] => {
  const board: boolean[][] = [];
  for (let y = 0; y < 50; y++) {
    board[y] = [];
    for (let x = 0; x < 50; x++) {
      board[y][x] = false;
    }
  }
  return board;
};

const generateRandomBoard = (): boolean[][] => {
  const board: boolean[][] = [];
  for (let y = 0; y < 50; y++) {
    board[y] = [];
    for (let x = 0; x < 50; x++) {
      board[y][x] = Math.random() >= 0.5;
    }
  }
  return board;
};

const GameOfLife = () => {
  const [board, setBoard] = useState<boolean[][]>(() => generateRandomBoard());

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard(oldBoard => {
        const newBoard = generateEmptyBoard();

        for (let y = 0; y < 50; y++) {
          for (let x = 0; x < 50; x++) {
            const neighbours = [
              [y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
              [y, x - 1], [y, x + 1],
              [y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
            ].filter(([y, x]) => y >= 0 && y < 50 && x >= 0 && x < 50);

            const aliveNeighbours = neighbours.filter(([y, x]) => oldBoard[y][x]).length;
            if (oldBoard[y][x] && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
              newBoard[y][x] = true;
            } else if (!oldBoard[y][x] && aliveNeighbours === 3) {
              newBoard[y][x] = true;
            }
          }
        }

        return newBoard;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-of-life">
      {board.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <div key={x} className={`cell ${cell ? 'alive' : 'dead'}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameOfLife;