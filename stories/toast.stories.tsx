import React from 'react';
import { storiesOf } from '@storybook/react';
import Toast, { addToast } from '@core/toast/Toast';

storiesOf('Toast', module)
    .add('test', () => (
        <div>
            <h2>toast test</h2>
            <button onClick={()=>addToast('error','hello world!','this is a title')}>Click to create toast</button>
            <Toast />
        </div>
    ))
