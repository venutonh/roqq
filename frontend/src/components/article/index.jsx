import React, { Component } from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

import TitleUrlAuthor  from '../writereview/titleUrlAuthor';
import ArticleTotalRatingAvg from './articleTotalRatingAvg';
import ArticleLikeRatingAvg from './articleLikeRatingAvg';
import ArticleReviews from './articleReviews';
//import ArticleSupportLinks from './articleSupportLinks';
import { getArticleStats } from '../../actions/article_actions';
//import ArticleTags from './articleTags';

import { getArticleInfo, clearArticleInfo } from '../../actions/article_actions';

import './article.css';
import user from '../hoc/user';


class ArticlePage extends Component {

    state={
        value={}
    }




     componentDidMount(){
         const params = this.props.location.pathname.split('/');

         this.props.dispatch(getArticleStats(Number(params[3]))).then(response =>{
             if(!response){
                 console.log("Sorry, there was an error loading this page");
                 this.props.history.push('/');
             }
         })
     }



     componentDidUpdate(){

        if(this.state.value is different from old this.state.value or user.history.vote){

        }
        //send state after 6 seconds from when value of vote was updated
        clearTimeout(this.state.sendTimer);    
        this.state.sendTimer = //setTimeout(function(){ alert("Hello"); },3000)
        setTimeout(this.props.dispatch(voteArticle(dataToSubmit)),6000);

        } else {
            this.setState({
                clicked: false 
            })
            
            clearTimeout(this.state.sendTimer);    
            this.state.sendTimer = //setTimeout(function(){ alert("sent/"); },3000)
            setTimeout(this.props.dispatch(voteArticle(dataToSubmit)),6000);

        }

     }

   // componentWillUnmount(){
   //     this.propsdispatch(clearArticleInfo())
    //}


    checkForArticleReview=(reviews,articleId)=>{
        
        if(this.props.user.userId){
            if(reviews){
                for(i=0;i<reviews.length;i++){
                    if(reviews[i].articleId===articleId){
                        return reviews[i].reviewId
                    }
                }
            }else{    
                return false;
            }
        }else{
            return false;
        }
    }



    checkForReviewVotes=(votes,articleId)=>{
        let voteValues=[];
        if(this.props.user.userId){
            if(votes){
                for(i=0;i<votes.length;i++){
                    if(votes[i].articleId===articleId){
                        voteValues.push(votes[i])
                    }
                }
                let total = voteValues.voteValue.reduce((a, b) => a + b, 0)
                if(total===0) {
                    return false;
                }if(total===1) {
                    return voteValues.sort((a,b) => 
                    new Date(b.date).getTime() - 
                    new Date(a.date).getTime())[0].reviewId;
                    
                } 
            }else{
                return false;
            }
        }else{
            return false;
        }
    }



    checkEligibiity=(reviewedId,votedId)=>{
        if(this.props.user.userId){
            if(checkForArticleReview()|| checkForReviewVotes()){
                return false;
            }else{
                return true;
            }

        }else{
            return false;
        }
    }



    render() {

        // console.log('this.props.article.articleStats.basic:');
        // if(this.props.article.articleStats === true){
        //     console.log(this.props.article.articleStats.)
        // } 
       
        return (

            <div className="aricle_container">
                <div className="article_basic_info">
                    <TitleUrlAuthor 
                        article={
                            this.props.article.articleStats ?
                                this.props.article.articleStats
                            :null
                        }/>
                </div>
                <div className="avg_total_rating">
                    <ArticleTotalRatingAvg
                        avgTotal= {
                            this.props.article.articleStats ?
                                this.props.article.articleStats.avgTotal
                            :null
                        }
                        //avgDetail={this.props.article.articleStats.avgDetail}
                        //avgCp=    {this.props.article.articleStats.avgCp}
                        //avgSg=    {this.props.article.articleStats.avgSg}
                    />
                </div>
                <div className="avg_like_rating">
                    <ArticleLikeRatingAvg  
                        avgLike={
                            this.props.article.articleStats ?
                                this.props.article.articleStats.avgLike
                            :null
                        }/>
                </div>
                <div className="all_reviews">
                    <ArticleReviews        
                        articleReviews={
                            this.props.article.articleStats ?
                                this.props.article.articleStats.articleReviews
                            :null
                        }
                        voteEligibility={
                            this.props.user.userHistory ?
                                this.props.user.userHistory
                            :null
                        }
                        articleId={
                            this.props.article.articleStats ?
                                 this.props.article.articleStats.article_id
                             :null
                        }

                    />
                    {/* <ArticleTags           article={this.props.article.articleStats.topTags}/> */}
                    
                    {/* this.props.article.articleStats.articleReviews:
                    {this.props.article.articleStats.articleReviews} */}
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        user:    state.user,
        article: state.article
    }
}


export default connect(mapStateToProps)(withRouter(ArticlePage));