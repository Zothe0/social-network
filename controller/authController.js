const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const User = require('../model/User')
let lastId = null
filePath = path.resolve(__dirname, '..', 'model', 'lastId.txt')
const constants = require('../constants')


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
                if(!lastId){
                    lastId= await new Promise((resolve, reject)=>{
                        fs.readFile(filePath, 'utf-8', (err, content) =>{
                            if(err) throw err
                            content = Number(content)
                            resolve(content)
                        })
                    })
                }
                user = new User({ id: lastId, nickName, email, password: hash})
                await user.save()
                await new Promise((res)=>{
                    lastId++
                    fs.writeFile(filePath, lastId, err =>{
                        if(err) throw err
                        res()
                    })
                })
                res.status(201).json({ok: true, message: 'Успешная регистрация'})
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
                const token = jwt.sign({ userId: user.id }, constants.JWTSecret, { expiresIn: '1h' })
                res.status(201).json({ok: true, token, userNick: user.nickName})
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