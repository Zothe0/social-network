import React, {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import useCheckToken from '../hooks/useCheckToken'


export default function ProfilePage(){
    const posts = useSelector(state => state.postsReducer)
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [checkTokenExpire, logoutApp] = useCheckToken()

    const formHandler = (e)=>{
        e.prevenDefault()
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
                    <div className='profile__header'>Загрузить фотографию</div>
                    <form
                        onSubmit={formHandler}
                        className='profile__form'
                        name='imageForm'
                    >
                        <input type='file' accept='image/jpeg,image/png'></input>
                        <button type='submit'>Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}