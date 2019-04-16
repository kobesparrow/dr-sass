import React from 'react';
import GameArea from '../components/GameArea';
import { shallow } from 'enzyme';


let mockPrompt = {
  "id": "44",
  "Question": "What does the @onceler directive do",
  "answers": ["repeats CSS definitions multiple times in a row",
    "sets style based on a condition",
    "@onceler is not a Sass directive"],
  "correctAnswer": "@onceler is not a Sass directive"
};
let mockStoreWrongAnswer = jest.fn();
let mockPopulatePrompt = jest.fn();
let mockScoreIncrease = jest.fn();
let mockCheckAnswer = jest.fn();


describe ('GameArea', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <GameArea 
        prompt={ mockPrompt }
        storeWrongAnswer={ mockStoreWrongAnswer }
        populatePrompt={ mockPopulatePrompt }
        scoreIncrease={ mockScoreIncrease }
      />
    )
  });
  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call two appropriate methods when incorrect answer selected', () => {
    wrapper.find('.answer-one-btn').simulate('click', { target: { value: "repeats CSS definitions multiple times in a row" }});
    expect(mockPopulatePrompt).toBeCalled();
    expect(mockStoreWrongAnswer).toBeCalled();
  })

  it('should call two appropriate methods when correct answer selected', () => {
    wrapper.find('.answer-one-btn').simulate('click', { target: { innerText: '@onceler is not a Sass directive' } });
    expect(mockPopulatePrompt).toHaveBeenCalled();
    expect(mockScoreIncrease).toHaveBeenCalled();
  })
});