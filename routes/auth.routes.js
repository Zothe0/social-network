const {Router} = require('express')
const { body } = require('express-validator')
const auth = require('../controller/authController')
const router = Router()

// /api/auth роутинг
// Вторым параметром передаём мидлвару валидации
router.post('/registration',[
    body('nickName').trim().isLength({ min: 4 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 })
  ], auth.registration)

router.post('/login', auth.login)
module.exports = router