import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './dashboard/navigation';

import LoginPage from './login';
import DashbaordPage from './dashboard';
import RegisterPage from './Register';
import AccountablePersonePage from './accountablePerson';
import HistoryPage from './history';
import PCPage from './pcList';
import PurchasingPage from './purchasing';
import ReportsPage from './reports';
import SeatPlanPage from './seatPlan';
import TrackerPage from './tracker';

import * as ROUTES from '../components/constant/routes';
import { withAuthentication } from '../session';

class App extends Component {
    render(){
        return(
            <Router>
                <div>
                    <Navigation/>

                    <hr/>

                    <Route exact path={ROUTES.DASHBOARD} component={DashbaordPage} />
                    <Route path={ROUTES.LOGIN} component={LoginPage} />
                    <Route path={ROUTES.REGISTER} component={RegisterPage} />
                    <Route path={ROUTES.ACCOUNTABLE_PERSON} component={AccountablePersonePage}/>
                    <Route path={ROUTES.HISTORY} component={HistoryPage} />
                    <Route path={ROUTES.PCLIST} component={PCPage} />
                    <Route path={ROUTES.PURCHASING} component={PurchasingPage} />
                    <Route path={ROUTES.REPORTS} component={ReportsPage} />
                    <Route path={ROUTES.SEATPLAN} component={SeatPlanPage} />
                    <Route path={ROUTES.TRACKER} component={TrackerPage} />
                </div>
            </Router>
        )
    }
}

export default withAuthentication(App);