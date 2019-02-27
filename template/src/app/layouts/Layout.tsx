import * as React from 'react';

import Toast from 'foundry-react/toast/Toast.js';
import Icons from '@modules/common/components/ui/Icons';
import NavMain from '@modules/common/components/ui/NavMain';
import { Helmet } from 'react-helmet';

export default class Layout extends React.Component<LayoutProps, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <Helmet>
                    <link rel="shortcut icon" />
                </Helmet>
                <Icons />
                <NavMain />
                {this.props.children}
                <Toast />
            </div>
        );
    }
}
