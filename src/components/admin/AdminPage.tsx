import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Admin, AdminProps } from './Admin';
import { Dashboard } from './../dashboard/Dashboard';

export interface AdminPageProps extends RouteComponentProps<any> {

}

export class AdminPage extends React.Component<AdminPageProps, {}> {
    constructor(props: AdminPageProps) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div style={{
                display: 'flex',
                alignItems: 'stretch'
            }}>
                <div style={{
                    flexGrow: 1,
                    minWidth: '320px'
                }}>
                    <Admin did={this.props.match.params.did}/>
                </div>
                <Dashboard did={this.props.match.params.did}/>
            </div>
        );
    }
}