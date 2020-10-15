import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import useCheckToken from '../hooks/useCheckToken'
import { ibg } from '../hooks/useIbg'
import { setFileInput } from '../redux/profileLogic/profileActionCreators'
import {
    SEND_AVATAR_IMAGE,
    UPLOAD_CURRENT_PROFILE_AVATAR_URL,
} from '../redux/profileLogic/profileTypes'

export default function ProfilePage() {
    const profile = useSelector(state => state.profileReducer)
    const posts = useSelector(state => state.postsReducer)
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const { id } = useParams()
    const checkTokenExpire = useCheckToken()
    const file = useRef()
    const fileText = useRef()
    const dropArea = useRef()
    let [labelClass, setLabelClass] = useState('profile__file-wrapper')

    const getAvatarUrl = useCallback(() => {
        dispatch({ type: UPLOAD_CURRENT_PROFILE_AVATAR_URL, nickName: id })
    }, [dispatch, id])

    const fileHandler = e => {
        fileText.current.innerText = e.target.files[0].name
    }

    const dropFileHandler = e => {
        e.stopPropagation()
        e.preventDefault()
        hideDropArea(e)
        file.current.files = e.dataTransfer.files
        fileText.current.innerText = file.current.files[0].name
    }

    const formHandler = async e => {
        e.preventDefault()
        const form = new FormData(e.target)
        form.append('nickName', `${auth.nickName}`)
        form.append('previousAvatarUrl', profile.currentProfileAvatarUrl)
        if (!checkTokenExpire()) dispatch({ type: SEND_AVATAR_IMAGE, form })
        fileText.current.innerText = 'Выберите фотографию'
    }

    const showDropArea = () => {
        if (dropArea.current) dropArea.current.classList.add('active')
    }

    const hideDropArea = e => {
        if (dropArea.current) dropArea.current.classList.remove('active')
    }

    useEffect(() => {
        if (!checkTokenExpire()) {
            dispatch(setFileInput(file.current))
            getAvatarUrl()
            ibg()
        }
    }, [
        checkTokenExpire,
        dispatch,
        getAvatarUrl,
        profile.currentProfileAvatarUrl,
    ])

    useEffect(() => {
        if (
            auth.responseMessage !== null &&
            auth.responseMessage !== undefined
        ) {
            fileText.current.innerText = `${auth.responseMessage}`
            setLabelClass('profile__file-wrapper warning')
        } else {
            fileText.current.innerText = 'Выберите фотографию'
            setLabelClass('profile__file-wrapper')
        }
    }, [auth.responseMessage])

    useEffect(() => {
        window.addEventListener('dragover', e => {
            e.stopPropagation()
            e.preventDefault()
        })
        window.addEventListener('dragenter', showDropArea)
        window.addEventListener('drop', dropFileHandler)
    }, [])

    return (
        <>
            <title>Профиль</title>
            <Header />
            <div className='wrapper'>
                <div className='profile'>
                    <div ref={dropArea} className='profile__drop-area'>
                        <div
                            onDragLeave={hideDropArea}
                            className='profile__drag-checker'
                        ></div>
                        <div className='profile__drop-box'>
                            <i className='profile__drop-ico fas fa-download' />
                            <div className='profile__drop-header'>
                                Загрузить фотографию
                            </div>
                        </div>
                    </div>
                    <div className='profile__container'>
                        {posts.loading ? (
                            <div className='loading-frame'>
                                <i className='loading-frame__item fas fa-sync-alt' />
                            </div>
                        ) : null}
                        <div className='profile__avatar ibg'>
                            <img
                                src={profile.currentProfileAvatarUrl}
                                alt='аватарка'
                            />
                        </div>
                        {auth.nickName === id ? (
                            <>
                                <div className='profile__header'>
                                    Установить новую фотографию профиля:
                                </div>
                                <form
                                    onSubmit={formHandler}
                                    className='profile__form'
                                    name='form'
                                    encType='multipart/form-data'
                                    action='/api/profile/load-avatar'
                                    method='post'
                                    placeholder='none'
                                >
                                    <div className={labelClass}>
                                        <input
                                            onChange={fileHandler}
                                            type='file'
                                            accept='image/jpeg,image/png,image/webp'
                                            name='avatar'
                                            id='avatar'
                                            ref={file}
                                            className='profile__file'
                                        ></input>
                                        <label
                                            htmlFor='avatar'
                                            onDrop={dropFileHandler}
                                            // onDragEnter={dragFileHandler}
                                            className='profile__file-btn'
                                        >
                                            <i className='profile__file-ico fas fa-download' />
                                            <span
                                                ref={fileText}
                                                className='profile__file-text'
                                            >
                                                Выберите фотографию
                                            </span>
                                        </label>
                                    </div>
                                    <button
                                        className='profile__submit-btn'
                                        type='submit'
                                    >
                                        Отправить
                                    </button>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
