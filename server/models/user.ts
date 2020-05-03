export class User{
    userId=0;
    username='';
    password='';
    email='';
    accountRoleId=0;
 
    constructor(
        userId?: number, 
        username?: string, 
        password?: string,  
        email?: string, 
        accountRoleId?: number,
        ){
            userId && (this.userId=userId);
            username && (this.username=username);
            password && (this.password=password);
            email && (this.email=email);
            accountRoleId && (this.accountRoleId=accountRoleId);
 
    }

}