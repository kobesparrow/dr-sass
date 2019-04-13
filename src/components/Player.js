import React, { Component } from 'react';
import App from './App.js';
import '../scss/Player.css';
import lorax from '../images/lorax-book.jpg'

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article className="nameInput">
        <p>What is your name?</p>
        <input type="text" name="question" id="name" placeholder="Lorax"></input>
        <input type="submit" name="submit" className="name-submit-btn"></input>
        <img src={ lorax } className="intro-lorax" />
      </article>
    );
  }
}

export default Player;