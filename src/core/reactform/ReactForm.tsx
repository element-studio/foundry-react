import * as React from 'react';
import axios from 'axios';
import Validator from 'validator'; // We've added a custom isRequired custom validator

import * as tools from '@utils/tools.js';
/**
 * Server validations can get passed into this validation group
 *
 *
 * For the Front end validation that gets set, this uses the npm package validator - https://www.npmjs.com/package/validator
 * Examples
 *  - isAscii
 *  - isCurrency
 *  - isEmpty
 *  - isFloat
 *  - isMinLength:6
 *  - isLength:5
 *  - isNumeric
 *
 * Custom validator methods we have added:
 *  - isRequired -- this is to make the input required.
 *  - isConfirm:name_of_input -- this is to ensure that this is the same value as the input stated.
 */

export default class ReactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            isValid: true,
            isValidating: false,
            serverErrors: {}
        };

        this.inputs = {};
    }

    componentWillMount() {
        this.registerInputs(this.props.children);
    }

    componentDidMount() {
        this.validateForm();
    }

    isValid = () => {
        return this.state.isValid;
    };

    registerInputs = (children) => {
        return React.Children.map(children, (child) => {
            if (child) {
                if (typeof child.props === 'object') {
                    //if there are more children to search
                    if (child.props.children) {
                        return React.cloneElement(child, {
                            children: this.registerInputs(child.props.children)
                        });
                    }

                    if (child.props.reactInput) {
                        // this is in case the children don't get touched then we can pass the react form attach through components manually.
                        let props = {
                            attachToValidationGroup: this.attachToValidationGroup,
                            detachFromValidationGroup: this.detachFromValidationGroup,
                            validate: this.validate,
                            isSubmitting: this.state.isSubmitting
                        };

                        if (child.props.name && child.props.validations) {
                            props.validations = child.props.validations ? child.props.validations : null;
                        }

                        return React.cloneElement(child, props);
                    } else {
                        if (typeof child.type === 'function' || child.props.reactButton) {
                            let newChildProps = Object.assign({}, child.props);

                            newChildProps.isSubmitting = this.state.isSubmitting;

                            return React.cloneElement(child, newChildProps);
                        }

                        return React.cloneElement(child, child.props);
                    }
                }
            }

            return child;
        });
    };

    validate = (component) => {
        let isValid = true,
            failedValidations = [];

        if (component.props.validations) {
            // We split on comma to iterate the list of validation rules
            component.props.validations.split(',').forEach((validation) => {
                const value = component.state.value || component.state.value === 0 ? component.state.value : '';

                if (!validation) {
                    return false;
                }
                // By splitting on ":"" we get an array of arguments that we pass
                // to the validator. ex.: isLength:5 -> ['isLength', '5']
                let args = validation.split(':');

                // We remove the top item and are left with the method to
                // call the validator with ['isLength', '5'] -> 'isLength'
                let validateMethod = args.shift();

                // We use JSON.parse to convert the string values passed to the
                // correct type. Ex. 'isLength:1' will make '1' actually a number
                try {
                    args = args.map(function(arg) {
                        return JSON.parse(arg);
                    });
                } catch (e) {
                    //
                }

                // Custom validate method
                if (validateMethod === 'isRequired') {
                    if (Validator['isEmpty'].apply(Validator, [value.toString()]) || value.toString() === 'null') {
                        isValid = false;

                        failedValidations.push('isRequired');
                    }
                    // So the next line of code is actually:
                    // validator.isLength('valueFromInput', 5)
                } else if (validateMethod === 'isMinLength') {
                    if (Validator['isLength'].apply(Validator, [value.toString()].concat({ max: args[0] - 1 }))) {
                        isValid = false;

                        failedValidations.push('isMinLength');
                    }
                } else if (validateMethod == 'isConfirm') {
                    if (typeof this.inputs[args] !== 'undefined') {
                        if (value.toString() !== this.inputs[args].state.value) {
                            isValid = false;
                            failedValidations.push('isConfirm');
                        }
                    }

                    // We then merge two arrays, ending up with the value
                    // to pass first, then options, if any. ['valueFromInput', 5]
                } else if (!Validator[validateMethod].apply(Validator, [value.toString()].concat(args))) {
                    isValid = false;

                    failedValidations.push(validateMethod);
                }
            });
        }

        let serverErrors = null;

        if (this.state.serverErrors) {
            if (this.state.serverErrors[component.props.name]) {
                serverErrors = this.state.serverErrors[component.props.name];
            }
        }

        if (component) {
            // Now we set the state of the input based on the validation
            component.setState(
                {
                    isValid: isValid,
                    failedValidations: failedValidations,
                    serverErrors
                    // We use the callback of setState to wait for the state
                    // change being propagated, then we validate the form itself
                },
                () => {
                    this.validateForm();
                }
            );
        }

        return isValid;
    };

    validateInputs = (names) => {
        if (typeof names === 'undefined' || names.length < 1) {
            return true;
        }

        let that = this;
        let inputs = this.inputs;
        let allIsValid = true;

        //reflag if input is valid or not this only applies to server validation
        names.forEach(function(name) {
            const inputValid = that.validate(inputs[name]);

            if (!inputValid) {
                allIsValid = false;
            }
        });

        return allIsValid;
    };

    validateAllInputs = () => {
        let that = this;
        let inputs = this.inputs;

        let allIsValid = true;

        //reflag if input is valid or not this only applies to server validation
        Object.keys(inputs).forEach(function(name) {
            const inputValid = that.validate(inputs[name]);

            if (!inputValid) {
                allIsValid = false;
            }
        });

        return allIsValid;
    };

    validateForm = () => {
        // We set allIsValid to true and flip it if we find any
        // invalid input components
        let allIsValid = true;

        // Now we run through the inputs registered and flip our state
        // if we find an invalid input component
        let inputs = this.inputs;

        if (!inputs) {
            return false;
        }

        Object.keys(inputs).forEach((name) => {
            if (!inputs[name].state.isValid) {
                allIsValid = false;
            }
        });

        // And last, but not least, we set the valid state of the
        // form itself
        this.setState({ isValid: allIsValid });
    };

    attachToValidationGroup = (component) => {
        this.inputs[component.props.name] = component;
        // We have to validate the input when it is attached to put the
        // form in its correct state
        // this.validate(component);
    };

    detachFromValidationGroup = (component) => {
        delete this.inputs[component.props.name];
    };

    getFormData = () => {
        let data = tools.serialize(this.refs.reactform);

        return this.sanitizeNullStrings(data);
    };

    getPreparedFormData = () => {
        let data = this.getFormData();

        //this allows us to manipulate the data object before it gets sent.
        if (typeof this.props.beforeSubmit === 'function') {
            data = this.props.beforeSubmit(data);
        }

        return data;
    };

    sanitizeNullStrings = (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let dItem = data[key];
                if (typeof dItem === 'string') {
                    if (dItem === 'null') {
                        delete data[key];
                    }
                }
            }
        }
        return data;
    };

    generateServerErrorMessage = () => {
        if (!this.state.serverErrors) {
            return false;
        }

        return this.state.serverErrors;
    };

    submit = (e) => {
        if (!this.props.nonAjaxPost) {
            if (e) {
                e.preventDefault();
            }

            let data = this.getPreparedFormData();

            this.setState(
                {
                    serverErrors: null
                },
                () => {
                    let isValid = this.validateAllInputs(); // Checks front end validation

                    this.validateForm();

                    if (this.state.isSubmitting || !isValid) {
                        return false;
                    }

                    this.setState(
                        {
                            isSubmitting: true
                        },
                        () => {
                            axios({
                                method: this.props.method,
                                url: this.props.action,
                                data: data
                            })
                                .then(this.checkServerErrors)
                                .catch(() => {
                                    this.setState({
                                        isSubmitting: false
                                    });
                                });
                        }
                    );
                }
            );
        }
    };

    //'Error occurred while trying to ' + this.props.method + ' - ' + this.props.action

    checkServerErrors = (res) => {
        res = res.data;

        if (typeof res.errors !== 'undefined') {
            this.setState(
                {
                    serverErrors: res.errors
                },
                () => {
                    this.finishSubmit(res);
                }
            );
        } else {
            this.setState(
                {
                    serverErrors: null
                },
                () => {
                    this.finishSubmit(res);
                }
            );
        }
    };

    finishSubmit = (res) => {
        this.validateAllInputs();
        this.validateForm();

        this.setState(
            {
                isSubmitting: false
            },
            () => {
                if (typeof this.props.submitCallback === 'function') {
                    this.props.submitCallback(res, this.generateServerErrorMessage());
                }
            }
        );
    };

    render() {
        return (
            <form
                ref="reactform"
                id={this.props.id}
                action={this.props.action}
                method={this.props.method}
                className={'clear ' + this.props.classes}
                onSubmit={this.submit}
                encType={this.props.encType}
            >
                {this.registerInputs(this.props.children)}
            </form>
        );
    }
}

ReactForm.defaultProps = {
    id: '',
    action: '/',
    method: 'POST',
    classes: '',
    submitCallback: null,
    beforeSubmit: function(data) {
        return data;
    },
    nonAjaxPost: false,
    encType: null
};
