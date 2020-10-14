const { response } = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'model/static/images/avatars/')
    },
    filename(req, file, cb) {
        cb(null, `${Math.floor(Date.now() / 1000)}-${file.originalname}`)
    },
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/webp'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5,
}

module.exports = multer({ storage, fileFilter, limits })
