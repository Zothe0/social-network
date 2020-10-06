const {Router} = require('express')
const profile = require('../controller/profileController')
const router = Router()
const upload = require('../middlewares/fileUploading')


// /api/profile роутинг
router.post('/load-avatar', upload.single('avatar'), profile.loadAvatar)

router.post('/avatar-url', profile.getAvatarUrl)

module.exports = router