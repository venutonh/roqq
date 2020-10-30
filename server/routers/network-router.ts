import { Request, Response } from "express";
import * as express from "express";
import * as networkDao from "../dao/network-dao";
import {auth} from "../middleware/auth";



export const networkRouter = express.Router();





networkRouter.post("/getnetworks/", async (req:Request, resp:Response)=>{
    try {
      const networks = await networkDao.getAllNetworksWithTotalAvg(
        (<any>req).body.firstDate,
        (<any>req).body.secondDate,
        (<any>req).body.order
      );
      
      resp.status(200).json({
        networks  
      });
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })








  networkRouter.post("/networkstats/:networkId", async (req:Request, resp:Response)=>{
      
    const network_id = (<any>req).params.networkId;
  try {
    
    const network = await networkDao.getNetworkInfoPage(network_id);
    
    resp.status(200).json({
      avgTotal: network.avg.total_avg,
      avgDetail:network.avg.detail_avg,
      avgCp: network.avg.prose_avg,
      avgSg: network.avg.s_g_avg,
      avgLike: network.avg.like_avg,
      articleReviews:network.reviews,
      articleTitle:network.basic.article_title,
      article_id:network.basic.articleId,
      title: network.basic.articleTitle,
      author: network.basic.author,
      articleUrl: network.basic.articleUrl,
      articleMainUrl: network.basic.articleMainUrl,
      datePosted:network.basic.datePosted
      

    });
   
    resp.end();

  }catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})