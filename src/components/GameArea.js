import React, { Component } from 'react';
import App from './App.js';
import '../scss/GameArea.css';

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size = ""
    }

    this.tesFunc = this.testFunc.bind(this)
  }

  testFunc(e) {
    e.target.preventDefault();
    console.log('test');
  }

  render() {
    return (
      <section className="gameArea">
        <p>{ this.props.questions[0].Question }</p>
        <form onSubmit={this.handleSubmit}>
          <p>Select a pizza size:</p>

          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="small"
                  checked={this.state.size === "small"}
                  onChange={this.handleChange}
                />
                Small
          </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="medium"
                  checked={this.state.size === "medium"}
                  onChange={this.handleChange}
                />
                Medium
          </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="large"
                  checked={this.state.size === "large"}
                  onChange={this.handleChange}
                />
                Large
          </label>
            </li>
          </ul>

          <button type="submit">Make your choice</button>
        </form>
      </section>
    )
  }
}

export default GameArea;