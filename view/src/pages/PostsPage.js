import React, { useEffect, useCallback, useRef } from 'react'
import { verify } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, setMessage } from '../redux/authenticationLogic/authActionCreators'
import { changePostField, clearPostField } from '../redux/postsLogic/postsActionCreators'
import * as types from '../redux/postsLogic/postsTypes'
import { JWTSecret } from '../constants'
import PostList from '../components/PostList'


export default function PostsPage(){

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postsReducer)
    const linkToProfile = `/profile/${auth.userNick}`
    const bottomBreackPoint = useRef(null)
    
    
    const checkTokenExpire = ()=>{
        try {
            verify(auth.token, JWTSecret)
            return false
        } catch (error) {
            return true
        }
    }

    window.onmousewheel = (action)=>{
        console.log(action.deltaY)
        if(bottomBreackPoint && (window.pageYOffset >= (bottomBreackPoint.current.offsetTop-1400)) && (action.deltaY>0)){
                uploadPosts()
            }
    }

    const logoutApp = async()=>{
        dispatch(logout())
    }

    const inputHandler = async(e)=>{
        dispatch(changePostField(e.target.value))
    }

    const publish = (e)=>{
        e.preventDefault()
        if(checkTokenExpire()){
            logoutApp()
            dispatch(setMessage('Время сессии закончилось'))
        }else{
            dispatch({ type: types.PUBLISH_POST })
            dispatch(clearPostField())
        }
    }

    const uploadPosts = useCallback(()=>{
        dispatch({ type: types.UPLOAD_POSTS })
    }, [dispatch])
    // Проверка действительности токена при каждом ререндере страницы
    // А также загрузка первой партии постов
    useEffect(()=>{
        if(checkTokenExpire()){
            logoutApp()
            dispatch(setMessage('Время сессии закончилось'))
        }else{
            uploadPosts()
        }
    }, [])

    useEffect(()=>{
        console.log(bottomBreackPoint.current.offsetTop)
    }, [posts.uploadedPosts])

    return(<>
        <div className="wrapper">
            <div className="header">
                <div className="header__container container">
                    <div className="header__logo">LOGO</div>
                    <div className="header__form">
                        <label className="header__label" htmlFor="search">Поиск по постам:</label>
                        <input
                            className="header__search"
                            type="search"
                            name="search"
                            id="search"
                            autoComplete="off"
                            tabIndex='1'
                        />
                        <button className="header__btn" type="submit">Поиск</button>
                    </div>
                    <div className="header__menu">
                        <div className="header__link">
                            <Link to={linkToProfile}>Профиль</Link>
                        </div>
                        <button
                            type='button'
                            className='header__btn'
                            onClick={logoutApp}
                        >Выйти</button>
                    </div>
                </div>
            </div>
            <div className="content">
                <form
                    className='content__form'
                    onSubmit={publish}
                >
                    <label
                        className='content__label'
                        htmlFor='textarea'
                    >Создать новый пост:</label>
                    <textarea
                        className='content__textarea'
                        id='textarea'
                        name='textarea'
                        maxLength='120'
                        tabIndex='2'
                        rows='3'
                        onChange={inputHandler}
                        value={posts.postField}
                    ></textarea>
                    <button
                        type='submit'
                        className='content__btn'
                    >Опубликовать</button>
                </form>
                {posts.loading ? <div className='content__loading'>Загрузка...</div> : null}
                <PostList uploadedPosts={posts.uploadedPosts}/>
                <div ref={bottomBreackPoint} className='content__breakpoint'>Посты закончились</div>
            </div>
        </div>
    </>)
}