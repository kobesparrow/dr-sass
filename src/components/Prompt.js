import React, { Component } from 'react';

class Prompt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="gameArea">
        <p>{this.props.questions[0].Question}</p>
        <div className="answerButtons">
          <button onClick={this.checkAnswer}>{this.props.questions[0].answers[0]}</button>
          <button onClick={this.checkAnswer}>{this.props.questions[0].answers[1]}</button>
          <button onClick={this.checkAnswer}>{this.props.questions[0].answers[2]}</button>
        </div>
      </section>
    )
  }