const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../model/User')


const registration = async(req, res)=>{
    
    const errors = validationResult(req)
    const saltRounds = 10
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
        const hashedPassword = await bcrypt.hash(password, saltRounds, (err, hash)=>{})
        user = new User({nickName, email, hashedPassword})
        await user.save()
        res.status(201).json({ok: true, message: 'Успешная регистрация, теперь вы можете войти в свой аккаунт'})
    }
}

module.exports = {
    registration,
}