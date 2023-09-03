const express = require('express')
const router = express.Router()
const {
    createUser
} = require('../../controller/userController')

// POST a new user
router.post('/', createUser)

module.exports = router
