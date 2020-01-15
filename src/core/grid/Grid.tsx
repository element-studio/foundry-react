// @ts-nocheck
import React, { HTMLAttributes } from 'react';

interface Props {
    x?: boolean;
    y?: boolean;
    marginY?: boolean;
    marginX?: boolean;
    rhythm?: boolean;
    smallOnlyRhythm?: boolean;
    rhythmUniform?: boolean;
    className?: string;
    'data-testid'?: string;
    children?: any;
}

const Grid = ({
    x,
    y,
    marginX,
    marginY,
    rhythm,
    smallOnlyRhythm,
    rhythmUniform,
    className,
    'data-testid': dataTestid,
    children,
    ...rest
}: Props & HTMLAttributes<HTMLElement>): JSX.Element => {
    const classes: string[] = [];

    if (x) classes.push('grid-x');
    if (y) classes.push('grid-y');
    if (marginX) classes.push('grid-margin-x');
    if (marginY) classes.push('grid-margin-y');
    if (rhythm) classes.push('grid-rhythm');
    if (className) classes.push(className);

    return (
        <div {...rest} data-testid={dataTestid} className={classes.join(' ')}>
            {children}
        </div>
    );
};

export default Grid;
