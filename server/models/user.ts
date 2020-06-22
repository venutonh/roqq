export class User{
    userId=0;
    username='';
    password='';
    email='';
    accountRoleId=0;
    //token='';
 
    constructor(
        userId?: number, 
        username?: string, 
        password?: string,  
        email?: string, 
        accountRoleId?: number //,
        //token?: string,
        ){
            userId && (this.userId=userId);
            username && (this.username=username);
            password && (this.password=password);
            email && (this.email=email);
            accountRoleId && (this.accountRoleId=accountRoleId);
            //token && (this.token=token);
    }

}