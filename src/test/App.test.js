import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { shallow } from 'enzyme';

let mockPrompt = [
  {
    "id": "8",
    "Question": "Where can SCSS variables be used?",
    "answers": ["anywhere in any style sheet", "anywhere in SCSS style sheets", "anywhere in SASS style sheets"],
    "correctAnswer": "anywhere in SCSS style sheets"
  },
  {
  "id": "44",
  "Question": "What does the @onceler directive do",
  "answers": ["repeats CSS definitions multiple times in a row",
    "sets style based on a condition",
    "@onceler is not a Sass directive"],
  "correctAnswer": "@onceler is not a Sass directive"
}];
let mockStartNewGame = jest.fn();
const setSpy = jest.spyOn(Storage.prototype, 'setItem');
const getSpy = jest.spyOn(Storage.prototype, 'getItem');

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper=shallow(
      <App />
    )
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if gameOver is true', () => {
    wrapper.state().gameOver = true;
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper defualt state', () => {
    expect(wrapper.state('questions')).toEqual([]);
    expect(wrapper.state('currentPrompt')).toEqual({});
    expect(wrapper.state('wrongAnswers')).toEqual([]);
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('nameSubmitted')).toEqual(false);
    expect(wrapper.state('answerStatus')).toEqual('');
    expect(wrapper.state('playerScore')).toEqual(0);
    expect(wrapper.state('gameOver')).toEqual(false);
  });

  it('should update states when setName is called', () => {
    const instance = wrapper.instance();
    expect(wrapper.state('name')).toEqual('');
    instance.setName({ target: { value: "Mahk" } });
    expect(wrapper.state('name')).toEqual("Mahk");
  });

  it('subitName updates states and calls populatePrompt', () => {
    const instance = wrapper.instance();
    expect(wrapper.state('nameSubmitted')).toEqual(false);
    instance.submitName();
    expect(wrapper.state('nameSubmitted')).toEqual(true);
  });

  it('populatePrompt should change gameOver state when questions.length conditional is met', () => {
    wrapper.state().questions.length = 1
    const instance = wrapper.instance()
    expect(wrapper.state('gameOver')).toEqual(false);
    instance.populatePrompt();
    expect(wrapper.state('gameOver')).toEqual(true);
  });

  it('populatePrompt should change currentQuestion state', () => {
    wrapper.state().questions = mockPrompt
    const instance = wrapper.instance()
    expect(wrapper.state('currentPrompt')).toEqual({});
    instance.populatePrompt();
    expect(wrapper.state('currentPrompt')).toEqual({
      "id": "8",
      "Question": "Where can SCSS variables be used?",
      "answers": ["anywhere in any style sheet", "anywhere in SCSS style sheets", "anywhere in SASS style sheets"],
      "correctAnswer": "anywhere in SCSS style sheets"
    });
  });

  it('startNewGame should update state', () => {
    const instance = wrapper.instance();
    instance.startNewGame();
    expect(wrapper.state('nameSubmitted')).toEqual(false);
    expect(wrapper.state('gameOver')).toEqual(false);
    expect(wrapper.state('playerScore')).toEqual(0);
    expect(wrapper.state('answerStatus')).toEqual("")
  });

  it('resetWithMissedPrompts should update state', () => {
    let missedAnswers = []
    const instance = wrapper.instance();
    instance.resetWithMissedPrompts();
    expect(wrapper.state('gameOver')).toEqual(false);
    expect(wrapper.state('answerStatus')).toEqual("");
    expect(wrapper.state('wrongAnswers')).toEqual([]);
  });

  it('should decrease playerScore in state when called', () => {
    const instance = wrapper.instance();
    wrapper.state().playerScore = 1;
    expect(wrapper.state('playerScore')).toEqual(1);
    instance.scoreDecrease();
    expect(wrapper.state('playerScore')).toEqual(0);
  });

  it('should increase playerScore in state when called', () => {
    const instance = wrapper.instance();
    wrapper.state().playerScore = 1;
    expect(wrapper.state('playerScore')).toEqual(1);
    instance.scoreIncrease();
    expect(wrapper.state('playerScore')).toEqual(2);
  });

  it('should invoke startNewGame on click', () => {
    // const instance = wrapper.instance();
    wrapper.state().wrongAnswers.length = 0;
    wrapper.find('.start-game-btn').simulate('click');
    expect(getSpy).toHaveBeenCalled();
    expect(mockStartNewGame).toHaveBeenCalled();
  });


  // it('should invoke submitName on click', () => {
  //   wrapper.find('.start-game-btn').simulate('click');
  //   expect(mockStartNewGame).toHaveBeenCalled();
  // })
})
