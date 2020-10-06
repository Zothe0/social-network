import * as types from './profileTypes'

const initialState = {
    fileInputRef: null
}

export default function profileReducer(state=initialState, action){
    switch(action.type){

        case types.SET_FILE_INPUT:
            return ({...state, fileInputRef: action.ref})

        default:
            return state
    }
}