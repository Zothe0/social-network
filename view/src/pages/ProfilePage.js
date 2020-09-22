import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { logout } from '../redux/authenticationLogic/authActionCreators'


export default function ProfilePage(){

    const dispatch = useDispatch()
    const {id} = useParams()

    const logoutApp = async()=>{
        dispatch(logout())
    }

    return(<>
        Профиль
        <div>Айди профиля {id}</div>
        <button
            type='button'
            onClick={logoutApp}
        >Выйти</button>
    </>)
}