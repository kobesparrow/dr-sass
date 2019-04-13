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
      name: "",
      nameSubmitted: false
    }

    this.setName = this.setName.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  setName(e) {
    let name = e.target.value;
    this.setState({
      name: name
    })
  }

  submitName() {
    this.setState({
      nameSubmitted: true
    })
  }

  render() {
    let gameArea
    if (this.state.nameSubmitted) {
      gameArea =
      <div>
        <GameArea 
          questions={ this.state.questions }
        />
        < Player
          submitName={ this.submitName }
          setName={ this.setName }
          nameSubmitted={ this.state.nameSubmitted }
          name={ this.state.name }
        />
      </div>
    } else {
      gameArea = 
        <Player
          submitName={this.submitName}
          setName={this.setName}
          nameSubmitted={this.state.nameSubmitted}
          name={this.state.name}
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
