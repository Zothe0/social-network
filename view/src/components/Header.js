import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authenticationLogic/authActionCreators'


export default function Header(){

    const dispatch = useDispatch()
    const nickName = useSelector(state => state.authReducer.nickName)
    const linkToProfile = `/profile/${nickName}`

    const logoutApp = ()=>{
        dispatch(logout())
    }

    return(<>
        <div className="header">
                <div className="header__container container">
                    <div className="header__logo">LOGO</div>
                    <div className="header__menu">
                        <div className="header__link">
                            <Link to={linkToProfile}>Профиль</Link>
                        </div>
                        <div className="header__link">
                            <Link to='/posts'>Посты</Link>
                        </div>
                        <button
                            type='button'
                            className='header__btn'
                            onClick={logoutApp}
                        >Выйти</button>
                    </div>
                </div>
            </div>
    </>)
}