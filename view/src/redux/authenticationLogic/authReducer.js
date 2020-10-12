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
    token: null,
    nickName: null,
    avatarUrl: null
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case types.CHANGE_INPUT:
            return {...state, formInputs: {...state.formInputs, [action.name]: action.value}}

        case types.CLEAR_INPUT:
            return {...state, formInputs: {...state.formInputs, [action.name]: ''}}

        case types.CLEAR_ALL_INPUTS:
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

        case types.LOGIN_USER:
            return {...state, token: action.token, nickName: action.nickName, avatarUrl: action.avatarUrl}

        case types.LOGOUT_USER:
            return {...state, token: null, userId: null}

        case types.IS_AUTH_TRUE:
            return {...state, authorized: true}

        case types.IS_AUTH_FALSE:
            return {...state, authorized: false}
            
        case types.SET_AVATAR_URL:
            return {...state, avatarUrl: action.newAvatarUrl}

        default:
            return state
    }
}