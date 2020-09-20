import { useCallback } from 'react'
import * as types from './types'

export const changeInput = (name, value)=>{
    return({ type: types.CHANGE_INPUT, name, value })
}
export const clearInputs = ()=>{
    return({ type: types.CLEAR_INPUTS })
}
export const sendForm = (body)=>{
    return({ type: types.SEND_FORM, body })
    // return async(dispatch)=>{
    //     try {
    //         const method = 'POST'
    //         body = JSON.stringify(body)
    //         const headers={}
    //         headers['Content-Type']='application/json'
    //         const response = await fetch('/api/auth/registration', {method, body, headers})

    //         const data = await response.json()
    //         if(data.ok){
    //             dispatch(clearInputs())
    //             dispatch(setMessage(data.message))
    //         }else{
    //             if(data.fault){
    //                 data.fault.forEach(item=>{
    //                     if(item.param ==='nickName'){
    //                         dispatch(setOnWarning('nickName'))
    //                     }else if(item.param ==='email'){
    //                         dispatch(setOnWarning('email'))
    //                     }else if(item.param ==='password'){
    //                         dispatch(setOnWarning('password'))
    //                     }
    //                 })
    //             }else{
    //                 dispatch(setMessage(data.message))
    //             }
    //         }
    //     } catch (error) {
            
    //     }
    // }
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