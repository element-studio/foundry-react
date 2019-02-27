import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '@core/modal/Modal';

storiesOf('Modal', module).add('Modal', () => (
    <Modal>
        <div>Child</div>
    </Modal>
));
