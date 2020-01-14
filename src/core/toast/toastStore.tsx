/* store.js */
import createStore from 'redux-zero';

export interface ToastModel {
    id: string;
    type?: string;
    message?: string;
    title?: string;
}

const initialState: { toastList: ToastModel[] } = { toastList: [] };
const store = createStore(initialState);

const generateID = (): string => {
    function s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const createToast = (type?: ToastModel['type'], message?: ToastModel['message'], title?: ToastModel['title']): void => {
    store.setState((state) => {
        return {
            toastList: [...state.toastList, {
                id: generateID(),
                type,
                message,
                title
            }]
        };
    });
};

export const deleteToast = (toastItemId: string): void => {
    store.setState((state) => {
        let toastList = [...state.toastList];
        let index = toastList.findIndex(t => t.id === toastItemId);

        if (index > -1) {
            toastList.splice(index, 1);
        }

        return { toastList };
    });
};

export default store;
