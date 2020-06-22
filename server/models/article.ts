export class Article {
    articleId=0;
    articleTitle='';
    authorId=0;
    articleUrl='';
    articleMainUrlId=0;
   // articleDividerUrlId=0;

    constructor (
        articleId?:number,
        articleTitle?:string,
        authorId?:number,
        articleUrl?:string,
        articleMainUrlId?:number,
       // articleDividerUrlId?:number,
        ){
            articleId && (this.articleId = articleId);
            articleTitle && (this.articleTitle = articleTitle);
            authorId && (this.authorId = authorId);
            articleUrl && (this.articleUrl = articleUrl);
            articleMainUrlId && (this.articleMainUrlId = articleMainUrlId);
           // articleDividerUrlId && (this.articleDividerUrlId = articleDividerUrlId);
            
        }
}