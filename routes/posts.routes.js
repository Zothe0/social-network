const {Router} = require('express')
const posts = require('../controller/postsController')
const router = Router()

// /api/posts роутинг
router.post('/create', posts.createPost)

router.post('/upload', posts.uploadPosts)

router.patch('/like', posts.likePost)

module.exports = router