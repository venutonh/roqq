export class Author {
    authorId=0;
    authorName='';
    articleId=0;
    authorStarAvg=0;

    constructor (
        authorId?:number,
        authorName?:string,
        articleId?:number,
        authorStarAvg?:number,
    ){
        authorId && (this.authorId = authorId);
        authorName && (this.authorName = authorName);
        articleId && (this.articleId = articleId);
        authorStarAvg && (this.authorStarAvg = authorStarAvg);
        
    }
}