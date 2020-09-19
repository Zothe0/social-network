import { SET_INPUT } from "./types"

export const setInput = (name, value)=>{
    dispatch({
        type: SET_INPUT,
        name,
        value
    })
}