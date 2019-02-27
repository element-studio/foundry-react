import React, { Component } from 'react';
import ErrorGeneric from './ErrorGeneric';

type props = {
    children: React.ReactNode;
};

type state = {
    hasError: boolean;
};

class Error extends Component<props, state> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error, info): void {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    public render(): JSX.Element | React.ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <ErrorGeneric />;
        }

        return this.props.children;
    }
}

export default Error;
