import * as React from 'react';

interface Props {
    id: string;
    type?: string;
    title?: string;
    message?: string;
    destroyCallback: (id: string) => void;
}

export default class ToastItem extends React.Component<Props> {
    public defaultProps = {
        type: 'info',
        id: '',
        title: '',
        message: ''
    };

    private toastTimer?: number;
    private toastTimeout = 10000;

    /*
     * Lifecycle events
     */
    public componentDidMount(): void {
        this.toastTimer = window.setTimeout(() => {
            this.destroyToast();
        }, this.toastTimeout);
    }

    /*
     * User-driven events
     * @prefix handle_
     */
    private handle_destroy = (e): void => {
        e.preventDefault();

        window.clearTimeout(this.toastTimer);
        this.destroyToast();
    };

    /*
     * Logic
     */
    private destroyToast = (): void => {
        if (typeof this.props.destroyCallback === 'function') {
            this.props.destroyCallback(this.props.id);
        }
    };

    public render() {
        return (
            <div key="toast" className={'toast toast_' + this.props.type}>
                <h2 className="toast-title type-label">{this.props.title ? this.props.title : this.props.type}</h2>
                <div className="toast_body type-body">{this.props.message}</div>
                <svg viewBox="0 0 32 32" width="18" height="18" className="toast-close" onClick={this.handle_destroy}>
                    <use xlinkHref={'#icon-cross'} />
                </svg>
            </div>
        );
    }
}
