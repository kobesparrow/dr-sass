import React, { Component } from 'react';
import lorax from '../images/lorax-book.jpg'

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let introText
    if (this.props.nameSubmitted) {
      introText = 
        <article className="nameDisplay">
          <h2>Oh, { this.props.name }:</h2>
          <div className="answer-status">
            <h4>{ this.props.answerStatus }</h4>
          </div>
          <h4>Score: { this.props.playerScore }</h4>
        </article>
    } else {
      introText = 
      <article className="nameInput">
        <p>Today you are you! That is truer than true! There is no one alive who is you-er than you!</p>
        <div className="submit-name-block">
          <form>
            <input type="text" onChange={ this.props.setName } name="question" id="name" placeholder="Your Name"></input>
            <input onClick={ () => this.props.submitName() } type="submit" name="submit" className="name-submit-btn"></input>
          </form>
          <img src={ lorax } className="intro-lorax" />
        </div>
      </article>
    }
    return (
      <div>{ introText }</div>
    );
  }
}

export default Player;