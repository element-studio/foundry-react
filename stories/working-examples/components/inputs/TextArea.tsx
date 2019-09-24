import React from 'react';
import { ShowValidation } from '../../../../src/core/form/ShowValidation';

/**
 * TextArea form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 * @param param
 */
const TextArea = ({ name, label, onChange, formState, ...rest }) => {
    return (
        <ShowValidation formState={formState} name={name}>
            <label>{label}</label>
            <textarea {...rest} name={name} value={typeof formState[name] !== 'undefined' ? formState[name].value : null} onChange={onChange} />
        </ShowValidation>
    );
};

export default TextArea;
