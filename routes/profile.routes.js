const {Router} = require('express')
const profile = require('../controller/profileController')
const router = Router()
const upload = require('../middlewares/fileUploading')


// /api/profile роутинг
router.post('/load-avatar', upload.single('avatar'), profile.loadAvatar)

router.get('/avatar-url', )

module.exports = router