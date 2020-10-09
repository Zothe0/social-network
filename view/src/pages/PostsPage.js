import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/authenticationLogic/authActionCreators'
import { changePostField, clearPostField } from '../redux/postsLogic/postsActionCreators'
import * as types from '../redux/postsLogic/postsTypes'
import PostList from '../components/PostList'
import useCheckToken from '../hooks/useCheckToken'
import Header from '../components/Header'
import { UPLOAD_CURRENT_PROFILE_AVATAR_URL } from '../redux/profileLogic/profileTypes'
import { ibg } from '../hooks/useIbg'


export default function PostsPage(){

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postsReducer)
    const checkTokenExpire= useCheckToken()
    const bottomBreackPoint = useRef(null)
    let previousYOffset = window.pageYOffset 

    window.onscroll = ()=>{
        if(bottomBreackPoint.current && (window.pageYOffset >= (bottomBreackPoint.current.offsetTop-1000)) && (window.pageYOffset > previousYOffset)){
            if(!checkTokenExpire()){
                uploadPosts()
                previousYOffset = window.pageYOffset
            }
        }
    }

    const inputHandler = (e)=>{
        dispatch(changePostField(e.target.value))
        dispatch({ type: types.UPLOAD_POSTS, render: true})
    }

    const checkInput = ()=>{
        if(posts.postField === '') return false
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
        if(!checkTokenExpire() && posts.uploadedPosts.length === 0)uploadPosts()
    }, [checkTokenExpire, posts.uploadedPosts, uploadPosts])

    useEffect(()=>{
        if(!checkTokenExpire())dispatch({ type: UPLOAD_CURRENT_PROFILE_AVATAR_URL, nickName: auth.nickName })
    },[checkTokenExpire, dispatch, auth.nickName])

    useEffect(()=>{
        ibg()
    },[])

    return(<>
        <title>Посты</title>
        <div className="wrapper">
            <Header/>
            <div className="posts-content">
                <form
                    className='posts-content__form'
                    onSubmit={publish}
                >
                    <div className='auth-warn'>{auth.responseMessage}</div>
                    <label
                        className='posts-content__label'
                        htmlFor='textarea'
                    >Создать новый пост:</label>
                    <textarea
                        className='posts-content__textarea'
                        id='textarea'
                        name='textarea'
                        maxLength='400'
                        tabIndex='2'
                        rows='4'
                        onChange={inputHandler}
                        onKeyDown={enterHandler}
                        value={posts.postField}
                    ></textarea>
                    <button
                        type='submit'
                        className='posts-content__btn'
                    >Опубликовать</button>
                </form>
                {posts.loading ? <div className='posts-content__loading'>Загрузка...</div> : null}
                <PostList uploadedPosts={posts.uploadedPosts}/>
                <div ref={bottomBreackPoint} className='posts-content__breakpoint'>Посты закончились</div>
            </div>
        </div>
    </>)
}