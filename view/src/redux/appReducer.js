import { SET_INPUT, SET_WARNING } from "./types"

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
    }
}

export const appReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_WARNING:
            return {...state}
        case SET_INPUT:
            return {...state}
        default:
            return state
    }
}