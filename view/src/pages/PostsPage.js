import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authenticationLogic/authActionCreators'
import { changePostField, clearPostField } from '../redux/postsLogic/postsActionCreators'
import { PUBLISH_POST } from '../redux/postsLogic/postsTypes'


export default function PostsPage(){

    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const posts = useSelector(state => state.postsReducer)
    const linkToProfile = `/profile/${auth.userId}`
    
    const logoutApp = async()=>{
        dispatch(logout())
    }

    const inputHandler = async(e)=>{
        dispatch(changePostField(e.target.value))
    }

    const publish = (e)=>{
        e.preventDefault()
        dispatch({ type: PUBLISH_POST })
        dispatch(clearPostField())
    }

    return(<>
        <div className="wrapper">
            <div className="header">
                <div className="header__container container">
                    <div className="header__logo">LOGO</div>
                    <div className="header__form">
                        <label className="header__label" htmlFor="search">Поиск по постам:</label>
                        <input
                            className="header__search"
                            type="search"
                            name="search"
                            id="search"
                            autoComplete="off"
                            tabIndex='1'
                        />
                        <button className="header__btn" type="submit">Поиск</button>
                    </div>
                    <div className="header__menu">
                        <div className="header__link">
                            <Link to={linkToProfile}>Профиль</Link>
                        </div>
                        <button
                            type='button'
                            className='header__btn'
                            onClick={logoutApp}
                        >Выйти</button>
                    </div>
                </div>
            </div>
            <div className="content">
                <form
                    className='content__form'
                    onSubmit={publish}
                >
                    <label
                        className='content__label'
                        htmlFor='textarea'
                    >Создать новый пост:</label>
                    <textarea
                        className='content__textarea'
                        id='textarea'
                        name='textarea'
                        maxLength='120'
                        tabIndex='2'
                        rows='3'
                        onChange={inputHandler}
                        value={posts.postField}
                    ></textarea>
                    <button
                        type='submit'
                        className='content__btn'
                    >Опубликовать</button>
                </form>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laboriosam eos, eaque libero animi, eligendi, deleniti iusto nemo at dolorem alias magni expedita quas et incidunt ipsa aliquid voluptatibus sunt?
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laboriosam eos, eaque libero animi, eligendi
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laboriosam eos, eaque libero animi, eligendi, deleniti iusto nemo at dolorem alias magni expedita quas et incidunt ipsa aliquid voluptatibus sunt?
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laboriosam eos, eaque libero animi, eligendi, deleniti iusto
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
                <div className="content__item">
                    <div className="content__header">
                        <div className="content__info">
                            <div className="content__avatar">Аватар</div>
                            <div className="content__nick">Ник</div>
                        </div>
                        <div className="content__date">Дата</div>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laboriosam eos, eaque libero animi, eligendi, deleniti iusto nemo at dolorem alias magni expedita quas et incidunt ipsa aliquid voluptatibus sunt?
                    </div>
                    <div className="content__footer">
                        <div className="content__statistic">Лайки 340</div>
                        <div className="content__statistic">Просмотры 3400</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}