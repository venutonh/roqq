export class User{
    userId=0;
    username='';
    password='';
    email='';
    userRole=0;
 
    constructor(
        userId?: number, 
        username?: string, 
        password?: string, 
     //   firstName?: string,
     //   lastName?: string, 
        email?: string, 
        userRole?: number,
        ){
            userId && (this.userId=userId);
            username && (this.username=username);
            password && (this.password=password);
            email && (this.email=email);
            userRole && (this.userRole=userRole);
 
    }

}