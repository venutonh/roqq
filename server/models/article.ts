export class Article {
    articleId=0;
    articleTitle='';
    authorId=[0];
    articleUrl='';
    articleMainUrlId=0;
    datePosted='';
   // articleDividerUrlId=0;

    constructor (
        articleId?:number,
        articleTitle?:string,
        authorId?:number[],
        articleUrl?:string,
        articleMainUrlId?:number,
        datePosted?:string
       // articleDividerUrlId?:number,
        ){
            articleId && (this.articleId = articleId);
            articleTitle && (this.articleTitle = articleTitle);
            authorId && (this.authorId = authorId);
            articleUrl && (this.articleUrl = articleUrl);
            articleMainUrlId && (this.articleMainUrlId = articleMainUrlId);
            datePosted && (this.datePosted = datePosted);
           // articleDividerUrlId && (this.articleDividerUrlId = articleDividerUrlId);
            
        }
}