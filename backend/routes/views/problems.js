const express = require('express')
const router = express.Router()
const {
    createProblem,
    getProblemList,
    getProblem,
    deleteProblem
} = require('../../controller/problemController')

// GET list of all problems
router.get('/', getProblemList)

// GET single problem
router.get('/:id', getProblem)

// POST single problem
router.post('/', createProblem)

// DELETE single problem
router.delete('/', deleteProblem)

module.exports = router
