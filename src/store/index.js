import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './reducers/usersReducer';
import { loanReducer } from './reducers/loanReducer';



const rootReducer = combineReducers({
    usersReducer,
    loanReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))