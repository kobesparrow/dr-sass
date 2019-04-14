import React, { Component } from 'react';
import App from './App.js';
import '../scss/GameArea.css';

class GameArea extends Component {
  constructor(props) {
    super(props);

    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(e) {
    let answer = e.target.innerText;
    if (answer === this.props.prompt.correctAnswer) {
      this.props.scoreIncrease()
      this.props.populatePrompt(); 
      console.log('correct!');
    } else {
      console.log('wrong!');
      this.props.storeWrongAnswer(this.props.prompt);
      this.props.populatePrompt();
    }
  }

  render() {
    return (
      <section className="gameArea">
        <p>{this.props.prompt.Question}</p>
        <div className="answerButtons">
          <button onClick={ this.checkAnswer }>{ this.props.prompt.answers[0] }</button>
          <button onClick={ this.checkAnswer }>{ this.props.prompt.answers[1] }</button>
          <button onClick={ this.checkAnswer }>{ this.props.prompt.answers[2] }</button>
        </div>
      </section>
    )
  }
}

export default GameArea;