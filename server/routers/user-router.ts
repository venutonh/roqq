import { Request, Response } from "express";
import * as express from "express";
import * as userDao from "../dao/user-dao";
//import { Router } from "express";


//const userRouter = new Router();
export const userRouter = express.Router();

/**
 * Find all users
 */
userRouter.get("/", async (req: Request, resp: Response) => {
  try {
    console.log("retrieving all users");
    const users = await userDao.getAllUsers();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Find user by id
 */
userRouter.get("/:id", async (req, resp) => {
  const id = +req.params.id;
  console.log(`retreiving user with id ${id}`);
  try {
    const user = await userDao.getNameById(id);
    if (user !== undefined) {
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

//module.exports = userRouter;