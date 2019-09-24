import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    id?: string;
    name: string;
    label: string;
    className?: string;
    inputStyle?: 'form-checkbox' | 'form-toggle';
    onChange: (e) => void;
    formState: StateSchema;
}

/**
 * Checkbox form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 */
const Checkbox = ({ id, name, label, onChange, formState, inputStyle, className, ...rest }: Props & HTMLAttributes<HTMLInputElement>) => {
    inputStyle = inputStyle || 'form-checkbox';

    return (
        <ShowValidation className={inputStyle + ' ' + className} formState={formState} name={name}>
            <div className="form-field flex flex--space-between">
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
