import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@core/buttons/Button';

storiesOf('Buttons', module)
    .add('with text', () => (
        <Button
            onClick={() => {
                alert('test');
            }}
        >
            Hello Button
        </Button>
    ))
    .add('with some emoji', () => (
        <Button>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
            </span>
        </Button>
    ));
