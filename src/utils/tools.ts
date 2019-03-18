/*
 * Tools:
 * Utilities and helper functions we can use throughout our app.
 *
 * Data & form processing
 * Authorization
 * Request helpers
 * DOM helpers
 *
 */

/*
 * Data & form processing
 */

declare global {
    interface String {
        capitalizeFirstLetter(): string;
    }
    interface Array<T> {
        isArray(obj: object): boolean;
    }
}

// Serialize the contents of a form ready for POST
export function serialize(form, excludeNulls = true, excludeEmpty = true, excludeNullStrings = false) {
    let field,
        s = {};
    if (typeof form == 'object' && form.nodeName == 'FORM') {
        let len = form.elements.length;

        for (let i = 0; i < len; i++) {
            field = form.elements[i];

            // Is the field disabled or missing a name, if so skip it
            if (field.disabled || !field.name) {
                continue;
            }

            if ((excludeNulls && field.value === null) || (excludeEmpty && field.value === '') || (excludeNullStrings && field.value === 'null')) {
                continue;
            }

            switch (field.type) {
                // Is the field presentational or a control, if so skip it
                case 'reset':
                case 'submit':
                case 'button':
                    continue;

                case 'file':
                    // Serialize file inputs here
                    break;

                case 'checkbox':
                    if (field.checked) {
                        let fieldName = field.name;

                        if (s[fieldName]) {
                            if (typeof s[fieldName] !== 'object') {
                                let currentVal = s[fieldName];
                                s[fieldName] = [];
                                s[fieldName].push(currentVal);
                            }

                            s[fieldName].push(field.value);
                        } else {
                            s[fieldName] = field.value;
                        }
                    }

                    break;
                default:
                    s[field.name] = field.value;
                    break;
            }
        }
    }
    return s;
}

export function serializeObj(obj, prefix) {
    let str: string[] = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + '[' + p + ']' : p,
                v = obj[p];
            str.push(typeof v == 'object' ? serializeObj(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }

    return str.join('&').replace(/%20/g, '+');
}

/*
 *  Authorization
 */

// Grab our CSRF token for placement into forms and POST requests
export let csrf = () => {
    return (function(c) {
        for (let a = document.getElementsByTagName('meta'), b = 0; b < a.length; b++) {
            if (c == a[b].name || c == a[b].getAttribute('property')) {
                return a[b].content;
            }
        }
        return false;
    })('csrf-token');
};

/*
 *  Request helpers
 */

// Takes our current URL, checks for the existence of a segment, grabs it, and returns it
export let getUrlSegment = function(index) {
    let urlArray = window.location.pathname.split('/');
    return urlArray[index];
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

export function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
export let formatNumberFixedTwo = function(data) {
    try {
        let datatest = parseFloat(parseFloat(data).toFixed(2));
        if (!isNaN(datatest)) {
            data = datatest;
        }
    } catch (err) {
        console.error(err);
    }

    return data;
};

/**
 * sortObjectKeys
 * @param {Object} obj
 * sorts all object keys and makes any numbers actually numberic - this is mainly for the comparing of two objects.
 */
export const sortObjectKeys = (obj) => {
    let newObj = {};

    if (typeof obj === 'undefined' || obj === null) {
        return;
    }

    Object.keys(obj)
        .sort()
        .forEach(function(key) {
            let value = obj[key];

            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    newObj[key] = sortArray(value);
                } else {
                    newObj[key] = sortObjectKeys(value);
                }
            } else {
                newObj[key] = isNumeric(value) ? parseInt(value) : value;
            }
        });

    return newObj;
};

/**
 * sortArray
 * @param {Array} arr
 * This sorts the array and object keys
 */
export const sortArray = (arr) => {
    return arr
        .map((item) => {
            if (typeof item === 'object') {
                if (Array.isArray(item)) {
                    return sortArray(item);
                }

                return sortObjectKeys(item);
            }

            return item;
        })
        .sort();
};

/**
 * check if anything has been changed.
 * get old object, sort it and ensure numbers are checked.
 * get new object, if old data exists, merge it with old object and check numbers.
 * compare new and old.
 * Reason of merge : when comparing the data from the server to the form request, sometimes extra data is passed.
 * So we include this in the comparison.
 */
export const isMergeEqual = (oldData, newData) => {
    oldData = oldData ? sortObjectKeys(oldData) : {};

    let data = Object.assign({}, oldData);
    data = newData ? Object.assign(data, newData) : data;
    data = sortObjectKeys(data);

    return JSON.stringify(oldData) === JSON.stringify(data);
};

/**
 * ------------
 * DOM helpers
 * ------------
 */

/**
 * Offset
 * Get position of an element relative to the viewport
 *
 * returns Object
 */

export let offset = function(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

/**
 * Hide Body overflow
 * Adds a class to the body to prevent scrolling while certain elements are active i.e. modals
 */
export let lockViewportScrolling = function() {
    let el = document.getElementsByTagName('body')[0];

    if (!el.classList.contains('_is-locked')) {
        el.classList.add('_is-locked');
    }
};

/**
 * Show Body overflow
 * Removes a class from the body responsible for preventing
 */
export let releaseViewportScrolling = function() {
    let el = document.getElementsByTagName('body')[0];

    if (el.classList.contains('_is-locked')) {
        el.classList.remove('_is-locked');
    }
};

export const moneyThouSeparator = (val) => {
    return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
};

/**  only implement if no native implementation is available */
if (typeof Array.isArray === 'undefined') {
    Array.prototype.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

export const cloneDeep = (anything) => {
    return JSON.parse(JSON.stringify(anything));
};

export const stripHtml = (str) => {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
};
