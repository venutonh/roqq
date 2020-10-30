import { SqlArticleToReview } from "../../dto/sql-articleToReview";
import { ArticleToReview } from "../../models/articleToReview";

export function articleToReviewConverter(u: SqlArticleToReview){
    return new ArticleToReview(
        u.article_id,
        u.review_id,
               
        );

}