import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const initialState = undefined;

const middleware = [thunk, promiseMiddleware];

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware)
)

const store = createStore(
    rootReducer, 
    initialState, 
    composedEnhancers
    
);


export default store;