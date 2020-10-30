import { Request, Response } from "express";
import * as express from "express";
import * as articleDao from "../dao/article-dao";
import { Router } from "express";
import {auth} from "../middleware/auth";
import { articleConverter } from "../util/converters/articleConverter";
import { findByToken } from "../controllers/token/findByToken";
import { parseUrl, articleScanner  } from "../controllers/scanner";


export const articleRouter = express.Router();


/**
 * Find Article title and author
 */
articleRouter.post("/articlesearch", async (req:Request, resp:Response)=>{

  // console.log('(<any>req).body:')
  // console.log((<any>req).body);
  // console.log('---------------------------------------------------------')

  //       const g = (<any>req).body.url_scanner
  //       console.log('(<any>req).body.url_scanner:')
  //       console.log(g);
  //       console.log('---------------------------------------------------------')
  //       const f =(<any>req).body.account_id;
  //       console.log('(<any>req).body.account_id:')
  //       console.log(f);
  //       console.log('---------------------------------------------------------');

    let token = (<any>req).cookies.k_max; 
    //let newToken = String(token);

    const theToken=findByToken(token);

    const parsedUrl: any = parseUrl((<any>req).body.url_scanner);
    const article_main_url: string = parsedUrl.article_main_url;
    const article_url: string = parsedUrl.article_url;

    
    const eligible = await articleDao.checkEligibility(theToken.account_id,article_main_url,article_url);


    console.log('44444444444444444444444444444444444444444444444444444444444')
    console.log('##########################################################')
    console.log('eligible:')
    console.log(eligible)
    
    if(eligible){

      try {
        const article = await articleDao.findArticle(
          article_main_url,
          article_url,
          theToken.account_id,
          (<any>req).body.url_scanner
        );
      
        resp.status(200).json({
          urlSuccess: true,
          article_id:article.articleId,
          title: article.articleTitle,
          author: article.author,
          articleUrl: article.articleUrl,
          articleMainUrl: article.articleMainUrl,
          datePosted:article.datePosted
    
        });
      
        resp.end();
    
      }catch (err) {
        console.log(err);
        resp.sendStatus(500);
      }
    
  }else{

          
    const articleId = await articleDao.getArticleIdByUrl(article_url, article_main_url);
      
      

    try {
      
      const article = await articleDao.getArticleInfoPage(articleId);
      
      resp.status(200).json({
        urlIneligible: true,
        avgTotal: article.avg.total_avg,
        avgDetail:article.avg.detail_avg,
        avgCp: article.avg.prose_avg,
        avgSg: article.avg.s_g_avg,
        avgLike: article.avg.like_avg,
        articleReviews:article.reviews,
        articleTitle:article.basic.article_title,
        article_id:article.basic.articleId,
        title: article.basic.articleTitle,
        author: article.basic.author,
        articleUrl: article.basic.articleUrl,
        articleMainUrl: article.basic.articleMainUrl,
        datePosted:article.basic.datePosted
        
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }
  });

  







  articleRouter.post("/reviewarticle/", async (req:Request, resp:Response)=>{
    try {
      const article = await articleDao.saveArticleReview(
        (<any>req).body.userId,
        (<any>req).body.articleId,
        (<any>req).body.dValue,
        (<any>req).body.cpValue,
        (<any>req).body.spValue,
        (<any>req).body.likeValue,
        (<any>req).body.totalValue,
        (<any>req).body.review,
        (<any>req).body.jsonSupportLinks
        
      );
      
      resp.status(200).json({
        reviewSuccess: true  
      });
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })



  articleRouter.post("/articlestats/:articleId", async (req:Request, resp:Response)=>{
      
      const article_id = (<any>req).params.articleId;
    try {
      
      const article = await articleDao.getArticleInfoPage(article_id);
      
      resp.status(200).json({
        avgTotal: article.avg.total_avg,
        avgDetail:article.avg.detail_avg,
        avgCp: article.avg.prose_avg,
        avgSg: article.avg.s_g_avg,
        avgLike: article.avg.like_avg,
        articleReviews:article.reviews,
        articleTitle:article.basic.article_title,
        article_id:article.basic.articleId,
        title: article.basic.articleTitle,
        author: article.basic.author,
        articleUrl: article.basic.articleUrl,
        articleMainUrl: article.basic.articleMainUrl,
        datePosted:article.basic.datePosted
        
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })









  articleRouter.post("/articlenetwork/:networkId", async (req:Request, resp:Response)=>{
      
    const network_id = (<any>req).params.networkId;
    const main_url = `https://www.${network_id}.com/`

  try {
    
    const articles = await articleDao.getArticlesByNetwork(
      main_url
    );
    
    resp.status(200).json({
      articles
    });
   
    resp.end();

  }catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})








articleRouter.post("/getallarticlesandnetworks/", async (req:Request, resp:Response)=>{
      
 try {
  
  const articles = await articleDao.getAllArticlesAndNetworks(
    (<any>req).body.firstDate,
    (<any>req).body.secondDate,
    (<any>req).body.order
    );
  
  resp.status(200).json({
    articles
  });
 
  resp.end();

}catch (err) {
  console.log(err);
  resp.sendStatus(500);
}
})





// articleRouter.post("/articleauthor/:authorid", async (req:Request, resp:Response)=>{
//   const author_id = (<any>req).params.authorid;

// try {
//   const articles = await articleDao.getArticlesByAuthor(
//    author_id
//   );
  
//   resp.status(200).json({
//     articles
//   });
 
//   resp.end();
// }catch (err) {
//   console.log(err);
//   resp.sendStatus(500);
// }
// })






articleRouter.post("/getallarticlesandscores/", async (req:Request, resp:Response)=>{

      
  try {
   
   const articles = await articleDao.getAllArticlesWithTotalAvg(
     (<any>req).body.firstDate,
     (<any>req).body.secondDate,
     (<any>req).body.order
     );
   
   resp.status(200).json({
     articles
   });
  
   resp.end();
 
 }catch (err) {
   console.log(err);
   resp.sendStatus(500);
 }
 })
 
