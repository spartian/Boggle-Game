import React from 'react';
import Tile from './Tile';
import './Board.css';

const Board = props => {
  // TODO: Destructure Board props
  const { board } = props;
  return (
    <div className="orange-area">
      {board.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map(tile => {
              return (
                <Tile
                  // TODO: Pass props to describe state of the tile
                  selected={tile.selected}
                  letter={tile.letter}
                  key={tile.columnId}
              
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
