import { NextFunction, Request, Response  } from "express";
import { findByToken } from "../controllers/token/findByToken";
import { getUserByUsername } from "../dao/user-dao";



export let auth = 
    async (req: Request, resp: Response, next: NextFunction) => {
     
    console.log("INSIDE Auth-er, BEFORE FINDByToken");
    let token = (<any>req).cookies.k_max; 
    //let newToken = String(token);
    console.log(token);
    console.log("INSIDE Auth-er, BEFORE FINDByToken");

    const theToken=findByToken(token);
    //return getUserByUsername(theToken.username, theToken.account_id_type);
    
    console.log("answer: "+getUserByUsername(theToken.username, theToken.account_id_type));
   //await
 try{
   let stuff:any = await getUserByUsername(theToken.username, theToken.account_id_type);

    console.log("stuff: "+ stuff);
    console.log(stuff);
    //resp.end();
    req.body=stuff;
    console.log("req: "+ req.body);
    console.log(req.body);
    console.log("__________________(inside auth.ts)");

    if (stuff === undefined){
        resp.json({
            isAuth:false,
            error: true
        })
    } else{

        next();
    }
  } catch (err) {
        console.log("auth.ts error");
        console.log(err);
        resp.sendStatus(500);
        console.log("auth.ts error");
      }
} 


    //findByToken(token,(err:any,user:any)=>{
        //console.log("INSIDE Auth-er, AFTERRR FINDByToken");
        //if(err) throw err;
        //if(!user) return (<any>req).json({
        //    isAuth: false,
        //    error: true
        //});

        //(<any>req).token = token;
        //(<any>req).user = user;
       // next();
    //})

//module.exports {auth};


    

