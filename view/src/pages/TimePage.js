import React from 'react'


export default function TimePage(){

    let time = Date.now()
    const date = new Date(time).getDay()
    const formatedDate = date
    console.log(formatedDate)

    return(<>
        <div className='wrapper'>
            <div className='time-content content'>
                <div className='time-block'>
                    <div className='time-block__header'>Заголовок</div>
                    <div className='time-block__timer'>{formatedDate}</div>
                </div>
            </div>
        </div>
    </>)
}