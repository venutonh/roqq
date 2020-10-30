import jwt from "jsonwebtoken";



var SEPARATOR: string;


SEPARATOR = '/';

export function generateToken(username:string, account_id:number){

    console.log("inside controllers-token generateToken")

    //const jwtExpirySeconds = 300;

    //const secret: string = process.env.SECRET;
    const secret: string = 'theFuckDoYouWant?';

    const account:string = String(account_id);
    const identification: string = username +SEPARATOR+ account;


    const token: string = jwt.sign(identification,secret
        //,{
        //algorithm: "HS256",
        //expiresIn: jwtExpirySeconds,
    //}
    );

    return token;

};




export function parseToken(decode:string){
    const parsedDecode = decode.split(SEPARATOR);

    return{
        username: parsedDecode[0],
        account_id: parsedDecode[1]
    };

};

