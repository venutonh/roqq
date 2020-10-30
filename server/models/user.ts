import {ArticleToReview} from './articleToReview';

export class User{
    userId=0;
    username='';
    password='';
    email='';
    accountRoleId=0;
    userReviews=[{}];
    userVotes=[{}];
    //token='';
 
    constructor(
        userId?: number, 
        username?: string, 
        password?: string,  
        email?: string, 
        accountRoleId?: number,
        userReviews?:object[],
        userVotes?:object[],
        //token?: string,
        ){
            userId && (this.userId=userId);
            username && (this.username=username);
            password && (this.password=password);
            email && (this.email=email);
            accountRoleId && (this.accountRoleId=accountRoleId);
            userReviews && (this.userReviews=userReviews);
            userVotes && (this.userVotes=userVotes);

            //token && (this.token=token);
    }

}