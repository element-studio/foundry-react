import * as React from 'react';

import { Link } from 'react-router-dom';

export default class FourOhFour extends React.Component {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <main>
                <div className="app-main">
                    <div className="_is-empty">
                        <div>
                            <h2 className="type-subtitle">Error: 404</h2>
                            <p className="label type-body">
                                Resource not found.
                            </p>
                            <br />
                            <Link className="ghost_btn-alpha" to="/">
                                Go home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
