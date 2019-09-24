import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    id?: string;
    name: string;
    label: string;
    onChange: (e) => void;
    formState: StateSchema;
    inputStyle?: 'form-checkbox' | 'form-toggle';
}

/**
 * Checkbox form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 */
const Checkbox = ({ id, name, label, onChange, formState, inputStyle, ...rest }: Props & HTMLAttributes<HTMLInputElement>) => {
    inputStyle = inputStyle || 'form-checkbox';

    return (
        <ShowValidation className={`${inputStyle} flex flex--space-between`} formState={formState} name={name}>
            <div className="form-field">
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
                <input
                    {...rest}
                    id={id || name}
                    name={name}
                    className={`${inputStyle}__input`}
                    type="checkbox"
                    checked={typeof formState[name] !== 'undefined' ? !!formState[name].value : false}
                    onChange={onChange}
                />
                <label className={`${inputStyle}__pseudo`} htmlFor={name}></label>
            </div>
        </ShowValidation>
    );
};

export default Checkbox;
