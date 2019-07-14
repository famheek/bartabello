import * as React from 'react';
import * as Firebase from 'firebase';
import { TextField, RaisedButton, FlatButton, Snackbar } from 'material-ui';
import { Redirect } from 'react-router';

import { assignDashboard } from './../../lib/firebase';

import { SignUpDialog } from './SignUpDialog';

export interface LoginProps {

}

export interface LoginState {
    email: string;
    password: string;
    redirect: string;
    dialogOpen: boolean;
    snackbarOpen: boolean;
    snackbarMessage: string;    
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: '',
            dialogOpen: false,
            snackbarOpen: false,
            snackbarMessage: ''
        };
    }

    handleEmailChange = (event: any): void => {
        this.setState({email: event.target.value})
    }
    handlePasswordChange = (event: any): void => {
        this.setState({password: event.target.value})
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then((user) => {
            assignDashboard(user.uid).then((did) => {
                this.setState({redirect: did});
            });
            console.log(user);
        }).catch((err) => {
            console.log(err);
        });
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }
    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    }

    openSnackbar = (message: string): void => {
        this.setState({snackbarOpen: true, snackbarMessage: message});
    }
    closeSnackbar = (): void => {
        this.setState({snackbarOpen: false});
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={"/" + this.state.redirect + "/admin"}/>
        }
        return(
            <form 
                onSubmit={this.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                <h1 style={{marginBottom: 0}}>Welcome</h1>
                <TextField
                    floatingLabelText="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <TextField
                    floatingLabelText="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}>
                    <RaisedButton
                        label="log in"
                        type="submit"
                        primary={true}
                    />
                    <FlatButton
                        label="sign up"
                        type="button"
                        primary={true}
                        onClick={this.handleDialogOpen}
                    />
                    <SignUpDialog 
                        open={this.state.dialogOpen}
                        handleClose={this.handleDialogClose}
                        openSnackbar={this.openSnackbar}
                    />
                    <Snackbar
                        open={this.state.snackbarOpen}
                        message={this.state.snackbarMessage}
                        autoHideDuration={3000}
                        onRequestClose={this.closeSnackbar}
                    />
                </div>
            </form>
        );
    }
}