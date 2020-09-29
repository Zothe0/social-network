import React from 'react'


export default function Post({ post }){
    return(
        <div className="content__item">
            <div className="content__header">
                <div className="content__info">
                    <div className="content__avatar">Аватар</div>
                    <div className="content__nick">{post.author}</div>
                </div>
                <div className="content__date">{post.date}</div>
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