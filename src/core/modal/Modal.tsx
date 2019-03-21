import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as tools from '../../utils/tools.js';

import Button from '../buttons/Button';

export interface IModalProps {
    isOpen: boolean;
    yesNo: boolean;
    defaultButtons: boolean;
    hideSecondaryButton: boolean;
    hidePrimaryButton: boolean;

    secondaryButtonLabel: string;
    primaryButtonLabel: string;

    className: string;
    title: string;

    onCloseCallback: () => void;
    onPrimaryClick: (event?: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement | HTMLButtonElement>) => void;
    onCloseClick: (event?: React.MouseEvent<HTMLDivElement | HTMLOrSVGElement | HTMLButtonElement>) => void;

    children: React.ReactNode;
}

interface IModalState {
    isOpen: boolean;
}

class Modal extends React.Component<IModalProps, IModalState> {
    static defaultProps = {
        className: 'modal-small',
        title: 'Modal title',
        defaultButtons: true,

        primaryButtonLabel: 'Go',
        secondaryButtonLabel: 'Cancel',

        hidePrimaryButton: false,
        hideSecondaryButton: false,

        isOpen: false,

        onCloseClick: null,
        onPrimaryClick: null,
        onCloseCallback: null,

        preventClose: false,
        yesNo: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.props.isOpen) {
            tools.lockViewportScrolling();
        }
        this.setState({
            isOpen: this.props.isOpen
        });
    }

    componentWillReceiveProps(nextState) {
        if (nextState.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: nextState.isOpen
            });
        }
    }

    componentWillUnmount() {
        tools.releaseViewportScrolling();
    }

    openModal() {
        tools.lockViewportScrolling();
        this.setState({ isOpen: true });
    }

    closeModal() {
        tools.releaseViewportScrolling();
        this.setState({ isOpen: false });

        if (typeof this.props.onCloseCallback === 'function') {
            this.props.onCloseCallback();
        }
    }

    handle_primaryButtonClick = (e) => {
        if (typeof this.props.onPrimaryClick === 'function') {
            this.props.onPrimaryClick(e);
        }
    };

    render() {
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="loaderWrapper"
                transitionName="_a_fade"
                transitionAppear={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {this.state.isOpen ? (
                    <div className="overlay_wrapper">
                        <div className="overlay-canvas" onClick={this.props.onCloseClick || this.closeModal} />
                        {(() => {
                            if (this.props.yesNo) {
                                return this.props.children;
                            } else {
                                return (
                                    <div className={this.props.className}>
                                        <header className="modal_header type-label">
                                            <h4 className="modal_title">{this.props.title}</h4>
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                onClick={this.props.onCloseClick || this.closeModal}
                                                className="modal_close"
                                            >
                                                <use xlinkHref="#icon-cross" />
                                            </svg>
                                        </header>
                                        <div className="modal_body">
                                            {this.props.children}
                                            {this.props.defaultButtons ? (
                                                <div className="modal_actions">
                                                    {!this.props.hideSecondaryButton && (
                                                        <Button
                                                            className="ghost_btn-alpha"
                                                            label={this.props.secondaryButtonLabel}
                                                            onClick={this.props.onCloseClick || this.closeModal}
                                                        />
                                                    )}
                                                    {!this.props.hidePrimaryButton && (
                                                        <Button
                                                            className="btn-alpha"
                                                            label={this.props.primaryButtonLabel}
                                                            onClick={this.handle_primaryButtonClick}
                                                        />
                                                    )}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                ) : null}
            </ReactCSSTransitionGroup>
        );
    }
}

export default Modal;
