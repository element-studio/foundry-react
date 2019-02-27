import * as React from 'react';

import Input from '../reactform/containers/FormInputContainer.js';

export default class YesNoInput extends Input {
    constructor(props) {
        super(props);

        this.state = {
            serverErrors: null, // No initial server errors
            isValid: true,
            failedValidations: [],
            value: null // null,0,1
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

        if (this.props.value !== null) {
            this.setValue(this.props.value);
        }
    }

    componentWillUnmount() {
        if (typeof this.props.detachFromValidationGroup === 'function') {
            this.props.detachFromValidationGroup(this); // Detaching if unmounting
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && this.props.controllable) {
            if (nextProps.value !== null) {
                if (nextProps.value !== this.state.value) {
                    this.setValue(nextProps.value);
                }
            }
        }
    }

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_change = (val) => {
        if (this.props.onChange) {
            this.props.onChange({ name: this.props.name, value: val });
        }

        this.setValue(val);
    };

    /*
     * Logic
     */
    setValue = (value) => {
        this.setState(
            {
                value: value
            },
            () => {
                if (this.props.validateOnChange) {
                    if (typeof this.props.validate === 'function') {
                        this.props.validate(this);
                    }
                }
            }
        );
    };

    render() {
        return (
            <fieldset className="field_set">
                <div className="field_wrapper">
                    <input
                        type="hidden"
                        id={this.props.id || this.props.name}
                        name={this.props.name}
                        className={'yes_no_input'}
                        value={this.state.value || ''}
                    />
                    <label className={'yes_no_label type-label'}>{this.props.label}</label>
                    <ul className="yes_no_list">
                        <li
                            className={'yes_no_list_item' + (this.state.value == 1 ? ' _is-active' : '')}
                            onClick={this.handle_change.bind(this, '1')}
                        >
                            Yes
                        </li>
                        <li
                            className={'yes_no_list_item' + (this.state.value == 0 ? ' _is-active' : '')}
                            onClick={this.handle_change.bind(this, '0')}
                        >
                            No
                        </li>
                    </ul>
                </div>
                {this.printErrors()}
            </fieldset>
        );
    }
}

const defaultProps = {
    id: null,
    name: null,
    label: null,
    checked: null,
    style: 'switchbox',
    onChange: null,
    value: null,
    validations: '',
    validateOnChange: false,
    controllable: false
};

const props = Object.assign({}, Input.defaultProps);
YesNoInput.defaultProps = Object.assign(props, defaultProps);
