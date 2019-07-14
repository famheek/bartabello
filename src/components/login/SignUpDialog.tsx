import * as React from 'react';
import * as Firebase from 'firebase';
import { FlatButton, Dialog, TextField, AppBar, LinearProgress } from 'material-ui';

export interface SignUpDialogProps {
    handleClose: () => void;
    openSnackbar: (message: string) => void;
    open: boolean;
}

export interface SignUpDialogState {
    email: string;
    password: string;
    passwordRepeat: string;
    signingUp: boolean;
}

export class SignUpDialog extends React.Component<SignUpDialogProps, SignUpDialogState> {
    constructor(props: SignUpDialogProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            signingUp: false
        }
    }

    handleEmailChange = (event: any): void => {
        this.setState({email: event.target.value});
    }
    handlePasswordChange = (event: any): void => {
        this.setState({password: event.target.value});
    }
    handlePasswordRepeatChange = (event: any): void => {
        this.setState({passwordRepeat: event.target.value});
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        if(this.state.password !== this.state.passwordRepeat) {
            this.props.openSnackbar("enter same passwords");
            return;
        } else if(this.state.password.length === 0 || this.state.passwordRepeat.length === 0) {
            this.props.openSnackbar("fill in all fields");
            return;
        }

        this.setState({signingUp: true});
        Firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then((user) => {
            this.props.openSnackbar("sign up successful");
            console.log(user);
        }).catch((err) => {
            this.setState({signingUp: false});
            if(err.code === "auth/invalid-email") {
                this.props.openSnackbar("enter valid email");
                return;
            } else if(err.code === "auth/email-already-in-use") {
                this.props.openSnackbar("account already exists");
                return;
            } else if(err.code === "auth/weak-password") {
                this.props.openSnackbar("enter stronger password");
                return;
            }
            this.props.openSnackbar("something went wrong");
            console.log(err);
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="sign up"
                primary={true}
                onClick={this.handleSubmit}
            />
        ];
        let loader = null;
        if(this.state.signingUp) {
            loader = <LinearProgress 
                mode="indeterminate"
                color="#FF4081"
            />
        }
        return(
            <Dialog
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                bodyStyle={{padding: 0}}
                contentStyle={{
                    width: '288px'
                }}
            >
                <AppBar 
                    title="Sign Up"
                    showMenuIconButton={false}
                />
                {loader}
                <form 
                    onSubmit={this.handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginLeft: '16px',
                        marginRight: '16px'
                    }}
                >
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
                    <TextField
                        floatingLabelText="password"
                        type="password"
                        value={this.state.passwordRepeat}
                        onChange={this.handlePasswordRepeatChange}
                    />
                </form>
            </Dialog>
        );
    }
}