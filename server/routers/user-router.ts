import { Request, Response } from "express";
import * as express from "express";
import * as userDao from "../dao/user-dao";
import * as articleDao from "../dao/article-dao";
import { Router } from "express";
import {auth} from "../middleware/auth";

import { generateToken } from '../controllers/token/generateToken';


//server\controllers\token\generateToken.js
//server\routers\user-router.ts


//const userRouter = new Router();
export const userRouter = express.Router();

/**
 * authenticated user route
 */
 userRouter.get("/auth", auth, (req: Request, resp: Response)=>{
    resp.status(200).json({
      isAdmin: (<any>req).body.accountRoleId === 3 ? true : false,
      isAuth: true,
      username: (<any>req).body.username,
      email: (<any>req).body.email
      //,
      //account_role: (<any>req).body.account_role_id
    })
    console.log("username: "+(<any>req).body.username)
    console.log("email: "+(<any>req).body.email)
    //console.log("account_role: "+(<any>req).body.accountRoleId)
 })


/**
 * Find Article title and author
 */
userRouter.post("/articlesearch", async (req:Request, resp:Response)=>{
  console.log("starting article search");
  console.log((<any>req).body.url_scanner);
  try {
    const article = await articleDao.findArticle(
      (<any>req).body.url_scanner
    );
    console.log("ArticleSearch article result: ");
    console.log(article);
    resp.status(200).json({
      urlSuccess: true,
      title: article.articleTitle,
      author: article.author,
      articleUrl: article.articleUrl,
      articleMainUrl: article.articleMainUrl

    });


    
   
    resp.end();

  }catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})




/**
 * Find all users
 */
userRouter.get("/all", async (req: Request, resp: Response) => {
  try {
    console.log("retrieving all users");
    const users = await userDao.getAllUsers();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});





userRouter.post("/login", async (req:Request, resp: Response) => {
  try {
    //console.log("Attempting to login user");
    //console.log(req.body.email);
    //console.log(req.body.password_hash);
    console.log("inside route");

    const user = await userDao.getUser(
      (<any>req).body.password_hash,
      (<any>req).body.email
      
    );
    //console.log("check variables:")
    //console.log(req.body.email);
    //console.log(req.body.password_hash);
    //if (user && req.session) {
      //req.session.user = user;
    //console.log("Got User");
    //console.log(user);
    console.log("after DAO but before cookie");

    const token: string = generateToken(user.username, user.account_type_id);
    console.log(token);
    console.log("token made, will send");


    console.log(user.account_type_id);
    console.log(user.username);
    //resp.cookie('k_max', token);

    //console.log("cookie set");

      

    //resp.status(201);
    resp.cookie('k_max', token).status(200).json({
      loginSuccess: true,
      username: user.username});

    console.log("cookie sent");
    //resp.json(user);
    //} else {
     // resp.sendStatus(401);
    //}
    //resp.status(201);
    resp.end();
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});





/**
 * Find user by id
 */
userRouter.get("/accountidfind/:account_id", async (req: Request, resp: Response) => {
  const account_id = (<any>+req).params.account_id;
  console.log(`retrieving user with id ${account_id}`);
  try {
    const user = await userDao.getUserById(account_id);
    if (user !== undefined) {
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});


/**
 * Add a new user
  */
userRouter.post('/create',auth, async (req: Request, resp: Response) => {
  try {
    console.log("Creating a new user");
    const id = await userDao.createUser(
      (<any>req).body.username, 
      (<any>req).body.password_hash, 
      (<any>req).body.email, 
      (<any>req).body.accountTypeId
    );
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
 
/**
* Get user id by username
*/
// userRouter.get('/idbyusername', async (req: Request, resp: Response) =>{
//   try {
//     console.log("Retrieving account_id from username");
//     const id = await userDao.getUserIdByUsername(
//       req.body.username
//     );
//     resp.status(201);
//     resp.json(id);
//   } catch (err) {
//     console.log(err);
//     resp.sendStatus(500);
//   }
// })
