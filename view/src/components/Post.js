import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCheckToken from '../hooks/useCheckToken'
import { ibg } from '../hooks/useIbg'
import { LIKE_CHANGING } from '../redux/postsLogic/postsTypes'


export default function Post({ post, currentTime }){

    ibg()
    // currentTime time units
    const currentSec = Math.floor(currentTime/1000) 
    const currentDay = new Date(currentTime).getDate()
    const currentMonth = new Date(currentTime).getMonth()
    const currentYear = new Date(currentTime).getFullYear()
    // Post time units
    const postSec = Math.floor(post.date/1000) 
    const postMin = new Date(post.date).getMinutes()
    const postHour = new Date(post.date).getHours()
    const postDay = new Date(post.date).getDate()
    const postMonth = new Date(post.date).getMonth()
    const postYear = new Date(post.date).getFullYear()

    const dispatch = useDispatch()
    const nickName = useSelector(state => state.authReducer.nickName)
    const [warn, setWarn] = useState(null)
    const checkTokenExpire= useCheckToken()
    const linkToAuthorProfile = `/profile/${post.author}`
    const [likes, setLikes] = useState(post.likes)
    const [liked, setLiked] = useState(likes.includes(nickName))
    const [renderCount, setRenderCount] = useState(0)
    const body = useRef(null)


    const dateFormating = (timeDiffSec)=>{
        // Секунды
        if(timeDiffSec<=10) return 'только что'
        else if(timeDiffSec<20) return `${timeDiffSec} секунд назад`
        else if(timeDiffSec<59 && timeDiffSec%10===1) return `${timeDiffSec} секунду назад`
        else if(timeDiffSec<59 && (timeDiffSec%10===2 || timeDiffSec%10===3 || timeDiffSec%10===4)) return `${timeDiffSec} секунды назад`
        else if(timeDiffSec<59) return `${timeDiffSec} секунд назад`
        // Минуты
        else if(timeDiffSec<119) return 'минуту назад'
        else if(timeDiffSec<179) return 'две минуты назад'
        else if(timeDiffSec<239) return 'три минуты назад'
        else if(timeDiffSec<299) return '4 минуты назад'
        else if(Math.floor(timeDiffSec/60)<20) return `${Math.floor(timeDiffSec/60)} минут назад`
        else if(Math.floor(timeDiffSec/60)<59 && Math.floor(timeDiffSec/60)%10===1) return `${Math.floor(timeDiffSec/60)} минутy назад`
        else if((Math.floor(timeDiffSec/60)<59) && ((Math.floor(timeDiffSec/60)%10===2) || (Math.floor(timeDiffSec/60)%10===3) || (Math.floor(timeDiffSec/60)%10===4))) return `${Math.floor(timeDiffSec/60)} минуты назад`
        else if(Math.floor(timeDiffSec/60)<59) return `${Math.floor(timeDiffSec/60)} минут назад`
        // Часы
        else if(Math.floor(timeDiffSec/60)<119) return 'час назад'
        else if(Math.floor(timeDiffSec/60)<179) return 'два часа назад'
        else if(Math.floor(timeDiffSec/60)<239) return 'три часа назад'
        else if((currentDay === postDay) && (currentMonth === postMonth) && (currentYear === postYear)){
            const formatedMin = postMin<10? `0${postMin}`: postMin
            return `сегодня в ${postHour}:${formatedMin}`
        }
        else if((currentDay === postDay+1 && currentMonth === postMonth && currentYear === postYear) || (postDay > currentDay && ((currentMonth === postMonth+1 && currentYear === postYear) || (postMonth - currentMonth === 11 && currentYear - postYear === 1)))){
            const formatedMin = postMin<10? `0${postMin}`: postMin
            return `вчера в ${postHour}:${formatedMin}`
        }
        else if(currentYear === postYear){
            const formatedMin = postMin<10? `0${postMin}`: postMin
            switch(postMonth){
                case 0:
                    return `${postDay} янв в ${postHour}:${formatedMin}`
                case 1:
                    return `${postDay} фев в ${postHour}:${formatedMin}`
                case 2:
                    return `${postDay} мар в ${postHour}:${formatedMin}`
                case 3:
                    return `${postDay} апр в ${postHour}:${formatedMin}`
                case 4:
                    return `${postDay} мая в ${postHour}:${formatedMin}`
                case 5:
                    return `${postDay} июн в ${postHour}:${formatedMin}`
                case 6:
                    return `${postDay} июл в ${postHour}:${formatedMin}`
                case 7:
                    return `${postDay} авг в ${postHour}:${formatedMin}`
                case 8:
                    return `${postDay} сен в ${postHour}:${formatedMin}`
                case 9:
                    return `${postDay} окт в ${postHour}:${formatedMin}`
                case 10:
                    return `${postDay} ноя в ${postHour}:${formatedMin}`
                case 11:
                    return `${postDay} дек в ${postHour}:${formatedMin}`
                default:
                    return 'некорректный месяц'
            }
        }
        else if(currentYear > postYear){
            switch(postMonth){
                case 0:
                    return `${postDay} янв ${postYear}`
                case 1:
                    return `${postDay} фев ${postYear}`
                case 2:
                    return `${postDay} мар ${postYear}`
                case 3:
                    return `${postDay} апр ${postYear}`
                case 4:
                    return `${postDay} мая ${postYear}`
                case 5:
                    return `${postDay} июн ${postYear}`
                case 6:
                    return `${postDay} июл ${postYear}`
                case 7:
                    return `${postDay} авг ${postYear}`
                case 8:
                    return `${postDay} сен ${postYear}`
                case 9:
                    return `${postDay} окт ${postYear}`
                case 10:
                    return `${postDay} ноя ${postYear}`
                case 11:
                    return `${postDay} дек ${postYear}`
                default:
                    return 'некорректный месяц'
            }
        }
        return ('Неверная дата')
    }

    const likeHolder = useCallback((e)=>{
        if(!checkTokenExpire() && post.author !== nickName){
            if(!liked){
                const tempLikes = [...likes]
                tempLikes.push(nickName)
                setLikes(tempLikes)
            }else{
                setLikes(state => state.filter(item => item !== nickName))
            }
        }else{
            setWarn('Нельзя лайкать свои посты')
            setTimeout(()=>setWarn(null), 1700)
        }
    }, [checkTokenExpire, liked, likes, nickName, post.author])

    // TODO: Удалить эту функцию когда будет добавлен нормальный функционал
    const rawHolder = ()=>{
        setWarn('Эта кнопка пока не работает')
        setTimeout(()=>setWarn(null), 1700)
    }

    useEffect(()=>{
        if(warn){
            body.current.classList.add('warning')
        }else{
            body.current.classList.remove('warning')
        }
    }, [warn])

    useEffect(()=>{
        if(renderCount>0){
            dispatch({ type: LIKE_CHANGING, postId: post._id, newLikes: likes})
            setLiked(liked => !liked)
        }
        setRenderCount(renderCount => renderCount+1)
    }, [dispatch, post._id, likes])

    return(<>
        <div ref={body} className="posts-body__post">
            <div className="posts-body__header">
                <div className="posts-body__info">
                    <Link to={linkToAuthorProfile} className="posts-body__avatar ibg">
                        <img src ={post.avatarUrl} alt='аватарка'/>
                    </Link>
                    <div className="posts-body__info-column">
                        <Link to={linkToAuthorProfile} className="posts-body__author">{post.author}</Link>
                        <span className="posts-body__date">{dateFormating(currentSec - postSec)}</span>
                    </div>
                </div>
                {warn ? <div className='posts-body__warning'>{warn}</div>: null}
                <i className="posts-body__frame fas fa-reply" onClick={rawHolder}/>
            </div>
            <div className="posts-body__content">
                <div className="posts-body__text">{post.text}</div>
                <div className="posts-body__image">
                </div>
            </div>
            <div className="posts-body__footer">
                <div className="posts-body__stat">
                    {liked ? <i onClick={likeHolder} className="posts-body__frame fas fa-heart"/> : <i onClick={likeHolder} className="posts-body__frame far fa-heart"/>} {likes.length}
                </div>
                <div className="posts-body__stat">
                    <i className="posts-body__frame far fa-comment-alt" onClick={rawHolder}/>0
                </div>
                <div className="posts-body__stat">
                    <i className="posts-body__frame fas fa-share" onClick={rawHolder}/> 0
                </div>
                <div className="posts-body__stat">
                    <i className="posts-body__frame views far fa-eye"/>{post.views.length}
                </div>
            </div>
        </div>
    </>)
}