import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import { composeWithDevTools } from 'redux-devtools-extension';
import createReducer from '@root/_reducer';

let asyncReducers = {};

let store;

if (process.env.NODE_ENV === 'development') {
    /**
     * hacky fix for composeWithDevtools nuking the reducers, mainly to do with redux 4 changing the way that the @@redux/INIT function works.
     */
    const reduxModule = require('redux');
    reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

    store = createStore(
        createReducer({}),
        composeWithDevTools(applyMiddleware(thunk, promise()))
    );
} else {
    store = createStore(createReducer({}), applyMiddleware(thunk, promise()));
}

export default store;

export function attachReducer(name, asyncReducer): any {
    asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
}
