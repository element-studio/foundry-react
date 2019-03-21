import * as React from 'react';
import Validator from 'validator';

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
 *  - isLength:5
 *  - isNumeric
 *
 * Custom validator methods we have added:
 *  - isRequired -- this is to make the input required.
 *  - isConfirm:name_of_input -- this is to ensure that this is the same value as the input stated.
 */

export default class ValidationGroup extends React.Component {
    static defaultProps = {
        id: '',
        showError: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isValid: true,
            isValidating: false,
            serverErrors: null
        };

        this.inputs = {};
    }

    componentWillMount() {
        this.registerInputs(this.props.children);

        if (this.props.serverErrors) {
            this.setState(
                {
                    serverErrors: this.props.serverErrors
                },
                () => {
                    this.validateAllInputs();
                }
            );
        }
    }

    componentDidMount() {
        this.validateGroup();
    }

    isValid = () => {
        return this.state.isValid;
    };

    getData = () => {
        let obj = {};

        Object.keys(this.inputs).map((inputName) => {
            const value = this.inputs[inputName].state.value;

            obj[inputName] = value;
        });

        return obj;
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
                            validate: this.validate
                        };

                        if (child.props.name && child.props.validations) {
                            props.validations = child.props.validations ? child.props.validations : null;
                        }

                        return React.cloneElement(child, props);
                    } else {
                        if (typeof child.type === 'function') {
                            let newChildProps = Object.assign({}, child.props);

                            return React.cloneElement(child, newChildProps);
                        }

                        return React.cloneElement(child, child.props);
                    }
                }
            }

            return child;
        });
    };

    validate = (component, clearServerError) => {
        let isValid = true,
            failedValidations = [];

        if (component.props.validations) {
            // We split on comma to iterate the list of validation rules
            component.props.validations.split(',').forEach((validation) => {
                const value = component.state.value || '';

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
                } catch (e) {}

                // Custom validate method
                if (validateMethod == 'isRequired') {
                    if (Validator['isEmpty'].apply(Validator, [value.toString()]) || value.toString() === 'null') {
                        isValid = false;

                        failedValidations.push('isRequired');
                    }
                    // So the next line of code is actually:
                    // validator.isLength('valueFromInput', 5)
                } else if (validateMethod == 'isConfirm') {
                    if (typeof this.inputs[args] !== 'undefined') {
                        if (value.toString() !== this.inputs[args].state.value) {
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
                if (clearServerError) {
                    delete this.state.serverErrors[component.props.name];
                } else {
                    serverErrors = this.state.serverErrors[component.props.name];
                }
            }
        }

        if (component) {
            // Now we set the state of the input based on the validation
            component.setState(
                {
                    isValid,
                    failedValidations,
                    serverErrors
                    // We use the callback of setState to wait for the state
                    // change being propagated, then we validate the form itself
                },
                () => {
                    this.validateGroup();
                }
            );
        }

        return isValid;
    };

    validateAllInputs = () => {
        let inputs = this.inputs,
            allIsValid = true;

        //reflag if input is valid or not this only applies to server validation
        Object.keys(inputs).forEach((name) => {
            const inputValid = this.validate(inputs[name]);

            if (!inputValid) {
                allIsValid = false;
            }
        });

        return allIsValid;
    };

    validateGroup = () => {
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
    };

    detachFromValidationGroup = (component) => {
        delete this.inputs[component.props.name];
    };

    render() {
        return (
            <div ref="validationGroup" id={this.props.id}>
                {this.registerInputs(this.props.children)}
                {!this.state.isValid && this.props.showError ? (
                    <div className="form-error-message island-small">
                        There are some errors that need to be resolved in this form. Please ensure that everything is correctly inputted.
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}
