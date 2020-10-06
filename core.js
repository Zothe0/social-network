const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const constants = require('./constants')
const server = express()

// Позволяет использовать json в epxress
server.use(express.json({extended: true}))

// Роутинг
server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/posts', require('./routes/posts.routes'))
server.use('/api/profile', require('./routes/profile.routes'))


// При подключении к серверу отдаётся страничка с реактом
server.get('/model/static/*', express.static(path.join(__dirname, 'model', 'static')), (req, res)=>{
    res.sendFile(path.join(__dirname, req.path))
    console.log(req.path)
} )

server.get('*', express.static(path.join(__dirname, 'view', 'build')), (req, res)=> res.sendFile(path.join(__dirname, 'view', 'build', 'index.html')))
async function start(){
    //! Это облачная бд
    const dataBaseURL = "mongodb+srv://dev-server:toor@test-db.wl4uh.mongodb.net/server?retryWrites=true&w=majority"
    //! Это бд на моём vps
    // const dataBaseURL = "mongodb://home:3666@185.193.143.164:27017/home?authSource=admin&readPreference=primary&appname=server"
    //! Локальная бд
    // const dataBaseURL = 'mongodb://localhost:27017/?readPreference=primary&appname=server'

    // Подключается к бд потом запускается сервер
    try {
        await mongoose.connect(dataBaseURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(constants.PORT, ()=>{console.log(`Server listen on port ${constants.PORT}...`)})
    } catch (error) {
        console.log('Server error:', error.message)
        process.exit(1)
    }
}
start()