export class ArticleToReview {
    article_id=0;
    review_id=0;
   
    constructor (
        article_id:number,
        review_id:number

        ){
            article_id && (this.article_id = article_id);
            review_id && (this.review_id = review_id);
                   
        }
}