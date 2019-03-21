import axios from 'axios';
import Auth from '@core/auth/Auth';

// import * as utils from '@utils/tools.js';

import store from '@root/_store';
import * as toastActions from '@core/toast/ToastActions.js';

import { rootPath } from '@config/global_config';

axios.interceptors.request.use((config) => {
    // let header = Auth.getAccessTokenHeader();
    //
    // if (config.headers) config.headers.Authorization = header.Authorization;

    return config;
});

export default () => {
    axios.defaults.transformResponse = [
        function(response) {
            try {
                response = JSON.parse(response);
            } catch (err) {
                // console.error(err);
            }

            if (!response.success) {
                switch (response.code) {
                    case 401:
                        if (response.result && response.result.expired) {
                            window.location.href = '/';
                        }

                        break;

                    // case 500:
                    //     window.location = '/500';
                    //     return false;
                    // break;

                    default:
                        break;
                }
            }

            if (response.toast) {
                store.dispatch(toastActions.createToast(response.success ? 'success' : 'error', response.msg));
            }

            return response;
        }
    ];
};
