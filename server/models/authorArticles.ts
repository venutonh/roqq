export class AuthorArticles {
    authorId=0;
    authorName='';
    articleMainUrlId=0;
    articleMainUrl='';
    articles=[''];
    
    constructor (
        authorId?:number,
        authorName?:string,
        articleMainUrlId?:number,
        articleMainUrl?:string,
        articles?:string[]
        
    ){
        authorId && (this.authorId = authorId);
        authorName && (this.authorName = authorName);
        articleMainUrlId && (this.articleMainUrlId = articleMainUrlId);
        articleMainUrl && (this.articleMainUrl = articleMainUrl);
        articles && (this.articles = articles);
    }
}