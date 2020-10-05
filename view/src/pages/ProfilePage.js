import { request } from '../redux/Api'
import React, {useEffect, useCallback, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import useCheckToken from '../hooks/useCheckToken'
import { setMessage } from '../redux/authenticationLogic/authActionCreators'
import { PUBLIC_URL } from '../constants'


export default function ProfilePage(){
    const posts = useSelector(state => state.postsReducer)
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [checkTokenExpire, logoutApp] = useCheckToken()
    const file= useRef(null)

    const formHandler = async(e)=>{
        e.preventDefault()
        if(!checkTokenExpire()){
            const response = await request('/api/profile/load-avatar', 'POST', new FormData(e.target), {})
            if(response.ok){
                file.current.value=null
            }
            else{
                dispatch(setMessage(response.message))
                file.current.value=null
            }
        }
    }

    useEffect(()=>{
        checkTokenExpire()
    }, [checkTokenExpire])

    return(<>
        <title>Профиль</title>
        <Header/>
        <div className='wrapper'>
            <div className='profile'>
                <div className='profile__container'>
                    <div className='profile__avatar'>
                        <img src='/model/static/images/avatars/default.webp'></img>
                    </div>
                    <div className='auth-warn'>{auth.responseMessage}</div>
                    <div className='profile__header'>Загрузить фотографию</div>
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
                </div>
            </div>
        </div>
    </>)
}