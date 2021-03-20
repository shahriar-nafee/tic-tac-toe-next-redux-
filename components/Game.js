import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { calculateWinner } from "./helper";
import Board from "./Board";
import {
  boardReset,
  fullBoard,
  handleText,
  storeGameSingleResult,
} from "../_redux/gameAction";
import Link from "next/link";

const Game = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.game.test);
  const activeGameNo = useSelector((state) => state.game.activeGameNo);
  const scores = useSelector((state) => state.game.scores);
  const playerName = useSelector((state) => state.game.playerName);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(boards);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    if (winner || boards[i]) return;
    dispatch(handleText(xO, i));
    setXisNext(!xIsNext);
  };

  const resetGame = () => {
    dispatch(boardReset());
    setXisNext(true);
  };

  useEffect(() => {
    dispatch(fullBoard());
  }, []);

  console.log("activeGameNo", activeGameNo);

  /**
   * When Winner is done for a game.
   */
  useEffect(() => {
    console.log(winner);

    const scoreData = {
      gameNo: activeGameNo,
      player1Score: winner === "X" ? 2 : 1,
      player1Name: playerName.firstPlayer,
      player2Score: winner === "O" ? 2 : 1,
      player2Name: playerName.secondPlayer,
    };

    if (scoreData.player1Score === 1 && scoreData.player2Score === 1) {
    } else {
      dispatch(storeGameSingleResult(scoreData));
    }
  }, [winner]);

  return (
    <>
      <h1>TIC-TAC-TOE GAME (Next.Js)</h1>
      {activeGameNo > 5 && <div>Game Finished. Please ...</div>}

      {activeGameNo <= 5 && (
        <div>
          <Board squares={boards} onClick={handleClick} />
          <div className="info-wrapper">
            <div>
              <button onClick={resetGame}>PLAY AGAIN</button>
            </div>
            <h3>
              {winner
                ? "Winner: " +
                  (winner === "X"
                    ? playerName.firstPlayer
                    : playerName.secondPlayer)
                : "Next Player: " +
                  (xO === "X"
                    ? playerName.firstPlayer
                    : playerName.secondPlayer)}
            </h3>
          </div>
        </div>
      )}

      <div>
        <h2>Result</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Game No</th>
              <th>Player 1</th>
              <th>Player 1 Point</th>
              <th>Player 2</th>
              <th>Player 2 Point</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.gameNo}</td>
                <td>{score.player1Name}</td>
                <td>{score.player1Score}</td>
                <td>{score.player2Name}</td>
                <td>{score.player2Score}</td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Game;
