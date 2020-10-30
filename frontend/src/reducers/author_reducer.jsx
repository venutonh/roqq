import {
    GET_ARTICLES_AUTHOR,

} from '../actions/types';



export default function(state={},action){
    switch(action.type){
        case GET_ARTICLES_AUTHOR:
            return {...state, allArticlesByAuthor: action.payload }
    
        
        

        default:
            return state;
    }
}