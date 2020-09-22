import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authenticationLogic/authActionCreators'


export default function PostsPage(){

    const dispatch = useDispatch()

    const logoutApp = async()=>{
        dispatch(logout())
    }

    return(<>
        Посты
        
        <button
            type='button'
            onClick={logoutApp}
        >Выйти</button>
        <Link to='/profile/2'>Профиль</Link>
    </>)
}