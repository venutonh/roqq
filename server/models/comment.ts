export class Comment {
    commentId=0;
    comment='';
    userId=0;
    articleId=0;
    rateId=0;

    constructor (
        commentId?:number,
        comment?:string,
        userId?:number,
        articleId?:number,
        rateId?:number,

    ){
        commentId && (this.commentId = commentId);
        comment && (this.comment = comment);
        userId && (this.userId = userId);
        articleId && (this.articleId = articleId);
        rateId && (this.rateId = rateId);
    }
}