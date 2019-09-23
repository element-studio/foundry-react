import { useState, useCallback, useMemo } from 'react';
import { set } from 'lodash/object';

export interface StateSchema {
    [fieldName: string]: { value: any; error: any };
}

interface ValidationStateSchema {
    [fieldName: string]:
        | {
              validations?: string[]; // 'required'
              errorMessage?: any;
          }
        | undefined;
}

interface FormData {
    [key: string]: any;
}

type Callback = (formData: FormData, state: StateSchema) => void;

const useForm = (formValues: FormData, validationSchema: ValidationStateSchema = {}, callback: Callback) => {
    const formVals = useMemo(() => convertFormDataToSchema(formValues, validationSchema), []);

    const [state, setState] = useState(formVals);
    const [isDirty, setIsDirty] = useState(false);

    const checkError = useCallback(
        (name, value) => {
            let error = '';

            const vs = validationSchema[name];
            const validations = vs ? vs.validations : undefined;
            if (vs && validations && validations.indexOf('required') > -1) {
                if (!value && value !== 0) {
                    error = vs.errorMessage || 'This field is required.';
                }
            }

            return error;
        },
        [validationSchema]
    );

    // Used to handle every changes in every input
    const handleOnChange = useCallback(
        (name, value) => {
            setIsDirty(true);

            const error = checkError(name, value);

            setState((prevState) => ({
                ...prevState,
                [name]: { value, error }
            }));
        },
        [validationSchema]
    );

    const checkAllValid = useCallback(() => {
        let valid = true;

        let newState = { ...state };

        Object.keys(validationSchema).forEach((key) => {
            const name = key;
            const value = state[key].value; // state value
            const error = checkError(name, value);

            if (error) {
                valid = false;
            }

            newState = {
                ...newState,
                [name]: { value, error }
            };
        });

        setState(() => newState);

        return valid;
    }, [state]);

    const handleOnSubmit = useCallback(
        (event) => {
            if (event.preventDefault) event.preventDefault();

            if (checkAllValid()) {
                callback(serializeState(state), state);
            }
        },
        [state, callback]
    );

    return { state, handleOnChange, handleOnSubmit, isDirty };
};

const serializeState = (state: StateSchema): FormData => {
    const formData = {};

    Object.keys(state).forEach((key) => {
        set(formData, key, state[key].value);
    });

    return formData;
};

const convertFormDataToSchema = (formData: FormData, validationSchema: ValidationStateSchema): StateSchema => {
    const stateSchema = {};

    const flattenedFormData = flattenObject(formData);

    Object.keys(validationSchema).forEach((key) => {
        stateSchema[key] = { value: null, error: '' };
    });

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
