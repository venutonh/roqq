import { ArticleId } from '../../../models/articleId';
import axios from 'axios';
import cheerio from 'cheerio';


export async function cnnScanner(url:string):Promise<ArticleId|any>{

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
           var authorR:string = String( $('meta[name="author"]').attr('content'));
           var titleR:string = String($('meta[property="og:title"]').attr('content'));
        
           return {
            author: authorR,
            articleTitle: titleR
           }
        });
        return scan;
        } catch (error) {
            console.log(error);
        }
};
         



