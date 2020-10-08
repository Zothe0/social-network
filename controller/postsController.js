const Post = require('../model/Post')

// Контроллер создания нового поста
const createPost = async(req, res)=>{
    try {
        // Формирует пост из полученных данных и записывает его в бд
        const data = req.body
        post = new Post({ 
            text: data.text,
            author: data.author,
            avatarUrl: data.avatarUrl,
            date: data.date,
            likes: [],
            views: [data.author]})
        await post.save()
        res.status(200).json({ ok: true, message: 'Пост опубликован' })
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

// Контроллер получения массива постов
const fetchPosts = async(req, res)=>{
    try {
        // Кверим бд - "найти все объекты, сортируюя в обратном пордке по айдишнику, пропускаем то количество объектов которое уже выгрузили, лимит выборки 15 объектов"
        const data = await Post.find({}).sort('-_id').skip(req.body.loadedPostsQuantity).limit(15)
        res.status(201).json(data)
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

const likePost = async(req, res)=>{

}

module.exports = { createPost, fetchPosts, likePost }