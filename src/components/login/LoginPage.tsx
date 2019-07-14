import * as React from 'react';

import { SignUp } from './SignUp';
import { Login } from './Login';

import { AppBar } from 'material-ui';

export class LoginPage extends React.Component<{}, {}> {
    render() {
        return(
            <>
                <AppBar 
                    title="Bartabello" 
                    iconClassNameLeft="bartabello-logo"
                >
                </AppBar>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Login/>
                </div>
            </>
        );
    }
}