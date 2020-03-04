import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ScoreBox from '../src/components/ScoreBox'
configure({ adapter: new Adapter() });

describe('Scorebox test 0 ', () => {

    it('find div within Scorebox', () => {
        const props = {wordScoreList:['a','b'],totalScore:5}
        const wrapper = shallow(<ScoreBox {...props}  />);
        expect(wrapper.find('.score-box').length).toEqual(1);
    });
});