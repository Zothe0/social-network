import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { verify } from 'jsonwebtoken'
import { logout, setMessage } from '../redux/authenticationLogic/authActionCreators'
import {JWTSecret} from '../constants'


export default function useCheckToken(){

    const dispatch = useDispatch()
    const token = useSelector(state => state.authReducer.token)

    const logoutApp = useCallback(()=>{
        dispatch(logout())
        dispatch(setMessage('Время сессии закончилось'))
    }, [dispatch])

    const checkTokenExpire = useCallback(()=>{
        try {
            verify(token, JWTSecret)
            return false
        } catch (error) {
            logoutApp()
            return true
        }
    }, [token, logoutApp])

    return [checkTokenExpire, logoutApp]
}