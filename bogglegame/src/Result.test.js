import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from "react-bootstrap/Button";
import Result from '../src/components/Result';
configure({ adapter: new Adapter() });



let [hide] = new Array(1).fill(jest.fn());
const enzymeWrapper = shallow(<Button onClick = {hide}>Close and Refresh</Button>);
const props = {score:0,totalWords:5}
const wrapper = mount(<Result {...props}  />);

describe('Result test 0 ', () => {

    it('button is clicked or not', () => {
        
        const btn = enzymeWrapper.find('.btn-primary');
        btn.simulate('click');
        expect(hide.mock.calls.length).toEqual(1);


    });
});

