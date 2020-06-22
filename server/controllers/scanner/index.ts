import { saveArticle, getOrSaveAuthor, getMainUrlId } from '../../dao/article-dao';
import { ArticleId } from '../../models/articleId';
import { scannerDecider } from './scannerDecider';

var SEPARATOR: string;
SEPARATOR = '/';




export function parseUrl(decode:string){
    const parsedDecode:string[] = decode.split(SEPARATOR);
    const articleUrl:string = parsedDecode.slice(3).join(SEPARATOR);
    const mainUrlDecodeLstring = String(parsedDecode[0]+SEPARATOR+parsedDecode[1]+'/'+parsedDecode[2]+'/')

    return{
        article_main_url: mainUrlDecodeLstring,
        article_url: articleUrl
    };

};






export async function articleScanner(url:string, article_main_url:string, article_url:string){
         
    const scanDecided = await scannerDecider(url, article_main_url);

    //const articleScan = await actualScanner(url);
    const author: string = scanDecided.author;
    const title: string = scanDecided.articleTitle;
    const article = await articleToDatabase(author, title, article_main_url,article_url);

    const articleId: ArticleId = {
        articleId:article.articleId,
        articleTitle:title,
        author:author,
        articleUrl:article_url,
        articleMainUrl:article_main_url

    };
    
    return articleId;

};

















async function articleToDatabase(author:string, title:string, article_main_url:string, article_url:string){

    const authorId = Number(await getOrSaveAuthor(author));
    const article_main_url_id = Number(await getMainUrlId(article_main_url));
    const savedArticle =await saveArticle(title,authorId,article_url,article_main_url_id)
   
    return savedArticle;
};



