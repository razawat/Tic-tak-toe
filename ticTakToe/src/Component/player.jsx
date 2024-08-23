import PropTypes from "prop-types";
import { playerSymbol } from "../data";

export default function Player({ name, symbol }) {
  return (
    <ul id="players">
      <li className={symbol === playerSymbol.first ? "active" : ""}>
        <span className="player">
          <span className="player-name">Player 1</span>
          <span className="player-symbol">X</span>
        </span>
        <button type="button">Edit</button>
      </li>

      <li className={symbol === playerSymbol.second ? "active" : ""}>
        <span className="player">
          <span className="player-name">Player 2</span>
          <span className="player-symbol">O</span>
        </span>
        <button type="button">Edit</button>
      </li>
    </ul>
  );
}

// Player.propTypes = {
//   name: PropTypes.string.isRequired,
//   symbol: PropTypes.string.isRequired,
// };
