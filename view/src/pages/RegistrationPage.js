import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRequest } from '../hooks/useRequest'


export default function RegistrationPage(){

    const dispatch = useDispatch()
    const app = useSelector(state => state.appReducer)

    const [form, setForm] = useState({
        nickName: '',
        email: '',
        password: ''
    })
    const [warnings, setWarnings] = useState({
        nickName: false,
        email: false,
        password: false
    })
    const [message, setMessage] = useState(null)
    const [btn, setBtn] = useState('disabled')

    const checkSubmit = ()=>{
        if(form.nickName===''){
            return false
        }else if(form.email===''){
            return false
        }else if(form.password===''){
            return false
        }
        return true
    }

    const [loading, error, request] = useRequest()

    const inputHandler = async(e)=>{
        dispatch()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const sendForm = async(e)=>{
        e.preventDefault()
        const response = await request('/api/auth/registration', 'POST', form)
        if(response.ok){
            setForm({
                nickName: '',
                email: '',
                password: ''
            })
            setMessage(response.message)
        }else{
            if(response.fault){
                response.fault.forEach(item=>{
                    if(item.param ==='nickName'){
                        warnings.nickName = true
                    }else if(item.param ==='email'){
                        warnings.email = true
                    }else if(item.param ==='password'){
                        warnings.password = true
                    }
                })
            }else{
                setMessage(response.message)
            }
            setWarnings({...warnings})
        }
    }

    useEffect(()=>{
        if(checkSubmit()){setBtn(null)}else{setBtn('disabled')}
    }, [form, checkSubmit,])

    useEffect(()=>{
        setTimeout(()=>setWarnings(state=>({nickName: false, email: false, password: false})), 3000)
    },[warnings.nickName, warnings.email, warnings.password])

    useEffect(()=>{
        setTimeout(()=>setMessage(''), 3000)
    }, [message, setMessage])
    
    return (<>
        <div className='container'>
            <form className='column'>
                {message? <div className='warn'>{message}</div>: null}
                {warnings.nickName? <label htmlFor='nick' className='warn'>Минимальная длина ника 5 символов</label>: null}
                <label htmlFor='nick'>Введите ник</label>
                <input
                    id='nick'
                    type='text'
                    name='nickName'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={form.nickName}
                ></input>
                {warnings.email? <label htmlFor='nick' className='warn'>Введите корректную почту</label>: null}
                 <label htmlFor='email'>Введите почту</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={form.email}
                ></input>
                {warnings.password? <label htmlFor='nick' className='warn'>Минимальная длина пароля 6 символов</label>: null}
                <label htmlFor='pass'>Введите пароль</label>
                <input
                    id='pass'
                    type='password'
                    name='password'
                    onChange={inputHandler}
                    autoComplete='off'
                    value={form.password}
                ></input>
                <div className='buttons'>
                    <button
                        type='submit'
                        onClick={sendForm}
                        disabled={btn}
                    >Регистрация</button>
                    <Link to='/auth' className='login'>Вход</Link>
                </div>
            </form>
        </div>
    </>)
}