import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRequest } from '../hooks/useRequest'
import { clearInputs, changeInput, clearMessage, sendForm } from '../redux/actionCreators'


export default function RegistrationPage(){

    const dispatch = useDispatch()
    const app = useSelector(state => state.appReducer)
    
    const [btn, setBtn] = useState('disabled')

    const checkSubmit = ()=>{
        if(app.formInputs.nickName===''){
            return false
        }else if(app.formInputs.email===''){
            return false
        }else if(app.formInputs.password===''){
            return false
        }
        return true
    }

    const inputHandler = async(e)=>{
        dispatch(changeInput(e.target.name, e.target.value))
    }

    const submitForm = async(e)=>{
        e.preventDefault()
        dispatch(sendForm(app.formInputs))
    }

    useEffect(()=>{
        if(checkSubmit()){setBtn(null)}else{setBtn('disabled')}
    }, [checkSubmit])
    
    return (<>
        <div className='container'>
            <form className='column'>
                {app.responseMessage? <div className='warn'>{app.responseMessage}</div>: null}
                {app.warnings.nickName? <label htmlFor='nick' className='warn'>Минимальная длина ника 5 символов</label>: null}
                <label htmlFor='nick'>Введите ник</label>
                <input
                    id='nick'
                    type='text'
                    name='nickName'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.nickName}
                ></input>
                {app.warnings.email? <label htmlFor='nick' className='warn'>Введите корректную почту</label>: null}
                 <label htmlFor='email'>Введите почту</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.email}
                ></input>
                {app.warnings.password? <label htmlFor='nick' className='warn'>Минимальная длина пароля 6 символов</label>: null}
                <label htmlFor='pass'>Введите пароль</label>
                <input
                    id='pass'
                    type='password'
                    name='password'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={app.formInputs.password}
                ></input>
                <div className='buttons'>
                    <button
                        type='submit'
                        onClick={submitForm}
                        disabled={btn}
                    >Регистрация</button>
                    <Link to='/auth' className='login'>Вход</Link>
                </div>
            </form>
        </div>
    </>)
}