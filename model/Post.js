const {Schema, model} = require('mongoose')

// Схема пользователя, обозначает какие поля есть у поста их тип и свойства
const schema = Schema({
    text: { type: String, required: true },
    author: { type: String, index: true, required: true },
    avatarUrl: { type: String, required: true },
    date: { type: Number, index: true, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true }
})

module.exports = model('Post', schema)