import { combineReducers } from 'redux'
import { registrationReducer } from './authenticationLogic/authReducer'


export const rootReducer = combineReducers({
    registrationReducer 
})