import Player from "./player";
import Gameboard from "./gameboard";
import GameLog from "./gamelog";
import { useState, useEffect } from "react";
import {
  playerSymbol,
  gameTrack as gT,
  playerName as pName,
  winningCombination,
} from "../data";
import MatchResult from "./matchResult";

export default function Playboard() {
  //  console.log('In Playboard',gT);
  const [matchStatus, updateMatchStatus] = useState({
    activeSymbol: playerSymbol.first,
    gameTrack: gT.map((row) => [...row]),
    playCount: 0,
    logs: [],
  });
  const [result, showResult] = useState(null);
  const [playerName, updatePlayerName] = useState(pName);

  useEffect(() => {
    const winner = handleMatchWinner();

    if (winner) {
      const winningPlayer = matchStatus.activeSymbol !== playerSymbol.first ? playerName.first: playerName.second;
      console.log(winningPlayer);
      showResult(`${winningPlayer} is winner!!!`);
    } else {
      handleMatchDraw();
    }
  }, [matchStatus.playCount]);

  //console.log(handleMatchDraw());

  function handlePlayerTurn(rowIndex, colIndex) {
    //console.log("turn: ", row, col);
    updateMatchStatus((prevValue) => {
      const updateSymbol =
        prevValue.activeSymbol === playerSymbol.first
          ? playerSymbol.second
          : playerSymbol.first;
      const updateTrack = prevValue.gameTrack.map((row, i) =>
        row.map((col, j) =>
          i === rowIndex && j === colIndex ? prevValue.activeSymbol : col
        )
      );
      const myLog = {
        playerSymbol: prevValue.activeSymbol,
        coordinate: { x: rowIndex, y: colIndex },
      };
      // console.log(myLog);
      return {
        ...prevValue,
        activeSymbol: updateSymbol,
        gameTrack: updateTrack,
        playCount: prevValue.playCount + 1,
        logs: [myLog, ...prevValue.logs],
      };
    });
  }

  function handlePlayerName(player, symbol) {
    updatePlayerName((prevValue) => {
      console.log(symbol, player);
      return symbol === playerSymbol.first
        ? { ...prevValue, first: player }
        : { ...prevValue, second: player };
    });
  }

  function handleMatchWinner() {
    const gameTrack = matchStatus.gameTrack;
    // for (let i = 0; i < winningCombination.length; i++) {
    //   const firstRow = winningCombination[i][0].row;
    //   const firstCol = winningCombination[i][0].column;

    //   const secondRow = winningCombination[i][1].row;
    //   const secondCol = winningCombination[i][1].column;

    //   const thirdRow = winningCombination[i][2].row;
    //   const thirdCol = winningCombination[i][2].column;

    //   if (
    //     gameTrack[firstRow][firstCol] !== null &&
    //     gameTrack[secondRow][secondCol] !== null &&
    //     gameTrack[thirdRow][thirdCol] !== null &&
    //     gameTrack[firstRow][firstCol] === gameTrack[secondRow][secondCol] &&
    //     gameTrack[secondRow][secondCol] === gameTrack[thirdRow][thirdCol]
    //   ) {
    //     console.log(
    //       gameTrack[firstRow][firstCol],
    //       gameTrack[secondRow][secondCol],
    //       gameTrack[thirdRow][thirdCol]
    //     );
    //     // console.log(
    //     //   "Winner: ",
    //     //   matchStatus.activeSymbol,
    //     //   matchStatus.gameTrack,
    //     //   matchStatus.activeSymbol === playerSymbol.first
    //     //     ? playerName.first
    //     //     : playerName.second
    //     // );
    //     return matchStatus.activeSymbol !== playerSymbol.first
    //       ? playerName.first
    //       : playerName.second;
    //     //return true;
    //   }
    // }
    // return false;
    return winningCombination.some(
      (val) =>
        gameTrack[val[0].row][val[0].column] != null &&
        gameTrack[val[0].row][val[0].column] === gameTrack[val[1].row][val[1].column] &&
        gameTrack[val[1].row][val[1].column] === gameTrack[val[2].row][val[2].column]
    );
  }

  function handleMatchDraw() {
    // console.log(matchStatus.playCount);
    const result =
      matchStatus.playCount === gT.length * gT[0].length ? true : false;
    if (result) {
      showResult("It's Draw!!!");
    }
  }

  function handleReMatch() {
    updateMatchStatus(() => {
      return {
        activeSymbol: playerSymbol.first,
        gameTrack: gT.map((row) => [...row]),
        // gameTrack: gT,
        playCount: 0,
        logs: [],
      };
    });
    showResult(null);
  }

  return (
    <>
      <div id="playboard">
        <div>
          <ul id="players">
            <Player
              name={playerName.first}
              symbol={playerSymbol.first}
              activeSymbol={matchStatus.activeSymbol}
              handleName={handlePlayerName}
            />
            <Player
              name={playerName.second}
              symbol={playerSymbol.second}
              activeSymbol={matchStatus.activeSymbol}
              handleName={handlePlayerName}
            />
          </ul>
          {/* <Player name={playerName} symbol={matchStatus.activeSymbol} /> */}
          <Gameboard
            game={matchStatus.gameTrack}
            playerTurn={handlePlayerTurn}
          />
        </div>
        {result && <MatchResult message={result} reMatch={handleReMatch} />}
      </div>
      <GameLog logs={matchStatus.logs} />
    </>
  );
}
