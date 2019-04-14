import React, { Component } from 'react';
import Data from '../data-set.js';
import Player from './Player.js'
import GameArea from './GameArea.js'
import '../scss/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: Data,
      currentPrompt: {},
      wrongAnswers: [],
      // correctAnswers: [],
      name: "",
      nameSubmitted: false,
      answerStatus: "",
      playerScore: 0,
      gameOver: false
    }

    this.setName = this.setName.bind(this);
    this.submitName = this.submitName.bind(this);
    this.storeWrongAnswer = this.storeWrongAnswer.bind(this);
    this.populatePrompt = this.populatePrompt.bind(this);
    this.scoreDecrease = this.scoreDecrease.bind(this);
    this.scoreIncrease = this.scoreIncrease.bind(this);
  }

  setName(e) {
    let name = e.target.value;
    this.setState({
      name: name
    });
  }

  submitName() {
    this.setState({
      nameSubmitted: true
    });
    this.populatePrompt();
  }

  populatePrompt() {
    if (this.state.questions.length === 1) {
      this.setState({
        gameOver: true
      });
    } else {
      let currentPrompt = this.shuffle(this.state.questions).pop()
      this.setState({
        currentPrompt: currentPrompt
      });
    }
  }

  shuffle(questions) {
    return questions.sort(() => 0.5 - Math.random());
  }

  storeWrongAnswer(wrongPrompt) {
    this.scoreDecrease();
    let wrongAnswers = this.state.wrongAnswers;
    wrongAnswers.push(wrongPrompt)
    this.setState({
      wrongAnswers: wrongAnswers,
      answerStatus: 'YOU IDIOT'
    })
  }

  scoreIncrease() {
    let playerScore = this.state.playerScore;
    playerScore++;
    this.setState({
      playerScore: playerScore,
      answerStatus: "THAT'S NICE!"
    })
  }

  scoreDecrease() {
    let playerScore = this.state.playerScore;
    playerScore--;
    this.setState({
      playerScore: playerScore
    })
  }

  render() {
    let gameArea
    if (this.state.gameOver === true) {
      gameArea = 
        <div>
          <div className="gameArea">
            <p>It is over now, please go home</p>
          </div>
          < Player
            submitName={this.submitName}
            setName={this.setName}
            nameSubmitted={this.state.nameSubmitted}
            name={this.state.name}
            answerStatus={this.state.answerStatus}
            playerScore={this.state.playerScore}
          />
        </div>
    } else if (this.state.nameSubmitted) {
      gameArea =
      <div>
        < Player
          submitName={ this.submitName }
          setName={ this.setName }
          nameSubmitted={ this.state.nameSubmitted }
          name={ this.state.name }
          answerStatus={ this.state.answerStatus }
          playerScore={ this.state.playerScore }
        />
        <GameArea 
          prompt={ this.state.currentPrompt }
          storeWrongAnswer={ this.storeWrongAnswer }
          populatePrompt={ this.populatePrompt }
          scoreIncrease={ this.scoreIncrease }
        />
      </div>
    } else {
      gameArea = 
        <Player
          submitName={this.submitName}
          setName={this.setName}
          nameSubmitted={this.state.nameSubmitted}
          name={this.state.name}
          answerStatus={this.state.answerStatus}
        />
    }
    return (
      <div className="App">
        <header>
          <img src="https://fontmeme.com/permalink/190413/a805259a19ac35e5d8c090ed8ff240ec.png"></img>
        </header>
          { gameArea }
        <footer>  
          <img src="https://fontmeme.com/permalink/190413/5c404c3ca1d3e56ff4be7a2803c5c6f4.png"></img>
        </footer>
      </div>
    );
  }
}

export default App;
