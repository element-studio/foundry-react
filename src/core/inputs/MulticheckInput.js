import * as React from 'react';

import CheckboxInput from '../inputs/CheckboxInput.js';
import SearchInput from '../inputs/SearchInput.js';

export default class MulticheckInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerms: '',
            activeOnly: false
        };
    }

    /*
     * ----------
     * User-driven events
     * @prefix _handle
     * ----------
     */

    handle_change = (obj, e) => {
        if (!this.props.editable) {
            return false;
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(obj, e);
        }
    };

    handle_search = (e) => {
        this.setState({
            searchTerms: e.target.value,
            activeOnly: false
        });
    };

    handle_searchClear = (e) => {
        this.setState({
            searchTerms: ''
        });
    };

    /*
     * ----------
     * Logic
     * ----------
     */

    toggleActiveOnly = () => {
        this.setState({
            searchTerms: '',
            activeOnly: !this.state.activeOnly
        });
    };

    printOptions = () => {
        let opts = [];

        let optsToRender = [];

        //with search terms
        opts = this.props.options.filter((x) => x.name.toLowerCase().indexOf(this.state.searchTerms.toLowerCase()) >= 0);

        //show only active
        if (this.state.activeOnly) {
            opts = this.props.options.filter((x) => this.props.selectedOptions.indexOf(x.id) > -1);
        }
        if (this.props.limit > 0) {
            opts = opts.splice(0, this.props.limit);
        }

        for (let i = 0; i < opts.length; i++) {
            let selected = this.props.selectedOptions.find((x) => {
                return x.value == opts[i].value;
            });
            optsToRender.push(
                <CheckboxInput
                    style={this.props.style ? this.props.style : 'switchbox'}
                    key={i}
                    id={this.props.name + '_' + opts[i].value}
                    name={this.props.name}
                    label={opts[i].name}
                    value={opts[i].value}
                    checked={selected ? true : false}
                    onChange={this.handle_change}
                />
            );
        }

        return optsToRender;
    };

    /*
     * ----------
     * Render
     * ----------
     */

    render() {
        return (
            <div className={'field_set ' + this.props.className}>
                {this.props.label ? (
                    <span className="type-label">
                        {this.props.label}
                        <br />
                    </span>
                ) : null}
                {this.props.searchable ? (
                    <SearchInput
                        style="pill"
                        onChange={this.handle_search}
                        onClear={this.handle_searchClear}
                        value={this.state.searchTerms}
                        placeholder={this.props.searchPlaceholder}
                        delay={150}
                    />
                ) : null}

                {(() => {
                    if (this.printOptions().length) {
                        return this.printOptions();
                    }
                    return <p>There are no results.</p>;
                })()}
            </div>
        );
    }
}

MulticheckInput.defaultProps = {
    className: 'selectable-list',
    style: 'checkbox',
    options: [],
    selectedOptions: [],
    editable: true,
    searchable: false,
    searchPlaceholder: 'Search for things...',
    label: null,
    onChange: null,
    limit: 0
};
