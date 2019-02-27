import * as React from 'react';

import Input from '@/reactform/containers/FormInputContainer.js';

export default class TextArea extends Input {

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

    handle_KeyUp = (e) => {

        if (typeof this.props.onChange === 'function') {
            this.props.onChange({name: e.target.name, value: e.target.value});
        }

        this.setValue(e.target.value)
    }


    setValue = (value) => {

        this.setState({
            value: value,
            isValid: (typeof this.props.charLimit == "number" && value > this.props.charLimit) ? false : true
        }, () => {
            if (this.props.validateOnChange) {
                this.props.validate(this);
            }
        });
    };

    /*
     * ----------
     * Render
     * ----------
     */
    render(){
        return (

            <fieldset className={'field_set'}>
				<div className="field_wrapper">
					{
						(this.props.label)
						?
							<label htmlFor={this.props.name} className="text_input_label text_area_label type-label" data-label={this.props.label}>{this.props.label}</label>
						:null
					}
                    <textarea
                        className={'text_input ' + this.props.classes + ((this.state.value) && (this.state.value != '') ? ' _has-value' : ' ') + ((!this.state.isValid) ? ' _has-error' : ' ') }
                        id={this.props.name}

                        name={this.props.name}
                        value={this.state.value || ''}
                        onChange={this.handle_KeyUp}
                        onKeyUp={this.handle_KeyUp}
                        maxLength={this.props.maxLength}
                        />

                        {
                            (this.props.charLimit && typeof this.state.value == 'string')
                            ?
                            <span className={"text_input_limit " + ((this.state.value.length > this.props.charLimit) ? '_has-excess':'')}>{(this.props.charLimit - this.state.value.length) + ' / ' + this.props.charLimit}</span>
                            :null
                        }
                </div>
                {this.printErrors()}
            </fieldset>

        );
    }
}


let defaultProps = {
    id:null,
    name:null,
    label:'Type something mind-blowing',
    classes:'',
    defaultValue:null,
    charLimit:null,
    beforeInputTemplate:null,
    afterInputTemplate:null,
    maxLength:null,
    validateOnChange:false,
    validations:'',
};

let props = Object.assign({},Input.defaultProps);
TextArea.defaultProps = Object.assign(props,defaultProps);
