import React from 'react';
import { storiesOf } from '@storybook/react';
import Loading from '@core/loading/Loading';

storiesOf('Loading', module)
    .add('Loading with children', () => (
        <Loading isLoading={true}>
            <div>Child</div>
        </Loading>
    ))
    .add('Not Loading with children', () => (
        <Loading isLoading={false}>
            <div>Child</div>
        </Loading>
    ));
