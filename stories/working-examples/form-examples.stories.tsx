import React from 'react';
import { storiesOf } from '@storybook/react';

import FormHookExample from './components/form/FormHookExample';

/**
 * Form  Hooke Story example.
 * Have had to create a separate component in here because i wanted to use hooks.
 */

storiesOf('Working Examples/Forms', module).add('Form with validation Hook', () => {
    return <FormHookExample />;
});
