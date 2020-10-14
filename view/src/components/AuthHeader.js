import React from 'react'
import { Link } from 'react-router-dom'
import { PUBLIC_URL } from '../constants'

export default function AuthHeader() {
    return (
        <>
            <div className='header'>
                <div className='header__container container'>
                    <Link to='/' className='header__mini-logo'>
                        <img
                            src={PUBLIC_URL + '/minilogo.svg'}
                            alt='минилого'
                        />
                    </Link>
                    <Link to='/' className='header__logo'>
                        <img src={PUBLIC_URL + '/logo.svg'} alt='лого' />
                    </Link>
                </div>
            </div>
        </>
    )
}
