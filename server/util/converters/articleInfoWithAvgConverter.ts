import { SqlArticleInfoWithAvg } from "../../dto/sql-articleInfoWithAvg";
import { ArticleInfoWithAvg } from "../../models/articleInfoWithAvg";

export function articleInfoWithAvgConverter(ar:SqlArticleInfoWithAvg){
    return new ArticleInfoWithAvg(
        ar.article_id,
        ar.article_title,
        ar.article_url,
        ar.article_main_url,
        ar.avg_total,
        ar.author_name,
        ar.author_id
        
       // ar.article_divider_url_id
    );

}