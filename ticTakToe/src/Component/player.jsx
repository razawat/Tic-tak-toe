import PropTypes from "prop-types";
import { useState, useRef } from "react";

export default function Player({ name, symbol, activeSymbol,handleName }) {
  // console.log('In Player component');
  const [editMode, setEditMode] = useState(false);
  const containPlayerName = useRef();
  function handlePlayerName() {
   
    if (editMode) {
        const val = containPlayerName.current?.value;
        handleName(val,symbol);
      //console.log("player Name", val);
    }
     setEditMode(!editMode);
  }

  return (
    <li className={symbol === activeSymbol ? "active" : ""}>
      <span className="player">
        {!editMode && <span className="player-name">{name}</span>}
        {editMode && <input type="text" ref={containPlayerName} defaultValue={name}/>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button type="button" onClick={handlePlayerName}>
        {editMode ? "Save" : "Edit"}
      </button>
    </li>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  activeSymbol: PropTypes.string.isRequired,
  handleName:PropTypes.func.isRequired
};
