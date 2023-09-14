const express = require('express')
const router = express.Router()
const {
    runProblem
} = require('../../controller/codeController')
const requireAuth = require('../../middleware/requireAuth')

router.use(requireAuth)
router.post('/run', runProblem)

module.exports = router