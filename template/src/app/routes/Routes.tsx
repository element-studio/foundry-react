import * as React from 'react';

import { Redirect } from 'react-router';
import { Switch } from 'react-router-dom';

import Route from '@core/routes/_CustomRoute';

/**
 * Layouts
 */
import Layout from '@layouts/layout';

/**
 * Middleware
 */
import authMiddleware from '@app/middleware/authMiddleware';

/**
 * Routes / Modules to load in.
 */

import FourOhFour from '@modules/common/components/errors/components/404';

/**
 * Render, gets pushed into router.js
 */

export default [
    /**
     * Switch
     * All routes must be declared in this file. Switch will match the first route it finds,
     * otherwise falls to 404.
     * These do not need a layout as they only render when a url is matched in the switch also that has a layout.
     * These below are currently all modals.
     */

    <Switch>
        <Route exact path="/" render={(): JSX.Element => <div />} layout={Layout} middleware={authMiddleware} />
        <Route exact path="/" render={(): JSX.Element => <div />} layout={Layout} />

        <Route exact path="/404" component={FourOhFour} layout={Layout} />
        <Route render={(): JSX.Element => <Redirect to={'/404'} />} />
    </Switch>
];
