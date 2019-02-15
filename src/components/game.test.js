import React from 'react';
import {shallow} from 'enzyme';

import Game from './game';

describe('<Game />', () => {

  it('Renders without crashing', () => {
    shallow(<Game />)
  })

  it('Can start a new game', () => {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      guesses: [3,4,5,6],
      feedback: 'your Warm',
      correctAnswer: -1
    })

    wrapper.instance().restartGame();
    expect(wrapper.state('guesses')).toEqual([]);
    expect(wrapper.state('feedback')).toEqual('Make your guess!');
    expect(wrapper.state('correctAnswer')).toBeGreaterThanOrEqual(0);
    expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);
  });

  it ('Can make guesses', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      correctAnswer:90
    })

    wrapper.instance().makeGuess(90);
    expect(wrapper.state('guesses')).toEqual([90])
    expect(wrapper.state('feedback')).toEqual('You got it!');

    wrapper.instance().makeGuess(85);
    expect(wrapper.state('guesses')).toEqual([90, 85,])
    expect(wrapper.state('feedback')).toEqual('You\'re Hot!');

    wrapper.instance().makeGuess(80);
    expect(wrapper.state('guesses')).toEqual([90, 85, 80])
    expect(wrapper.state('feedback')).toEqual('You\'re Warm.');

    wrapper.instance().makeGuess(60);
    expect(wrapper.state('guesses')).toEqual([90, 85, 80, 60])
    expect(wrapper.state('feedback')).toEqual('You\'re Cold...');

    wrapper.instance().makeGuess(39);
    expect(wrapper.state('guesses')).toEqual([90, 85, 80, 60, 39])
    expect(wrapper.state('feedback')).toEqual('You\'re Ice Cold...');

  });

  it('Render an aural update', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      guesses:[1,4],
      feedback: "You're ice cold!"
    })

    wrapper.instance().generateAuralUpdate();
    expect(wrapper.state('auralStatus')).toEqual('Here\'s the status of the game right now: You\'re ice cold! You\'ve made 2 guesses. In order of most- to least-recent, they are: 4, 1');
  })

})
