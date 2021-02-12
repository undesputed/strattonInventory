import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import { withFirebase} from '../../firebase'
import * as ROUTES from '../../components/constant/routes';



const RegisterPage = () => (
    <div>
        <h1>SignUp</h1>
        <RegisterForm />    
    </div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class RegisterFormBase extends Component{
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase.CreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return this.props.firebase.user(authUser.user.uid).set({
                username,
                email,
            },{merge: true},
            );
        })
        .then(() => {
            return this.props.firebase.SendEmailVerification();
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.DASHBOARD);
        })
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }
      
              this.setState({ error });
        });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
                <LoginLink/>
            </div>
        )
    }
}

const RegisterLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
    </p>
);

const LoginLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
    </p>
)


const RegisterForm = compose(
    withRouter,
    withFirebase,
)(RegisterFormBase);

export default RegisterPage;

export {RegisterForm, RegisterLink};