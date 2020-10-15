import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ibg } from '../hooks/useIbg'
import { logout } from '../redux/authenticationLogic/authActionCreators'
import { PUBLIC_URL } from '../constants'

export default function Header() {
    const dispatch = useDispatch()
    const nickName = useSelector(state => state.authReducer.nickName)
    const avatarUrl = useSelector(state => state.authReducer.avatarUrl)
    const linkToProfile = `/profile/${nickName}`
    const addMenu = useRef(null)
    const menu = useRef(null)

    const logoutApp = () => {
        dispatch(logout())
    }

    const showMenu = () => {
        addMenu.current.classList.toggle('covert')
    }

    useEffect(() => {
        window.addEventListener('click', e => {
            if (
                e.target &&
                addMenu.current &&
                e.target !== menu.current &&
                e.target.parentNode !== menu.current
            ) {
                addMenu.current.classList.add('covert')
            }
        })
    }, [])

    useEffect(() => {
        ibg()
    }, [avatarUrl])

    return (
        <>
            <div className='header'>
                <div className='header__container container'>
                    <Link to='/' className='header__mini-logo'>
                        <img
                            src={PUBLIC_URL + '/minilogo.svg'}
                            alt='минилого'
                        />
                    </Link>
                    <form className='header__form'>
                        <input
                            className='header__search'
                            id='search'
                            type='search'
                            placeholder='Поиск постов...'
                            autoComplete='off'
                            disabled='disabled'
                        />
                        <i className='header__search-btn fas fa-search'></i>
                    </form>
                    <div className='header__menu' onClick={showMenu} ref={menu}>
                        <span>Меню</span>
                        <i className='fas fa-bars' />
                        <div
                            className='header__additional-menu additional-menu covert'
                            ref={addMenu}
                        >
                            <Link
                                to={linkToProfile}
                                className='additional-menu__link'
                            >
                                <div>Аккаунт</div>
                                <div className='additional-menu__avatar ibg'>
                                    <img src={avatarUrl} alt='аватарка' />
                                </div>
                            </Link>
                            {/* <Link
                                to='/settings'
                                className='additional-menu__link'
                            >
                                Настройки
                            </Link> */}
                            <a
                                className='additional-menu__link'
                                href='https://github.com/Zothe0/social-network'
                            >
                                Исходники
                            </a>
                            <div
                                onClick={logoutApp}
                                className='additional-menu__link'
                            >
                                Выйти
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
