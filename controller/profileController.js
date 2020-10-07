const webp=require('webp-converter')
const fs = require('fs')
const User = require('../model/User')


const changeAvatar = async(req, res)=>{
    const file = req.file
    if(file){
        const outputFile = `${file.destination}${file.filename.split('.')[0]}.webp`
        await webp.cwebp(file.path, outputFile, '-q 65')
        await User.updateOne({nickName: req.body.userNick}, { avatarUrl: `/${outputFile}` })
        res.status(201).json({ ok: true, avatarUrl: `/${outputFile}` })
        fs.unlink(file.path, err=> {if(err) throw err})
        fs.unlink(req.body.previousAvatarUrl.slice(1), err=> {if(err) throw err})
    }else{
        res.status(401).json({ ok: false, message: 'Неверный тип файла' })
    }
}

const getAvatarUrl = async(req, res)=>{
    const avatarUrl = (await User.findOne({nickName: req.body.nickName})).get('avatarUrl')
    res.status(200).json({ ok: true, avatarUrl })
}

module.exports = { changeAvatar, getAvatarUrl }