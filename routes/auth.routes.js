const {Router} = require('express')
const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const auth = require('../controller/authController')
const router = Router()

router.post('/registration',[
    body('nickName').trim().isLength({ min: 4 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 })
  ], auth.registration)

router.get('/login', async(req, res)=>{
    
})
module.exports = router