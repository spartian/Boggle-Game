import React from 'react';
import expect from 'expect';
import { shallow, configure,mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Tile from '../src/components/Board/Tile';
import sinon from 'sinon';

let [handleOnClickEvent] = new Array(1).fill(jest.fn());
const tileComponent = <Tile letter="B" handleClick={handleOnClickEvent} />;


window.alert = jest.fn();
let enzymeWrapper = shallow(tileComponent);




describe('Tile Test 0 ', () => {

    it('a button should be rendered', () => {
        const component = renderer.create(tileComponent);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});




describe('Tile Test 1', () => {
    it('Check if the tile appears or not', () => {
        window.alert.mockClear();
        expect(
            enzymeWrapper.find('button[class="tile"]')).toBeTruthy();
    });
  });


describe('Tile Test 2', () => {
    it('Check if the tile displays same letter', () => {
        window.alert.mockClear();
        
        let button = enzymeWrapper.find('button.tile');
        button.simulate('click');

        // Check if the button text is as expected
        expect(button.text()).toEqual('B');

    });
  });


  