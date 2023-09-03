const Submission = require('../models/submissionSchema')

// Create a new submission


// get all submission for a problem
const getSubmissionsForProblem = async (req, res) => {
    const { problem_id } = req.param
    const submissions = await Submission.findB({problem_id: problem_id})
    res.status(200).json(submissions)
}

// GET submissions for a user to display past submissions for a user


module.exports = {
    getSubmissionsForProblem
}

