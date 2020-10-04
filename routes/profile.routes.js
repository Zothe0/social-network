const {Router} = require('express')
const profile = require('../controller/profileController')
const router = Router()

// /api/profile роутинг
router.post('/load-avatar', profile.loadAvatar)

module.exports = router