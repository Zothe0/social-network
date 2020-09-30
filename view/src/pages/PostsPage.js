import React, { useEffect, useCallback, useRef } from 'react'
import { verify } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, setMessage } from '../redux/authenticationLogic/authActionCreators'
import { changePostField, clearPostField } from '../redux/postsLogic/postsActionCreators'
import * as types from '../redux/postsLogic/postsTypes'
import { JWTSecret } from '../constants'
import PostList from '../components/PostList'
import useCheckToken from '../hooks/useCheckToken'


export default function PostsPage(){

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postsReducer)
    const [checkTokenExpire, logoutApp] = useCheckToken()
    const linkToProfile = `/profile/${auth.userNick}`
    const bottomBreackPoint = useRef(null)
    let previousYOffset = window.pageYOffset 

    window.onscroll = ()=>{
        if(bottomBreackPoint.current && (window.pageYOffset >= (bottomBreackPoint.current.offsetTop-1000)) && (window.pageYOffset > previousYOffset)){
            checkTokenExpire()
            uploadPosts()
            previousYOffset = window.pageYOffset 
        }
    }

    const inputHandler = (e)=>{
        dispatch(changePostField(e.target.value))
    }

    const enterHandler = (e)=>{
        if(e.keyCode === 13){
            publish(e)
        }
    }

    const publish = (e)=>{
        e.preventDefault()
        if(!checkTokenExpire()){
            dispatch({ type: types.PUBLISH_POST })
            dispatch(clearPostField())
        }
    }

    const uploadPosts = useCallback(()=>{
        if(!checkTokenExpire())dispatch({ type: types.UPLOAD_POSTS })
    }, [checkTokenExpire, dispatch])

    // Проверка действительности токена при каждом ререндере страницы
    // А также загрузка первой партии постов
    useEffect(()=>{
        if(!checkTokenExpire() && posts.uploadedPosts.length===0)uploadPosts()
    }, [checkTokenExpire, posts.uploadedPosts, uploadPosts])

    return(<>
        <div className="wrapper">
            <div className="header">
                <div className="header__container container">
                    <div className="header__logo">LOGO</div>
                    <div className="header__menu">
                        <div className="header__link">
                            <Link to={linkToProfile}>Профиль</Link>
                        </div>
                        <div className="header__link">
                            <Link to='/time'>Время</Link>
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
                        onKeyDown={enterHandler}
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