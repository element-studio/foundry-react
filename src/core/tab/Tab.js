import * as React from "react";

export default class Tabs extends React.Component {

    constructor(props) {

        super(props);

    }

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_tabClick = (value,e) => {

        e.preventDefault();

        if(typeof this.props.onClick === 'function') {
            this.props.onClick(value)
        }

    }

    /*
     * Logic
     */

    printTabs = () => {

        let tabs = [];

        for(let t = 0; t < this.props.tabs.length; t++){

            let tab = this.props.tabs[t];

            tabs.push(
                <li key={t} className={'tab ' + ((tab.value == this.props.value)? '_is-active':'')}><a href="#" className="type-label" onClick={this.handle_tabClick.bind(this,tab.value)}>{tab.name}</a></li>
            )

        }

        return tabs;

    }

    /*
     * Render
     */

    render(){

        if(this.props.tabs.length < 1) {
            return false;
        }

        return (

            <ul className={"tabs " + this.props.classes}>
                { this.printTabs() }
            </ul>
        )
    }
}

Tabs.defaultProps = {
    tabs:[], // {value:'', name:''}
    value: null,
    onClick: null,
    classes: null,
};
