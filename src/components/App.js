import React, { Component } from 'react';
import Player from './Player.js'
import GameArea from './GameArea.js'
import correctAnswer from '../images/thatsnice-drsass.svg'
import wrongAnswer from '../images/youidiot.svg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      originalData: [],
      questions: [],
      currentPrompt: {},
      wrongAnswers: [],
      name: "",
      nameSubmitted: false,
      answerStatus: "",
      playerScore: 0,
      gameOver: false
    }
  }

  componentDidMount() {
    fetch("https://fe-apps.herokuapp.com/api/v1/memoize/1901/sass-data-mark/drsass")
      .then(response => response.json())
      .then(gamesData => this.setState({ originalData: gamesData.drSass }))
      .catch(err => {
        throw new Error(err);
      })
  }

  setName = (e) => {
    let name = e.target.value;
    this.setState({
      name: name,
      questions: [...this.state.originalData]
    }, () => {
        localStorage.setItem('originalData', JSON.stringify(this.state.originalData))
    });
  }

  submitName = () => {
    this.setState({
      nameSubmitted: true
    }); 
    this.populatePrompt();
  }

  populatePrompt = () => {
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

  storeWrongAnswer = (wrongPrompt) => {
    this.scoreDecrease();
    let wrongAnswers = this.state.wrongAnswers;
    wrongAnswers.push(wrongPrompt)
    this.setState({
      wrongAnswers: wrongAnswers,
      answerStatus: <img src={ wrongAnswer } />
    }, () => {
      localStorage.setItem('wrongAnswers', JSON.stringify(this.state.wrongAnswers))
    });
  }

  scoreIncrease = () => {
    let playerScore = this.state.playerScore;
    playerScore++;
    this.setState({
      playerScore: playerScore,
      answerStatus: <img src={ correctAnswer } />
    })
  }

  scoreDecrease = () => {
    let playerScore = this.state.playerScore;
    playerScore--;
    this.setState({
      playerScore: playerScore
    })
  }

  resetWithMissedPrompts = () => {
    let missedAnswers = JSON.parse(localStorage.wrongAnswers)
    this.setState({
      gameOver: false,
      questions: missedAnswers,
      answerStatus: "",
      wrongAnswers: []
    })
    localStorage.setItem('wrongAnswers', "")
  }

  startNewGame = () => {
    let originalData = JSON.parse(localStorage.originalData)
    this.setState({
      nameSubmitted: false,
      gameOver: false,
      originalData: originalData,
      playerScore: 0,
      answerStatus: ""
    });
  }

  render() {
    let gameArea
    let endGame
    if (this.state.wrongAnswers.length === 0) {
      endGame =
        <div>
          <div className="gameArea">
            <p>You got everything correct!</p>
            <button onClick={() => this.startNewGame()} className="start-game-btn">Start a new game</button>
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
    } else {
      endGame =
        <div>
          <div className="gameArea">
            <h5>You've reached the end of the game, what would you like to do?</h5>
            <button onClick={this.resetWithMissedPrompts} className="final-card-btn">Try again with the questions you got wrong</button>
            <button onClick={() => this.startNewGame()} className="start-game-btn final-card-btn">Start a new game</button>
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
    }
    if (this.state.gameOver === true) {
      gameArea = <div> { endGame } </div>
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
          <img src="https://fontmeme.com/permalink/190413/a805259a19ac35e5d8c090ed8ff240ec.png" />
        </header>
          { gameArea }
        <footer>  
          <img src="https://fontmeme.com/permalink/190417/e684cff81faf34b25a6414f058a7b7ee.png" />
        </footer>
      </div>
    );
  }
}

export default App;
