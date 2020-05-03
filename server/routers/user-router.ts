import { Request, Response } from "express";
import * as express from "express";
import * as userDao from "../dao/user-dao";
import { Router } from "express";


//const userRouter = new Router();
export const userRouter = express.Router();

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


userRouter.get("/login", async (req:Request, resp: Response) => {
  try {
    console.log("Attempting to login user");
    const user = await userDao.getUser(
      req.body.username,
      req.body.password_hash
    );
    //if (user && req.session) {
      //req.session.user = user;
    console.log("Got User");
    resp.json(user);
    //} else {
     // resp.sendStatus(401);
    //}
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});





/**
 * Find user by id
 */
userRouter.get("/accountidfind/:account_id", async (req: Request, resp: Response) => {
  const account_id = +req.params.account_id;
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
userRouter.post('/create', async (req: Request, resp: Response) => {
  try {
    console.log("Creating a new user");
    const id = await userDao.createUser(
      req.body.username, 
      req.body.password_hash, 
      req.body.email, 
      req.body.accountTypeId
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
userRouter.get('/idbyusername', async (req: Request, resp: Response) =>{
  try {
    console.log("Retrieving account_id from username");
    const id = await userDao.getUserIdByUsername(
      req.body.username
    );
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
