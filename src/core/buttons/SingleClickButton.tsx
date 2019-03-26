import * as React from 'react';

export interface ISingleClickButtonProps {
    className?: string;
    type?: string;
    value?: string;
    onClick?: Function;
    delay?: number;
}

export interface ISingleClickButtonState {
    disabled: boolean;
}

export default class SingleClickButton extends React.Component<
    ISingleClickButtonProps,
    ISingleClickButtonState
> {
    protected timeout?: number = undefined;

    static defaultProps = {
        className: 'btn',
        value: 'Press me!',
        onClick: null,
        type: 'submit'
    };

    constructor(props) {
        super(props);

        this.state = {
            disabled: false
        };
    }

    componentWillUnmount = () => {
        window.clearTimeout(this.timeout);
    };

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_click = (e) => {
        if (this.state.disabled) {
            e.preventDefault();
            return;
        }

        this.setState({
            disabled: true
        });

        if (this.props.delay) {
            this.timeout = window.setTimeout(() => {
                this.setState({
                    disabled: false
                });
            }, this.props.delay);
        }

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            e.preventDefault();
            this.props.onClick();
        }
    };

    render() {
        return (
            <button
                type={this.props.type}
                title={this.props.value}
                className={this.props.className}
                onClick={this.handle_click}
            >
                {!this.state.disabled ? this.props.value : 'Working...'}
            </button>
        );
    }
}
