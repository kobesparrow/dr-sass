import React, { Component } from 'react';
// import '../scss/GameArea.scss';

class GameArea extends Component {
  constructor(props) {
    super(props);

    // this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer = (e) => {
    let answer = e.target.innerText;
    if (answer === this.props.prompt.correctAnswer) {
      this.props.scoreIncrease()
      this.props.populatePrompt(); 
    } else {
      this.props.storeWrongAnswer(this.props.prompt);
      this.props.populatePrompt();
    }
  }

  render() {
    return (
      <section className="gameArea">
        <p>{this.props.prompt.Question}</p>
        <div className="answerButtons">
          <button className="answer-one-btn" onClick={ this.checkAnswer }>{ this.props.prompt.answers[0] }</button>
          <button className="answer-two-btn" onClick={ this.checkAnswer }>{ this.props.prompt.answers[1] }</button>
          <button className="answer-three-btn" onClick={ this.checkAnswer }>{ this.props.prompt.answers[2] }</button>
        </div>
      </section>
    )
  }
}

export default GameArea;