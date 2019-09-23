import React, { useState, useEffect } from 'react';

import SearchInput from '@core/inputs/SearchInput';

/**
 * ControllableSearchInput Story Example.
 * Have had to create a separate component in here because i wanted to use hooks.
 */
const ControllableSearchInput = () => {
    const [value, setValue] = useState('After 3 seconds this should change');

    useEffect(() => {
        let subscribed = true;
        setTimeout(() => {
            if (subscribed) {
                setValue('Changed!');
            }
        }, 2000);

        return () => {
            subscribed = false;
        };
    }, []);

    return (
        <SearchInput
            label="Hello Button"
            value={value}
            controllable
            onClick={() => {
                alert('Hello Button');
            }}
        />
    );
};

export default ControllableSearchInput;
