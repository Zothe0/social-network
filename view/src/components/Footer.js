import React from 'react'
import {Link} from 'react-router-dom'


export default function Footer(){
    return(<>
        <div className="auth-footer">
            <div className="auth-footer__container container">
                <Link to='/' className="auth-footer__link">memegram 2020</Link>
                <Link to='/' className="auth-footer__link">О нас</Link>
                <Link to='/' className="auth-footer__link">Вакансии</Link>
                <Link to='/' className="auth-footer__link">Правила</Link>
                <Link to='/' className="auth-footer__link">Конфиденциальность</Link>
            </div>
        </div>
    </>)
}