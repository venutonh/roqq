import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import  cookieParser  from 'cookie-parser';
//import session from 'express-session';
//import { reimbursementRouter } from './routers/reimbursement-router';
import { userRouter } from './routers/user-router';
import { articleRouter } from './routers/article-router';
import { authorRouter } from './routers/author-router';
import { networkRouter } from './routers/network-router';
import { tagsRouter } from './routers/tags-router';
import { collapseRouter } from './routers/collapse-router';
import compress from 'compression';
import cors from 'cors';
//import {auth} from "./middleware/auth";



const app=express();

const port=3333;

app.set('port', port);

//const sess= {
//    secret: 'keyboard cat',
//    cookie: {secure: false},
//    resave: false,
//    saveUninitialized: false
//}



//if (app.get('env') === 'production') {
//    app.set('trust proxy', 1);
//    sess.cookie.secure = true;
//}

//app.use(session(sess));
//createUser({username: 'gofuckyourself', password: 'whateveriwantittobe', email: 'thefuck@go.com', accountRoleId: 1});
// logging
//app.use((req, resp, next) => {
//    console.log(`request made with path: ${req.path} and type: ${req.method}`);
//    next();
//})

//app.use(cors({ origin: 'http:/localhost:3000', credentials: true}));

app.use(bodyParser.json({limit: '16mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(<any>cookieParser());
//app.use(<any>compress({}));

app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", `http://localhost:3000`);
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.header("Access-Control-Allow-Credentials", "true");
    resp.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//(app.get("env") === "production")

//app.use('/reimbursements', reimbursementRouter);

app.use('/users', userRouter);
app.use('/article', articleRouter);
app.use('/author', authorRouter);
app.use('/network', networkRouter);
app.use('/tags', tagsRouter);
app.use('/collapse', collapseRouter);

const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});


//go to serverPortConnect.ts
//module.exports = app;