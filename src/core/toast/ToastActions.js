export const CREATE_TOAST = 'CREATE_TOAST';
export const DELETE_TOAST = 'DELETE_TOAST';

export const createToast = (type, message, title) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_TOAST,
            payload: {
                id: generateID(),
                type,
                message,
                title
            }
        });
    };
};

export const deleteToast = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_TOAST,
            payload: {
                id
            }
        });
    };
};

const generateID = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
