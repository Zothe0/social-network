import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {  changeInput, setSubmitEnabled, setSubmitDisabled, clearInput, clearMessage, clearAllInputs } from '../redux/authenticationLogic/authActionCreators'
import { REGISTRATION } from '../redux/authenticationLogic/authTypes'
import AuthHeader from '../components/AuthHeader'
import Footer from '../components/Footer'
import { PUBLIC_URL } from '../constants'


export default function RegistrationPage(){

    // Получаем dispatch из react-redux
    const dispatch = useDispatch()
    // Получаем state из authReducer
    const auth = useSelector(state => state.authReducer)
    const nickName = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const submit = useRef(null)
    
    
    // Отправляет форму на сервер
    const submitForm = async(e)=>{
        // TODO: запретить использовать в нике особые символы типа $%^&@!()
        e.preventDefault()
        dispatch({type: REGISTRATION, body: auth.formInputs})
    }

    // Записывает значение инпута в соответсвующее поле в нашем store
    const inputHandler = async(e)=>{
        dispatch(changeInput(e.target.name, e.target.value))
    }

    const clearForm= async()=>{
        dispatch(clearAllInputs())
        dispatch(clearMessage())
    }

    // Функция для проверки полей инпутов
    const checkInputs = useCallback(()=>{
        if(auth.formInputs.nickName==='') return false
        else if(auth.formInputs.email==='') return false
        else if(auth.formInputs.password==='') return false
        else return true
    }, [auth.formInputs.nickName, auth.formInputs.email, auth.formInputs.password])

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
        if(auth.warnings.nickName){
            dispatch(clearInput('nickName'))
            nickName.current.setAttribute('placeholder', 'Минимальная длина ника 4 символа')
            nickName.current.classList.add('warning')
        }else{
            nickName.current.setAttribute('placeholder', 'Введите ник')
            nickName.current.classList.remove('warning')
        }
        if(auth.warnings.email){
            dispatch(clearInput('email'))
            email.current.setAttribute('placeholder', 'Введите корректную почту')
            email.current.classList.add('warning')
        }else{
            email.current.setAttribute('placeholder', 'Введите почту')
            email.current.classList.remove('warning')
        }
        if(auth.warnings.password){
            dispatch(clearInput('password'))
            password.current.setAttribute('placeholder', 'Минимальная длина пароля 6 символов')
            password.current.classList.add('warning')
        }else{
            password.current.setAttribute('placeholder', 'Введите пароль')
            password.current.classList.remove('warning')
        }
    }, [auth.warnings, dispatch])

    useEffect(()=>{
        switch(auth.responseMessage){
            case 'Такой ник уже зарегистрирован':
                dispatch(clearInput('nickName'))
                nickName.current.setAttribute('placeholder', `${auth.responseMessage}`)
                nickName.current.classList.add('warning')
                break
            case 'Такая почта уже зарегистрирована':
                dispatch(clearInput('email'))
                email.current.setAttribute('placeholder', `${auth.responseMessage}`)
                email.current.classList.add('warning')
                break
            default:
                nickName.current.setAttribute('placeholder', 'Введите ник')
                nickName.current.classList.remove('warning')
                email.current.setAttribute('placeholder', 'Введите почту')
                email.current.classList.remove('warning')
                break
        }
    },[auth.responseMessage, dispatch])

    return (<>
        <title>Регистрация</title>
        <div className="wrauther">
            <div className="auth">
                <AuthHeader/>
                <div className="auth__container container">
                    <div className="auth__body">
                        <img className="auth__body-image" src={PUBLIC_URL+'/auth-picture.svg'} alt='Куча людей' />
                        <div className="auth__fields">
                            <form className="auth__form">
                                <div className="auth__header">Регистрация</div>
                                {auth.responseMessage === 'Ошибка на сервере' ? <div>{auth.responseMessage}</div> : null}
                                <input
                                    className="auth__input"
                                    ref={nickName}
                                    type='text'
                                    name='nickName'
                                    onChange={inputHandler}
                                    autoComplete='off'
                                    value={auth.formInputs.nickName}
                                    placeholder='Введите ник'
                                ></input>
                                <input
                                    className="auth__input"
                                    ref={email}
                                    type='email'
                                    name='email'
                                    onChange={inputHandler}
                                    autoComplete='off'
                                    value={auth.formInputs.email}
                                    placeholder='Введите почту'
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
                                    >Регистрация</button>
                                    <Link to='/authorization' className='auth__button reg' onClick={clearForm}>Вход</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        <div className='auth-container'>
            <form className='auth-column'>
                {auth.responseMessage? <div className='auth-warn'>{auth.responseMessage}</div>: null}
                {auth.warnings.nickName? <label htmlFor='nick' className='auth-warn'>Минимальная длина ника 4 символа</label>: null}
                {auth.warnings.email? <label htmlFor='nick' className='auth-warn'>Введите корректную почту</label>: null}
                {auth.warnings.password? <label htmlFor='nick' className='auth-warn'>Минимальная длина пароля 6 символов</label>: null}
            </form>
        </div>
    </>)
}