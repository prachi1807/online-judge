const express = require('express')
const router = express.Router()
const Problem = require('../../models/problemSchema')

// GET list of all problems
router.get('/', (req, res) => {
    res.json({msg: 'GET ALL PROBLEMS LIST'})
})

// GET single problem
router.get('/:id', (req, res) => {
    res.json({msg: 'GET A SINGLE PROBLEM'})
})

// POST single problem
router.post('/', async (req, res) => {
    const {created_by, title, description, test_cases, tag, difficulty} = req.body
    try {
        const problem = await Problem.create({created_by, title, description, test_cases, tag, difficulty})
        res.status(200).json(problem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE single problem
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE SINGLE PROBLEM'})
})

module.exports = router
