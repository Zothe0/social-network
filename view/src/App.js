import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import './css/App.css'
import { useRequest } from './hooks/useRequest'

export default function App() {

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
            window.M.updateTextFields()
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
        console.log('render')
        setTimeout(()=>setWarnings(state=>({nickName: false, email: false, password: false})), 3000)
    },[warnings.nickName, warnings.email, warnings.password])
    
    return (<>
        <div className='container'>
            <form className='column'>
                {message}
                {warnings.nickName? <label htmlFor='nick' className='warn'>Заполните поле с псевдонимом</label>: null}
                <label htmlFor='nick'>Введите ник</label>
                <input
                    id='nick'
                    type='text'
                    name='nickName'
                    onChange={inputHandler}
                    autoComplete='off'
                ></input>
                {warnings.email? <label htmlFor='nick' className='warn'>Заполните поле с почтой</label>: null}
                 <label htmlFor='email'>Введите почту</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    onChange={inputHandler}
                    autoComplete='off'
                ></input>
                {warnings.password? <label htmlFor='nick' className='warn'>Заполните поле с паролем</label>: null}
                <label htmlFor='pass'>Введите пароль</label>
                <input
                    id='pass'
                    type='password'
                    name='password'
                    onChange={inputHandler}
                    autoComplete='off'
                ></input>
                <button
                    type='submit'
                    onClick={sendForm}
                    disabled={btn}
                >Регистрация</button>
            </form>
        </div>
    </>)
}