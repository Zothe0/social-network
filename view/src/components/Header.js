import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ibg } from '../hooks/useIbg'
import { logout } from '../redux/authenticationLogic/authActionCreators'
import { PUBLIC_URL } from '../constants'


export default function Header(){

    const dispatch = useDispatch()
    const nickName = useSelector(state => state.authReducer.nickName)
    const avatarUrl = useSelector(state => state.authReducer.avatarUrl)
    const linkToProfile = `/profile/${nickName}`
    const addMenu = useRef(null)
    const menu = useRef(null)


    const logoutApp = ()=>{
        dispatch(logout())
    }

    const showMenu = ()=>{
        addMenu.current.classList.toggle('covert')
    }
    window.onclick = (e)=>{
        // console.log(e.target.parentNode)
        if(e.target && addMenu.current && e.target !== menu.current && e.target.parentNode !== menu.current){
            addMenu.current.classList.add('covert')
        }
    }

    useEffect(()=>{
        ibg()
    }, [avatarUrl])

    return(<>
        <div className="header">
            <div className="header__container container">
                <Link to='/' className="header__mini-logo">
                    <img src={PUBLIC_URL+'/minilogo.svg'} alt="минилого" />
                </Link>
                <form className="header__form">
                    <label className="header__label" htmlFor="search">Поиск постов</label>
                    <input className="header__search" type="search" placeholder="Текст поста..." />
                    <img className="header__search-btn" src={PUBLIC_URL+'/search-ico.svg'} alt='иконка поиска' />
                </form>
                <div
                    className="header__menu"
                    onClick={showMenu}
                    ref={menu}
                >
                    <span>Меню</span> 
                    <i className="fas fa-bars"/>
                    <div className='header__additional-menu additional-menu covert' ref={addMenu}>
                        <Link to={linkToProfile} className="additional-menu__link">
                            <span>Аккаунт</span>
                            <div className='additional-menu__avatar ibg'>
                                <img src={avatarUrl} alt='аватарка'/>
                            </div>
                        </Link>
                        <Link to='/settings' className="additional-menu__link">
                            Настройки
                        </Link>
                        <div onClick={logoutApp} className="additional-menu__link">
                            Выйти
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}