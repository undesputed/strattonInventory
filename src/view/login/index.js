import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {RegisterLink} from '../Register';
import {withFirebase} from '../../firebase';
import * as ROUTES from '../../components/constant/routes';

const LoginPage = () => (
    <div>
        <h1>
            Login
        </h1>
        <LoginForm />
        <RegisterLink />
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class LoginFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email,password} = this.state;

        this.props.firebase
            .SignInWithEmailAndPassword(email,password)
            .then(() => {
                this.setState({ ...INITIAL_STATE});
                this.props.history.push(ROUTES.DASHBOARD);
            })
            .catch(error =>{
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return(
            <form onSubmit={this.onSubmit}>
                <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                />
                <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                Sign In
                </button>
        
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(LoginFormBase);

export default LoginPage;

export {LoginForm}