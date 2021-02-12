import React from 'react';
import { Link }  from 'react-router-dom';
import {withFirebase} from '../../../firebase';

import * as ROUTES from '../../../components/constant/routes';

const Navigation = ({firebase}) => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LOGIN}>Sign in</Link>
            </li>
            <li>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </li>
            <li>
                <Link to={ROUTES.REGISTER}>Register</Link>
            </li>
            <li>
                <button type="button" onClick={firebase.SignOut}>
                    Logout
                </button>
            </li>
        </ul>
    </div>
)

export default withFirebase(Navigation);