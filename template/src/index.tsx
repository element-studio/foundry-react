import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import Loading from '@core/loading/Loading.js';

import store from '@root/_store';
import { Provider } from 'react-redux';

import './styles/css/ui.css';
import { register } from './registerServiceWorker';

const Router = Loadable({
    loader: (): React.ReactNode => import('@root/_router' /* webpackChunkName: "router" */),
    loading: (): JSX.Element => <Loading isLoading={true} />
});

const ErrorBoundary = Loadable({
    loader: (): React.ReactNode => import('@modules/common/components/errors/components/ErrorBoundary' /* webpackChunkName: "errorBoundary" */),
    loading: (): JSX.Element => <Loading isLoading={true} />
});

const app = document.getElementById('root');

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Router />
        </Provider>
    </ErrorBoundary>,
    app
);

register();
