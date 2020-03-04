import React,{Component, useRef} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../../bootstrap.min.css';

export default class Result extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      show: true,
      data: '',
      wordsData: props.totalWords.length,
      scoreData: props.score,
      totalScore: '' 
    };
        
  }

  calculateScore(state)
  {
    let TotalScore = 0;
    for(let i = 0; i<state.scoreData.length;i++)
    {
      TotalScore = TotalScore + state.scoreData[i].props.children;
    }
    return TotalScore;
  }
  hideAndResetScreen()
  {

  this.setState({ show: false });
  window.location.reload();
  }

  hide = () => this.hideAndResetScreen();

    render() {
        return (
          <div>
          <Modal
          show={this.state.show}
          onHide={this.hide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Result
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Total Number Of Valid Words Entered: {this.state.wordsData}
            </p>
            <br/>
            <p>
              Total Score: {this.calculateScore(this.state)}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hide}>Close and Refresh</Button>
          </Modal.Footer>
        </Modal>

        </div>
        );
      }
}
