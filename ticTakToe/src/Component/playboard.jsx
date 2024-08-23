import Player from "./player";
import Gameboard from "./gameboard";
import { useState } from "react";
import { playerSymbol,gameTrack } from "../data";


export default function Playboard() {
  const [matchStatus, updateMatchStatus] = useState({
    activeSymbol: playerSymbol.first,
    gameTrack: gameTrack,
  });

  function handlePlayerTurn(rowIndex, colIndex) {
    //console.log("turn: ", row, col);
    updateMatchStatus((prevValue) => {
      const updateSymbol =
        prevValue.activeSymbol === playerSymbol.first
          ? playerSymbol.second
          : playerSymbol.first;
      const updateTrack = prevValue.gameTrack.map((row, i) =>
        row.map((col, j) =>
          i === rowIndex && j === colIndex ? updateSymbol : col
        )
      );
      return {
        ...prevValue,
        activeSymbol: updateSymbol,
        gameTrack: updateTrack,
      };
    });
  }
  return (
    <div id="playboard">
      <div>
        <Player name="first" symbol={matchStatus.activeSymbol} />
        <Gameboard game={matchStatus.gameTrack} playerTurn={handlePlayerTurn} />
      </div>
    </div>
  );
}
