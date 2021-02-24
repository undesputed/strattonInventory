import React from 'react';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';

import {withAuthorization, withEmailVerification, AuthUserContext} from '../../../session';
import {withFirebase} from '../../../firebase';
// import CPU from './lists';
import PCLists from './PCLists';
import * as LISTS from '../../../components/constant/parts';
import * as ROUTES from '../../../components/constant/routes';


class PCPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDateTime: '',
            currentDate: '',
            cpu: [],
            loading: false,
            limit:10,
            addCpu: false,
            ...LISTS.PROCESSOR,
        };
    }

    componentDidMount(){
        var date = new Date();
        var today = (date.getMonth() + 1)+'/'+date.getDate()+'/'+date.getFullYear();
        var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        this.setState({currentDateTime: today + ' ' + time, currentDate: today});
        this.onListForCPUS();
    }

    onListForCPUS = () => {
        this.setState({loading: true});

        this.unsubscribe = this.props.firebase
            .processors()
            .where('status', '==' ,'Active')
            .orderBy('transactionDate', 'desc')
            .limit(this.state.limit)
            .onSnapshot(snapshot =>{
                if(snapshot.size){
                    let processor = [];
                    snapshot.forEach(doc =>
                        processor.push({ ...doc.data(), uid: doc.id}),
                        );
                    this.setState({
                        cpu: processor.reverse(),
                        loading: false,
                    });
                } else{
                    this.setState({
                        cpu: null,
                        loading: false
                    });
                }
            });
    };

    componentWillUnmount(){
        this.unsubscribe();
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        const {
            details,
            serialNumber,
            datePurchase,
            dateInstalled,
            dateDispose,
            brand,
            model,
            propertyNo,
            ITAssigned,
            UserID,
            transactionDate,
            IP,
            Status,
        } = this.state;

        var user = this.props.firebase.currUser();

        if(user != null) {
            this.props.firebase.processors().add({
                details: details,
                serialNumber: serialNumber,
                datePurchase: datePurchase,
                dateInstalled: dateInstalled,
                dateDispose: dateDispose,
                brand: brand,
                model: model,
                propertyNo: propertyNo,
                ITAssigned: ITAssigned,
                userId: user.uid,
                transactionDate: this.state.currentDateTime,
                ipAddress: '192.168.5.141',
                status: Status,
                type: '',
                field: serialNumber,
            }).then(() => {
                this.setState({  ...LISTS.PROCESSOR });
                return(
                    <div>
                        <h1>Created successfully</h1>
                    </div>
                )
            }).catch(error => {
                console.log(error)
                return(
                    <div>
                        <h1>There was an error in creating a PC please check logs.</h1>
                    </div>
                )
            })

        } else{
            return(
                <div>
                    <h1>You must login first to create a pc specs.</h1>
                </div>
            )
        }



    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    onRemoveContent = uid => {
        this.props.firebase.processor(uid).delete();
    }

    onEditContent = (content, 
        details,
        serialNumber,
        datePurchase,
        dateInstalled,
        dateDispose,
        brand,
        model,
        propertyNo,
        ITAssigned,
        UserID,
        transactionDate,
        IP,
        Status,
        type,
        field
        ) => {
        const {uid, ...contentSnapshot} = content;

        var user = this.props.firebase.currUser();

        this.props.firebase.processor(content.uid).set({
            ...contentSnapshot,
            details,
            serialNumber,
            datePurchase,
            dateInstalled,
            dateDispose,
            brand,
            model,
            propertyNo,
            ITAssigned,
            UserID: user.uid,
            transactionDate:  this.state.currentDateTime,
            IP:'192.168.5.141',
            Status,
            type: 'Edited',
            field:''
        })
    }

    onAddCpu = () => {
        this.setState(
            state => ({
                addCpu: !state.addCpu
            })
        )
    }

    onCancelAdd = () => {
        this.setState(
            {
                addCpu: false,
            }
        )
    }

    render(){
        const {
            details,
            serialNumber,
            datePurchase,
            dateInstalled,
            dateDispose,
            brand,
            model,
            propertyNo,
            ITAssigned,
            UserID,
            transactionDate,
            IP,
            Status,
            cpu,
            addCpu,
        } = this.state;

        const isInvalid = serialNumber === '' || brand === '' || model === '' || propertyNo === '';

        return(
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {
                            addCpu ? (
                                <div>
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label>Details:</label>
                                            <input type="text" className="form-control" name="details" value={details} onChange={this.onChange} placeholder="Details" />
                                        </div>
                                        <div className="form-group">
                                            <label>Serial Number:</label>
                                            <input type="text" className="form-control" name="serialNumber" value={serialNumber} onChange={this.onChange} placeholder="Serial Number" />
                                        </div>
                                        <div className="form-group">
                                            <label>Date Purchased:</label>
                                            <input type="date" className="form-control" name="datePurchase" value={datePurchase} onChange={this.onChange} placeholder="Date Purchsed" />
                                        </div>
                                        <div className="form-group">
                                            <label>Date Installed:</label>
                                            <input type="date" className="form-control" name="dateInstalled" value={dateInstalled} onChange={this.onChange} placeholder="Date Installed" />
                                        </div>
                                        <div className="form-group">
                                            <label>Date Dispose:</label>
                                            <input type="date" className="form-control" name="dateDispose" value={dateDispose} onChange={this.onChange} placeholder="Date Disposed" />
                                        </div>
                                        <div className="form-group">
                                            <label>Brand Name:</label>
                                            <input type="text" className="form-control" name="brand" value={brand} onChange={this.onChange} placeholder="brand" />
                                        </div>
                                        <div className="form-group">
                                            <label>Model:</label>
                                            <input type="text" className="form-control" name="model" value={model} onChange={this.onChange} placeholder="model" />
                                        </div>
                                        <div className="form-group">
                                            <label>Property Number:</label>
                                            <input type="text" className="form-control" name="propertyNo" value={propertyNo} onChange={this.onChange} placeholder="Property Number" />
                                        </div>
                                        <div className="form-group">
                                            <label>IT Assigned:</label>
                                            {/* <input type="text" className="form-control" name="ITAssigned" value={ITAssigned} onChange={this.onChange} placeholder="IT Assigned" /> */}
                                            <select name="ITAssigned" value={ITAssigned} onChange={this.onChange}>
                                                <option value="0">Please Select an IT</option>
                                                <option value="1">Dhanny Lou Sumilang (Manager)</option>
                                                <option value="2">Murielle Beronga (Senior Developer)</option>
                                                <option value="3">Maria Christina Mingueto (Software Developer)</option>
                                                <option value="4">Jessa Jane Canillo (Tehcnical Support)</option>
                                                <option value="5">Carrie A. Yu (IT Staff)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Transaction Date:</label>
                                            <input disabled type="text" className="form-control" name="transactionDate" value={this.state.currentDate} onChange={this.onChange} placeholder="Transaction Date" />
                                        </div>
                                        <div className="form-group">
                                            <label>Status:</label>
                                            <input type="text" className="form-control" name="Status" value={Status} onChange={this.onChange} placeholder="Status" />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        <button onClick={this.onCancelAdd}>Cancel</button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={this.onAddCpu}>Add CPU</button>
                                </div>
                            )
                        }

                        {
                            cpu && (
                                <PCLists
                                    authUser={authUser}
                                    content={cpu}
                                    onEditContent={this.onEditContent}
                                    onRemoveContent={this.onRemoveContent}
                                />
                            )
                        }
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

export default withFirebase(PCPage);