// import React from 'react';
// import { Link }  from 'react-router-dom';
// import {withFirebase} from '../../../firebase';

// import * as ROUTES from '../../../components/constant/routes';

// const Navigation = ({firebase}) => (
//     <div>
//         <ul>
//             <li>
//                 <Link to={ROUTES.LOGIN}>Sign in</Link>
//             </li>
//             <li>
//                 <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
//             </li>
//             <li>
//                 <Link to={ROUTES.REGISTER}>Register</Link>
//             </li>
//             <li>
//                 <Link to={ROUTES.PCLIST}>PC Lists</Link>
//             </li>
//             <li>
//                 <button type="button" onClick={firebase.SignOut}>
//                     Logout
//                 </button>
//             </li>
//         </ul>
//     </div>
// )

// export default withFirebase(Navigation);

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {AuthUserContext} from '../../../session';

import SignoutButton from './signout';
import * as ROUTES from '../../../components/constant/routes';

function Navigation(){
    const NavigationAuth = ({authUser}) => (
        <ul>
            <li>
                <Link to={ROUTES.DASHBOARD}>Dashbaord</Link>
            </li>
            <li>
                <Link to={ROUTES.PCLIST}>PC Lists</Link>
            </li>
            <li>
                <Link to={ROUTES.PURCHASING}>Purchasing / Procurement</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNTABLE_PERSON}>Accountable Persons</Link>
            </li>
            <li>
                <Link to={ROUTES.HISTORY}>Hitory</Link>
            </li>
            <li>
                <Link to={ROUTES.REPORTS}>Reports</Link>
            </li>
            <li>
                <Link to={ROUTES.SEATPLAN}>Seat Plan</Link>
            </li>
            <li>
                <Link to={ROUTES.TRACKER}>Tracker</Link>
            </li>
            <li>
                <SignoutButton />
            </li>
        </ul>
    );

    const NavigationNonAuth = () => (
        <ul>
            <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
            <li>
                <Link to={ROUTES.REGISTER}>Register</Link>
            </li>
        </ul>
    );

    return(
        <>
            <nav>
                <div>
                    <AuthUserContext.Consumer>
                        {
                            authUser=>
                                authUser ? (
                                    <NavigationAuth authUser={authUser} />
                                ) : (
                                    <NavigationNonAuth />
                                )
                        }
                    </AuthUserContext.Consumer>
                </div>
            </nav>
        </>
    )
}

export default Navigation