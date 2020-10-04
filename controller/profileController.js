const { request } = require("../view/src/redux/Api")

const loadAvatar = (req, res)=>{
    console.log(req)
    res.status(200).json({ ok: true })
}

module.exports = {
    loadAvatar
}