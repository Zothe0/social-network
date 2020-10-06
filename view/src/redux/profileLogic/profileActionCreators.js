import * as types from './profileTypes'

export const setFileInput = (ref)=>{
    return({ type: types.SET_FILE_INPUT, ref })
}