import React, { Component } from 'react';

type props = {};

class GenericError extends Component<props> {
    public render(): JSX.Element {
        return (
            <main>
                <div className="app-main">
                    <div className="_is-empty">
                        <div>
                            <h2 className="type-subtitle">Whoops, it looks like something went wrong</h2>
                            <p className="label type-body">
                                The Development team has been notified, please contact the system administrator for further assistance.
                            </p>
                            <br />
                            <a href="/" className="btn-alpha">
                                Back to home
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default GenericError;
