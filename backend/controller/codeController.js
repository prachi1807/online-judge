const generateFilePath = require('../utilities/generateFilePath')
const executeCode = require('../utilities/executeCode')

// Run a problem
const runProblem = async (req, res) => {
    const created_by = req.user._id
    const { language, code, input } = req.body

    let emptyFields = []
    if (!language) {
        emptyFields.push('language')
    }
    if (!code) {
        emptyFields.push('code')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const filePath = await generateFilePath(language, code)
        const output = await executeCode(filePath, language, input)
        res.status(200).json({output: output})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    runProblem
}
