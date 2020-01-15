// @ts-nocheck
import React, { HTMLAttributes } from 'react';

interface Props {
    className?: string;
    children?: any;
    'data-testid'?: string;
}

const Cell = ({ className, children, 'data-testid': dataTestid, ...rest }: Props & HTMLAttributes<HTMLElement>): JSX.Element => {
    const classes = ['cell'];
    if (className) classes.push(className);

    return (
        <div data-testid={dataTestid} className={classes.join(' ')} {...rest}>
            {children}
        </div>
    );
};

export default Cell;
