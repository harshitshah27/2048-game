import React from "react";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameController = () => {
  const board = [
    [0, 2, 0, 0],
    [16, 0, 4, 0],
    [8, 0, 256, 128],
    [0, 32, 0, 64],
  ];
  return (
    <div className="board-container">
      <div className="game-board">
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
  );
};

export default GameController;
