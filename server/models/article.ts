export class Article {
    articleId=0;
    articleUrl='';
    commentId=0;
    supportUrlId=0;
    starRating=0;
    authorId=0;

    constructor (
        articleId?:number,
        articleUrl?:string,
        commentId?:number,
        supportUrlId?:number,
        starRating?:number,
        authorId?:number,
        ){
            articleId && (this.articleId = articleId);
            articleUrl && (this.articleUrl = articleUrl);
            commentId && (this.commentId = commentId);
            supportUrlId && (this.supportUrlId = supportUrlId);
            starRating && (this.starRating = starRating);
            authorId && (this.authorId = authorId);
        }
}