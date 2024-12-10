const routes = require('../Backend/routes/TodoRoutes')
const mongoose = require('mongoose')
const userRoutes = require('../Backend/routes/UserRoutes')
require('dotenv').config({path: '../Backend/.env'})
const express = require('express')
const cors = require('cors')

const app = express()


app.listen((process.env.PORT_NUMBER), () => {
    console.log(`listening to port ${process.env.PORT_NUMBER}`)
})


//middleware for cors
app.use(cors())


//middleware to receive incoming request body
app.use(express.json())


//connecting to database
mongoose.connect(process.env.TODO_URI).then(() => {
    console.log('connected to database successfully')
}).catch( err => {
    console.log(err.message)
})


//routes
app.use('/todo_app', routes)
app.use('/api/auth', userRoutes)

