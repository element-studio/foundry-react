import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export interface ILoadingProps {
    isLoading: boolean;
    message: string;
    style: string | 'inline' | 'overlay';
    overlayStyle: string;
}

export default class Loading extends React.Component<ILoadingProps> {
    static defaultProps = {
        message: '',
        isLoading: false,
        style: 'inline',
        overlayStyle: 'light'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'loading--' + this.props.style}>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="_a_fast_fade"
                    transitionAppear={true}
                    transitionLeave={true}
                    transitionAppearTimeout={210}
                    transitionEnterTimeout={210}
                    transitionLeaveTimeout={210}
                >
                    {this.props.isLoading ? (
                        <div className={`_is-loading _is-loading_wrapper-${this.props.style}`}>
                            <div className={`_is-loading-${this.props.style}`}>
                                {this.props.style === 'overlay' ? <div className={'overlay-' + this.props.overlayStyle} /> : null}
                                <div className="_is-loading_content">
                                    <span className="type-label _is-loading_message">{this.props.message}</span>
                                    <div className="_is-loading_icon">
                                        <div className="seg_1" />
                                        <div className="seg_2" />
                                        <div className="seg_4" />
                                        <div className="seg_3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        this.props.children
                    )}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
