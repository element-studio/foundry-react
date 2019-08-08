import * as React from 'react';
// import { connect } from 'react-redux';
import Transition from 'react-addons-css-transition-group';

// import store from '@root/_store';
// import { attachReducer } from '@root/_store';

// import * as toastActions from './ToastActions.js';

import Toast from './components/ToastItem.js';
// import toastReducer from './ToastReducer';

/**
 * Connect store/state from reducer to component, invoked at bottom on import.
 */
const mapStateToProps = (state) => {
    return {
        toastList: state.toasts.toastList
    };
};

class ToastWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteToast = (id) => {
        // store.dispatch(toastActions.deleteToast(id));
    };

    /*
     * Render
     */
    render() {
        return (
            <div className="toast-container">
                <Transition component="div" transitionName="_a_toast-pop" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {this.props.toastList &&
                        this.props.toastList.map((toast, i) => (
                            <Toast
                                key={i}
                                id={toast.id}
                                type={toast.type}
                                title={toast.title}
                                classes={toast.classes}
                                message={toast.message}
                                destroyCallback={this.deleteToast}
                            />
                        ))}
                </Transition>
            </div>
        );
    }
}

export default ToastWrapper;

/**
 * Expose an add toast function so that throughtout systems we dont need to keep including store and toast action imports.
 */
export const addToast = (type, message, title = null) => {
    // store.dispatch(toastActions.createToast(type, message, title));
};
