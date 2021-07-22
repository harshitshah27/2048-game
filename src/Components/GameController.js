import React, { useEffect, useState } from "react";
import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isGameOver,
  checkWin,
} from "Utils/boardLogic";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameController = () => {
  // hook for board
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
  const [checkGameOver, setcheckGameOver] = useState(false);

  // check whether the game is over or user wins the game!
  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You win!");
    } else if (isGameOver(board)) {
      console.log("Game over!");
      setcheckGameOver(true);
    }
  };

  // on click left arrow key
  const onClickleft = () => {
    const newBoard = moveLeft(board);
    updateBoard(generateRandom(newBoard));
    console.log(`updateBoard`, newBoard);
    checkEndGame();
  };

  // on click right arrow key
  const onClickRight = () => {
    const newBoard = moveRight(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  // on click Up arrow key
  const onClickUp = () => {
    const newBoard = moveUp(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  // on click Down arrow key
  const onClickDown = () => {
    const newBoard = moveDown(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const onKeyDown = (e) => {
    // console.log(`e.key`, e.key);
    switch (e.key) {
      case "ArrowLeft":
        onClickleft();
        break;
      case "ArrowRight":
        onClickRight();
        break;
      case "ArrowUp":
        onClickUp();
        break;
      case "ArrowDown":
        onClickDown();
        break;

      default:
    }
  };

  // on load add key event handlers
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const onResetBoard = () => {
    updateBoard(generateRandom(getEmptyBoard()));
    setcheckGameOver(false);
  };

  return (
    <>
      <div className="board-container">
        <div
          className="game-board"
          style={{ opacity: checkGameOver ? 0.5 : 1 }}
        >
          {board.map((row, i) => {
            return (
              <div key={`row-${i}`} className="row">
                {row.map((cell, j) => (
                  <Cell key={`cell-${i}-${j}`} number={cell} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {checkGameOver && (
        <div className="game-over">
          <h1>Game Over!!</h1>
        </div>
      )}
      <button onClick={onResetBoard}>Reset your game</button>
    </>
  );
};

export default GameController;
