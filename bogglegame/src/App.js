import React from 'react';
import gameLogo from './img/boggle_naked_mobile.png';
import './App.css';
import Game from './components/Game';

//Here if we import {component} in line no 1 then the below line can be read as
//export default class App extends Component {}
export default class App extends React.Component {
  render() {
    return (
      // <div className="container">
      <div className = "container">
        <header>
          {/* TODO: Add Boggle Image */}
          <img src={gameLogo} className="game-logo" alt="Game Logo" />
        </header>
        
        <Game/>
        {/* <ClockInterface/> */}
       
        <footer>
          <h6>Boggle game created by Pratik Sharma</h6>
        </footer>
       </div>
    );
  }
}


