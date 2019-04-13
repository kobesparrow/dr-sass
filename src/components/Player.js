import React, { Component } from 'react';
import App from './App.js';
import '../scss/Player.css';
import lorax from '../images/lorax-book.jpg'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      nameSubmitted: false
    }

    this.setName = this.setName.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  submitName() {
    console.log('test: ', this.state.name)
    this.setState({
      nameSubmitted: true
    })
  }

  setName(e) {
    let name = e.target.value;
    console.log(name);
    this.setState({
      name: name
    })
  }

  render() {
    let introText
    if (this.state.nameSubmitted) {
      introText = 
        <article className="nameInput">
          <p>Welcome { this.state.name }</p>
        </article>
    } else {
      introText = 
      <article className="nameInput">
        <p>What is your name?</p>
        <input type="text" onChange={ this.setName } name="question" id="name" placeholder="Lorax"></input>
        <input onClick={ () => this.submitName() } type="submit" name="submit" className="name-submit-btn"></input>
        <img src={ lorax } className="intro-lorax" />
      </article>
    }
    return (
      <div>{ introText }</div>
    );
  }
}

export default Player;