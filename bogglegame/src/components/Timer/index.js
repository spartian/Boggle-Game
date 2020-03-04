import React,{Component} from 'react';  
import Result from '../Result';
import Game from '../Game';
import ScoreBox from '../ScoreBox'
import WordScoreList from '../ScoreBox/WordScoreList';
import TotalScore from '../ScoreBox/TotalScore';
  export default class ClockInterface extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 60 * 5,
        myInterval: undefined,
        condition:false,
        totalWords:props.words,
        totalScore:props.score
      }
    };
    

    componentDidMount() {
        window.addEventListener('load', this.handleLoad(this));
    }


    displayModalPopUp()
    {
        this.setState({condition:true});
        this.setState({totalWords:this.props.words});
        this.setState({totalScore:this.props.score});
        console.log("1")
    }

    componentDidUpdate(){
        if(this.state.count <= 0){
            clearInterval(this.state.myInterval);
            if(this.state.condition === false)
            {
              this.displayModalPopUp();
            }
        }
    

    }

    handleInputValue(val) {
      // alert("5");
    }
    getSeconds() {
      return ('0' + this.state.count % 60).slice(-2)
    };
    getMinutes() {
      return (Math.floor(this.state.count / 60) )
    };
  
    handleLoad () {
      var _this = this;
      if (this.state.myInterval) 
      {
        return
      }
      const myInterval = setInterval(function() {
        _this.setState(state => ({
          count: state.count - 1
        }))
      }, 1000)
      this.setState({myInterval})
    };
    
    render() {
      return (
        
        <div id='container'>
          <h1 id='clockdigits'>{this.getMinutes()}:{this.getSeconds()}</h1>
          <div>
      {this.state.condition ?<Result score = {this.state.totalScore} totalWords = {this.state.totalWords} /> :null}
        </div>
        </div>
    
      );
    }
  }
  
  