import React from 'react';
import { StateSchema } from '../../hooks/useForm';

interface Props {
    name: string;
    htmlTag?: string;
    className?: string;
    formState: StateSchema;
    children: React.ReactNode;
}

export const ShowValidation = ({ htmlTag, className, name, formState, children }: Props) => {
    const CustomTag = htmlTag || 'div';
    const hasError = formState && name && formState[name] ? formState[name].error : null;
    return (
        <React.Fragment>
            {React.createElement(CustomTag, {
                className: `${className}${hasError ? ' _has--error' : ''}`,
                children: (
                    <>
                        {children}
                        {hasError ? (
                            <label className="form-error" htmlFor={name}>
                                {hasError}
                            </label>
                        ) : null}
                    </>
                )
            })}
        </React.Fragment>
    );
};

export default ShowValidation;
