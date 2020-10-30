import { SqlArticle } from "../../dto/sql-article";
import { Article } from "../../models/article";

export function articleConverter(ar:SqlArticle){
    return new Article(
        ar.article_id,
        ar.article_title,
        ar.author_id,
        ar.article_url,
        ar.article_main_url_id,
        ar.date_posted
       
    );

}