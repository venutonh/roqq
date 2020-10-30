import React, { Component } from 'react'

import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getNetworkStats } from '../../actions/network_actions';


class Network extends Component {


    componentDidMount(){
        const params = this.props.location.pathname.split('/');

        this.props.dispatch(getNetworkStats(Number(params[3]))).then(response =>{
            if(!response){
                console.log("Sorry, there was an error loading this page");
                this.props.history.push('/');
            }
        })
    }


    render() {
        return (
            <div>
                <NetworkInformation/>
                <ArticlesByNetwork/>
                <AuthorsByNetwork/>
                <NetworkAvgRating/>
                <NetworkAvgLike/>
                <CommonNetworkTags/>
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        user:    state.user,
        network: state.network
    }
}

export default connect(mapStateToProps)(withRouter(Network));
