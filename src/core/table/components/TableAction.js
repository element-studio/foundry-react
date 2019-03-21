import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';

export default class TableAction extends React.Component {
    constructor(props) {
        super(props);

        this.icons = {
            'icon-plus': (
                <svg viewBox="0 0 24 24" width="14" height="14" className="table_action_icon">
                    <use xlinkHref="#icon-plus" />
                </svg>
            ),
            'icon-cog': (
                <svg viewBox="0 0 24 24" width="14" height="14" className="table_action_icon">
                    <use xlinkHref="#icon-cog" />
                </svg>
            ),
            'icon-dashboard': (
                <svg viewBox="0 -3 24 24" width="14" height="14" className="table_action_icon">
                    <use xlinkHref="#icon-dashboard" />
                </svg>
            )
        };
    }

    /*
     * ----------
     * User-driven events
     * @prefix _handle
     * ----------
     */
    handle_actionClick = (action, e) => {
        if (typeof action.onClick === 'function') {
            this.setState({
                isOpen: false
            });

            action.onClick(e);
        }

        if (action.href) {
            // browserHistory.push(action.href);
        }
    };

    /*
     * Logic
     */

    printActions = () => {
        const actions = this.props.actions || [];
        let actionToRender = [];

        for (let i = 0; i < actions.length; i++) {
            let action = actions[i];

            if (!action) {
                continue;
            }

            actionToRender.push(
                <li key={i} onClick={this.handle_actionClick.bind(this, action)} className="table_action_item type-textlink">
                    {this.icons[action.icon ? action.icon : 'icon-plus']}
                    {(() => {
                        if (action.href) {
                            return (
                                <Link to={action.href} className="type-label table_action_label" activeClassName="_is-active">
                                    {action.label}
                                </Link>
                            );
                        }
                        return <label className="type-label table_action_label">{action.label}</label>;
                    })()}
                </li>
            );
        }

        return <ul className="table_action_list">{actionToRender}</ul>;
    };

    render() {
        if (!this.props.actions.length) {
            return false;
        }

        return (
            <div className="table_actions">
                <span className="table_action_trigger">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <use xlinkHref="#icon-ellipsis" />
                    </svg>
                </span>

                {this.printActions()}
            </div>
        );
    }
}

TableAction.defaultProps = {
    actions: null
    // Example
    // actions: [
    //     {
    //         icon: 'icon-left-chev',
    //         label: '',
    //         onClick: (id)=>{},
    //         href: ''
    //     }
    // ]
};
