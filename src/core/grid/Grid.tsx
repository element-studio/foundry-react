// @ts-nocheck
import React from 'react';

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

const Grid: React.SFC<Props> = ({
    x, y, marginX, marginY, rhythm, smallOnlyRhythm, rhythmUniform, className, 'data-testid': dataTestid, children, ...rest
}): JSX.Element => {
    const classes: string[] = [];

    if (x) classes.push('grid-x');
    if (y) classes.push('grid-y');
    if (marginX) classes.push('grid-margin-x');
    if (marginY) classes.push('grid-margin-y');
    if (rhythm) classes.push('grid-rhythm');
    if (className) classes.push(className);

    return (
        <div data-testid={dataTestid} className={classes.join(' ')} {...rest}>
            {children}
        </div>
    );
};

export default Grid;
