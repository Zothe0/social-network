import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { verify } from 'jsonwebtoken'
import { logout, setMessage } from '../redux/authenticationLogic/authActionCreators'


export default function useCheckToken(){

    const dispatch = useDispatch()
    const token = useSelector(state => state.authReducer.token)
    const [JWTSecret, SetJWTSecret] = useState('b4KFHX6b3')

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