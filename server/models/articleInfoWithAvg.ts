export class ArticleInfoWithAvg {
    articleId=0;
    articleTitle='';
    articleUrl='';
    articleMainUrl='';
    avgTotal=0;
    author=[''];
    authorId=[0];
    
   

    constructor (
        articleId?:number,
        articleTitle?:string,
        articleUrl?:string,
        articleMainUrl?:string,
        avgTotal?:number,
        author?:string[],
        authorId?:number[]
        
        
        ){
            articleId && (this.articleId = articleId);
            articleTitle && (this.articleTitle = articleTitle);
            articleUrl && (this.articleUrl = articleUrl);
            articleMainUrl && (this.articleMainUrl = articleMainUrl);
            avgTotal && (this.avgTotal = avgTotal);
            author && (this.author = author);
            authorId && (this.authorId = authorId);
            
            
        }
}