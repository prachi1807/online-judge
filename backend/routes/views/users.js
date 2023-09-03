const express = require('express')
const router = express.Router()
const User = require('../../models/userSchema')

// POST a new user
router.post('/', async (req, res) => {
    const {user_name, email, password} = req.body
    try {
        const user = await User.create({user_name, email, password})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router
