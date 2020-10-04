import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeInput, clearInputs, setSubmitEnabled, setSubmitDisabled, authentication, clearMessage } from '../redux/authenticationLogic/authActionCreators'
import { LOGIN } from '../redux/authenticationLogic/authTypes'


export default function AuthorizationPage(){

    // Получаем dispatch из react-redux
    const dispatch = useDispatch()
    // Получаем state из appReducer
    const app = useSelector(state => state.authReducer)
    
    
    // Отправляет форму на сервер
    const submitForm = async(e)=>{
        e.preventDefault()
        const body={
            mix: app.formInputs.nickName,
            password: app.formInputs.password
        }
        dispatch({ type: LOGIN, body })
    }

    // Записывает значение инпута в соответсвующее поле в нашем store
    const inputHandler = async(e)=>{
        dispatch(changeInput(e.target.name, e.target.value))
    }

    // Функция для проверки полей инпутов
    const checkInputs = useCallback(()=>{
        if(app.formInputs.nickName==='') return false
        else if(app.formInputs.password==='') return false
        else return true
    }, [app.formInputs.nickName, app.formInputs.password])

    // Следим за изменением инпутов, и при их изменении, проверяем пустые ли они, если все поля заполнены, кнопка становится активной
    useEffect(()=>{
        if(checkInputs()){
            dispatch(setSubmitEnabled())
        }else{
            dispatch(setSubmitDisabled())
        }
    }, [app.formInputs, checkInputs, dispatch])
    
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token && data.userNick){
            dispatch(authentication(data.token, data.userNick))
        }
    }, [dispatch])

    const clearForm= async()=>{
        dispatch(clearInputs())
        dispatch(clearMessage())
    }
    return (<>
        <title>Вход</title>
        <div className='auth-container'>
            <form className='auth-column'>
                <div className='auth-header'>Авторизация</div>
                {app.responseMessage? <div className='auth-warn'>{app.responseMessage}</div>: null}
                <label htmlFor='nick'>Введите ник или почту</label>
                <input
                    id='nick'
                    type='text'
                    name='nickName'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.nickName}
                ></input>
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
                    >Войти</button>
                    <Link to='/registration' className='auth-link' onClick={clearForm}>Регистрация</Link>
                </div>
            </form>
        </div>
    </>)
}