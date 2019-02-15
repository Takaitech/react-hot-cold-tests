import React from 'react';
import {shallow} from 'enzyme';

import AuralStatus from './aural-status';

describe('<AuralStatus />', () => {

  it('Renders without crashing', () => {
    shallow(<AuralStatus />)
  })

  it('Renders an aural status update', () => {
    const STATUS = 'test status'
    const wrapper = shallow(<AuralStatus auralStatus={STATUS}/>);
    expect(wrapper.contains(STATUS)).toEqual(true);
  })
})
