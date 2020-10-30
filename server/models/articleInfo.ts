export class ArticleInfo {
    articleId=0;
    articleTitle='';
    articleUrl='';
    articleMainUrl='';
    author=[''];
    authorId=[0];
    datePosted='';
   

    constructor (
        articleId?:number,
        articleTitle?:string,
        articleUrl?:string,
        articleMainUrl?:string,
        author?:string[],
        authorId?:number[],
        datePosted?:string
        
        
        ){
            articleId && (this.articleId = articleId);
            articleTitle && (this.articleTitle = articleTitle);
            articleUrl && (this.articleUrl = articleUrl);
            articleMainUrl && (this.articleMainUrl = articleMainUrl);
            author && (this.author = author);
            authorId && (this.authorId = authorId);
            datePosted && (this.datePosted = datePosted);
            
            
        }
}