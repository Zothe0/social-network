const webp=require('webp-converter')
const fs = require('fs')
const User = require('../model/User')


const loadAvatar = async(req, res)=>{
    const file = req.file
    console.log(req.body.userNick)
    if(file){
        const outputFile = `${file.destination}${file.filename.split('.')[0]}.webp`
        await webp.cwebp(file.path, outputFile, '-q 65')
        await User.updateOne({nickName: req.body.userNick}, { avatarUrl: `/${outputFile}` })
        res.status(201).json({ ok: true, avatarUrl: `/${outputFile}` })
        fs.unlink(file.path, err=> {if(err) throw err})
    }else{
        res.status(401).json({ ok: false, message: 'Неверный тип файла' })
    }
}

const getAvatarUrl = async(req, res)=>{
    // const avatarUrl = (await User.findOne({nickName: req.nickName})).get('avatarUrl')
    console.log(req.headers)
    res.status(200).json({ ok: true, avatarUrl })
}

module.exports = {
    loadAvatar
}