import * as types from './types'
const initialState = {
    formInputs:{
        nickName: '',
        email: '',
        password: ''
    },
    warnings:{
        nickName: false,
        email: false,
        password: false
    },
    submitButton: 'disabled',
    responseMessage: null
}

export const appReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.CHANGE_INPUT:
            return {...state, formInputs: {...state.formInputs, [action.name]: action.value}}
        case types.CLEAR_INPUTS:
            return {...state, formInputs: {...state.formInputs, nickName: '', email: '', password: ''}}
        case types.SET_ON_WARNING:
            console.log(action.name)
            return {...state, warnings: {...state.warnings, [action.name]: true}}
        case types.SET_OFF_WARNING:
            return {...state, warnings: {...state.warnings, [action.name]: false}}
        case types.SET_SUBMIT_ACTIVE:
            // TODO:
            return {...state}
        case types.SET_SUBMIT_DISABLED:
            // TODO:
            return {...state}
        case types.SET_MESSAGE:
            return {...state, responseMessage: action.message}
        case types.CLEAR_MESSAGE:
            return {...state, responseMessage: null}
        default:
            return state
    }
}