import React from 'react';

import AuthUserContext from './context.js';
import {withFirebase} from '../firebase';
import { auth } from 'firebase';

const needsEmailVerification = authUser => 
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider=>provider.providerId)
        .includes('password');

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props){
            super(props);

            this.state = {isSent: false};
        }

        onSendEmailVerification = () => {
            this.props.firebase
                .SendEmailVerification()
                .then(() => this.setState({isSent: true}));
        };

        render() {
            return(
                <AuthUserContext.Consumer>
                    {
                        authUser => needsEmailVerification(authUser) ? (
                            <div>
                                {this.state.isSent ? (
                                    <p>
                                        E-mail confirmation send: Check your E-Mails (Spam folder included) for a comfirmation E-Mail. Refresh this page once you confirmed your E-Mail.
                                    </p>
                                ): (
                                    <p>
                                        Verify your E-Mail: Check your E-Mail (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.
                                    </p>
                                )}

                                <button type="button" onClick={this.onSendEmailVerification} disabled={this.state.isSent}>
                                    Send Confirmation E-Mail
                                </button>
                            </div>
                        ) : (
                            <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
    
    return withFirebase(WithEmailVerification);
}

export default withEmailVerification;