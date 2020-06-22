import { SqlArticleId } from "../../dto/sql-articleId";
import { ArticleId } from "../../models/articleId";

export function articleIdConverter(ar:SqlArticleId){
    return new ArticleId(
        ar.article_id,
        ar.article_title,
        ar.author_name,
        ar.article_url,
        ar.article_main_url,
       // ar.article_divider_url_id
    );

}