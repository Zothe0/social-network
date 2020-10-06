import { combineReducers } from 'redux'
import authReducer from './authenticationLogic/authReducer'
import postsReducer from './postsLogic/postsReducer'
import profileReducer from './profileLogic/profileReducer'


export const rootReducer = combineReducers({ authReducer, postsReducer, profileReducer })