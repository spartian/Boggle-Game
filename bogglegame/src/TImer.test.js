import React from 'react';
import expect from 'expect';
import { shallow, configure,mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Tile from '../src/components/Board/Tile';
import sinon from 'sinon';


var clock;
beforeEach(function () {
     clock = sinon.useFakeTimers();
 });

afterEach(function () {
    clock.restore();
});

describe('Timer Component test ', () => {

it("should time out after 500 ms", function() {
    var timedOut = false;
    setTimeout(function () {
        timedOut = true;
    }, 500);

    expect(timedOut).toEqual(false);
    clock.tick(510);
    expect(timedOut).toEqual(true);
});
});