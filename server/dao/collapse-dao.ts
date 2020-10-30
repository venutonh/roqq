import { pool }  from "../util/dbConnection/databasePool";

import { getAllNetworksWithTotalAvg } from '../dao/network-dao';
import { 
    getAllAuthorsAndNetworks, 
    getAllArticlesByAllAuthors,
    getAllAuthorsWithTotalAvg
 } from '../dao/author-dao';
import { getAllArticlesWithTotalAvg, getAllArticlesAndNetworks } from '../dao/article-dao';

export async function collapseSearch(
    firstDate:string,
    secondDate:string,
    order:number[],
    topics:number[]
    ):Promise<any|any>{
           
    // console.log('**************************************************************************');
    // console.log('Inside collapseSearch');
    // console.log('firstDate: '+firstDate);
    // console.log('secondDate: '+secondDate);
    // console.log('typeof order:');
    // console.log(typeof order);
    // console.log('order: '+order);
    // console.log('typeof order[0]:');
    // console.log(typeof order[0]);
    // console.log('order: '+order[0]);
    // console.log('topics: '+topics);


    let k:number=0;
    let j:number=0;
   
   
        for(k = 0; k < topics.length; k++){

            let kNumber = topics[k];

            for(j = k+1; j < topics.length; j++){
                let jNumber = topics[j];

                if(kNumber>jNumber){
                    topics[k]=jNumber;
                    topics[j]=kNumber;

                    jNumber=topics[j];
                    kNumber=topics[k];
                }    
            }     
        }
        
        
    

    // console.log('typeof topics[0]:');
    // console.log(typeof topics[0]);

    // console.log('topics[0]:');
    // console.log(topics[0]);

    // console.log('topics[1]:');
    // console.log(topics[1]);

    // console.log('topics[2]:');
    // console.log(topics[2]);




    try{
            if(topics[0]===0){
                if(topics[1]===1){
                    if(topics[2]===2){
                        console.log('going to author-dao getAllArticlesByAllAuthors:');
                        return await getAllArticlesByAllAuthors(firstDate,secondDate,order);
                    }else{
                        console.log('going to author-dao getAllAuthorsAndNetworks:');
                        return await getAllAuthorsAndNetworks(firstDate,secondDate,order);
                    }
                } else if(topics[1]===2){
                    console.log('going to article-dao getAllArticlesAndNetworks:');
                    return await getAllArticlesAndNetworks(firstDate,secondDate,order);
                }else{
                    console.log('going to network-dao getAllNetworksWithTotalAvg:');
                    return await getAllNetworksWithTotalAvg(firstDate,secondDate,order);
                }

            } else if(topics[0]===1){
                if(topics[1]===2){
                    console.log('going to author-dao getAllArticlesByAllAuthors:');
                    return await getAllArticlesByAllAuthors(firstDate,secondDate,order);
                }else{
                    console.log('going to author-dao getAllAuthorsWithTotalAvg:');
                    return await getAllAuthorsWithTotalAvg(firstDate,secondDate,order);
                }
            }  else if(topics[0]===2){
                console.log('going to article-dao  getAllArticlesWithTotalAvg:');
                return await getAllArticlesWithTotalAvg(firstDate,secondDate,order);
            }else{
                return {};
            }

        

    } catch (error) {
        console.log(error);
        //return error.message;
    }
    
}
