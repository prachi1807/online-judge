const express = require('express')
const router = express.Router()
const {
    getSubmissionsForProblem
} = require('../../controller/submissionController')

// GET submissions for a user to display past submissions for a user
router.get('/:user_id', (req, res) => {
    res.json({msg: 'GET SUBMISSIONS FOR A USER'})
})

// GET submissions for a problem (problem leaderboard)
router.get('/:problem_id', getSubmissionsForProblem)


module.exports = router
