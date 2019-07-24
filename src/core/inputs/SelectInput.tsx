import * as React from 'react';

import * as tools from '../../utils/tools.js';

import Input from '../reactform/containers/FormInputContainer';
import Search from '../inputs/SearchInput.js';

export default class SelectInput<props = {}, state = {}, SS = {}> extends Input {
    static defaultProps = Object.assign(Object.assign({}, Input.defaultProps), {
        id: null,
        name: 'selectname',
        classes: '',
        label: 'Choose an option...',

        value: 'null',
        defaults: [{ name: '-', id: 'null' }],
        options: [{ name: 'Option 1', id: '1' }, { name: 'Option 2', id: '2' }], // title is optional too. { id:'', name:'', title:''}

        icon: 'icon-ellipsis',

        mapValue: 'id',
        mapName: null,

        validateOnChange: false,
        resizeOptionsHeight: false,

        searchable: false,
        editable: true,

        onChange: null,

        showErrors: true,
        controllable: false,
        searchPlaceholder: null
    });

    public selectContainer: React.RefObject<HTMLFieldSetElement> = React.createRef();
    public dropdownSearch: React.RefObject<Search> = React.createRef();
    public optionsList: React.RefObject<HTMLUListElement> = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            serverErrors: null, // No initial server errors
            isValid: true,
            failedValidations: [],
            isFocused: false,
            value: '',
            options: [],
            optionsHeight: 0,
            searchTerms: ''
        };
    }

    /*
     * ----------
     * Lifecycle events
     * ----------
     */
    componentWillMount() {
        if (typeof this.props.attachToValidationGroup === 'function') {
            this.props.attachToValidationGroup(this); // Attaching the component to the form
        }

        this.setValue(this.props);

        document.body.addEventListener('click', this.handle_bodyClick);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && this.props.controllable) {
            if (nextProps.value || nextProps.value === 0) {
                this.setValue(nextProps);
            }
        }

        if (typeof nextProps.failedValidations !== 'undefined' && nextProps.failedValidations != null) {
            this.setState({
                failedValidations: nextProps.failedValidations
            });
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handle_bodyClick);

        if (typeof this.props.detachFromValidationGroup === 'function') {
            this.props.detachFromValidationGroup(this); // Detaching if unmounting
        }
    }

    /*
     * Initialisation
     */
    setValue = (props) => {
        if (props.value || props.value === 0) {
            this.setState({
                value: (props.value == 0 || props.value == '' ? props.value.toString() : props.value) || ''
            });
        }
    };

    /*
     * User-driven events
     * @prefix handle_
     */
    handle_toggleOpen = (e): void => {
        e.nativeEvent.preventDefault();

        if (!this.props.editable) {
            return;
        }

        this.setState(
            {
                isFocused: !this.state.isFocused
            },
            () => {
                if (this.state.isFocused) {
                    if (this.dropdownSearch.current) {
                        this.dropdownSearch.current.focus();
                    }
                    if (this.optionsList.current) {
                        if (!this.props.resizeOptionsHeight) {
                            return;
                        }

                        let optionsPosition = tools.offset(this.optionsList.current),
                            optionsHeight = document.documentElement.clientHeight - optionsPosition.top - 20;

                        this.setState({
                            optionsHeight
                        });
                    }
                }
            }
        );
    };

    handle_bodyClick = (e): void => {
        if (this.selectContainer.current && !this.selectContainer.current.contains(e.target) && this.state.isFocused) {
            this.setState({
                isFocused: false,
                searchTerms: ''
            });
        } else {
            if (this.dropdownSearch.current) {
                this.dropdownSearch.current.focus();
            }
        }
    };

    handle_keyup = (e): void => {
        if (!this.state.isFocused) {
            return;
        }

        if ([13, 38, 40].indexOf(e.keyCode) < 0) {
            return;
        }

        let options = this.props.options.filter((x) => x.name.toLowerCase().indexOf(this.state.searchTerms.toLowerCase()) >= 0),
            currentIndex =
                this.state.value != ''
                    ? options.findIndex((x) => {
                          return x.id == this.state.value;
                      })
                    : -1,
            blur = false;

        switch (e.keyCode) {
            case 38:
                if (currentIndex <= 0) {
                    currentIndex = options.length - 1;
                } else {
                    currentIndex--;
                }
                break;

            case 40:
                if (currentIndex == options.length - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                break;

            case 13:
                blur = true;
                break;

            default:
                return;
        }

        this.handle_change(options[currentIndex].id, options[currentIndex].name, e, blur);
    };

    handle_change = (value, text, e, blur) => {
        let searchTerms = this.state.searchTerms;

        if (typeof blur == 'undefined') {
            blur = true;
        }

        if (blur) {
            searchTerms = '';
        }

        if (value == null || typeof value == 'undefined') {
            value = e.target.value;
        }

        if (text == null || typeof text == 'undefined') {
            text = e.target.options[e.target.selectedIndex].text;
        }

        this.setState(
            {
                value: value,
                isFocused: !blur,
                searchTerms: searchTerms
            },
            () => {
                if (this.props.validateOnChange) {
                    this.props.validate(this);
                }
                if (this.props.onChange) {
                    this.props.onChange({ value, text, name: this.props.name }, e);
                }
            }
        );
    };

    handle_search = (e) => {
        this.setState({
            searchTerms: e.target.value
        });
    };

    handle_searchClear = (e) => {
        this.setState({
            searchTerms: ''
        });
    };

    /*
     * Logic
     */
    printOptions = (el) => {
        let opts = this.props.defaults.concat(this.props.options);

        if (el == 'option') {
            return opts.map(this.printOption);
        }

        if (el == 'li') {
            if (this.state.searchTerms.length > 0) {
                opts = opts.filter((x) => x.name.toLowerCase().indexOf(this.state.searchTerms.toLowerCase()) >= 0);
            }
            return opts.map(this.printList);
        }

        return [];
    };

    printOption = (data, i) => {
        return (
            <option value={data.id} key={i}>
                {data.name}
            </option>
        );
    };

    printList = (data, i) => {
        return (
            <li
                className={'select_option ' + (data.id === this.state.value && data.id !== 'null' ? '_is-active' : '')}
                key={i}
                tabIndex={-1}
                onClick={this.handle_change.bind(this, data.id, data.name)}
                title={data.title || data.name}
            >
                {data.name}
            </li>
        );
    };

    render() {
        let options = this.printOptions('li');

        return (
            <fieldset ref={this.selectContainer} className="field_set" onKeyUp={this.handle_keyup}>
                {this.props.label ? (
                    <label className="select_label type-label" htmlFor={this.props.name} data-label={this.props.label}>
                        {this.props.label}
                    </label>
                ) : null}
                <div className="field_wrapper">
                    <div className="select_wrapper">
                        <select
                            data-testid={this.props['data-testid']}
                            id={this.props.name}
                            name={this.props.name}
                            value={this.state.value}
                            className={
                                'select_input ' +
                                this.props.classes +
                                (this.state.value != '' ? ' _has-value' : '') +
                                (this.state.isFocused ? ' _has-focus' : '') +
                                (!this.state.isValid ? ' _has-error' : '')
                            }
                            // onFocus={this.handle_focus}
                            onChange={this.handle_change.bind(this, null, null)}
                        >
                            {this.printOptions('option')}
                        </select>

                        <label htmlFor={this.props.name} className="select_icon">
                            <svg viewBox="0 0 32 32" width="12" height="12">
                                <use xlinkHref="#icon-chevron-down" />
                            </svg>
                        </label>

                        <div className="select_trigger" onClick={this.handle_toggleOpen}>
                            &nbsp;
                        </div>

                        {this.state.isFocused ? (
                            <div className="select_dropdown">
                                {this.props.searchable ? (
                                    <Search
                                        ref={this.dropdownSearch}
                                        className="select_search"
                                        onChange={this.handle_search}
                                        onClear={this.handle_searchClear}
                                        style="inline"
                                        placeholder={this.props.searchPlaceholder}
                                        value={this.state.searchTerms}
                                    />
                                ) : null}
                                <ul
                                    ref={this.optionsList}
                                    className="select_options"
                                    style={this.props.resizeOptionsHeight ? { maxHeight: this.state.optionsHeight } : {}}
                                >
                                    {options}
                                    {options.length < 1 ? <li className="select_option _is-empty_message">No results</li> : null}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>

                {this.props.showErrors ? this.printErrors() : null}
            </fieldset>
        );
    }
}
