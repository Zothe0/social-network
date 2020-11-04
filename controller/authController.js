const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const constants = require('../constants')
const { PUBLIC_URL } = require('../constants')

// Контроллер регистрации
const registration = async (req, res) => {
    // Достаём результат валидации произведённой в мидлваре
    const errors = validationResult(req)
    const fault = errors.errors

    const saltRounds = 10
    // Если есть ошибки валидации отправляет их на фронт
    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, fault })
    }

    // Проверяет на уникальность ник и почту
    const { nickName, password } = req.body
    const checkNick = await User.findOne({ nickName })
    // Если не уникально
    if ( checkNick ) {
        res.status(400).json({
            ok: false,
            message: 'Такой ник уже зарегистрирован'
        })
        // Иначе продолжает записывать
    } else {
        try {
            // Хешируем пароль
            await bcrypt.hash(password, saltRounds, async (err, hash) => {
                const defaultAvatarPath = `${PUBLIC_URL}/images/avatars/default.webp`
                // Сохраняет юзера в бд
                user = new User({
                    nickName,
                    password: hash,
                    avatarUrl: defaultAvatarPath,
                })
                await user.save()
                res.status(201).json({ ok: true })
            })
        } catch (error) {
            res.status(501).json({ ok: false, message: 'Ошибка на сервере' })
            throw error
        }
    }
}

// Контроллер логина
const login = async (req, res) => {
    try {
        // Достаёт ник/почту и пароль из запроса
        const { nickName, password } = req.body
        // Проверяет существует ли юзер с такой почтой/ником
        const user = await User.findOne({ nickName })

        // Если найден юзер с такой почтой/ником
        if (user) {

            // Проверяет пароли
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Неверный пароль',
                    incorrectField: 'password',
                })
            } else {
                // Создаёт jwt токен который истекает через час
                const token = jwt.sign(
                    { userId: user.id },
                    constants.JWT_SECRET,
                    { expiresIn: '1h' }
                )
                // Отправляет на фронт ник и токен
                res.status(201).json({
                    ok: true,
                    token,
                    nickName: user.nickName,
                })
            }
            // Если юзер не найден
        } else {
            res.status(401).json({
                ok: false,
                message: 'Такого пользователя не существует',
                incorrectField: 'nickName',
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере' })
        throw error
    }
}

module.exports = {
    registration,
    login,
}
