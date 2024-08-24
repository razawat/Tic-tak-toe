import PropTypes from "prop-types";

export default function Gameboard({ game, playerTurn }) {
  //console.log(game);
  return (
    <ul id="game-board">
      {game.map((row, i) => {
        return (
          <li key={i}>
            <ul>
              {row.map((col, j) => (
                <li key={j}>
                  <button
                    onClick={() => playerTurn(i, j)}
                    disabled={game[i][j] != null}
                  >
                    {game[i][j]}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

Gameboard.propTypes = {
  game: PropTypes.array.isRequired,
  playerTurn: PropTypes.func.isRequired,
};
