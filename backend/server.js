require('dotenv').config()
const express = require('express') 
const mongooose = require('mongoose')

const routes = require('./routes/index')

// express app
const app = express()

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api', routes)

// connect to db
mongooose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
