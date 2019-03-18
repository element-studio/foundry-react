import * as React from 'react';

export default class Input extends React.Component<any, any> {
    static defaultProps = {
        validations: null, // e.g 'isEmail' see https://www.npmjs.com/package/validator seperate by ,
        defaultValidationMessages: {
            isRequired: 'This field is required',
            isEmail: 'This field should be a valid email address',
            isNumeric: 'This field should be numeric',
            isDecimal: 'This field should be numeric',
            isConfirm: 'This field should be be the same as:'
        },
        validationMessages: {},
        showErrors: true,
        reactInput: true, // this is used for the form picking
        validate: null, //used by react form.
        attachToValidationGroup: null, //used by validation group and react form.
        detachFromValidationGroup: null //used by validation group and react form.
    };

    constructor(props) {
        super(props);

        this.state = {
            serverErrors: null,
            isValid: true,
            failedValidations: []
        };

        this.printErrors = this.printErrors.bind(this);
    }

    /*
     * Logic
     */
    printClasses() {
        let classes: string[] = [];

        if (!this.state.isValid || this.state.serverErrors || this.state.failedValidations.length) {
            classes.push(' _has-error');
        }

        if (this.state.value && this.state.value != 'null' && this.state.value != '') {
            classes.push(' _has-value');
        }

        if (this.state.isFocused) {
            classes.push('_is-focused');
        }

        if (!this.props.editable) {
            classes.push(' _is-not-editable');
        }

        return classes.join(' ');
    }

    printErrors() {
        let newErrArr: JSX.Element[] = [],
            failedValidationRules = this.state.failedValidations,
            failedServerValidationRules = this.state.serverErrors || [];

        let validationMessages = Object.assign(this.props.defaultValidationMessages, this.props.validationMessages);

        for (let i = 0; i < failedValidationRules.length; i++) {
            if (validationMessages.hasOwnProperty(failedValidationRules[i])) {
                newErrArr.push(
                    <span className="form-error-message" key={i}>
                        {validationMessages[failedValidationRules[i]]}
                    </span>
                );
            } else {
                newErrArr.push(
                    <span className="form-error-message" key={i}>
                        {failedValidationRules[i]}
                    </span>
                );
            }
        }

        for (let i = 0; i < failedServerValidationRules.length; i++) {
            let srvError = failedServerValidationRules[i];

            if (validationMessages.hasOwnProperty(srvError)) {
                newErrArr.push(
                    <span className="form-error-message" key={srvError}>
                        {validationMessages[srvError]}
                    </span>
                );
            } else {
                newErrArr.push(
                    <span className="form-error-message" key={srvError}>
                        {srvError}
                    </span>
                );
            }
        }

        return newErrArr;
    }
}
