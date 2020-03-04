import React from 'react';
import expect from 'expect';
import { shallow, configure,mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Tile from '../src/components/Board/Tile';
import sinon from 'sinon';
import Board from '../src/components/Board';

import {shuffledGrid} from '../src/util/gameUtil';

// Initialize a Board component

describe('[Assertion tests] Board Size', () => {

    it('should render a board with the necessary parameters', () => {


        let boardDimension = 4;
        const board = shuffledGrid();

        const enzymeWrapper = shallow(<Board  board={board} />);
       
        // Verify the number of rows generated
        let rows = enzymeWrapper.find('.row');
        expect(rows).toHaveLength(boardDimension);

        // Verify the number of columns generated
        let tiles = rows.first().children();
        expect(tiles).toHaveLength(boardDimension);
        
    });
});