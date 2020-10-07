import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/authenticationLogic/authActionCreators'
import { changePostField, clearPostField } from '../redux/postsLogic/postsActionCreators'
import * as types from '../redux/postsLogic/postsTypes'
import PostList from '../components/PostList'
import useCheckToken from '../hooks/useCheckToken'
import Header from '../components/Header'


export default function PostsPage(){

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postsReducer)
    const [checkTokenExpire, logoutApp] = useCheckToken()
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

    const checkInput = ()=>{
        if(posts.postField==='') return false
        else return true
    }

    const enterHandler = (e)=>{
        if(e.keyCode === 13){
            publish(e)
        }
    }

    const publish = (e)=>{
        e.preventDefault()
        if(!checkTokenExpire() && checkInput()){
            dispatch({ type: types.PUBLISH_POST })
            dispatch(clearPostField())
        }else dispatch(setMessage('Пост не может быть пустым'))
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
        <title>Посты</title>
        <div className="wrapper">
            <Header/>
            <div className="content">
                <form
                    className='content__form'
                    onSubmit={publish}
                >
                    <div className='auth-warn'>{auth.responseMessage}</div>
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