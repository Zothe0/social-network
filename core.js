const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const constants = require('./constants')


const server = express()

server.use(express.json({extended: true}))

server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/posts', require('./routes/posts.routes'))

server.use(express.static(path.join(__dirname, 'view', 'build')))
server.get('*', (req, res)=> res.sendFile(path.join(__dirname, 'view', 'build', 'index.html')))
async function start(){
    const dataBaseURL = "mongodb+srv://dev-server:toor@test-db.wl4uh.mongodb.net/server?retryWrites=true&w=majority"

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