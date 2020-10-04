import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useCheckToken from '../hooks/useCheckToken'


export default function Header(){

    const userNick = useSelector(state => state.authReducer.userNick)
    const linkToProfile = `/profile/${userNick}`
    const [checkTokenExpire, logoutApp] = useCheckToken()

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