import React from 'react';
import { ShowValidation } from '../../../../src/core/form/ShowValidation';

/**
 * Input to illustrate a form input that uses the useForm hook's state.
 * @param param
 */
const FormInput = ({ type, name, label, onChange, formState }) => {
    const InputType = type === 'textarea' ? 'textarea' : 'input';

    return (
        <ShowValidation formState={formState} name={name}>
            <label>{label}</label>
            <InputType type={type} name={name} value={typeof formState[name] !== 'undefined' ? formState[name].value : null} onChange={onChange} />
        </ShowValidation>
    );
};

export default FormInput;
