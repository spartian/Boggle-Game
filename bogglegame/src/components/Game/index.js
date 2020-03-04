import React, { Component } from 'react';
import {
  shuffledGrid,
  // copyBoard,
  // isTileEqual,
  // isAdjacent,
  getCountOfNumberOfCharacters,
  calculateScore
} from '../../util/gameUtil';
import Board from '../Board';
import ScoreBox from '../ScoreBox';
// import CurrentWord from '../CurrentWord';
import Button from '../Button';
import './Game.css';
import  TileData  from '../../data';
import {Loader} from 'react-overlay-loader';
import LoadingOverLay from 'react-overlay-loader';
import ClockInterface from '../Timer';
// import LoadingOverlay from 'react-loading-overlay';

//Again like in App.js since {component} was imported then in the below line it is written as extends Component
//otherwise it should be written as extends React.Component
export default class Game extends Component {
  constructor(props) {
  
    super(props);
    // TODO: Init board with random tiles
    this.initGrid = shuffledGrid();
    this.frequenceOfCharacters = getCountOfNumberOfCharacters();
    this.removableBoardArray = JSON.parse(JSON.stringify(this.initGrid));
    this.removedRowsAndColumnsArray = [];
    
    // TODO: Init state with the board
    this.state = {
      board: this.initGrid,
      currentWord: '',
      currentWordPosition: [],
      wordScoreList: {},
      currentLetter:'',
      removableBoardArray: this.removableBoardArray,
      indexesPushedIntoArray:[],
      lastDeletedRowAndColumn:[],
      previousLetters:[],
      frequencyOfCharacters:this.frequenceOfCharacters,
      loading:false
    };
   
  }

  // Adds Current Word to the Word List
  handleSubmit(word,indexesPushedIntoArray) 
  {
    
    
    if (this.state.wordScoreList[word] === undefined)
    {
    let resultantString = "";
    this.frequenceOfCharacters = getCountOfNumberOfCharacters();
    this.setState({removableBoardArray:JSON.parse(JSON.stringify(this.initGrid))});
    let _this = this;
    this.setState({loading:true});


    fetchAPI(word,indexesPushedIntoArray).then(result => {
      result.json().then(function(data) {
        resultantString = data.name;
        if (resultantString == "The word is valid" || resultantString == "The pattern is true")
          {
              _this.setState({loading:false});
              const score = calculateScore(word);
              const clearedBoard = _this.initGrid;
              _this.setState({
                wordScoreList: { ..._this.state.wordScoreList, [word]: score },
                currentWord: '',
                currentWordPosition: [],
                board: clearedBoard,
                indexesPushedIntoArray: [],
                removedLettersArray:[]
              });
            }
            else
            {
              _this.setState({loading:false});
              alert("The pattern is either invalid (only horizontal,diagonal and vertical pattern) or you have chosen a single letter word which is not valid or the word you have chosen is invalid.");
            }
          });
        });
      }

      else
      {
        alert("This word has been already entered. Check the scoreboard.");
      }
  }

  handleChange = (e) =>
  {
    // this.setState({currentWord:e.target.value});
  }

  

  handleKeyPress = (e) =>
  {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))
    {
      

      let returnedRowAndColumn = testForLettersInBoard(e,this.state.removableBoardArray,this) ;
      
      if ( returnedRowAndColumn[0].length > 0 )
        {
         
            if (this.frequenceOfCharacters[e.key] > 0)
            {
            const newItems = this.state.removableBoardArray;
            const previouslyEnteredCurrentLetter = e.key;
            newItems[returnedRowAndColumn[0][0].row][returnedRowAndColumn[0][0].column] = "";
            let previousDeletedRow = returnedRowAndColumn[0][0].row;
            let previousDeletedColumn = returnedRowAndColumn[0][0].column;
            this.setState({removableBoardArray:newItems});
            this.setState({currentLetter:e.key});
            this.setState({currentWord:this.state.currentWord + e.key});
            this.setState({indexesPushedIntoArray:this.state.indexesPushedIntoArray.concat(returnedRowAndColumn)});
            this.setState(prevState => ({
              lastDeletedRowAndColumn: [...prevState.lastDeletedRowAndColumn, {previousDeletedRow,previousDeletedColumn}]
            }));

           
            const face = previouslyEnteredCurrentLetter;
            const row = previousDeletedRow;
            const col = previousDeletedColumn;
            const requiredTileObjectFormat = {face,row,col};
            const requiredTileObject = new TileData(requiredTileObjectFormat);
            this.setState(prevState => ({
              previousLetters: [...prevState.previousLetters, requiredTileObject]
            }));
          console.log("2");
          this.frequenceOfCharacters[e.key] = this.frequenceOfCharacters[e.key] - 1;
        }
        else
        {
          alert("You have already chosen maximum number of that letter in board");
        }
      }
      else
      {
        alert("The letter either doesn't exist in board ");
      }
      }
    else if (e.keyCode === 8)
    {
      if(this.state.currentWord.length > 0)
      {
      this.setState({currentWord:this.state.currentWord.substring(0, this.state.currentWord.length - 1)});
      const originalBoard = this.state.removableBoardArray;
      let rowAndColumn = this.state.lastDeletedRowAndColumn.pop();
      let lastLetter = this.state.previousLetters.pop();
      originalBoard[rowAndColumn.previousDeletedRow][rowAndColumn.previousDeletedColumn] = lastLetter;
      this.setState({removableBoardArray:originalBoard});
      this.state.indexesPushedIntoArray.pop();
      this.frequenceOfCharacters[lastLetter.letter] = this.frequenceOfCharacters[lastLetter.letter] + 1
      this.setState({currentLetter:lastLetter});
      }
    }
    else if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40)
    {
      e.preventDefault();
      alert("No arrow keys are allowed. Only alphabetic characters and backspace is allowed for deletion.");
      
    }
    else
    {
      alert("only alphabetic characters and backspace is allowed for deletion.");
    }
  }
  
  
  render() {
    
    return (
       
      <div>
        {this.state.loading ? <Loader fullPage loading></Loader>: ""}   
        <div className="game-area">
          <Board
            board={this.state.board}
          />

          {/* <CurrentWord currentWord={this.state.currentWord}  label="Current Word"> */} 
          {/* {/* </CurrentWord> */}

          <div className="word-area">
            <div className="current-header">
              Current Word
            </div>
           <div className="current-word">
           
            <input type="text" 
            onKeyDown = {this.handleKeyPress} value= {this.state.currentWord} onChange={this.handleChange}
            ></input>
            </div>
          </div>

          <Button
            // TODO: Pass Button Props and Button Callback
            handleSubmit={this.handleSubmit.bind(this, this.state.currentWord,this.state.indexesPushedIntoArray)}
            label="SUBMIT WORD"></Button>
            
          
        </div>
      
     
        <ScoreBox
          // TODO: Pass ScoreBox Props
          wordScoreList={this.state.wordScoreList}
          totalScore={Object.values(
            this.state.wordScoreList
          ).reduce((totalScore, next) => {
            return totalScore + next;
          }, 0)}
        />
        
        {/* Makes Board and ScoreBox be side by side */}
        <div className="clear" />
      
      </div>
    );
  }
}

function fetchAPI(param,param1) {
  param = param;
  param1= JSON.stringify(param1);
  
  return fetch("http://localhost:3001/check_word_validity/inputword?wordEntered=" + param+"&indexesArray=" +param1);
}

function testForLettersInBoard(e,boardState,_this)
{

  let removedRowsAndColumns = [];
  let removedRowsAndColumnsArray = [];
  let frequencyFlag = false;

  for(let i=0;i<boardState.length;i++)
  {
   for(let j=0; j<boardState[i].length;j++)
   {
    if (boardState[i][j] === "")
    {
      if (_this.initGrid[i][j].letter === e.key)
      {
        removedRowsAndColumns = removedRowsAndColumns.concat({row:i,column:j});
        frequencyFlag = true;
      }
    }

     if(e.key === boardState[i][j].letter)
     {
      boardState[i][j] = "";
      removedRowsAndColumns = removedRowsAndColumns.concat({row:i,column:j});
      frequencyFlag = true;
      
    }
  } 
  }
    // if (frequencyFlag == true)
    // {
    //   _this.frequenceOfCharacters[e.key] = _this.frequenceOfCharacters[e.key] - 1;
    // }
  removedRowsAndColumnsArray.push(removedRowsAndColumns);
 
  return removedRowsAndColumnsArray;
} 