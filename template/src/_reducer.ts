import { combineReducers, Reducer } from 'redux';

export default function createReducer(asyncReducers?: object): Reducer<object> {
    return combineReducers({
        defaultReducer: (state = {}, actions): object => {
            return state;
        },
        ...asyncReducers
    });
}
