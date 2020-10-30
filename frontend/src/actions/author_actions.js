import axios from 'axios';
import {
    GET_ARTICLES_AUTHOR,
    GET_STATS_AUTHOR
    
} from './types';



export function getArticlesByAuthor(dataToSubmit){
    console.log("Inside getArticleByAuthor action");
    console.log(dataToSubmit);
    console.log("outside getArticleByAuthor action");
    const request = axios.post(`http://localhost:3333/author/articleauthor/${dataToSubmit}`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_ARTICLES_AUTHOR,
        payload: request
    }

}





export function getAuthorStats(dataToSubmit){
    console.log("Inside getAuthorStats action");
    console.log(dataToSubmit);
   
    const request = axios.post(`http://localhost:3333/author/authorstats/${dataToSubmit}`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_STATS_AUTHOR,
        payload: request
    }

}