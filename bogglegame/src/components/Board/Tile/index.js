import React from 'react';
import './Tile.css';

const Tile = props => {
  // TODO: Destructure Tile props
  const { selected, letter } = props;

function handleOnClickEvent()
{
  alert("Sorry! You need to type the letters. Clicking letters funcitonality is not available for now.");
}


  return (
    <button
      className={selected ? 'tile-selected' : 'tile'} 
      onClick={handleOnClickEvent}
    >
      {letter}
    </button>
  );
};

export default Tile;
