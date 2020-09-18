const {Schema, model} = require('mongoose')

const schema = Schema({
    nickName:{ type: String, index: true, required: true, unique: true} ,
    email: { type: String, index: true, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = model('User', schema)