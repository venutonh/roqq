import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    FIND_ARTICLE
} from '../actions/types';
 

export default function(state={},action){
    switch(action.type){
        case FIND_ARTICLE:
            return {...state, urlData: action.payload }
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }

        default:
            return state;
    }
}
