import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Review from '../../review';

import { IconContext } from "react-icons";
import { FaHandshake, FaRegHandshake, FaRegHandPointUp, FaHandPointUp } from 'react-icons/fa';

import Vote from '../components/vote';


class ArticleReviews extends Component {

    state = {
        reviewPosition:'-1'
    }    


    // checkForArticleReview=(reviews,articleId)=>{
        
    //     if(this.props.user.userId){
    //         if(reviews){
    //             for(i=0;i<reviews.length;i++){
    //                 if(reviews[i].articleId===articleId){
    //                     return reviews[i].reviewId
    //                 }
    //             }
    //         }else{    
    //             return false;
    //         }
    //     }else{
    //         return false;
    //     }
    // }

    // checkForReviewVotes=(votes,articleId)=>{
    //     let voteValues=[];
    //     if(this.props.user.userId){
    //         if(votes){
    //             for(i=0;i<votes.length;i++){
    //                 if(votes[i].articleId===articleId){
    //                     voteValues.push(votes[i])
    //                 }
    //             }
    //             let total = voteValues.voteValue.reduce((a, b) => a + b, 0)
    //             if(total===0) {
    //                 return false;
    //             }if(total===1) {
    //                 return voteValues.sort((a,b) => 
    //                 new Date(b.date).getTime() - 
    //                 new Date(a.date).getTime())[0].reviewId;
                    
    //             } 
    //         }else{
    //             return false;
    //         }
    //     }else{
    //         return false;
    //     }
    // }


    // checkEligibiity=(reviewedId,votedId)=>{
    //     if(this.props.user.userId){
    //         if(reviewedId || votedId){
    //             return false;
    //         }else{
    //             return true;
    //         }

    //     }else{
    //         return false;
    //     }
    // }


    compare=(a,b)=>{
        if(a===b){
            return true;
        }
        return false;
    }


    // showIcon=()=>(
    //     this.state.clicked ?  
    //     <IconContext.Provider value={{color:'blue',size:'1.4em'}}>
    //         <FaRegHandshake/> 
    //     </IconContext.Provider>
    //     : 
    //     <IconContext.Provider value={{color:'gray',size:'1.4em'}}>
    //         <FaRegHandshake/>
    //     </IconContext.Provider>
    // )


    handleVote=(event,reviewId)=>{

        this.setState({reviewPosition: reviewId})
    }

   


   loadReviews=(articleReview,eligibility,articleId,reviewedId,votedId)=>(
        
    
        articleReview ?
            articleReview.slice(0,10).map((review,i)=>(
                <div className="review">
                    <form onSubmit={(event)=>this.submitVote(event)}>
                        <Review
                            key={i}
                            reviewInfo={review}

                            articleId={articleId}

                            eligible={checkEligibiity(reviewedId,votedId)}
                            reviewCheck={compare(reviewedId,review.review_id)}
                            voteCheck={compare(votedId,review.review_id)}
                            updateTotal={this.handleVote(review.reviewId)}
                        />
                    </form>
                    <button onClick={(event)=>this.submitVote(event)}>
                        {this.showIcon(reviewCheck,voteCheck)}
                    </button>
                </div>
            ))
        :null
    )

        render(){
            return (
                <div className="review_block">
                    
                    {loadReviews(
                        props.articleReviews,
                        props.voteEligibility,
                        props.articleId,
                        checkForArticleReview(props.voteEligibility.userReviews,props.articleId),
                        checkForReviewVotes(props.voteEligibility.userVotes,props.articleId))
                        }
                </div>
            )
        }
}

    const mapStateToProps=(state)=>{
        return {
            user:    state.user
    
        }
    }

export default ArticleReviews;
