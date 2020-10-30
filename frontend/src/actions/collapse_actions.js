import axios from 'axios';
import {
    GET_COLLAPSE_RESULTS
    
} from './types';


export function getCollapseResults(dataToSubmit){
    console.log("Inside getCollapseResults() action");
    //console.log(dataToSubmit);
    //console.log("outside getArticleAvg action");
    const request = axios.post(`http://localhost:3333/collapse/search/`,dataToSubmit,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_COLLAPSE_RESULTS,
        payload: request
    }

}