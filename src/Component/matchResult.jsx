import PropTypes from "prop-types";

export default function MatchResult({ message,reMatch }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{message}</p>
      <button type="button" onClick={reMatch}>Re-match</button>
    </div>
  );
}

MatchResult.propTypes = {
  message: PropTypes.string.isRequired,
  reMatch:PropTypes.func.isRequired,
};
