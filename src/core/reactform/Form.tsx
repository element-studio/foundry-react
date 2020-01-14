import * as React from 'react';

import { serialize } from '../../utils/tools.js';
import ValidationGroup from '../validation_group/ValidationGroup';

/**
 * Set up type declarations
 */

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children?: React.ReactNode;
    forwardedRef?: React.RefObject<HTMLFormElement>;

    onSubmit: (formData: any) => void;
}

class Form extends React.Component<FormProps, {}> {
    constructor(props) {
        super(props);
    }

    private validationGroupRef: React.RefObject<ValidationGroup> = React.createRef();

    /**
     * onSubmitCallback - called after form is submitted.
     */
    private handle_submit = (e): void => {
        if (this.props.onSubmit) {
            e.preventDefault();

            const isValid = this.validationGroupRef.current.validateAllInputs();

            if (isValid) {
                this.props.onSubmit(serialize(e.currentTarget) as object);
            }
        }
    };

    /**
     * render method, primary template method..
     */
    public render(): JSX.Element {
        const { forwardedRef, children, ...props } = this.props;

        return (
            <form ref={forwardedRef} {...props} onSubmit={this.handle_submit}>
                <ValidationGroup ref={this.validationGroupRef}>{children}</ValidationGroup>
            </form>
        );
    }
}

export default Form;
