const express = require('express')
const router = express.Router()

// GET submissions for a user to display past submissions for a user
router.get('/:user_id', (req, res) => {
    res.json({msg: 'GET SUBMISSIONS FOR A USER'})
})

// GET submissions for a problem (problem leaderboard)
router.get('/:problem_id', (req, res) => {
    res.json({msg: 'GET SUBMISSIONS FOR A PROBLEM ID'})
})


module.exports = router
