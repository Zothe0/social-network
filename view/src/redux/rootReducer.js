import { combineReducers } from 'redux'
import authReducer from './authenticationLogic/authReducer'
import postsReducer from './postsLogic/postsReducer'
import profileReducer from './profileLogic/profileReducer'
import appReducer from './appLogic/appReducer'


export const rootReducer = combineReducers({ 
    authReducer, postsReducer, profileReducer , appReducer
})