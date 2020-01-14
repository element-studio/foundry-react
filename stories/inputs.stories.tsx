import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchInput from '@core/inputs/SearchInput';

storiesOf('Inputs', module).add('Search Input', () => {
    return (
        <SearchInput
            onChange={(data) => {
                console.log(data);
            }}
        />
    );
});
