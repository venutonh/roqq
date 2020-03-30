import { SqlAuthor } from "../../dto/sql-author";
import { Author } from "../../models/author";


export function authorConverter(au: SqlAuthor){
    return new Author(
        au.author_id,
        au.author_name,
        au.article_id,
        //au.authorStarAvg
    );
}