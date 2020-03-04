import  TileData  from '../data';


const noOfCharinEachElementOfArray = 6;
const boardDimension = 4;
const totalFacesOrCharacters = [];

function createTwoDimensionalBoard(rowsAndColumns)
{
const tempBoard = new Array(rowsAndColumns).fill('').map(() => new Array(rowsAndColumns).fill(''));
return tempBoard;
}


function randomlySelectedElementOfSplicedElement (element) 
{
  let randomIndex = element.split('')[Math.floor(Math.random() * noOfCharinEachElementOfArray)];
  return randomIndex;
}

function shuffleGrid (grid) 
{
  let len = grid.length - 1;
  for (let i = 0; i <= len; i++) {
    const randomlySelectedIndex = Math.floor(Math.random() * (len+1)); // random from 0 -> 16
    [grid[i], grid[randomlySelectedIndex]] = [grid[randomlySelectedIndex], grid[i]];
  }
  return grid;
}

export const shuffledGrid = () => {
  //  Create 1D array with dice
  //  Shuffle the dice
  //  Create 2D array with an empty board
  //  Randomly select from the 1D array
  //  Insert in the board and randomly pick a face

  const grid = [
    'aeaneg',
    'ahspco',
    'aspffk',
    'objoab',
    'iotmuc',
    'ryvdel',
    'lreixd',
    'eiunes',
    'wngeeh',
    'lnhnrz',
    'tstiyd',
    'owtoat',
    'erttyl',
    'toessi',
    'terwhv',
    'nuihmq'
  ];


  const board = createTwoDimensionalBoard(boardDimension);

  const shuffleElementsOfGrid = shuffleGrid(grid);
  
 

  for (let row = 0; row < boardDimension; row++) {
    for (let col = 0; col < boardDimension; col++) {
      //Here shuffledGrid.shift can also be used
      let splicedElement = shuffleElementsOfGrid.splice(0,1);
      let grid = splicedElement[0];
      let face = randomlySelectedElementOfSplicedElement(grid);
      totalFacesOrCharacters.push(face);
      let tileDataObj = {face,row,col}
      const tileData = new TileData(tileDataObj);
      board[row][col] = tileData;
    }
  }
  
  

  // for (let row = 0; row < boardDimension; row++) {
  //   for (let col = 0; col < boardDimension; col++) {
  //     //Here shuffledGrid.shift can also be used
  //     let face = ""
  //     if (row == 0 && col == 0)
  //     {
  //       face = 's'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 0 && col == 1)
  //     {
  //       face = 'h'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 0 && col == 2)
  //     {
  //       face = 'n'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 0 && col == 3)
  //     {
  //       face = 'b'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 1 && col == 0)
  //     {
  //       face = 'y'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 1 && col == 1)
  //     {
  //       face = 'e'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 1 && col == 2)
  //     {
  //       face = 'f'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 1 && col == 3)
  //     {
  //       face = 'o'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 2 && col == 0)
  //     {
  //       face = 'n'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 2 && col == 1)
  //     {
  //       face = 'f'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 2 && col == 2)
  //     {
  //       face = 'h'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 2 && col == 3)
  //     {
  //       face = 't'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 3 && col == 0)
  //     {
  //       face = 'm'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 3 && col == 1)
  //     {
  //       face = 'q'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 3 && col == 2)
  //     {
  //       face = 'y'
  //       totalFacesOrCharacters.push(face);
  //     }
  //     if (row == 3 && col == 3)
  //     {
  //       face = 'h'
  //       totalFacesOrCharacters.push(face);
  //     }

  //     let tileDataObj = {face,row,col}
  //     const tileData = new TileData(tileDataObj);
  //     board[row][col] = tileData;
    
  
  
  return board;
};


export const getCountOfNumberOfCharacters =()  =>
{
  let count = totalFacesOrCharacters.reduce((acc, val) => {
    acc[val] = (acc[val] || 0)  + 1
    return acc;
  }, {});
  return count;
}
// export const copyBoard = board => {
//   const copiedBoard = board.map(row => {
//     return row.map(tile => {
//       return tile.clone();
//     });
//   });
//   return copiedBoard;
// };

// export const isTileEqual = (tile1, tile2) => {
//   if (!tile1 || !tile2) return false;
//   return tile1.rowId === tile2.rowId && tile1.columnId === tile2.columnId;
// };

export const isAdjacent = (tile1, tile2) => {
  // if (!tile1 || !tile2) return false;
  // if (isTileEqual(tile1, tile2)) {
  //   return false;
  // }

  const colDiff = Math.abs(tile1.columnId - tile2.columnId);
  const rowDiff = Math.abs(tile1.rowId - tile2.rowId);
  if (colDiff <= 1 && rowDiff <= 1) {
    return true;
  } else {
    return false;
  }
};

export const calculateScore = word => {
  // const score = word.length - 2;

  // if (score < 1) {
  //   return 1;
  // }
  // if (score > 6) {
  //   return 6;
  // }
  const score = word.length;
  return score;
};
