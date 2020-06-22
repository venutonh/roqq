
import { getUserByUsername } from "../../dao/user-dao";
import { parseToken } from "../../controllers/token/generateToken"
import jwt from "jsonwebtoken";








export const findByToken = function(token:string) {
    

    const secret:string = 'theFuckDoYouWant?';

    console.log('inside findByToken');

    try{
    const decoded: string | object = jwt.verify(token, secret);

    
    if((typeof decoded) === 'string' ){
    console.log('!!!!$DECODED$!!!!!: ');
    const stringDecoded: string = String(decoded);
    console.log('decoded: ' + decoded);
    console.log('stringDecoded: ' + stringDecoded);

    const decodedToken = parseToken(stringDecoded);
    console.log('decodedToken: ' + decodedToken);
    console.log('decodedToken.username: ' + decodedToken.username);
    console.log('decodedTokenaccount_id_type: ' + decodedToken.account_id_type);

    return decodedToken;

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
    }
  } catch (err){
    console.log(err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Error Verifying Token');
    return err;
  }


}