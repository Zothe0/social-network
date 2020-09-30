import React from 'react'


export default function TimePage(){

    let time = Date.now()
    const date = new Date(time).getDate()
    return(<>
        <div className='wrapper'>
            <div className='time-content content'>
                <div className='time-block'>
                    <div className='time-block__header'>Заголовок</div>
                    <div className='time-block__timer'>{date}</div>
                </div>
            </div>
        </div>
    </>)
}