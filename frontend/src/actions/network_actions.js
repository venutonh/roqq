import axios from 'axios';
import {
    GET_AUTHORS_NETWORKS,
    GET_ARTICLES_BY_NETWORK,
    GET_STATS_NETWORK
    
} from './types';



export function getAuthorsAndNetworks(){
    console.log("Inside getAuthorsAndNetworks action");
    //console.log(dataToSubmit);
    //console.log("outside getArticleAvg action");
    const request = axios.post(`http://localhost:3333/author/getauthornetworks/`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_AUTHORS_NETWORKS,
        payload: request
    }

}




export function getArticlesByNetwork(dataToSubmit){
    console.log("Inside getArticlesByNetwork action");
    console.log(dataToSubmit);
    console.log("outside getArticlesByNetwork action");
    const request = axios.post(`http://localhost:3333/article/articlenetwork/${dataToSubmit}`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_ARTICLES_BY_NETWORK,
        payload: request
    }

}











export function getNetworkStats(dataToSubmit){
    console.log("Inside getNetworkStats action");
    console.log(dataToSubmit);
    
    const request = axios.post(`http://localhost:3333/network/networkstats/${dataToSubmit}`,{
        withCredentials: true
    })
                .then(response => response.data);
                
    return {
        type: GET_STATS_NETWORK,
        payload: request
    }

}