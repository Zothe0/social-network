const {Router} = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../model/User')
const router = Router()

router.post('/registration',[
    body('nickName').trim().isLength({ min: 5 }),
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 })
  ], async(req, res)=>{
    
    const errors = validationResult(req)

    const fault = errors.errors

    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, message: 'ошибка регистрации' , fault})
    }

    const {nickName, email, password} = req.body
    const checkNick = await User.findOne({nickName})
    const checkEmail= await User.findOne({email})
    if(checkNick || checkEmail){
        const paste = checkNick ? 'таким ником' : 'такой почтой'
        res.status(400).json({ok: false, message: `Пользователь с ${paste} уже зарегистрирован`})
    }else{
        user = new User({nickName, email, password})
        await user.save()
        res.status(201).json({ok: true, message: 'Успешная регистрация, теперь вы можете войти в свой аккаунт'})
    }
})
router.get('/login', async(req, res)=>{
    
})
module.exports = router