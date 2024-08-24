import PropTypes from "prop-types";

export default function MatchResult({ message }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{message}</p>
      <button type="button">Re-match</button>
    </div>
  );
}

MatchResult.propTypes = {
  message: PropTypes.string.isRequired,
};
