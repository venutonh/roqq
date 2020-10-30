import { SqlArticleInfo } from "../../dto/sql-articleInfo";
import { ArticleInfo } from "../../models/articleInfo";

export function articleInfoConverter(ar:SqlArticleInfo){
    return new ArticleInfo(
        ar.article_id,
        ar.article_title,
        ar.article_url,
        ar.article_main_url,
        ar.author_name,
        ar.author_id,
        ar.date_posted
        
       // ar.article_divider_url_id
    );

}