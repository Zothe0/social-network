import React from 'react'


export default function Post({ post, currentTime }){

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
        else if((currentDay === postDay) && (currentMonth === postMonth) && (currentYear === postYear)) return `сегодня в ${postHour}:${postMin}`
        else if((currentDay === (postDay+1)) && (currentMonth === postMonth) && (currentYear === postYear)) return `вчера в ${postHour}:${postMin}`
        else if(currentYear === postYear){
            switch(postMonth){
                case 0:
                    return `${postDay} янв в ${postHour}:${postMin}`
                case 1:
                    return `${postDay} фев в ${postHour}:${postMin}`
                case 2:
                    return `${postDay} мар в ${postHour}:${postMin}`
                case 3:
                    return `${postDay} апр в ${postHour}:${postMin}`
                case 4:
                    return `${postDay} мая в ${postHour}:${postMin}`
                case 5:
                    return `${postDay} июн в ${postHour}:${postMin}`
                case 6:
                    return `${postDay} июл в ${postHour}:${postMin}`
                case 7:
                    return `${postDay} авг в ${postHour}:${postMin}`
                case 8:
                    return `${postDay} сен в ${postHour}:${postMin}`
                case 9:
                    return `${postDay} окт в ${postHour}:${postMin}`
                case 10:
                    return `${postDay} ноя в ${postHour}:${postMin}`
                case 11:
                    return `${postDay} дек в ${postHour}:${postMin}`
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

    return(
        <div className="content__item">
            <div className="content__header">
                <div className="content__info">
                    <div className="content__avatar">Аватар</div>
                    <div className="content__nick">{post.author}</div>
                </div>
                <div className="content__date">{dateFormating(currentSec - postSec)}</div>
            </div>
            <div className="content__body">
                {post.text}
            </div>
            <div className="content__footer">
                <div className="content__statistic">Лайки {post.likes}</div>
                <div className="content__statistic">Просмотры {post.views}</div>
            </div>
        </div>
    )
}