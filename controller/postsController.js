const jwt = require('jsonwebtoken')
const Post = require('../model/Post')
const constants = require('../constants')


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
        res.status(200).json({ ok: true, message: 'Пост опубликован', post })
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

const fetchPosts = async(req, res)=>{
    try {
        const data = await Post.find({}).limit(3)
        res.status(201).json(data)
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

module.exports = {
    createPost, fetchPosts
}