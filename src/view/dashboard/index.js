import React from 'react';
import {compose} from 'recompose'

import {withAuthorization, withEmailVerification} from '../../session';

const DashboardPage = () => (
    <div>
        <h1>DashboardPage</h1>
        <p>The Dashbaord Page is accessibel to every singed in user.</p>
    </div>
)

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(DashboardPage);