import { useState, useEffect, useCallback, useMemo } from 'react';

import { set } from 'lodash/object';

interface StateSchema {
    [fieldName: string]: { value: any; error: string };
}

interface ValidationStateSchema {
    [fieldName: string]:
        | {
              validations?: string[]; // 'required'
              errorMessage?: string;
          }
        | undefined;
}

interface FormData {
    [key: string]: any;
}

type Callback = (formData: FormData, state: StateSchema) => void;

const useForm = (formValues: FormData, validationSchema: ValidationStateSchema = {}, callback: Callback) => {
    const formVals = useMemo(() => convertFormDataToSchema(formValues), []);

    const [state, setState] = useState(formVals);
    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Disable button in initial render.
    useEffect(() => {
        setDisable(true);
    }, []);

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(validateState());
        }
    }, [state, isDirty]);

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some(
            (key): boolean => {
                const vs = validationSchema[key];
                const validations = vs ? vs.validations : undefined;
                const isInputFieldRequired = validations ? validations.indexOf('required') > -1 : false;
                const stateValue = state[key].value; // state value
                const stateError = state[key].error; // state error

                return !!((isInputFieldRequired && !stateValue) || stateError);
            }
        );

        return hasErrorInState;
    }, [state, validationSchema]);

    // Used to handle every changes in every input
    const handleOnChange = useCallback(
        (name, value) => {
            setIsDirty(true);

            let error = '';

            const vs = validationSchema[name];
            const validations = vs ? vs.validations : undefined;
            if (vs && validations && validations.indexOf('required') > -1) {
                if (!value) {
                    error = vs.errorMessage || 'This field is required.';
                }
            }

            setState((prevState) => ({
                ...prevState,
                [name]: { value, error }
            }));
        },
        [validationSchema]
    );

    const handleOnSubmit = useCallback(
        (event) => {
            if (event.preventDefault) event.preventDefault();

            // Make sure that validateState returns false
            // Before calling the submit callback function
            if (!validateState()) {
                callback(serializeState(state), state);
            }
        },
        [state]
    );

    return { state, disable, handleOnChange, handleOnSubmit };
};

const serializeState = (state: StateSchema): FormData => {
    const formData = {};

    Object.keys(state).forEach((key) => {
        set(formData, key, state[key].value);
    });

    return formData;
};

const convertFormDataToSchema = (formData: FormData): StateSchema => {
    const stateSchema = {};

    const flattenedFormData = flattenObject(formData);

    Object.keys(flattenedFormData).forEach((key) => {
        stateSchema[key] = { value: flattenedFormData[key], error: '' };
    });

    return stateSchema;
};

const flattenObject = (ob) => {
    const toReturn = {};

    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (Object.prototype.toString.call(ob[i]) === '[object Object]') {
            const flatObject = flattenObject(ob[i]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

export default useForm;
