
import { getUserByUsernameAndId } from "../../dao/user-dao";
import { parseToken } from "../../controllers/token/generateToken"
import jwt from "jsonwebtoken";




export const findByToken = function(token:string) {
    
  console.log("inside controllers-token findToken")

    const secret:string = 'theFuckDoYouWant?';

    try{
    const decoded: string | object = jwt.verify(token, secret);

   
    if((typeof decoded) === 'string' ){
    const stringDecoded: string = String(decoded);
    const decodedToken = parseToken(stringDecoded);
    
    return decodedToken;
    }
      //const decodedToken = parseToken(parsedDecode[0]);
     // try {
        //return getUserByUsername(decodedToken.username);
        //console.log('stuff type: ' + typeof stuff);
        //return stuff;
    //  } catch (err) {
     //     console.log(err);
    //      console.log( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Error Parseing Token');
       // resp.sendStatus(500);
   // }
    
  } catch (err){
    console.log(err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Error Verifying Token');
    return err;
  }


}