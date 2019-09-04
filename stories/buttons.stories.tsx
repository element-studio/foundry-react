import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@core/buttons/Button';

storiesOf('Buttons', module)
    .add('with text', () => (
        <Button
            label="Hello Button"
            onClick={() => {
                alert('Hello Button');
            }}
        />
    ))
    .add('with some emoji', () => (
        <Button
            label=" 😀 😎 👍 💯"
            onClick={() => {
                alert('🔥');
            }}
        />
    ));
