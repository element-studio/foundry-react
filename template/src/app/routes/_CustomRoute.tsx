import * as React from 'react';
import { Route } from 'react-router-dom';
import FourOhFour from '@root/app/modules/common/components/errors/components/404';
import Auth from '@root/app/modules/common/auth/Auth';

/**
 * Set up type declarations
 */

export interface CustomRouteProps {
    exact?: any;

    path?: string;
    layout?: any;
    component?: any;
    middleware?: any;
    render?: any;
    amIRole?: string;
}

/**
 * CustomRoute
 * Basically extends normal route but allows a layout file.
 * Also can run middleware.
 */
const CustomRoute = ({ layout, component, middleware, render, amIRole, ...props }: CustomRouteProps): JSX.Element => {
    return (
        <Route
            {...props}
            render={(nestedProps): JSX.Element => {
                /**
                 * Run Middleware
                 */
                if (middleware) {
                    const result = middleware();
                    if (!result) {
                        return result;
                    }
                }

                if (amIRole && !Auth.checkRole(amIRole)) {
                    component = FourOhFour;
                }

                /**
                 * set const up, if layout is defined, render that with the renderComponent in it Otherwise just render the component.
                 */
                let renderComponent;

                if (component) {
                    renderComponent = React.createElement(component, nestedProps);
                }
                /**
                 * if a render function is stated then return that
                 */
                if (render) {
                    renderComponent = React.createElement(render, nestedProps);
                }

                if (layout && renderComponent) {
                    return React.createElement(layout, nestedProps, renderComponent);
                }

                return renderComponent;
            }}
        />
    );
};

export default CustomRoute;
