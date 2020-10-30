import React, { Component } from 'react';
import Scanner from '../scanner';
import MainDisplay from '../main_display';
import { timeline, daily, organize} from '../utils/fixed_categories'
//import CardBlock from '/utils/cardBlock';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import './home.css'


class Home extends Component {
    render() {
        return (
            <div className="home_container">
                <div className="scanner">
                    <Scanner/>
                    {/* <CardBlock
                        list={this.props.products.bySell}
                        title={this.props.products.newNetworkName}
                    /> */}
                </div>
                <div className="side_nav">
                    <MainDisplay/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        user:    state.user
        
    }
}

export default connect(mapStateToProps)(withRouter(Home));