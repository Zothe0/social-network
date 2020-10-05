const {Router} = require('express')
const multer = require('multer')
const profile = require('../controller/profileController')
const router = Router()
const upload = multer({ dest: '/uploads'})


// /api/profile роутинг
router.post('/load-avatar', upload.single('avatar'), profile.loadAvatar)

module.exports = router