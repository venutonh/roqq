import { saveArticle, getMainUrlId } from '../../dao/article-dao';
import { getOrSaveAuthor } from '../../dao/author-dao';
import { ArticleInfo } from '../../models/articleInfo';
import { scannerDecider } from './scannerDecider';

var SEPARATOR: string;
SEPARATOR = '/';




export function parseUrl(decode:string){

    console.log("Inside scanner index:");
    console.log("decode:");
    console.log(decode);

    const parsedDecode:string[] = decode.split(SEPARATOR);
    const articleUrl:string = parsedDecode.slice(3).join(SEPARATOR);
    const mainUrlDecodeLstring = String(parsedDecode[0]+SEPARATOR+parsedDecode[1]+'/'+parsedDecode[2]+'/')

    // console.log("mainUrlDecodeLstring");
    // console.log(mainUrlDecodeLstring);
    // console.log("articleUrl");
    // console.log(articleUrl);
            

    return{
        article_main_url: mainUrlDecodeLstring,
        article_url: articleUrl
    };

};






export async function articleScanner(url:string, article_main_url:string, article_url:string){

    console.log("inside article Scanner in scanner index:");
    console.log("url:")
    console.log(url);

    console.log("article_main_url:");
    console.log(article_main_url);

    console.log("article_url");
            console.log(article_url);
         
    const scanDecided = await scannerDecider(url, article_main_url);

    console.log("scanDecided:");
    console.log(scanDecided);

    //const articleScan = await actualScanner(url);
    const author: string[] = scanDecided.author;
    const title: string = scanDecided.articleTitle;
    const datePosted: string = scanDecided.datePosted;
    const article = await articleToDatabase(author, title, datePosted, article_main_url,article_url);

    console.log("article:");
    console.log(article);

    //note: Now sending info to frontend

    const articleInfo: ArticleInfo = {
        articleId:article.articleId,
        articleTitle:title,
        author:author,
        authorId:article.authorId,
        articleUrl:article_url,
        articleMainUrl:article_main_url,
        datePosted:datePosted

    };
    
    return articleInfo;

};







async function articleToDatabase(author:string[], title:string, datePosted:string, article_main_url:string, article_url:string){

    console.log("inside articleToDatabase in scanner index:");
    console.log("author:");
    console.log(author);
            console.log("title:");
            console.log(title);
            console.log("datePosted:");
            console.log(datePosted);
            console.log("article_main_url:");
            console.log(article_main_url);
            console.log("article_url:")
            console.log(article_url);

    const authorId = await getOrSaveAuthor(author);
    //const jsonAuthorId=String('['+ authorId +']')
    const article_main_url_id = Number(await getMainUrlId(article_main_url));
    const savedArticle =await saveArticle(title,authorId, datePosted, article_url,article_main_url_id)

    console.log("authorId:");
    console.log(authorId);
    console.log("article_main_url_id:");
            console.log(article_main_url_id);
            console.log("savedArticle:");
            console.log(savedArticle);
           
   
    return savedArticle;
};



