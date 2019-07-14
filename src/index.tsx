import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Firebase from 'firebase';

import * as firebase from './lib/firebase';

import { Routing } from './Routing';

Firebase.initializeApp(firebase.config);

ReactDOM.render(
    <MuiThemeProvider>
        <div>
            <Routing/>
        </div>
    </MuiThemeProvider>,
    document.getElementById("root")
);