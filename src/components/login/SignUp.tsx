import * as React from 'react';
import * as Firebase from 'firebase';

import { TextField, RaisedButton, FlatButton } from 'material-ui';

export interface SignUpProps {

}

export interface SignUpState {
    email: string;
    password: string;
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
        Firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then((user) => {
            console.log(user);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
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
                <RaisedButton
                    label="sign up"
                    type="submit"
                    primary={true}
                />
            </form>
        );
    }
}