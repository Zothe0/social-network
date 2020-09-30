import React from 'react'


export default function Post({ post, date }){

    const dateSec= Math.ceil(date/1000)
    const postDateSec = Math.ceil(post.date/1000)

    // const currentDay = (new Date(post.date).getDay()) === (new Date(date).getDay()) 
    // console.log(currentDay)
    // console.log(`${new Date(post.date).getHours()}:${new Date(post.date).getMinutes()}`)

    const dateFormating = (diffDate)=>{
        // Секунды
        if(diffDate<=10) return 'только что'
        else if(diffDate<20) return `${diffDate} секунд назад`
        else if(diffDate<59 && diffDate%10===1) return `${diffDate} секунду назад`
        else if(diffDate<59 && (diffDate%10===2 || diffDate%10===3 || diffDate%10===4)) return `${diffDate} секунды назад`
        else if(diffDate<59) return `${diffDate} секунд назад`
        // Минуты
        else if(diffDate<119) return 'минуту назад'
        else if(diffDate<179) return 'две минуты назад'
        else if(diffDate<239) return 'три минуты назад'
        else if(diffDate<299) return '4 минуты назад'
        else if(Math.floor(diffDate/60)<20) return `${Math.floor(diffDate/60)} минут назад`
        else if(Math.floor(diffDate/60)<59 && Math.floor(diffDate/60)%10===1) return `${Math.floor(diffDate/60)} минутy назад`
        else if((Math.floor(diffDate/60)<59) && ((Math.floor(diffDate/60)%10===2) || (Math.floor(diffDate/60)%10===3) || (Math.floor(diffDate/60)%10===4))) return `${Math.floor(diffDate/60)} минуты назад`
        else if(Math.floor(diffDate/60)<59) return `${Math.floor(diffDate/60)} минут назад`
        // Часы
        else if(Math.floor(diffDate/60)<119) return 'час назад'
        else if(Math.floor(diffDate/60)<179) return 'два часа назад'
        else if(Math.floor(diffDate/60)<239) return 'три часа назад'
        else if((new Date(post.date).getDay()) === (new Date(date).getDay())) return `сегодня в ${new Date(post.date).getHours()}:${new Date(post.date).getMinutes()}`
        return ('залупа')
    }

    return(
        <div className="content__item">
            <div className="content__header">
                <div className="content__info">
                    <div className="content__avatar">Аватар</div>
                    <div className="content__nick">{post.author}</div>
                </div>
                <div className="content__date">{dateFormating(dateSec - postDateSec)}</div>
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