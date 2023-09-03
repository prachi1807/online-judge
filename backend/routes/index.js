const express = require('express')
const router = express.Router()
const problem = require('./views/problems')
const submission = require('./views/submissions')
const user = require('./views/users')

router.get('/', (req, res) => {
    res.json({msg: 'BASE ROUTE'})
})

router.use('/problems', problem)
router.use('/submissions', submission)
router.use('/users', user)


module.exports = router
