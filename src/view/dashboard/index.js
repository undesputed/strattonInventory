import React from 'react';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../../session';
import * as PC from '../../components/constant/parts';


class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            users: [],
            ...PC.CPU,
        }
    }

    componentDidMount(){
        this.setState({loading: true});

        this.unsubscribe = this.props.firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];

                snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid: doc.id }),
                );

                this.setState({
                    users,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onSubmit = event => {
        
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <h1>CPU</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        <span>Details</span>
                    </label>
                    <br/>
                    <button onClick={this.onSubmit}>
                        CPU
                    </button>
                </form>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(Dashboard);
  