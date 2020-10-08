import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {  changeInput, setSubmitEnabled, setSubmitDisabled, clearInputs, clearMessage } from '../redux/authenticationLogic/authActionCreators'
import { REGISTRATION } from '../redux/authenticationLogic/authTypes'


export default function RegistrationPage(){

    // Получаем dispatch из react-redux
    const dispatch = useDispatch()
    // Получаем state из appReducer
    const app = useSelector(state => state.authReducer)
    
    
    // Отправляет форму на сервер
    const submitForm = async(e)=>{
        // TODO: запретить использовать в нике особые символы типа $%^&@!()
        e.preventDefault()
        dispatch({type: REGISTRATION, body: app.formInputs})
    }

    // Записывает значение инпута в соответсвующее поле в нашем store
    const inputHandler = async(e)=>{
        dispatch(changeInput(e.target.name, e.target.value))
    }

    // Функция для проверки полей инпутов
    const checkInputs = useCallback(()=>{
        if(app.formInputs.nickName==='') return false
        else if(app.formInputs.email==='') return false
        else if(app.formInputs.password==='') return false
        else return true
    }, [app.formInputs.nickName, app.formInputs.email, app.formInputs.password])

    // Следим за изменением инпутов, и при их изменении, проверяем пустые ли они, если все поля заполнены, кнопка становится активной
    useEffect(()=>{
        if(checkInputs()){
            dispatch(setSubmitEnabled())
        }else{
            dispatch(setSubmitDisabled())
        }
    }, [app.formInputs, checkInputs, dispatch])

    const clearForm= async()=>{
        dispatch(clearInputs())
        dispatch(clearMessage())
    }

    return (<>
        <title>Регистрация</title>
        <div className='auth-container'>
            <form className='auth-column'>
                <div className='auth-header'>Регистрация</div>
                {app.responseMessage? <div className='auth-warn'>{app.responseMessage}</div>: null}
                {app.warnings.nickName? <label htmlFor='nick' className='auth-warn'>Минимальная длина ника 4 символа</label>: null}
                <label htmlFor='nick'>Введите ник</label>
                <input
                    id='nick'
                    type='text'
                    name='nickName'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.nickName}
                ></input>
                {app.warnings.email? <label htmlFor='nick' className='auth-warn'>Введите корректную почту</label>: null}
                 <label htmlFor='email'>Введите почту</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.email}
                ></input>
                {app.warnings.password? <label htmlFor='nick' className='auth-warn'>Минимальная длина пароля 6 символов</label>: null}
                <label htmlFor='pass'>Введите пароль</label>
                <input
                    id='pass'
                    type='password'
                    name='password'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.password}
                ></input>
                <div className='auth-buttons'>
                    <button
                        type='submit'
                        onClick={submitForm}
                        disabled={app.submitButton}
                    >Регистрация</button>
                    <Link to='/auth' className='auth-link' onClick={clearForm}>Вход</Link>
                </div>
            </form>
        </div>
    </>)
}