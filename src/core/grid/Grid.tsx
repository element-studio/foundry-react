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

const Grid: React.SFC<Props> = (props): JSX.Element => {
    const classes: string[] = [];

    if (props.x) classes.push('grid-x');
    if (props.y) classes.push('grid-y');
    if (props.marginX) classes.push('grid-margin-x');
    if (props.marginY) classes.push('grid-margin-y');
    if (props.rhythm) classes.push('grid-rhythm');
    if (props.className) classes.push(props.className);

    return (
        <div data-testid={props['data-testid']} className={classes.join(' ')}>
            {props.children}
        </div>
    );
};

export default Grid;
