import React, { Component } from 'react';
import Data from '../data-set.js';
import Player from './Player.js'
import '../scss/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [Data]
    }
  }

  render() {
    console.log(Data);
    return (
      <div className="App">
        <header>
          <img src="https://fontmeme.com/permalink/190413/a805259a19ac35e5d8c090ed8ff240ec.png"></img>
        </header>
        <Player />
        <footer>  
          <img src="https://fontmeme.com/permalink/190413/5c404c3ca1d3e56ff4be7a2803c5c6f4.png"></img>
        </footer>
      </div>
    );
  }
}

export default App;
