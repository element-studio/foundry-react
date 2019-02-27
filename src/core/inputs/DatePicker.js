import * as React from 'react';

import DatePicker from 'react-datepicker';
import * as moment from 'moment'
import Input from '@core/reactform/containers/FormInputContainer.js';
import 'react-datepicker/dist/react-datepicker.css';


export default class TextInput extends Input {

    constructor(props) {

        super(props);

        this.state = {
            serverErrors: null, // No initial server errors
            isValid: true,
            failedValidations: [],
            value: null
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


            if (
				nextProps.value !== null ||
				typeof nextProps.value !== 'undefined' ||
				nextProps.defaultValue !== null ||
				typeof nextProps.defaultValue !== 'undefined') {

                    this.setValue( nextProps.value || nextProps.defaultValue);

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

    setValue = (value) => {

        if(value === this.state.value){ //if its the same value stop.
            return false;
        }

        this.setState({
            value

            // When the value changes, wait for it to propagate and
            // then validate the input
        }, () => {
            if (this.props.validateOnChange) { //if controllable then it'll just continuously loop - we have this in component will receive props for controllable
                this.props.validate(this,true);
            }
            if (typeof this.props.onChange === 'function') {
                this.props.onChange({name: e.target.name, value: e.target.value});
            }
        });

    };


    /*
     * Logic
     */

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

            <fieldset className={'field_set'}>
				<div className={'field_wrapper'}>
					{(this.props.label) ? <label htmlFor={this.props.name} className="text_input_label type-label" data-label={this.props.label}>{this.props.label}</label> : null }

                    <DatePicker
                        name={this.props.name}
                        id={this.props.name}
                        selected={this.state.value}
                        onChange={this.setValue}
                        placeholderText={this.props.placeholder}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                </div>
                {this.printErrors()}
            </fieldset>


        );
    }
}

const defaultProps = {
    id: null,
    name: 'name',
    type: 'text',
    value: '', //sets the default initial value
    defaultValue: '',
    className: '',
    classes:'',
    tabIndex: '',
    label: null,
    validations:'',
    validateOnChange: false,
    min:null,
    max:null,
    step:null,
    placeholder:null,

    required: false,
    readOnly:false,

    onChange: null,
    onClick: null,

    editable: true,
    disableEnterButton: false,

    selectTextOnEntry: false, //if set to true then the text in the box is automatically selected.

    controllable: false
};

const props = Object.assign({},Input.defaultProps);
TextInput.defaultProps = Object.assign(props,defaultProps);
