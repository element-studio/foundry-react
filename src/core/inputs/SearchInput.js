import * as React from 'react';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        };

        this.timeOut = null;
    }

    componentDidMount() {
        this.setState({
            searchValue: this.props.value
        });
    }

    handle_onChange = (e) => {
        e.persist();

        this.setState({
            searchValue: e.target.value
        });

        if (this.props.delay > 0) {
            clearTimeout(this.timeOut);

            this.timeOut = setTimeout(() => {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(e);
                }
            }, this.props.delay);
        } else {
            this.props.onChange(e);
        }
    };

    handle_clear = () => {
        if (typeof this.props.onClear === 'function') {
            this.props.onClear();
        }

        this.setState({
            searchValue: ''
        });
    };

    focus = () => {
        this.refs.SearchInput.focus();
    };

    render() {
        return (
            <fieldset className="field_set">
                <div className={'field_wrapper search-wrapper ' + this.props.className}>
                    <input
                        ref="SearchInput"
                        type="search"
                        name={this.props.name}
                        id={this.props.name}
                        className={' search_' + this.props.style + '-input'}
                        placeholder={this.props.placeholder}
                        onChange={this.handle_onChange}
                        value={this.state.searchValue}
                    />
                    {this.props.style == 'block' || !this.state.searchValue ? (
                        <label htmlFor={this.props.id} className={'search_' + this.props.style + '-icon'}>
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <use xlinkHref="#icon-search" />
                            </svg>
                        </label>
                    ) : null}
                    {this.state.searchValue ? (
                        <svg
                            className={'search_' + this.props.style + '-clear'}
                            viewBox="0 0 32 32"
                            width="16"
                            height="16"
                            tabIndex="0"
                            onClick={this.handle_clear}
                        >
                            <use xlinkHref="#icon-circle-cross" />
                        </svg>
                    ) : null}
                </div>
            </fieldset>
        );
    }
}

SearchInput.defaultProps = {
    className: '',
    id: 'search-id',
    style: 'block',
    placeholder: 'Search for things',
    value: '',
    onChange: null,
    onClear: null,
    delay: 0
};
