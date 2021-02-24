import React from 'react';

import Processor from './processor';

class ComputerParts extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            show: false,
        }
    }

    onShow = () => {
        this.setState({show: true});
    }

    onHide = () => {
        this.setState({show: false});
    }

    render(){
        const {show} = this.state;
        return(
            <div>
                { show ? (
                    <div>
                        <button onClick={this.onHide}>Hide</button>
                        <Processor/>
                    </div>
                ) : (
                    <button onClick={this.onShow}>Show CPU Lists and details</button>
                )}
            </div>
        )
    }
}

export default ComputerParts;