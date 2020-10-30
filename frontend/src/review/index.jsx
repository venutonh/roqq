import React, { Component } from 'react'

import ArticleTotalRatingAvg from '../components/article/articleTotalRatingAvg';

import Vote from '../components/vote';

import './review.css';


class Review extends Component {

    

    render() {
        const {reviewInfo, eligibility, articleId} = this.props;

        return (
            <div className="review_single_review">
                <div className="review_username">
                    {reviewInfo.username}
                </div>
                <div className="review_timestamp">
                    {reviewInfo.timestamped}
                </div>
                <div className="review_review_value">
                    {reviewInfo.review_value}
                </div>
                <div className="review_total_avg">
                    <ArticleTotalRatingAvg
                        avgTotal= {reviewInfo.total}
                    />
                </div>
                <div className="review_detail_rating">
                    Detail: {reviewInfo.detail}
                </div>
                <div className="review_prose_rating">
                    Prose: {reviewInfo.prose}
                </div>
                <div className="review_sg_rating">
                   Spell/Gram: {reviewInfo.s_g}
                </div>
                <div className="review_like_it_rating">
                   Liked: {reviewInfo.like_it}
                </div>
                <div className="review_total_rating">
                    Total: {reviewInfo.vote_total}
                </div>
                <div className="review_support_links">
                    {reviewInfo.link_url}
                </div>
                <div>
                    <Vote
                        eligible={eligibility}
                        articleId={articleId}
                        reviewId={reviewInfo.review_id}
                        reviewVoteTotal={reviewInfo.vote_total}
                    />
                </div>
                
            </div>
        )
    }
}

export default Review;