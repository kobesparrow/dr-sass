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
});