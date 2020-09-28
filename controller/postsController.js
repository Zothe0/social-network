const jwt = require('jsonwebtoken')
const Post = require('../model/Post')
const constants = require('../constanst')
const { body } = require('express-validator')


const createPost = async(req, res)=>{
    try {
        const decode = jwt.verify(req.body.token, constants.JWTSecret)
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
        switch (error.name){
            case 'TokenExpiredError':
                res.status(400).json({ ok: false, message: 'Token is expried', tokenDied: true })
                break
            default:
                throw error
        }
    }
}

module.exports = {
    createPost
}