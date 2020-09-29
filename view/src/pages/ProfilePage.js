import React, {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import useCheckToken from '../hooks/useCheckToken'
import { logout } from '../redux/authenticationLogic/authActionCreators'


export default function ProfilePage(){
    const posts = useSelector(state => state.postsReducer)
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [checkTokenExpire, logoutApp] = useCheckToken()

    useEffect(()=>{
        checkTokenExpire()
    }, [checkTokenExpire])

    return(<>
        Профиль
        <div>Айди профиля {id}</div>
        <button
            type='button'
            onClick={logoutApp}
        >Выйти</button>
        <Link to='/posts'>Назад к постам</Link>
    </>)
}