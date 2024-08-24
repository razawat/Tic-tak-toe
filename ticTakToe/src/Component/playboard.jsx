import Player from "./player";
import Gameboard from "./gameboard";
import { useState } from "react";
import {
  playerSymbol,
  gameTrack,
  playerName as pName,
  winningCombination,
} from "../data";

export default function Playboard() {
  const [matchStatus, updateMatchStatus] = useState({
    activeSymbol: playerSymbol.first,
    gameTrack: gameTrack,
  });

  const [playerName, updatePlayerName] = useState(pName);

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
      const winner = handleMatchWinner(updateTrack);
      if (winner) {
        console.log(
          "Winner: ",
          matchStatus.activeSymbol,
          matchStatus.gameTrack,
          winner
        );
      }
      return {
        ...prevValue,
        activeSymbol: updateSymbol,
        gameTrack: updateTrack,
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

  function handleMatchWinner(updatedGameTrack) {
    const gameTrack = updatedGameTrack;
    for (let i = 0; i < winningCombination.length; i++) {
      const firstRow = winningCombination[i][0].row;
      const firstCol = winningCombination[i][0].column;

      const secondRow = winningCombination[i][1].row;
      const secondCol = winningCombination[i][1].column;

      const thirdRow = winningCombination[i][2].row;
      const thirdCol = winningCombination[i][2].column;

      if (
        gameTrack[firstRow][firstCol] !== null &&
        gameTrack[secondRow][secondCol] !== null &&
        gameTrack[thirdRow][thirdCol] !== null &&
        gameTrack[firstRow][firstCol] === gameTrack[secondRow][secondCol] &&
        gameTrack[secondRow][secondCol] === gameTrack[thirdRow][thirdCol]
      ) {
        console.log(
          gameTrack[firstRow][firstCol],
          gameTrack[secondRow][secondCol],
          gameTrack[thirdRow][thirdCol]
        );
        return matchStatus.activeSymbol === playerSymbol.first
          ? playerName.first
          : playerName.second;
        //return true;
      }
    }
    return false;
  }

  return (
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
        <Gameboard game={matchStatus.gameTrack} playerTurn={handlePlayerTurn} />
      </div>
    </div>
  );
}
