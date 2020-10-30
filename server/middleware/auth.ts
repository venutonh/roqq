import { NextFunction, Request, Response  } from "express";
import { findByToken } from "../controllers/token/findByToken";
import { getUserByUsernameAndId } from "../dao/user-dao";



export let auth = 
    async (req: Request, resp: Response, next: NextFunction) => {
     
    console.log("INSIDE AUTH")

    let token = (<any>req).cookies.k_max; 
    //let newToken = String(token);

    const theToken=findByToken(token);
    //return getUserByUsername(theToken.username, theToken.account_id_type);
    
    //console.log("answer: "+getUserByUsernameAndId(theToken.username, theToken.account_id));
   
 try{
   let stuff:any = await getUserByUsernameAndId(theToken.username, theToken.account_id);

    //resp.end();
    
    if (stuff === undefined){
        resp.json({
            isAuth:false,
            error: true
        })
    } else{
        req.body=stuff;


        next();
    }
  } catch (err) {
        console.log("auth.ts error");
        console.log(err);
        resp.sendStatus(500);
        
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


    

