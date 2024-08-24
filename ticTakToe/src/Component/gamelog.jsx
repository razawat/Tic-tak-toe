import PropTypes from "prop-types";

export default function GameLog({ logs }) {
  //   if (logs.length > 0) {
  //     console.log(
  //       logs,
  //       console.log(`${logs[0].coordinate.x}${logs[0].coordinate.y}`)
  //     );
  //   }

  return (
    <ul id="log">
      {logs.map((val) => (
        <li
          key={`${val.coordinate.x}${val.coordinate.y}`}
        >{`${val.playerSymbol} has selected ${val.coordinate.x},${val.coordinate.y}`}</li>
      ))}
    </ul>
  );
}

GameLog.propTypes = {
  logs: PropTypes.array.isRequired,
};
