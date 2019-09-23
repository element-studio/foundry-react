import React from 'react';
import useForm from '../../../../src/hooks/useForm';
import FormInput from './FormInput';

const validationSchema = {
    name: {
        validations: ['required'],
        errorMessage: 'Name is required'
    },
    email: {
        validations: ['required'],
        errorMessage: 'Email is required'
    }
};

const defaultFormData = {
    name: ''
};

const FormHookExample = () => {
    const { state, handleOnChange, handleOnSubmit } = useForm(defaultFormData, validationSchema, (formData) => {
        console.log(formData);
    });

    return (
        <form onSubmit={handleOnSubmit}>
            <fieldset>
                <FormInput
                    formState={state}
                    type="text"
                    label="Name *"
                    name="name"
                    onChange={(e) => {
                        handleOnChange(e.target.name, e.target.value);
                    }}
                />
            </fieldset>
            <fieldset>
                <FormInput
                    formState={state}
                    type="text"
                    label="Email *"
                    name="email"
                    onChange={(e) => {
                        handleOnChange(e.target.name, e.target.value);
                    }}
                />
            </fieldset>
            <fieldset>
                <FormInput
                    formState={state}
                    type="textarea"
                    label="Message "
                    name="message"
                    onChange={(e) => {
                        handleOnChange(e.target.name, e.target.value);
                    }}
                />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormHookExample;
