const {Schema, model} = require('mongoose')

// Схема пользователя, обозначает какие поля есть у юзера их тип и свойства
const schema = Schema({
    nickName:{ type: String, index: true, required: true, unique: true} ,
    email: { type: String, index: true, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, required: true }
})

module.exports = model('User', schema)