import React, { Component } from 'react';
import './navigation.css'


class navigation extends Component {

    _selectSort = () =>{
        this.props.navUpdate(this.props.event)
    }

    render(){
        return(
            <div className="navigation">
                <button onClick={this._selectSort} >
                {this.props.name}
                </button>

            </div>
        )
    }
}


export default navigation;