import {
    GET_AUTHORS_NETWORKS,
    GET_ARTICLES_BY_NETWORK,
    

} from '../actions/types';



export default function(state={},action){
    switch(action.type){
        case GET_AUTHORS_NETWORKS:
            return {...state, allAuthorsByNetworks: action.payload }
        case GET_ARTICLES_BY_NETWORK:
            return {...state, allArticlesByNetwork: action.payload }
        

        default:
            return state;
    }
}