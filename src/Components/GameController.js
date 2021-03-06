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
import { saveLastUserMove, saveUserCurrentMove } from "Actions/boardActions";
import { connect } from "react-redux";
import { FaUndoAlt, FaSync, FaRedoAlt } from "react-icons/fa";

// UI for cell
const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameController = (props) => {
  // hook for board
  const leadScore = localStorage.getItem("bestScore");
  const [board, updateBoard] = useState(
    props.userCurrentMove
      ? props.userCurrentMove
      : generateRandom(getEmptyBoard())
  );
  const [checkGameOver, setcheckGameOver] = useState(false);
  const [currentScore, setcurrentScore] = useState(0);
  const [bestScore, setbestScore] = useState(
    leadScore ? leadScore : currentScore
  );

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
    props.saveLastUserMove(board);
    props.saveUserCurrentMove(newBoard);
    calculateScore();
    checkEndGame();
  };

  // on click right arrow key
  const onClickRight = () => {
    const newBoard = moveRight(board);
    updateBoard(generateRandom(newBoard));
    props.saveLastUserMove(board);
    props.saveUserCurrentMove(newBoard);
    calculateScore();
    checkEndGame();
  };

  // on click Up arrow key
  const onClickUp = () => {
    const newBoard = moveUp(board);
    updateBoard(generateRandom(newBoard));
    props.saveLastUserMove(board);
    props.saveUserCurrentMove(newBoard);
    calculateScore();
    checkEndGame();
  };

  // on click Down arrow key
  const onClickDown = () => {
    const newBoard = moveDown(board);
    updateBoard(generateRandom(newBoard));
    props.saveLastUserMove(board);
    props.saveUserCurrentMove(newBoard);
    calculateScore();
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
    calculateScore();
    props.saveUserCurrentMove(board);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  // on reset board
  const onResetBoard = () => {
    updateBoard(generateRandom(getEmptyBoard()));
    setcheckGameOver(false);
    props.saveUserCurrentMove(board);
  };

  // on undo click
  const UndoAction = () => {
    updateBoard(props.userLastMove);
  };

  // on redo click
  const RedoAction = () => {
    updateBoard(props.userCurrentMove);
  };

  // calculate Score of board
  const calculateScore = () => {
    const newArray = Array.prototype.concat.apply([], board);
    const sum = newArray.reduce((a, b) => a + b, 0);
    setcurrentScore(sum);
    if (!leadScore) {
      setbestScore(currentScore);
      localStorage.setItem("bestScore", currentScore);
    } else if (currentScore > leadScore) {
      setbestScore(currentScore);
      localStorage.setItem("bestScore", currentScore);
    } else {
      setbestScore(leadScore);
      localStorage.setItem("bestScore", leadScore);
    }
  };

  return (
    <>
      <div className="board-container">
        <div
          className="game-board"
          style={{ opacity: checkGameOver ? 0.5 : 1 }}
        >
          <div className="header-container">
            <div>
              <h1 className="title">2048</h1>
              <p className="subtitle">
                Join the numbers and get{" "}
                <span style={{ fontWeight: "bold" }}>2048 tile!</span>
              </p>
            </div>
            <div className="score-card">
              <h3 className="score-title">Score</h3>
              <p className="score-subtitle">{currentScore}</p>
            </div>
            <div className="score-card">
              <h3 className="score-title">Best </h3>
              <p className="score-subtitle">{bestScore}</p>
            </div>
          </div>
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
      <div className="button-container">
        <div>
          <button
            onClick={UndoAction}
            disabled={props.userLastMove ? false : true}
          >
            <FaUndoAlt size="20px" />
            <div> Undo</div>
          </button>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <button onClick={onResetBoard}>
            <FaSync size="20px" />
            <div> Reset</div>
          </button>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <button
            onClick={RedoAction}
            disabled={props.userCurrentMove ? false : true}
          >
            <FaRedoAlt size="20px" />
            <div>Redo</div>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userLastMove: state.board.lastMove,
    userCurrentMove: state.board.currentMove,
  };
};

export default connect(mapStateToProps, {
  saveLastUserMove,
  saveUserCurrentMove,
})(GameController);
