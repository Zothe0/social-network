const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const loadAvatar = (req, res)=>{
    console.log('Recive request')
    console.log(req.file)
    res.status(200).json({ ok: true })
}

module.exports = {
    loadAvatar
}