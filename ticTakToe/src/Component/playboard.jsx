import Player from "./player";
import Gameboard from "./gameboard";
import { useState } from "react";
import { playerSymbol, gameTrack, playerName as pName } from "../data";

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
