import React from 'react';
import useForm from '../../../../src/hooks/useForm';
import TextInput from '@core/form/inputs/TextInput';
import TextArea from '@core/form/inputs/TextArea';
import Checkbox from '@core/form/inputs/Checkbox';
import Select from '@core/form/inputs/Select';

const validationSchema = {
    name: {
        validations: ['required'],
        errorMessage: 'Name is required'
    },

    email: {
        validations: ['required'],
        errorMessage: 'Email is required'
    },
    selectthisnamething: {
        validations: ['required'],
        errorMessage: 'selectthisnamething is required'
    },
    checkyboxy: {
        validations: ['required'],
        errorMessage: 'checkyboxy is required'
    }
};

const defaultFormData = {
    name: ''
};

const FormHookExample = () => {
    const { state, handleOnChange, handleOnSubmit } = useForm(defaultFormData, validationSchema, (formData) => {
        console.log({ formData });
    });

    console.log({ state });
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

                <Checkbox
                    formState={state}
                    label="typical checkbox"
                    name="checkyboxy"
                    onChange={(e) => {
                        handleOnChange(e.target.name, !!e.target.checked);
                    }}
                    pseudoContent={'icon'}
                />

                <Checkbox
                    formState={state}
                    label="typical toggle"
                    name="form-toggle"
                    inputStyle="form-toggle"
                    onChange={(e) => {
                        handleOnChange(e.target.name, !!e.target.checked);
                    }}
                />

                <Select
                    formState={state}
                    label="Select test*"
                    name="selectthisnamething"
                    data={[{ value: 1, text: 'test option 1' }, { value: 2, text: 'test option 2' }, { value: 3, text: 'test option 3' }]}
                    onChange={(e) => {
                        handleOnChange(e.target.name, e.target.value);
                    }}
                />

                <TextInput
                    formState={state}
                    type="text"
                    label="Email *"
                    name="email"
                    onChange={(e) => {
                        handleOnChange(e.target.name, e.target.value);
                    }}
                />

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
