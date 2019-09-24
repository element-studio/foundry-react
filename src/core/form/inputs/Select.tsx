import React, { HTMLAttributes } from 'react';
import { ShowValidation } from '../ShowValidation';
import { StateSchema } from 'src/hooks/useForm';

interface Props {
    name: string;
    label?: string;
    className?: string;
    icon?: JSX.Element;
    data?: SelectData[];
    onChange: (e) => void;
    formState: StateSchema;
}

interface SelectData {
    value: string | number;
    text: string | number;
}

/**
 * Select form input that would be created app side to
 * to illustrate a form input that uses the useForm hook's state.
 * @param param
 */
const Select = ({ id, name, className, label, onChange, formState, icon, data, ...rest }: Props & HTMLAttributes<HTMLSelectElement>) => {
    console.log();
    return (
        <ShowValidation className={`form-select ${className} flow--xsmall`} formState={formState} name={name}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <div className="form-field">
                <select
                    {...rest}
                    className="form-select__input"
                    name={name}
                    onChange={onChange}
                    value={typeof formState[name] !== 'undefined' && formState[name].value !== null ? formState[name].value : undefined}
                >
                    {data &&
                        data.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            );
                        })}
                </select>
                {icon}
            </div>
        </ShowValidation>
    );
};

export default Select;
