import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Dashboard } from './../dashboard/Dashboard';

export interface DashboardPageProps extends RouteComponentProps<any> {

}

export class DashboardPage extends React.Component<DashboardPageProps, {}> {
    constructor(props: DashboardPageProps) {
        super(props);
    }
    render() {
        return(
            <Dashboard did={this.props.match.params.did}/>
        );
    }
}