import { Request, Response } from "express";
import * as express from "express";
import * as collapseDao from "../dao/collapse-dao";
import {auth} from "../middleware/auth";



export const collapseRouter = express.Router();

/**
 * Get author's average's
 */
collapseRouter.post("/search", async (req:Request, resp:Response)=>{

  console.log('Inside collapse-router search:');

  console.log('(<any>req).body.firstDate:');
  console.log((<any>req).body.firstDate);

  console.log('(<any>req).body.secondDate:');
  console.log((<any>req).body.secondDate);


  console.log('(<any>req).body.order:');
  console.log((<any>req).body.order);

  console.log('(<any>req).body.topics:');
  console.log((<any>req).body.topics);

  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log('going inside collapseDao.collapseSearch:');
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    
    try {
      const results = await collapseDao.collapseSearch(
        (<any>req).body.firstDate,
        (<any>req).body.secondDate,

        (<any>req).body.order,
        (<any>req).body.topics
      );
     
      resp.status(200).json({
        results
  
      });
     
      resp.end();
  
    }catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })
