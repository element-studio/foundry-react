/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { useState, useCallback } from 'react';
import { set } from 'lodash/object';
import useDeepCompareEffect from 'use-deep-compare-effect';

export interface StateSchema {
    [fieldName: string]: { value: any; error: any };
}

interface ValidationStateSchema {
    [fieldName: string]:
        | {
              validations?: string[]; // 'required'
              errorMessage?: string;
              customValidation?: (val) => boolean; // return false if failed
          }
        | undefined;
}

interface FormData {
    [key: string]: any;
}

type Callback = (formData: FormData, state: StateSchema) => void;

const useForm = (formValues: FormData, validationSchema: ValidationStateSchema = {}, callback: Callback) => {
    const [state, setState] = useState(convertFormDataToSchema(formValues, validationSchema));
    const [hasErrors, setHasErrors] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useDeepCompareEffect(() => {
        setState(convertFormDataToSchema(formValues, validationSchema));
    }, [formValues, validationSchema]);

    /**
     * Validates an individual fields.
     */
    const checkError = useCallback(
        (name, value) => {
            let error = '';

            const vs = validationSchema[name];
            const validations = vs ? vs.validations : undefined;

            const customValidation = vs ? vs.customValidation : undefined;

            if (vs && validations && validations.indexOf('required') > -1) {
                if (!value && value !== 0) {
                    error = vs.errorMessage || 'This field is required.';
                }
            }

            if (vs && customValidation && typeof customValidation === 'function') {
                if (!customValidation(value)) {
                    error = vs.errorMessage || 'This field has an error.';
                }
            }

            return error;
        },
        [validationSchema]
    );

    /**
     * Change function that is attached to each change of a form input's value.
     */
    const handleOnChange = useCallback(
        (name, value) => {
            setIsDirty(true);

            const error = checkError(name, value);

            setState((prevState) => ({
                ...prevState,
                [name]: { value, error },
            }));
        },
        [checkError]
    );

    /**
     * Checks all fields are valid.
     */
    const checkAllValid = useCallback(() => {
        let valid = true;

        let newState = { ...state };

        Object.keys(validationSchema).forEach((key) => {
            const name = key;
            const { value } = state[key]; // state value
            const error = checkError(name, value);

            if (error) {
                valid = false;
            }

            newState = {
                ...newState,
                [name]: { value, error },
            };
        });

        setState(() => newState);
        setHasErrors(!valid);

        return valid;
    }, [checkError, state, validationSchema]);

    /**
     * For when a Form is submitted, it will check is valid and run the callback
     */
    const handleOnSubmit = useCallback(
        (event) => {
            if (event && event.preventDefault) event.preventDefault();

            if (checkAllValid()) {
                callback(serializeState(state), state);
            }
        },
        [checkAllValid, callback, state]
    );

    return {
        state,
        handleOnChange,
        handleOnSubmit,
        isDirty,
        hasErrors,
    };
};

/**
 * This converts the useForm state to a typical object to be useful for posting to servers.
 * @param state
 */
const serializeState = (state: StateSchema): FormData => {
    const formData = {};

    Object.keys(state).forEach((key) => {
        const val = state[key].value;
        if (typeof val !== 'undefined') {
            set(formData, key, state[key].value);
        }
    });

    return formData;
};

const flattenObject = (ob) => {
    const toReturn = {};

    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (Object.prototype.toString.call(ob[i]) === '[object Object]') {
            const flatObject = flattenObject(ob[i]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[`${i}.${x}`] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

/**
 * Converts a standard object to the validation schema that we have set up above.
 * @param formData
 * @param validationSchema
 */
const convertFormDataToSchema = (formData: FormData, validationSchema: ValidationStateSchema): StateSchema => {
    const stateSchema = {};

    const flattenedFormData = formData;

    Object.keys(validationSchema).forEach((key) => {
        stateSchema[key] = { value: null, error: '' };
    });

    Object.keys(flattenedFormData).forEach((key) => {
        stateSchema[key] = { value: flattenedFormData[key], error: '' };
    });

    return stateSchema;
};

export default useForm;
