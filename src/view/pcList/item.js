import React, {Component} from  'react';

import * as LISTS from '../../components/constant/parts';

class PCItem extends Component{
    constructor(props) {
        super(props);

        this.state ={
            editMode: false,
            content: [],
            ...LISTS.PROCESSOR,
        }
    }

    onToggleEditMode = () => {
        this.setState(state =>({
            editMode: !state.editMode,
        }));
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.content, );

        this.setState({editMode: false});
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    render(){
        const {authUser, content, onRemoveContent} = this.props;
        const {editMode,
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
        return(
            <tbody>
                {editMode ? (
                    <div>
                        <input type="text" className="form-control" name="details" value={details} onChange={this.onChange} placeholder="Details" />
                        <input type="text" className="form-control" name="serialNumber" value={serialNumber} onChange={this.onChange} placeholder="Serial Number" />
                        <input type="date" className="form-control" name="datePurchase" value={datePurchase} onChange={this.onChange} placeholder="Date Purchsed" />
                        <input type="date" className="form-control" name="dateInstalled" value={dateInstalled} onChange={this.onChange} placeholder="Date Installed" />
                        <input type="date" className="form-control" name="dateDispose" value={dateDispose} onChange={this.onChange} placeholder="Date Disposed" />
                        <input type="text" className="form-control" name="brand" value={brand} onChange={this.onChange} placeholder="brand" />
                        <input type="text" className="form-control" name="model" value={model} onChange={this.onChange} placeholder="model" />
                        <input type="text" className="form-control" name="propertyNo" value={propertyNo} onChange={this.onChange} placeholder="Property Number" />
                        <input disabled type="text" className="form-control" name="transactionDate" value={this.state.currentDate} onChange={this.onChange} placeholder="Transaction Date" />
                        <input type="text" className="form-control" name="Status" value={Status} onChange={this.onChange} placeholder="Status" />
                    </div>
                ) : (
                    <div>
                        <tr>
                            <td>ITAssigned</td>
                            <td>brand</td>
                            <td>Date Dispose</td>
                            <td>Date Installed</td>
                            <td>Date Purchased</td>
                            <td>Details</td>
                            <td>Fields</td>
                            <td>Ip Address</td>
                            <td>model</td>
                            <td>Property No</td>
                            <td>Serial Number</td>
                            <td>Status</td>
                            <td>Transaction Date</td>
                            <td>Type</td>
                            <td>User ID</td>
                        </tr>
                        <tr>
                            <td>{content.ITAssigned}</td>
                            <td>{content.brand}</td>
                            <td>{content.dateDisposed}</td>
                            <td>{content.dateInstalled}</td>
                            <td>{content.details}</td>
                            <td>{content.field}</td>
                            <td>{content.ipAddress}</td>
                            <td>{content.model}</td>
                            <td>{content.propertyNo}</td>
                            <td>{content.serialNumber}</td>
                            <td>{content.status}</td>
                            <td>{content.transactionDate}</td>
                            <td>{content.type}</td>
                            <td>{content.uid}</td>
                            <td>{content.userId}</td>
                        </tr>
                    </div>
                )}

                {authUser.uid === content.userId && (
                    <span>
                        {editMode ? (
                            <span>
                                <button onClick={this.onSaveEditText}>Save</button>
                                <button onClick={this.onToggleEditMode}>Reset</button>
                            </span>
                        ) : (
                            <button onClick={this.onToggleEditMode}>Edit</button>
                        )}

                        {!editMode && (
                            <button
                                type="button"
                                onClick={() => onRemoveContent(content.uid)}
                            >
                                Delete
                            </button>   
                        )}
                    </span>
                )}
            </tbody>
        )
    }

}


export default PCItem;