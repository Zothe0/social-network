import React from 'react'
import Post from './Post'

export default function PostList({ uploadedPosts }) {
    return (
        <div>
            {uploadedPosts.map(item => (
                <Post post={item} currentTime={Date.now()} key={item._id} />
            ))}
        </div>
    )
}
