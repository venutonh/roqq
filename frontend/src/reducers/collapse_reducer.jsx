import {
    GET_COLLAPSE_RESULTS

} from '../actions/types';



export default function(state={},action){
    switch(action.type){
        case GET_COLLAPSE_RESULTS:
            return {...state, getCollapseResults: action.payload }
    
        
        

        default:
            return state;
    }
}