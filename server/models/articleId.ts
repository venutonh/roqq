export class ArticleId {
    articleId=0;
    articleTitle='';
    author='';
    articleUrl='';
    articleMainUrl='';
   

    constructor (
        articleId?:number,
        articleTitle?:string,
        author?:string,
        articleUrl?:string,
        articleMainUrl?:string,
        
        ){
            articleId && (this.articleId = articleId);
            articleTitle && (this.articleTitle = articleTitle);
            author && (this.author = author);
            articleUrl && (this.articleUrl = articleUrl);
            articleMainUrl && (this.articleMainUrl = articleMainUrl);
            
        }
}