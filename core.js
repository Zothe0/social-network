const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const server = express()

server.use(express.json({extended: true}))

server.use('/api/auth', require('./routes/auth.routes'))

server.use(express.static(path.join(__dirname, 'view', 'build')))
async function start(){
    const PORT = 5000
    const dataBaseURL = "mongodb+srv://dev-server:toor@test-db.wl4uh.mongodb.net/server?retryWrites=true&w=majority"

    try {
        await mongoose.connect(dataBaseURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(PORT, ()=>{console.log(`Server listen on port ${PORT}...`)})
    } catch (error) {
        console.log('Server error:', error.message)
        process.exit(1)
    }
}
start()