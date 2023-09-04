const express = require('express')
const router = express.Router()
const {
    runProblem
} = require('../../controller/codeController')


router.post('/run', runProblem)

module.exports = router