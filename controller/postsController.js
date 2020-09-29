const Post = require('../model/Post')


const createPost = async(req, res)=>{
    try {
        const data = req.body
        post = new Post({ 
            text: data.text,
            author: data.author,
            date: data.date,
            likes: 0,
            views: 1})
        await post.save()
        res.status(200).json({ ok: true, message: 'Пост опубликован' })
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

const fetchPosts = async(req, res)=>{
    try {
        // console.log(req.body.loadedPostsQuantity)
        const data = await Post.find({}).sort('-_id').skip(req.body.loadedPostsQuantity).limit(15)
        res.status(201).json(data)
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

module.exports = {
    createPost, fetchPosts
}