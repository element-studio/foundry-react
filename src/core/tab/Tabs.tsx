import * as React from 'react';

export interface ITabsProps {
    className: string;
    children: Array<any>;
}

export interface ITabsState {
    loaded: boolean;
    visibleTab: number;
}

export class Tabs extends React.Component<ITabsProps, ITabsState> {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            visibleTab: 0
        };
    }

    public componentDidMount = (): void => {
        this.setState({
            loaded: true
        });
    };

    public componentWillUnmount = (): void => {};

    public handle_TabClick = (index, event): void => {
        event.preventDefault();
        this.setState({
            visibleTab: index
        });
    };

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <ul className={this.props.className + ' tab--flex'}>
                    {this.props.children.map((child, index) => (
                        <li key={index} className={'tab' + (this.state.visibleTab === index ? ' _is-active' : '')}>
                            <a href="#" className="type-label" onClick={this.handle_TabClick.bind(this, index)}>
                                {child.props.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={this.props.className + '__panels'}>
                    {this.props.children.map((child, index) => (
                        <article key={index} className={this.props.className + '__panel' + (this.state.visibleTab === index ? ' _is-visible' : '')}>
                            {child}
                        </article>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
