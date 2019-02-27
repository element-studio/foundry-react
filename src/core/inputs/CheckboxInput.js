import * as React from 'react';
import PropTypes from 'prop-types';

import Input from '../reactform/containers/FormInputContainer.js';

export default class CheckboxInput extends Input {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    state = {
        checked: false,
        serverErrors: null, // No initial server errors
        isValid: true,
        failedValidations: [],
        value: null
    };

    /*
     * ----------
     * Lifecycle events
     * ----------
     */
    componentWillMount() {
        if (typeof this.props.attachToValidationGroup === 'function') {
            this.props.attachToValidationGroup(this); // Attaching the component to the form
        }

        if (this.props.checked) {
            this.setChecked(this.props.checked);
        }
    }

    componentWillUnmount() {
        if (typeof this.props.detachFromValidationGroup === 'function') {
            this.props.detachFromValidationGroup(this); // Detaching if unmounting
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== null) {
            if (nextProps.checked !== this.state.checked) {
                this.setChecked(nextProps.checked);
            }
        }
    }

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_change = (e) => {
        if (this.props.onChange) {
            this.props.onChange({ name: e.target.name, value: e.target.value, checked: e.target.checked }, e);
            if (this.props.controllable === true) {
                this.setChecked(e.target.checked);
            }
        }

        if (this.props.controllable === false) {
            this.setChecked(e.target.checked);
        }
    };

    /*
     * Logic
     */
    setChecked = (checked) => {
        this.setState({
            checked,
            value: checked ? this.props.value : null
        });
    };

    render() {
        return (
            <fieldset className="field_set">
                <div className="field_wrapper">
                    <input
                        ref="checkbox"
                        type="checkbox"
                        id={this.props.id || this.props.name}
                        name={this.props.name}
                        onChange={this.handle_change}
                        className={this.props.style + '_input'}
                        value={this.props.value}
                        checked={this.state.checked}
                    />
                    <label htmlFor={this.props.id || this.props.name} className={this.props.style + '_label type-label'}>
                        {this.props.label}
                    </label>
                    <label htmlFor={this.props.id || this.props.name} className={this.props.style + '_icon'}>
                        {(() => {
                            if (this.props.style == 'checkbox') {
                                return this.state.checked ? (
                                    <svg viewBox="0 0 32 32" width="24" height="24">
                                        <use xlinkHref={'#icon-circle-check'} />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 32 32" width="24" height="24">
                                        <use xlinkHref={'#icon-circle'} />
                                    </svg>
                                );
                            }
                        })()}
                    </label>
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
    controllable: false,
    onChange: null,
    value: 1
};

const props = Object.assign({}, Input.defaultProps);
CheckboxInput.defaultProps = Object.assign(props, defaultProps);
