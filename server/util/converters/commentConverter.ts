import { SqlComment } from "../../dto/sql-comment";
import { Comment } from "../../models/comment";

export function commentConverter(c: SqlComment){
    return new Comment(
        c.comment_id,
        c.comment,
        c.user_id,
        c.rate_id
    );
}