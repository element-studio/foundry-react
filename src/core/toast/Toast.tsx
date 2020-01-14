import * as React from 'react';
import { Provider, connect } from 'redux-zero/react';

import Transition from 'react-addons-css-transition-group';

import store, { createToast, deleteToast, ToastModel } from './toastStore';
import ToastItem from './ToastItem';

interface Props { toastList: ToastModel[] };

const mapToProps = ({ toastList }): Props => ({ toastList });
const Toast = connect(
    mapToProps,
)(({ toastList }:Props) => {
    return (
        <div className="toast-container">
            <Transition component="div" transitionName="_a_toast-pop" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {toastList.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        id={toast.id}
                        type={toast.type}
                        title={toast.title}
                        message={toast.message}
                        destroyCallback={deleteToast}
                    />
                ))}
            </Transition>
        </div>
    );
});

export default (): JSX.Element => <Provider store={store}><Toast/></Provider>;

/**
 * Expose an add toast function so that throughtout systems we dont need to keep including store and toast action imports.
 */
export const addToast = (type?: string, message?: string, title?: string): void => {
    createToast(type, message, title);
};
