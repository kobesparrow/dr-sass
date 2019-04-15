import React from 'react';
import GameArea from '../components/GameArea';


describe ('GameArea', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <GameArea />
    )
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});