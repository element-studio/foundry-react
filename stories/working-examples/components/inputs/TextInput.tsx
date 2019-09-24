import React from 'react';
import { ShowValidation } from '../../../../src/core/form/ShowValidation';

/**
 * TextInput to illustrate a form input that uses the useForm hook's state.
 * @param param
 */
const TextInput = ({ type, name, label, onChange, formState, ...rest }) => {
    return (
        <ShowValidation formState={formState} name={name}>
            <label>{label}</label>
            <input
                {...rest}
                type={type}
                name={name}
                value={typeof formState[name] !== 'undefined' ? formState[name].value : null}
                onChange={onChange}
            />
        </ShowValidation>
    );
};

export default TextInput;
