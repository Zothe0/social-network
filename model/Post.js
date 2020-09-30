const {Schema, model} = require('mongoose')

const schema = Schema({
    text:{ type: String, required: true },
    author:{ type: String, index: true, required: true } ,
    date: { type: Number, index: true, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true }
})

module.exports = model('Post', schema)