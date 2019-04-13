import React, { Component } from 'react';
import App from './App.js';
import '../scss/Player.css';
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
          <p>Welcome { this.props.name }</p>
        </article>
    } else {
      introText = 
      <article className="nameInput">
        <p>What is your name?</p>
        <input type="text" onChange={ this.props.setName } name="question" id="name" placeholder="Lorax"></input>
        <input onClick={ () => this.props.submitName() } type="submit" name="submit" className="name-submit-btn"></input>
        <img src={ lorax } className="intro-lorax" />
      </article>
    }
    return (
      <div>{ introText }</div>
    );
  }
}

export default Player;