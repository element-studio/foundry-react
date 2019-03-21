import * as React from 'react';

import Modal from './Modal.js';

class ModalConfirm extends React.Component<any, {}> {
    //TODO: re-type any
    constructor(props) {
        super(props);
    }

    public modalRef: React.RefObject<Modal> = React.createRef();

    public static defaultProps: Partial<any> = {
        title: 'Title',
        message: 'Message',
        readOnly: false,
        confirmCallback: undefined,
        noCallback: undefined
    };

    private confirmCallback: Function | undefined = undefined;

    public open = (callback): void => {
        if (typeof callback === 'function') {
            this.confirmCallback = callback;
        }
        if (this.modalRef.current) {
            this.modalRef.current.openModal();
        }
    };

    public close = (): void => {
        if (this.modalRef.current) {
            this.modalRef.current.closeModal();
        }
    };

    public closeCallBack = (): void => {
        if (typeof this.props.noCallback === 'function') {
            this.props.noCallback();
        }
    };

    public handle_confirmClick = (): void => {
        if (typeof this.confirmCallback === 'function') {
            this.confirmCallback();
        }

        if (this.props.confirmCallback) {
            if (typeof this.props.confirmCallback === 'function') {
                this.props.confirmCallback();
            }
        }

        if (this.modalRef.current) {
            this.modalRef.current.closeModal();
        }
    };

    public render(): JSX.Element {
        return (
            <Modal ref={this.modalRef} title={this.props.title} onPrimaryClick={this.handle_confirmClick} onCloseCallback={this.closeCallBack}>
                <p>{this.props.message}</p>
            </Modal>
        );
    }
}

export default ModalConfirm;
