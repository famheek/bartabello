import * as React from 'react';
import {
    Route,
    HashRouter
} from 'react-router-dom';

import { LoginPage } from './components/login/LoginPage';
import { AdminPage } from './components/admin/AdminPage';
import { DashboardPage } from './components/dashboard/DashboardPage';

export class Routing extends React.Component<{}, {}> {
    render() {
        return(
            <HashRouter>
                <>
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/:did/admin" component={AdminPage}/>
                    <Route path="/:did/dashboard" component={DashboardPage}/>
                </>
            </HashRouter>
        );
    }
}