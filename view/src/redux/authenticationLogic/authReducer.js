import * as types from './authTypes'
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
    responseMessage: null,
    authorized: false,
    token: null
}

export const registrationReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.CHANGE_INPUT:
            return {...state, formInputs: {...state.formInputs, [action.name]: action.value}}

        case types.CLEAR_INPUTS:
            return {...state, formInputs: {...state.formInputs, nickName: '', email: '', password: ''}}

        case types.CLEAR_PASSWORD_INPUT:
            return {...state, formInputs: {...state.formInputs, password: ''}}
    
        case types.SET_ON_WARNING:
            console.log(action.name)
            return {...state, warnings: {...state.warnings, [action.name]: true}}

        case types.SET_OFF_WARNING:
            return {...state, warnings: {...state.warnings, [action.name]: false}}

        case types.SET_SUBMIT_ENABLED:
            return {...state, submitButton: null}

        case types.SET_SUBMIT_DISABLED:
            return {...state, submitButton: 'disabled'}

        case types.SET_MESSAGE:
            return {...state, responseMessage: action.message}

        case types.CLEAR_MESSAGE:
            return {...state, responseMessage: null}

        case types.ADD_TOKEN:
            return {...state, token: action.token}

        case types.REMOVE_TOKEN:
            return {...state, token: null}

        case types.IS_AUTH_TRUE:
            return {...state, authorized: true}

        case types.IS_AUTH_FALSE:
            return {...state, authorized: false}

        default:
            return state
    }
}