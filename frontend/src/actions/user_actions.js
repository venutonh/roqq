import axios from 'axios';
import {
    //ERROR_GENERATED,
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
    
    
} from './types';

// const loginSuccess = user => ({ type: REGISTER_USER, payload : user })

// export function registerUser(dataToSubmit){
//     return (dispatch) => {
        
//            return axios.post(`http://localhost:4444/users/create`,dataToSubmit)

        

//             dispatch(loginSuccess());
//     }
// }






export function registerUser(dataToSubmit){
    //console.log("Inside the action");
    //console.log(dataToSubmit);
    //console.log("outside the action");


    return{ 
        type: REGISTER_USER,
        payload: {
                promise: axios.post(`http://localhost:3333/users/create`,dataToSubmit)
                .then(response => response.data)
            }
     
}}






// const simpleLogin = user => ({ type: REGISTER_USER, payload : user })

// export const registerUser = (dataToSubmit) => 
//     dispatch => 
//        axios.post(`http://localhost:4444/users/create`,dataToSubmit)
//         .then(response => response.data)
//         .then(user => {
//             dispatch(simpleLogin(user))
//         })
    
    
    




    // const simpleLogin = user => ({ type: REGISTER_USER, user })

    // export const registerUser = (dataToSubmit) => {
    //     return dispatch => {
    //        return axios.post(`http://localhost:4444/users/create`,dataToSubmit)
    //         .then(response => response.data)
    //         .then(user => {
    //             dispatch(simpleLogin(user))
    //         })
    //     }
    // } 









export function loginUser(dataToSubmit){
    //console.log("Inside the action");
    //console.log(dataToSubmit);
    //console.log("outside the action");
    const request = axios.post(`http://localhost:3333/users/login`,dataToSubmit,{
        withCredentials: true
        
      
    })
                .then(response => response.data);
                

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// export function loginUser(dataToSubmit){
//     return function (dispatch) {
//         const request = axios.get(`http://localhost:4444/users/login`,dataToSubmit)
//         return (dispatch)=>{
//             function onSuccess(success){
//                 dispatch({
//                     type: LOGIN_USER,
//                     payload:success
//                 })
//                 return success;
//             }
//             function onError(error) {
//                 dispatch({
//                     type:ERROR_GENERATED,
//                     error
//                 })
//                 return error;
//             }
//             request.then(success=>onSuccess, error=>onError);
//         }  
//     };
// }




export function auth(){
    //console.log("inside the AUTH action")
     const request = axios.get(`http://localhost:3333/users/auth`,{withCredentials: true})
     .then(response => response.data);
     //console.log("inside after the AUTH action")
     return {
         type: AUTH_USER,
         payload: request
     }

}



// export function logoutUser(){

//     const request = axios.get(http://localhost:3333/users/login)
//     .then(response => response.data);

//     return {
//         type: LOGOUT_USER,
//         payload: request
//     }

// }



















 //export function updateUserData(dataToSubmit){
 //    const request = axios.post(http://localhost:3333/users/update_profile,dataToSubmit)
 //                    .then(response => {
 //                        return response.data
 //                    });
    
 //    return {
 //        type: UPDATE_DATA_USER,
 //        payload: request
 //    }
 //}









// export function clearUpdateUser(){
//     return {
//         type: CLEAR_UPDATE_USER_DATA,
//         payload: ''
//     }
// }
    

