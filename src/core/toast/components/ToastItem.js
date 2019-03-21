import * as React from 'react';
import Transition from 'react-addons-css-transition-group';

export default class ToastItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //
        };

        this.toastTimer = null;
        this.toastTimeout = 10000;
    }

    /*
     * Lifecycle events
     */
    componentDidMount() {
        this.toastTimer = setTimeout(() => {
            this.destroyToast();
        }, this.toastTimeout);
    }

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_destroy = (e) => {
        e.preventDefault();

        window.clearTimeout(this.toastTimer);

        this.destroyToast();
    };

    /*
     * Logic
     */
    destroyToast = () => {
        if (typeof this.props.destroyCallback === 'function') {
            this.props.destroyCallback(this.props.id);
        }
    };

    render() {
        return (
            <div key="toast" className={'toast toast_' + this.props.type + ' ' + this.props.classes}>
                <h2 className="toast-title type-label">{this.props.title ? this.props.title : this.props.type}</h2>
                <div className="toast_body type-body">{this.props.message}</div>
                <svg viewBox="0 0 32 32" width="18" height="18" className="toast-close" onClick={this.handle_destroy}>
                    <use xlinkHref={'#icon-cross'} />
                </svg>
            </div>
        );
    }
}

ToastItem.defaultProps = {
    type: 'info',
    classes: '',
    id: null,
    title: null,
    message: null
};
