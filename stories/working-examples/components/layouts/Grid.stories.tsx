import React from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '@core/grid/Grid';
import Cell from '@core/grid/Cell';

/**
 * ControllableSearchInput Story Example.
 * Have had to create a separate component in here because i wanted to use hooks.
 */
storiesOf('Grid example', module).add('grid', () => {
    return (
        <div>
            <p>yes</p>
            <Grid x={true}>
                <Cell className="small-6">column 1</Cell>
                <Cell className="small-6">column 2</Cell>
            </Grid>
        </div>
    );
});
