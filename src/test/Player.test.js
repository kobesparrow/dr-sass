import React from 'react';
import Player from '../components/Player';
import { shallow } from 'enzyme';

let mockData = {
  nameSubmitted: false,
  name: "Mark",
  answerStatus: 'You win',
  playerScore: 0
}
let mockSubmitName = jest.fn();
let mockSetName = jest.fn();

describe('Player', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Player
        submitName={mockSubmitName}
        setName={mockSetName}
        nameSubmitted={mockData.nameSubmitted}
        name={mockData.name}
        answerStatus={mockData.answerStatus}
        playerScore={mockData.playerScore}
      />
    )
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should meet the first condition', () => {
    wrapper = shallow(
      <Player nameSubmitted={true} />
    )
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke submitName on click', () => {
    wrapper.find('.name-submit-btn').simulate('click');
    expect(mockSubmitName).toHaveBeenCalled();
  })
});