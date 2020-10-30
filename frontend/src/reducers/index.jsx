import { combineReducers } from 'redux';
import user from './user_reducer';
import article from './article_reducer';
import author from './author_reducer';
import network from './network_reducer';
import collapse from './collapse_reducer';


const rootReducer = combineReducers({
        user,
        article,
        author,
        network,
        collapse
    });

export default rootReducer;