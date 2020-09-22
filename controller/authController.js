const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        try {
            await bcrypt.hash(password, saltRounds, async(err, hash)=>{
            user = new User({nickName, email, password: hash })
            await user.save()
            res.status(201).json({ok: true, message: 'Успешная регистрация, теперь вы можете войти в свой аккаунт'})
            })
        } catch (error) {
            throw error
        }
    }
}

const login = async(req, res)=>{
    try {
        const {mix, password} = req.body

        const checkNick = await User.findOne({nickName: mix})
        const checkEmail= await User.findOne({email: mix})

        if(checkNick || checkEmail){
            let user = null

            if(checkNick){user = checkNick}else{user = checkEmail}
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль, введите заново'})
            }else{
                const token = jwt.sign({ userId: user.id, exp: 3600 }, 'toor')
                res.status(201).json({ok: true, token, userId: user.id})
            }
        }else{
            res.status(401).json({ ok: false, message: `Пользователя с ${(mix.includes('@')? 'такой почтой' : 'таким ником')} не существует` })
        }
    } catch (error) {
        res.status(500).json({message: 'Пизда серваку...'})
        throw error
    }
}

module.exports = {
    registration, login
}