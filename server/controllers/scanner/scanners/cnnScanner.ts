import { ArticleInfo } from '../../../models/articleInfo';
import axios from 'axios';
import cheerio from 'cheerio';


export async function cnnScanner(url:string):Promise<ArticleInfo|any>{

        console.log('inside actual scanner');
      try{
        const scan = await axios.get(url)
        .then( async response => { 
            const siteScript:string = await response.data;
            var $ = cheerio.load(siteScript);
            
    /**
     * Check to see if title and author are in database under different url?
     * 
     * Not right now
     */

          var authorR:string = String($('meta[name="author"]').attr('content'));
          var titleR:string = String($('meta[property="og:title"]').attr('content'));


          var cleaningAuthor =authorR.split(',');
          let i=0;
          while(i < cleaningAuthor.length){
            if(cleaningAuthor[i].includes(" and ")){
              var splitArray = cleaningAuthor[i].split(" and ");
              cleaningAuthor.splice(i,1, splitArray[0], splitArray[1]);
 
            } else if (cleaningAuthor[i].includes(' CNN')){
              cleaningAuthor.splice(i,1);
              i++;

            } else if (cleaningAuthor[i].charAt(0)===' '){
              cleaningAuthor[i] = cleaningAuthor[i].replace(' ','');
              i++;
    
            } else {
                i++;
            }
          }

          

        
           return {
            author: cleaningAuthor,
            articleTitle: titleR
           }
        });
        return scan;
        } catch (error) {
            console.log(error);
        }
};
         



