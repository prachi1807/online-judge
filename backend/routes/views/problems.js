const express = require('express')
const router = express.Router()

// GET list of all problems
router.get('/', (req, res) => {
    res.json({msg: 'GET ALL PROBLEMS LIST'})
})

// GET single problem
router.get('/:id', (req, res) => {
    res.json({msg: 'GET A SINGLE PROBLEM'})
})

// POST single problem
router.post('/:id', (req, res) => {
    res.json({msg: 'ADD A NEW SINGLE PROBLEM'})
})

// DELETE single problem
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE SINGLE PROBLEM'})
})

module.exports = router
