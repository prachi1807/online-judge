require('dotenv').config()
const express = require('express') 
const routes = require('./routes/index')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api', routes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port ', process.env.PORT)
})

