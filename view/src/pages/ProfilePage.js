import React, {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import useCheckToken from '../hooks/useCheckToken'


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
        <title>Профиль</title>
        <Header/>
    </>)
}