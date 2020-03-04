import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../src/components/Button';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

let [onClick] = new Array(1).fill(jest.fn());
const enzymeWrapper = shallow(<Button handleSubmit={onClick}  class="button" label="Hello"></Button>);

describe('Snapshot test of button', () => {

    it('should render a button', () => {
        const component = renderer.create(<Button class="button" />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});


describe('Button assertion test activites', () => {

    it('should render a button with a class', () => {

        let button = enzymeWrapper.find('.button');
        button.simulate('click');

        // Check if the button is clicked once
        expect(onClick.mock.calls.length).toEqual(1);

        // Check if the button has class .button
        expect(button.hasClass('button')).toBe(true);
        
        // Check if the button has label hello
        expect(button.text()).toEqual('Hello');

    });
});