import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthHeader from '../components/AuthHeader'
import Footer from '../components/Footer'
import { PUBLIC_URL } from '../constants'
import { changeInput, clearAllInputs, setSubmitEnabled, setSubmitDisabled, authentication, clearMessage } from '../redux/authenticationLogic/authActionCreators'
import { LOGIN } from '../redux/authenticationLogic/authTypes'


export default function AuthorizationPage(){

    // Получаем dispatch из react-redux
    const dispatch = useDispatch()
    // Получаем state из authReducer
    const auth = useSelector(state => state.authReducer)
    const mix = useRef(null)
    const password = useRef(null)
    const submit = useRef(null)


    const clearForm= async()=>{
        dispatch(clearAllInputs())
        dispatch(clearMessage())
    }

    // Отправляет форму на сервер
    const submitForm = async(e)=>{
        e.preventDefault()
        const body={
            mix: auth.formInputs.nickName,
            password: auth.formInputs.password
        }
        dispatch({ type: LOGIN, body })
    }

    // Записывает значение инпута в соответсвующее поле в нашем store
    const inputHandler = async(e)=>{
        dispatch(changeInput(e.target.name, e.target.value))
    }

    // Функция для проверки полей инпутов
    const checkInputs = useCallback(()=>{
        if(auth.formInputs.nickName==='') return false
        else if(auth.formInputs.password==='') return false
        else return true
    }, [auth.formInputs.nickName, auth.formInputs.password])

    // Следим за изменением инпутов, и при их изменении, проверяем пустые ли они, если все поля заполнены, кнопка становится активной
    useEffect(()=>{
        if(checkInputs()){
            dispatch(setSubmitEnabled())
            submit.current.classList.add('active')
        }else{
            dispatch(setSubmitDisabled())
            submit.current.classList.remove('active')
        }
    }, [auth.formInputs, checkInputs, dispatch])
    
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token){
            dispatch(authentication(data.token, data.nickName))
        }
    }, [dispatch])

    useEffect(()=>{
        switch(auth.responseMessage){
            case 'Такого пользователя не существует':
                mix.current.setAttribute('placeholder', `${auth.responseMessage}`)
                mix.current.classList.add('warning')
                break
            case 'Неверный пароль':
                password.current.setAttribute('placeholder', `${auth.responseMessage}`)
                password.current.classList.add('warning')
                break
            default:
                mix.current.setAttribute('placeholder', 'Введите ник или почту')
                mix.current.classList.remove('warning')
                password.current.setAttribute('placeholder', 'Введите пароль')
                password.current.classList.remove('warning')
                break
        }
    },[auth.responseMessage])

    return (<>
        <title>Вход</title>
        <div className="wrapper">
            <div className="auth">
                <AuthHeader/>
                <div className="auth__container container">
                    <div className="auth__body">
                        <img className="auth__body-image" src={PUBLIC_URL+'/auth-picture.svg'} alt='Куча людей' />
                        <div className="auth__fields">
                            <form className="auth__form">
                                <div className="auth__header">Авторизация</div>
                                {auth.responseMessage === 'Ошибка на сервере' ? <div>{auth.responseMessage}</div> : null}
                                <input
                                    className="auth__input"
                                    ref={mix}
                                    type='text'
                                    name='nickName'
                                    onChange={inputHandler}
                                    autoComplete='off'
                                    value={auth.formInputs.nickName}
                                    placeholder='Введите ник или почту'
                                ></input>
                                <input
                                    className="auth__input"
                                    ref={password}
                                    type='password'
                                    name='password'
                                    onChange={inputHandler}
                                    autoComplete='off'
                                    value={auth.formInputs.password}
                                    placeholder='Введите пароль'
                                ></input>
                                <div className="auth__buttons">
                                    <button
                                        className="auth__button"
                                        ref={submit}
                                        type='submit'
                                        onClick={submitForm}
                                        disabled={auth.submitButton}
                                    >Войти</button>
                                    <Link to='/registration' className='auth__button reg' onClick={clearForm}>Регистрация</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </>)
}