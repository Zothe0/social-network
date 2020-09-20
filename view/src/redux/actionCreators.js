import * as types from './types'

export const changeInput = (name, value)=>{
    return({ type: types.CHANGE_INPUT, name, value })
}
export const clearInputs = ()=>{
    return({ type: types.CLEAR_INPUTS })
}
export const sendForm = (body)=>{
    return({ type: types.SEND_FORM, body })
}
export const setMessage = (message)=>{
    return async(dispatch)=>{
        dispatch({ type: types.SET_MESSAGE, message })
        setTimeout(()=>dispatch(clearMessage()), 3000)
    }
}
export const clearMessage = ()=>{
    return({ type: types.CLEAR_MESSAGE})
}
export const setOnWarning = (name)=>{
    return async(dispatch)=>{
        dispatch({ type: types.SET_ON_WARNING, name })
        setTimeout(()=>dispatch(setOffWarning(name)), 3000)
    }
}
export const setOffWarning = (name)=>{
    return({ type: types.SET_OFF_WARNING, name })
}
export const setSubmitEnabled = ()=>{
    return({ type: types.SET_SUBMIT_ENABLED })
}
export const setSubmitDisabled = ()=>{
    return({ type: types.SET_SUBMIT_DISABLED })
}