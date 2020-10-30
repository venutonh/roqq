import {
    FIND_ARTICLE,
    REVIEW_ARTICLE,
    GET_STATS_ARTICLE,

} from '../actions/types';


export default function(state={},action){
    switch(action.type){
        case FIND_ARTICLE:
            return {...state, urlData: action.payload }
        case REVIEW_ARTICLE:
            return {...state, reviewSuccess: action.payload }
        case GET_STATS_ARTICLE:
            return {...state, articleStats: action.payload }



        default:
            return state;
    }
}