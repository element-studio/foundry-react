import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    id?: string;
    type: string;
    name: string;
    label?: string;
    className?: string;
    onChange: (e) => void;
    formState: StateSchema;
}

/**
 * TextInput form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 */
const TextInput = ({ type, name, label, className, onChange, formState, ...rest }: Props & HTMLAttributes<HTMLInputElement>) => {
    return (
        <ShowValidation className={`form-text flow--xsmall ${className}`} formState={formState} name={name}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                {...rest}
                className="form-text__input"
                type={type}
                name={name}
                value={typeof formState[name] !== 'undefined' && formState[name].value !== null ? formState[name].value : ''}
                onChange={onChange}
            />
        </ShowValidation>
    );
};

export default TextInput;
