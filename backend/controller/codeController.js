const generateFilePath = require('../utilities/generateFilePath')
const executeCode = require('../utilities/executeCode')

// Run a problem
const runProblem = async (req, res) => {
    const { language = 'py', code, input } = req.body
    if (!code) {
        return res.status(404).json({error: 'Enter some code'})
    }
    try {
        const filePath = await generateFilePath(language, code)
        const output = await executeCode(filePath, language, input)
        res.json({fileName: output})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    runProblem
}
