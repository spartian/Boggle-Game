import React from 'react';
import expect from 'expect';
import { shallow, configure,mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Game from '../src/components/Game';
import sinon from 'sinon';
import {
    shuffledGrid,
    // copyBoard,
    // isTileEqual,
    // isAdjacent,
    getCountOfNumberOfCharacters,
    calculateScore
  } from '../src/util/gameUtil';
  import Button from '../src/components/Button';

  let [handleKeyPress] = new Array(1).fill(jest.fn());
  let [handleSubmit] = new Array(1).fill(jest.fn());
  const wrapper = shallow(<Game/>);
  const enzymeWrapper = shallow(<input type="text" onKeyDown = {handleKeyPress} ></input>);
  const enzymeWrapper1 = shallow(<Button handleSubmit = {handleSubmit} label = "SUBMIT WORD"></Button>);


describe('Game test 0 ', () => {

    it('valid Key is Pressed', () => {
        
        let keyEvent = enzymeWrapper.find('input');
        keyEvent.simulate('keydown',{keyCode: 72});
        expect(handleKeyPress.mock.calls.length).toEqual(1); 

           
        // let keyEvent = wrapper.find('input');
        // wrapper.find('input').simulate('change', {target: {value: 'l'}});
        //simulating button click        
        let button = enzymeWrapper1.find('.button');
        button.simulate('click');

        expect(handleSubmit.mock.calls.length).toEqual(1);
        // Check if the button has label hello
        expect(button.text()).toEqual('SUBMIT WORD');
    });
});

