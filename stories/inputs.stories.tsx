import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import SearchInput from '@core/inputs/SearchInput';

/**
 * Controllable Search Story.
 * Have had to create a separate component in here because i wanted to use hooks.
 */
const ControllableSearchStory = () => {
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

storiesOf('Inputs', module)
    .add('Search Input', () => {
        return (
            <SearchInput
                label="Hello Button"
                onClick={() => {
                    alert('Hello Button');
                }}
            />
        );
    })
    .add('Search Input - Controllable', () => <ControllableSearchStory />);
