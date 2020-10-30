import React, { Component } from 'react'

import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


import { getAuthorStats } from '../../actions/author_actions';

class AuthorPage extends Component {

    componentDidMount(){

        const params = this.props.location.pathname.split('/');

        this.props.dispatch(getAuthorStats(Number(params[3]))).then(response =>{
            if(!response){
                console.log("Sorry, there was an error loading this page");
                this.props.history.push('/');
            }
        })
    }



    render() {
        return (
            <div>
                <AuthorName/>
                <AuthorInNetwork/>
                <AuthorAvgRating/>
                <AuthorAvgLike/>
                <ArticlesByAuthor/>
                <CommonArticleTags/>
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        user:    state.user,
        author: state.author
    }
}

export default connect(mapStateToProps)(withRouter(AuthorPage));