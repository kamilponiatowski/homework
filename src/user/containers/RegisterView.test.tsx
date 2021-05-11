import React from 'react'

import renderer from 'react-test-renderer';
import { RegisterView } from './RegisterView';

describe('RegisterView', () => {
    
    test('Should render form', () => {
        const tree = renderer
            .create(<RegisterView />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})
