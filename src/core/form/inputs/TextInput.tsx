import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    id?: string;
    type: string;
    name: string;
    label: string;
    onChange: (e) => void;
    formState: StateSchema;
}

/**
 * TextInput form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 */
const TextInput = ({ type, name, label, onChange, formState, ...rest }: Props & HTMLAttributes<HTMLInputElement>) => {
    return (
        <ShowValidation className="form-text flow--xsmall" formState={formState} name={name}>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <input
                {...rest}
                className="form-text__input"
                type={type}
                name={name}
                value={typeof formState[name] !== 'undefined' ? formState[name].value : ''}
                onChange={onChange}
            />
        </ShowValidation>
    );
};

export default TextInput;
