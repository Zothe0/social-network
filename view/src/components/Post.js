import React from 'react'
import { Link } from 'react-router-dom'
import { ibg } from '../hooks/useIbg'
import { LIKE_POST } from '../redux/postsLogic/postsTypes'


export default function Post({ post, currentTime }){

    ibg()
    const linkToAuthorProfile = `/profile/${post.author}`
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

    const likeHolder = (e)=>{
        console.log(post._id)
        dispatch({ type: LIKE_POST, postId: post._id})
    }

    return(
        <div className="posts-content__item">
            <div className="posts-content__header">
                <Link to={linkToAuthorProfile}className="posts-content__avatar ibg">
                    <img src ={post.avatarUrl} alt='аватарка'/>
                </Link>
                <div className="posts-content__info">
                    <Link to={linkToAuthorProfile}><div className="posts-content__nick">{post.author}</div></Link>
                    <div className="posts-content__date">{dateFormating(currentSec - postSec)}</div>
                </div>
            </div>
            <div className="posts-content__body">
                {post.text}
            </div>
            <div className="posts-content__footer">
                <div className="posts-content__likes" onClick={likeHolder}> {false ? <i className="fas fa-heart"/> : <i className="far fa-heart"/>} {post.likes.length}</div>
                <div className="posts-content__views"><i className="fas fa-eye"/> {post.views.length}</div>
            </div>
        </div>
    )
}