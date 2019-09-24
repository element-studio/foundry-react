import React from 'react';
import useForm from '../../../../src/hooks/useForm';
import TextInput from '../inputs/TextInput';
import TextArea from '../inputs/TextArea';

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
                <TextInput
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
                <TextInput
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
                <TextArea
                    formState={state}
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
