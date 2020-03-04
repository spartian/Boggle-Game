import { Component } from 'react';
export default class TileData extends Component {
  // TODO: TileData constructor
  constructor(props) {
    super(props);
    this.letter = props.face;
    this.rowId = props.row;
    this.columnId = props.col;
    this.selected = false;
  }

}

