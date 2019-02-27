import * as React from 'react';

/** Example Icon file */
export default (): JSX.Element => {
    return (
        <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
            <path
                id="icon-arrow-left"
                d="M10 4q0.414 0 0.707 0.293t0.293 0.707q0 0.422-0.297 0.711l-5.289 5.289h15.586q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-15.586l5.289 5.289q0.297 0.289 0.297 0.711 0 0.414-0.293 0.707t-0.707 0.293q-0.422 0-0.711-0.289l-7-7q-0.289-0.305-0.289-0.711t0.289-0.711l7-7q0.297-0.289 0.711-0.289z"
            />
        </svg>
    );
};
