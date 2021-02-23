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
    firstname: '',
    lastname: '',
    position: '',
    transactionDate: '',
    editedDate: '',
    fieldEdited: '',
    type: '',
    IP: '',
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

    componentDidMount(){
        var date = new Date();
        var today = (date.getMonth() + 1)+'/'+date.getDate()+'/'+date.getFullYear();
        var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        this.setState({transactionDate: today + ' ' + time});
    }

    onSubmit = event => {
        const {
            firstname,
            lastname,
            position,
            transactionDate,
            editedDate,
            fieldEdited,
            type,
            IP,
            email, 
            passwordOne} = this.state;

        this.props.firebase.CreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return this.props.firebase.user(authUser.user.uid).set({
                firstname,
                lastname,
                position,
                transactionDate,
                editedDate,
                fieldEdited,
                type,
                IP,
                email,
            },{merge: true},
            );
        })
        .then(() => {
            return this.props.firebase.SendEmailVerification();
        })
        .then(() => {
            console.log("Registration Success")
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
            firstname,
            lastname,
            position,
            transactionDate,
            editedDate,
            fieldEdited,
            type,
            IP,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '';

        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                    name="firstname"
                    value={firstname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    name="lastname"
                    value={lastname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    name="position"
                    value={position}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Position"
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