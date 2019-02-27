import * as React from 'react';

import Input from '@/reactform/containers/FormInputContainer.js';

export default class CurrencyInput extends Input {

    constructor(props) {

        super(props);

        this.state = {
            serverErrors: null, // No initial server errors
            isValid: true,
            failedValidations: [],
            value: ''
        };

    }

    /*
     * ----------
     * Lifecycle events
     * ----------
     */
    componentWillMount() {

        if (typeof this.props.attachToValidationGroup === 'function') {
            this.props.attachToValidationGroup(this); // Attaching the component to the form
        }

        if (this.props.value || this.props.defaultValue) {
            this.setValue(this.props.value || this.props.defaultValue);
        }
    }

    componentWillUnmount() {

        if (typeof this.props.detachFromValidationGroup === 'function') {
            this.props.detachFromValidationGroup(this); // Detaching if unmounting
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps && this.props.controllable) {
            if (nextProps.value || nextProps.defaultValue) {
                this.setValue(nextProps.value || nextProps.defaultValue);
            }
        }

        if (typeof nextProps.failedValidations !== 'undefined' && nextProps.failedValidations != null) {
            this.setState({failedValidations: nextProps.failedValidations});
        }
    }

    /*
     * ----------
     * User-driven events
     * @prefix handle_
     * ----------
     */
    handle_onChange = (e) => {

        if (typeof this.props.onChange === 'function') {
            this.props.onChange({name: e.target.name, value:e.target.value});
        }

        this.setState({value:e.target.value});

    };

	handle_blur = (e) => {

		if(e.target.value == '') {
			return false;
		}

		if(!this.props.validate(this)) {
			return false;
		}

		let value = parseFloat(e.target.value).toFixed(2);

		if (typeof this.props.onChange === 'function') {
            this.props.onChange({name: e.target.name, value});
        }

        this.setState({value});

	}

    /*
     * Logic
     */

    setValue = (valOrEvent) => {

        let value = valOrEvent;

        if (typeof valOrEvent.target !== 'undefined') {
            value = valOrEvent.target.value;
        }

        this.setState({
            value: value

            // When the value changes, wait for it to propagate and
            // then validate the input
        }, function() {
            if (this.props.validateOnKeyUp) {
                this.props.validate(this);
            }

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.value);
            }
        }.bind(this));
    };

    validate = () => {
        if (typeof this.props.validate === 'function') {
            this.props.validate(this);
        }
    };

    /*
     * ----------
     * Render
     * ----------
     */
    render() {
        return (

            <fieldset className="field_set">
                <div className={'field_wrapper'}>
                    {(this.props.label) ? <label htmlFor={this.props.name} className="text_input_label type-label" data-label={this.props.label}>{this.props.label}</label> : null }
                    <input
                        className={'text_input '  + this.props.classes + ((this.state.value) && (this.state.value != '') ? ' _has-value': ' ') + ((!this.state.isValid) ? ' _has-error' : ' ')}
                        id={this.props.name}
						type="number"
						step='any'
                        name={this.props.name}
                        disabled={(this.props.readOnly) ? 'disabled' :null}
                        value={this.state.value}
						onChange={this.handle_onChange}
						onBlur={this.handle_blur}
					/>
                </div>
                {this.printErrors()}
            </fieldset>

        );
    }
}

let defaultProps = {
    id: null,
    name: 'name',
    value: null, //sets the default initial value
    defaultValue: null,
    className: '',
    classes:'',
    tabIndex: '',
	label: null,

    required: false,
    readOnly:false,

    onChange: null,
    onClick: null,

    editable: true,

    controllable: false
};

let props = Object.assign({},Input.defaultProps);
CurrencyInput.defaultProps = Object.assign(props,defaultProps);
