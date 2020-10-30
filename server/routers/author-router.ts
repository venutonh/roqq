import { Request, Response } from "express";
import * as express from "express";
import * as authorDao from "../dao/author-dao";
import {auth} from "../middleware/auth";



export const authorRouter = express.Router();

/**
 * Get author's average's
 */
authorRouter.post("/getauthoravg", async (req:Request, resp:Response)=>{
    
    try {
      const author = await authorDao.getAuthorAvg(
        (<any>req).body.author_id
      );
     
      resp.status(200).json({
        authorId:author.authorId,
        totalAvg: author.totalAvg,
        detailAvg: author.detailAvg,
        proseAvg: author.proseAvg,
        sgAvg: author.sgAvg,
        likeAvg: author.likeAvg
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })



  /**
 * Get all author's grouped by networks
 */
authorRouter.post("/getauthornetworks", async (req:Request, resp:Response)=>{
    
    try {
      const networkAuthors = await authorDao.getAllAuthorsAndNetworks(
        (<any>req).body.firstDate,
        (<any>req).body.secondDate,
      (<any>req).body.order);
     
      resp.status(200).json({
        networkAuthors
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })


//     /**
//  * Get all articles by all authors
//  */
authorRouter.post("/getarticlesbyallauthors", async (req:Request, resp:Response)=>{
    
    try {
      const author = await authorDao.getAllArticlesByAllAuthors(
        (<any>req).body.firstDate,
        (<any>req).body.secondDate,
      (<any>req).body.order);
     
      resp.status(200).json({
        author
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })



 /**
  * Get all articles by all author
 */
authorRouter.post("/getarticlesbyauthor/:authorId", async (req:Request, resp:Response)=>{
    const author_id = (<any>req).params.authorId;
    try {
      const authorArticles = await authorDao.getArticlesByAuthor(
        author_id
      );
     
      resp.status(200).json({
        authorArticles
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })





  authorRouter.post("/getallauthorsandscore/", async (req:Request, resp:Response)=>{
    
    try {
      const authors = await authorDao.getAllAuthorsWithTotalAvg(
        (<any>req).body.firstDate,
        (<any>req).body.secondDate,
      (<any>req).body.order);
     
      resp.status(200).json({
        authors
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })

  



  authorRouter.post("/authorstats/:authorId", async (req:Request, resp:Response)=>{
      
    const author_id = (<any>req).params.authorId;
  try {
    
    const author = await authorDao.getAuthorInfoPage(author_id);
    
    resp.status(200).json({
      avgTotal: author.avg.total_avg,
      avgDetail:author.avg.detail_avg,
      avgCp: author.avg.prose_avg,
      avgSg: author.avg.s_g_avg,
      avgLike: author.avg.like_avg,
      articleReviews:author.reviews,
      articleTitle:author.basic.article_title,
      article_id:author.basic.articleId,
      title: author.basic.articleTitle,
      author: author.basic.author,
      articleUrl: author.basic.articleUrl,
      articleMainUrl: author.basic.articleMainUrl,
      datePosted:author.basic.datePosted
      

    });
   
    resp.end();

  }catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})