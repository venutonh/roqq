import { Request, Response } from "express";
import * as express from "express";
import * as userDao from "../dao/user-dao";
import { Router } from "express";
import {auth} from "../middleware/auth";

import { generateToken } from '../controllers/token/generateToken';





//const userRouter = new Router();
export const userRouter = express.Router();

/**
 * authenticated user route
 */
 userRouter.get("/auth", auth, (req: Request, resp: Response)=>{
    console.log("# INSIDE USER-ROUTER AUTH #")

    resp.status(200).json({
      isAdmin: (<any>req).body.accountRoleId === 3 ? true : false,
      isAuth: true,
      username: (<any>req).body.username,
      email: (<any>req).body.email,
      userId: (<any>req).body.userId,
      userHistory:{
        userReviews:(<any>req).body.userReviews,
        userVotes:(<any>req).body.userVotes
      }
  
    })
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




//if (user && req.session) {
      //req.session.user = user;
userRouter.post("/login", async (req:Request, resp: Response) => {

  console.log("inside user-router login")

  try {

    const user = await userDao.getUser(
      (<any>req).body.password_hash,
      (<any>req).body.email
    );
     
    //console.log('user.account_id:');
    //console.log(user.account_id);
   // console.log('user.username:');
   // console.log(user.username);

    const token: string = generateToken(user.username, user.account_id);
    
    resp.cookie('k_max', token).status(200).json({
      loginSuccess: true,
    
    });

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
userRouter.get('/accountidfind/:account_id', async (req: Request, resp: Response) => {
  const account_id = (<any>req).params.account_id;
  //console.log(`retrieving user with id ${account_id}`);
  try {
    console.log('account_id:')
    console.log(account_id)
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
 * check user voter eligibility
  */
 userRouter.post('/geteligibility',auth, async (req: Request, resp: Response) => {
  try {
    console.log("Checking to see which articles the user is able to vote or review");
    const eligible = await userDao.getEligibility(
      (<any>req).body.account_id,
      (<any>req).body.username 
    );
     
      resp.status(200).json({
        eligible
  
      });
    
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
