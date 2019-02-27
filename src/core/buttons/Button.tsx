import * as React from 'react';

export interface IButtonProps {
    className?: string;
    id?: string;
    title?: string;

    onClick?: Function;
    reactButton?: true;

    isBusy?: boolean;
    isDisabled?: boolean;
    isSubmitting?: boolean;
    isBusyLabel?: string;
    isDisabledLabel?: string;
    allowDefault?: boolean;

    label?: string;
    type?: string;
    href?: string;
    target?: string;
}

export default class Button extends React.Component<IButtonProps> {
    static defaultProps = {
        reactButton: true, // keep this on here for react form.
        id: null,
        href: '',
        target: null,
        title: null,
        type: null,

        className: 'btn',

        label: 'Press me!',
        onClick: null,

        isDisabled: false,
        isDisabledLabel: null,

        isBusy: false,
        isBusyLabel: null
    };

    constructor(props) {
        super(props);
    }

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_click = (e) => {
        if (this.props.allowDefault) {
            return;
        }

        e.preventDefault();

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            this.props.onClick();
        }
    };

    printClasses = () => {
        let classes: string[] = [];

        if (this.props.className) {
            classes.push(this.props.className);
        }

        if (this.props.isDisabled) {
            classes.push('_is-disabled');
        }

        if (this.props.isBusy) {
            classes.push('_is-busy');
        }

        return classes.join(' ');
    };

    printLabel = () => {
        if (this.props.isBusy) {
            return this.props.isBusyLabel || this.props.label;
        }

        if (this.props.isDisabled) {
            return this.props.isDisabledLabel || this.props.label;
        }

        if (this.props.isSubmitting) {
            return this.props.isBusyLabel || this.props.label;
        }

        return this.props.label;
    };

    render() {
        if (this.props.type === 'submit') {
            return (
                <button
                    type={this.props.type}
                    id={this.props.id}
                    title={this.props.title}
                    className={this.printClasses()}
                    onClick={!this.props.isBusy && !this.props.isDisabled && this.props.onClick ? this.handle_click : undefined}
                >
                    {this.printLabel()}
                </button>
            );
        }
        return (
            <a
                id={this.props.id}
                href={this.props.href}
                title={this.props.title}
                className={this.printClasses()}
                target={this.props.target}
                onClick={!this.props.isBusy && !this.props.isDisabled ? this.handle_click : undefined}
            >
                {this.printLabel()}
            </a>
        );
    }
}
