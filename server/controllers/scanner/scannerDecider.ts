import { getMainUrlId } from '../../dao/article-dao';
import { cnnScanner } from './scanners/cnnScanner';
import { foxScanner } from './scanners/foxScanner';
import { huffScanner } from './scanners/huffScanner';



export async function scannerDecider(url:string, article_main_url:string){

    const network = Number(await getMainUrlId(article_main_url));

    if(network === 1){
       return await cnnScanner(url);

    }else if(network === 2){
        return await foxScanner(url);
    
    }else if(network === 3){
        //return await huffScanner(url);
    }
        

    else {
         console.log("NNNOOOOPPPEEEE")
        return {
            error: true,
            message: "Our apologies, but we do not accept articles from this site at the moment"
        }
     }

}