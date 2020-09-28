import { combineReducers } from 'redux'
import authReducer from './authenticationLogic/authReducer'
import postsReducer from './postsLogic/postsReducer'


export const rootReducer = combineReducers({
    authReducer, postsReducer
})