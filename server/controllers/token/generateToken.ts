import jwt from "jsonwebtoken";



var SEPARATOR: string;


SEPARATOR = '/';

export function generateToken(username:string, account_type_id:number){

    //const jwtExpirySeconds = 300;
    //const separate: string = SEPARATOR;
    //const secret: string = process.env.SECRET;
    const secret: string = 'theFuckDoYouWant?';

    const account:string = String(account_type_id);

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
        account_id_type: parsedDecode[1]
    };

};

//export module generateToken;