import * as React from 'react';

import Input from '@/reactform/containers/FormInputContainer.js';
import YesNoInput from '@/inputs/YesNoInput';
import TextArea from '@/inputs/TextArea';

export default class YesNoDetail extends Input {
    constructor(props) {
        super(props);

        this.state = {
            yesNoValue: null, // null,0,1,
            detailsValue: null
        };
    }

    /*
     * ----------
     * Lifecycle events
     * ----------
     */
    componentWillMount() {
        if (this.props.value !== null) {
            this.setState({
                yesNoValue: this.props.value
            });
        }

        if (this.props.detailsValue !== null) {
            if (this.props.detailsValue !== this.state.detailsValue) {
                this.setState({
                    detailsValue: this.props.detailsValue
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== null) {
            if (nextProps.value !== this.state.value) {
                this.setState({
                    yesNoValue: nextProps.value
                });
            }
        }

        if (nextProps.detailsValue !== null) {
            if (nextProps.detailsValue !== this.state.detailsValue) {
                this.setState({
                    detailsValue: nextProps.detailsValue
                });
            }
        }
    }

    /*
     * User-driven events
     * @prefix handle_
     */

    /*
     * Logic
     */
    handle_yesNoChange = (data) => {
        this.setState({
            yesNoValue: data.value
        });
    };

    render() {
        return (
            <div>
                <YesNoInput {...this.props} onChange={this.handle_yesNoChange} value={this.state.yesNoValue} />

                {this.state.yesNoValue === '1' ? (
                    <TextArea
                        attachToValidationGroup={this.props.attachToValidationGroup}
                        detachFromValidationGroup={this.props.detachFromValidationGroup}
                        validate={this.props.validate}
                        name={this.props.name + '_details'}
                        label={this.props.detailsLabel}
                        maxLength={this.props.detailsMaxLength}
                        charLimit={this.props.detailsCharLimit}
                        validations={this.props.detailsRequired ? 'isRequired' : ''}
                        validateOnChange={this.props.detailsRequired ? true : false}
                        value={this.state.detailsValue || ''}
                    />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

YesNoDetail.defaultProps = {
    reactInput: true,
    attachToValidationGroup: null,
    detachFromValidationGroup: null,

    id: null,
    name: null,
    label: null,
    checked: null,
    style: 'switchbox',
    onChange: null,
    value: null,
    detailsValue: null,
    validations: '',
    validateOnChange: false,

    detailsRequired: true,
    detailsLabel: 'Details',
    detailsMaxLength: null,
    detailsCharLimit: null
};
