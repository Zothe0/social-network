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
        res.status(201).json({ ok: true, message: 'Пост опубликован' })
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

// Контроллер получения массива постов
const uploadPosts = async(req, res)=>{
    try {
        const nickName = req.body.nickName
        // Кверим бд - "найти все объекты, сортируюя в обратном пордке по айдишнику, пропускаем то количество объектов которое уже выгрузили, лимит выборки 15 объектов"
        const data = await Post.find({}).sort('-_id').skip(req.body.loadedPostsQuantity).limit(10)
        // console.log(nickName)
        data.forEach(async item => {
            const newViews = item.get('views')
            // await item.updateOne({views: []})
            if(!newViews.includes(nickName) && nickName !== null) {
                newViews.push(nickName)
                await item.updateOne({views: [...newViews]})
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error.name)
        throw error
    }
}

const likePost = async(req, res)=>{
    // console.log(req.body.newLikes)
    await Post.findByIdAndUpdate(req.body.postId, { likes: req.body.newLikes })
    res.status(200).end()
}

module.exports = { createPost, uploadPosts, likePost }