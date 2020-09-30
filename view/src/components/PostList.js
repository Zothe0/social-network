import React from 'react'
import Post from './Post'

export default function PostList({uploadedPosts}){
    const date = Date.now()
    return(<div>
        {uploadedPosts.map(item => <Post post={item} date={date} key={item._id}/>)}
    </div>)
}