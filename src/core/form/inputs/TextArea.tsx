import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    id?: string;
    name: string;
    label?: string;
    className?: string;
    onChange: (e) => void;
    formState: StateSchema;
}

/**
 * TextArea form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 */
const TextArea = ({ name, label, className, onChange, formState, ...rest }: Props & HTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <ShowValidation className={`form-textarea flow--xsmall ${className}`} formState={formState} name={name}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <textarea
                {...rest}
                className="form-textarea__input"
                name={name}
                value={typeof formState[name] !== 'undefined' && formState[name].value !== null ? formState[name].value : ''}
                onChange={onChange}
            />
        </ShowValidation>
    );
};

export default TextArea;
