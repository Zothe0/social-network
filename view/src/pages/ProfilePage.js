import React, {useEffect, useCallback, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import useCheckToken from '../hooks/useCheckToken'
import { ibg } from '../hooks/useIbg'
import { setFileInput } from '../redux/profileLogic/profileActionCreators'
import { SEND_AVATAR_IMAGE, UPLOAD_CURRENT_PROFILE_AVATAR_URL } from '../redux/profileLogic/profileTypes'


export default function ProfilePage(){
    const profile = useSelector(state => state.profileReducer)
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [checkTokenExpire, logoutApp] = useCheckToken()
    const file= useRef(null)

    const getAvatarUrl = useCallback(()=>{
        dispatch({ type: UPLOAD_CURRENT_PROFILE_AVATAR_URL, nickName: id })
    }, [dispatch, id])

    const formHandler = async(e)=>{
        e.preventDefault()
        const form = new FormData(e.target)
        form.append('nickName', `${auth.nickName}`)
        form.append('previousAvatarUrl', profile.currentProfileAvatarUrl)
        if(!checkTokenExpire()) dispatch({ type: SEND_AVATAR_IMAGE, form })
    }

    useEffect(()=>{
        if(!checkTokenExpire()){
            dispatch(setFileInput(file.current))
            getAvatarUrl()
            ibg()
        }
    }, [checkTokenExpire, dispatch, getAvatarUrl, profile.currentProfileAvatarUrl])

    return(<>
        <title>Профиль</title>
        <Header/>
        <div className='wrapper'>
            <div className='profile'>
                <div className='profile__container'>
                    <div className='profile__avatar ibg'>
                        <img src={profile.currentProfileAvatarUrl} alt='аватарка'/>
                    </div>
                    <div className='auth-warn'>{auth.responseMessage}</div>
                    {auth.nickName === id ? <>
                        <div className='profile__header'>Загрузить фотографию профиля</div>
                        <form
                            onSubmit={formHandler}
                            className='profile__form'
                            name='form'
                            encType="multipart/form-data"
                            action="/api/profile/load-avatar"
                            method="post"
                        >
                            <input
                                type='file' 
                                accept='image/jpeg,image/png'
                                name='avatar'
                                id='avatar'
                                ref={file}
                            ></input>
                            <button type='submit'>Отправить</button>
                        </form>
                    </>: null}
                </div>
            </div>
        </div>
    </>)
}