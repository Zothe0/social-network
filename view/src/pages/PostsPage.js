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
    const textarea = useRef(null)
    let previousYOffset = window.pageYOffset 


    const inputHandler = (e)=>{
        dispatch(changePostField(e.target.value))
        // dispatch({ type: types.UPLOAD_POSTS, render: true})
        dispatch({type: types.CHECK_NEW_POSTS})
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

    const focusArea = (e)=>{
        e.target.classList.add('focus')
    }

    // Проверка действительности токена при каждом ререндере страницы
    // А также загрузка первой партии постов
    useEffect(()=>{
        if(!checkTokenExpire() && posts.uploadedPosts.length === 0)uploadPosts()
    }, [checkTokenExpire, posts.uploadedPosts, uploadPosts])

    useEffect(()=>{
        if(!checkTokenExpire())dispatch({ type: UPLOAD_CURRENT_PROFILE_AVATAR_URL, nickName: auth.nickName })
    },[checkTokenExpire, dispatch, auth.nickName])

    useEffect(()=>{
        if(auth.responseMessage !== null && auth.responseMessage !== undefined){
            textarea.current.setAttribute('placeholder', auth.responseMessage)
            textarea.current.classList.add('warning')
        }else{
            textarea.current.setAttribute('placeholder', 'Создать пост')
            textarea.current.classList.remove('warning')
        }
    }, [auth.responseMessage])

    useEffect(()=>{
        ibg()

        window.addEventListener('click', (e)=>{
            if(e.target !== textarea.current && textarea.current){
                textarea.current.classList.remove('focus')
            }
        })

        window.addEventListener('scroll', (e)=>{
            if(bottomBreackPoint.current && (window.pageYOffset >= (bottomBreackPoint.current.offsetTop-1000)) && (window.pageYOffset > previousYOffset)){
                if(!checkTokenExpire()){
                    uploadPosts()
                    previousYOffset = window.pageYOffset
                }
            }
        })
    },[])

    return(<>
        <title>Посты</title>
        <div className="wrapper">
            <Header/>
            <div className="posts-body">
                <form onSubmit={publish} className="posts-body__form">
                    <textarea
                        className="posts-body__textarea"
                        ref={textarea} rows='1' maxLength={400}
                        placeholder="Создать пост..."
                        onChange={inputHandler}
                        onKeyDown={enterHandler}
                        onFocus={focusArea}
                        value={posts.postField}
                    />
                    <button className="posts-body__frame btn" type="submit"><i className="fas fa-plus" /></button>
                </form>
                {posts.loading ? 
                <div className='loading-frame posts-body__loading-frame'>
                    <i className="loading-frame__item fas fa-sync-alt"/>
                </div>: null}
                <PostList uploadedPosts={posts.uploadedPosts}/>
                <div ref={bottomBreackPoint} className='posts-body__breakpoint'></div>
            </div>
        </div>
    </>)
}