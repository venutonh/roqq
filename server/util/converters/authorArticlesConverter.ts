import { SqlAuthorArticles } from "../../dto/sql-authorArticles";
import { AuthorArticles } from "../../models/authorArticles";


export function authorArticlesConverter(au: SqlAuthorArticles){
    return new AuthorArticles(
        au.author_id,
        au.author_name,
        au.article_main_url_id,
        au.article_main_url,
        au.articles
        
        //au.authorStarAvg
    );
}