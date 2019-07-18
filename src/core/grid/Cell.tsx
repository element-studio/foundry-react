// @ts-nocheck
import React from 'react';

interface Props {
    className?: string;
    children?: any;
    'data-testid'?: string;
}

const Cell: React.SFC<Props> = (props): JSX.Element => {
    const classes = ['cell'];
    if (props.className) classes.push(props.className);

    return (
        <div data-testid={props['data-testid']} className={classes.join(' ')}>
            {props.children}
        </div>
    );
};

export default Cell;
