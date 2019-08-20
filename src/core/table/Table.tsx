import * as React from 'react';
import Pagination from 'react-js-pagination';

import moment from 'moment';

import Search from '../inputs/SearchInput.js';
import ReactElementToString from 'react-element-to-string';
import { stripHtml } from '../../utils/tools.js';

export default class ReactTable extends React.Component<any, any> {
    static defaultProps = {
        emptyMessage: 'There are currently no rows.',
        emptyClassName: '',

        pagination: false,
        rowsPerPage: 10,

        searchTerms: '',
        searchable: false,
        sortable: true,
        sortablefrontEnd: true,
        sorted_heading: null,
        sorted_heading_direction: 'asc',
        sortableHeadings: null, // ['firstname','lastname'] //these are used to map the readable headings back to the data fields.
        onSortChange: null,

        className: 'table-default',

        headings: [],
        data: [],

        formatData: {}, // 'heading' : (data)=>{return data;}
        dateSortFormat: 'DD/MM/YYYY'
    };

    constructor(props) {
        super(props);

        this.state = {
            searchTerms: '',
            activePage: 1,
            sortOrder: {
                heading: null,
                headingIndex: null,
                direction: 'asc' //desc
            }
        };
    }

    componentDidMount() {
        this.setState({
            searchTerms: this.props.searchTerms || '',
            sortOrder: {
                heading: this.props.sorted_heading ? this.props.sorted_heading : null,
                headingIndex: this.props.sorted_heading ? this.props.headings.indexOf(this.props.sorted_heading) : null,
                direction: this.props.sorted_heading_direction ? this.props.sorted_heading_direction : 'asc'
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const maxPages = nextProps.data ? this.getMaxPages(nextProps.data) : null;

        if (maxPages && this.state.activePage > maxPages) {
            this.setState({
                activePage: maxPages || 1
            });
        }
    }

    /*
     * ----------
     * User-driven events
     * @prefix _handle
     * ----------
     */

    handle_search = (e) => {
        this.setState({
            activePage: 1,
            searchTerms: e.target.value
        });
    };
    handle_clearSearch = (e) => {
        this.setState({
            searchTerms: ''
        });
    };

    handle_pageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber
        });
    };

    handle_sortOrder = (heading, index): void => {
        if (!this.props.sortable) {
            return;
        }

        const currentSort = this.state.sortOrder;
        let direction = currentSort.direction;

        if (currentSort.heading == heading) {
            direction = currentSort.direction == 'asc' ? 'desc' : 'asc';
        } else {
            direction = 'asc';
        }

        this.setState(
            {
                activePage: 1,
                sortOrder: {
                    heading: heading,
                    headingIndex: index,
                    direction: direction
                }
            },
            () => {
                if (typeof this.props.onSortChange === 'function') {
                    let sortedHeading = heading;
                    //if we need to remap the readable headings back to the sort headings then the heading passed to the onSortChange should be the actual data field rather than the readable heading.
                    if (this.props.sort_headings) {
                        let sortedheadingIndex = this.props.headings.indexOf(heading);
                        if (sortedheadingIndex > -1) {
                            sortedHeading = this.props.sort_headings[sortedheadingIndex];
                        }
                    }

                    this.props.onSortChange({
                        heading: sortedHeading,
                        headingName: heading,
                        direction: direction
                    });
                }
            }
        );
    };

    /*
     * Logic
     */

    getData = () => {
        let data = this.props.data.slice(0);

        data = this.searchData(data);
        if (this.props.sortablefrontEnd) {
            data = this.sortData(data);
        }

        return data;
    };

    searchData = (data) => {
        if (this.state.searchTerms) {
            return data.filter((x) => {
                let index = x.findIndex((val) => {
                    let found = false;

                    if (val == null) {
                        val = '';
                    }

                    if (React.isValidElement(val)) {
                        found = this.searchText(stripHtml(ReactElementToString(val)));
                    } else {
                        found = this.searchText(val);
                    }

                    return found;
                });

                return index > -1;
            });
        }
        return data;
    };

    searchText = (str) => {
        return (
            str
                .toString()
                .toLowerCase()
                .indexOf(this.state.searchTerms.toLowerCase()) > -1
        );
    };

    sortData = (data) => {
        if (this.state.sortOrder !== null) {
            const headingIndex = this.state.sortOrder.headingIndex;

            if (headingIndex !== null) {
                data.sort((a, b) => {
                    let aValue = a[headingIndex];
                    let bValue = b[headingIndex];

                    if (typeof aValue === 'string' && typeof bValue === 'string') {
                        if (this.isValidDate(aValue)) {
                            return this.sortDate(aValue, bValue);
                        }

                        return this.sortAlphabetically(aValue.toLowerCase(), bValue.toLowerCase());
                    }

                    return this.sortAlphabetically(aValue, bValue);
                });
            }
        }

        return data;
    };

    isValidDate(str) {
        let d = moment(str, this.props.dateSortFormat);
        if (d == null || !d.isValid()) {
            return false;
        }

        return str.indexOf(d.format(this.props.dateSortFormat)) >= 0;
    }

    sortDate = (a, b) => {
        if (this.state.sortOrder.direction == 'asc') {
            return moment(a, this.props.dateSortFormat).diff(moment(b, this.props.dateSortFormat));
        } else {
            return moment(b, this.props.dateSortFormat).diff(moment(a, this.props.dateSortFormat));
        }
    };

    sortAlphabetically = (a, b) => {
        if (this.state.sortOrder.direction == 'asc') {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    };

    paginatedData = (data) => {
        if (data && this.props.pagination) {
            const dataCopy = data.slice(0);

            let offset = this.props.rowsPerPage * this.state.activePage - this.props.rowsPerPage;

            return dataCopy.splice(offset, this.props.rowsPerPage);
        }

        return data;
    };

    printClasses() {
        let classes: string[] = [];

        if (this.props.sortable) {
            classes.push(' _is-sortable');
        }

        if (this.props.classes) {
            classes.push(this.props.classes);
        }

        return classes.join(' ');
    }

    printHeadings = () => {
        let headings: JSX.Element[] = [];
        let propHeadings = this.props.headings;

        for (let i = 0; i < propHeadings.length; i++) {
            if (propHeadings[i] == null) {
                continue;
            }
            headings.push(
                <th
                    key={i}
                    className={'type-label' + (this.props.sortable ? ' _is-sortable' : '')}
                    onClick={this.handle_sortOrder.bind(this, propHeadings[i], i)}
                >
                    {propHeadings[i]}{' '}
                    {this.state.sortOrder.heading == propHeadings[i] ? (
                        this.state.sortOrder.direction === 'asc' ? (
                            <span>&#x25B2;</span>
                        ) : (
                            <span>&#x25BC;</span>
                        )
                    ) : null}
                </th>
            );
        }

        return headings;
    };

    printRows = (data) => {
        if (!data) {
            return null;
        }

        let rows: JSX.Element[] = [];

        let propRows = this.props.pagination ? this.paginatedData(data) : data;

        for (let i = 0; i < propRows.length; i++) {
            rows.push(<tr key={i}>{this.printCells(propRows[i])}</tr>);
        }

        return rows;
    };

    printCells = (data) => {
        let cells: JSX.Element[] = [];
        for (let key in data) {
            let celldata = data[key];

            if (this.props.formatData) {
                if (typeof this.props.formatData[this.props.headings[key]] === 'function') {
                    celldata = this.props.formatData[this.props.headings[key]](celldata);
                }
            }

            if (celldata == null) {
                continue;
            }

            cells.push(<td key={key}>{celldata}</td>);
        }

        return cells;
    };

    getMaxPages = (data) => {
        const maxPages = Math.ceil(data.length / this.props.rowsPerPage);

        return maxPages;
    };

    printPagination = (data) => {
        let maxPages = this.getMaxPages(data);

        if (maxPages < 2) {
            return false;
        }

        return (
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.props.rowsPerPage}
                totalItemsCount={data.length}
                pageRangeDisplayed={5}
                onChange={this.handle_pageChange}
            />
        );
    };

    render() {
        var data = this.getData();

        return (
            <div className="table-wrapper">
                {((): any => {
                    if (this.props.searchable) {
                        return (
                            <div className="search-table">
                                <Search
                                    className="search-pill"
                                    onChange={this.handle_search}
                                    value={this.state.searchTerms}
                                    placeholder="Search"
                                    delay={250}
                                    onClear={this.handle_clearSearch}
                                />
                            </div>
                        );
                    }
                })()}

                <div className="table-scroll-wrapper">
                    <table className={this.props.className + ' ' + this.printClasses()}>
                        <thead className="table-striped-head">
                            <tr>{this.printHeadings()}</tr>
                        </thead>
                        <tbody className="table-striped-body">{this.printRows(data)}</tbody>
                    </table>
                </div>

                {((): any => {
                    if (!this.props.data.length) {
                        return (
                            <div className={'_is-empty _is-empty_message ' + this.props.emptyClassName}>
                                <h2 className="type-subtitle">{this.props.emptyMessage}</h2>
                            </div>
                        );
                    }
                })()}

                {((): any => {
                    if (this.props.pagination) {
                        return this.printPagination(data);
                    }
                })()}
            </div>
        );
    }
}
