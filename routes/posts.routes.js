const {Router} = require('express')
const posts = require('../controller/postsController')
const router = Router()

// /api/posts
router.post('/create', posts.createPost)

router.post('/upload', posts.fetchPosts)

module.exports = router