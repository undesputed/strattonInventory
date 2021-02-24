import React from 'react';

import { withFirebase } from '../../../firebase';

const SignoutButton = ({firebase}) => (
    <button type="button" onClick={firebase.SignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignoutButton);