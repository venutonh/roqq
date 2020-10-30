export class NetworkAuthors {
    articleMainUrlId=0;
    articleMainUrl='';
    author=[''];
    
    constructor (
        articleMainUrlId?:number,
        articleMainUrl?:string,
        author?:string[],
    ){
            articleMainUrlId && (this.articleMainUrlId = articleMainUrlId);
            articleMainUrl && (this.articleMainUrl = articleMainUrl);
            author && (this.author=author);
            
    }
}