import * as actions from "./ToastActions.js";

/**
 * Set up state
 * @param {*} state
 * @param {*} action
 */
export default(state = {
    toastList:[],
}, action) => {

    switch (action.type) {

        case actions.CREATE_TOAST:
            {
                let toastList = state.toastList.slice(0);
                    toastList.push(action.payload);

                return {
                    ...state,
                    toastList
                }
            }
        case actions.DELETE_TOAST:
            {
                let toasts = state.toastList.slice(0);
                let index = toasts.findIndex(x => x.id == action.payload.id);

                if(index > -1){
                    toasts.splice(index,1);
                }

                return {
                    ...state,
                    toastList:toasts
                }
            }

    }
    return state;
}
