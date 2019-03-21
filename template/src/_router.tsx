import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '@app/routes/routes';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    public giveRoutesKeys = (routes): JSX.Element => {
        let index = 0;
        return routes.map((route) => {
            index++;
            return React.cloneElement(route, {
                key: 'route-' + index
            });
        });
    };

    public render(): JSX.Element {
        return (
            <Router>
                <React.Fragment>{this.giveRoutesKeys(routes)}</React.Fragment>
            </Router>
        );
    }
}
