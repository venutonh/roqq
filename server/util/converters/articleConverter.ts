import { SqlArticle } from "../../dto/sql-article";
import { Article } from "../../models/article";

export function articleConverter(ar:SqlArticle){
    return new Article(
        ar.article_id,
        ar.article_url,
        ar.comment_id,
        ar.support_url_id,
        ar.star_rating,
        ar.author_id
    );

}