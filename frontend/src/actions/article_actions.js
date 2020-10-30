import axios from 'axios';
import {
    FIND_ARTICLE,
    REVIEW_ARTICLE,
    GET_STATS_ARTICLE,
    
} from './types';





export function findArticle(dataToSubmit){
    // console.log("Inside findArticle action");
    // console.log(dataToSubmit);
    // console.log("outside findArticle action");
    const request = axios.post(`http://localhost:3333/article/articlesearch`,dataToSubmit,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: FIND_ARTICLE,
        payload: request
    }
}


export function reviewArticle(dataToSubmit){
    //console.log("Inside reviewArticle action");
    //console.log(dataToSubmit);
    //console.log("outside reviewArticle action");
    const request = axios.post(`http://localhost:3333/article/reviewarticle`,dataToSubmit,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: REVIEW_ARTICLE,
        payload: request
    }
}



export function getArticleStats(dataToSubmit){
    console.log("Inside getArticleAvg action");
    console.log(dataToSubmit);
    console.log("outside getArticleAvg action");
    const request = axios.post(`http://localhost:3333/article/articlestats/${dataToSubmit}`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_STATS_ARTICLE,
        payload: request
    }

}






