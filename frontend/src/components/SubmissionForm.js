import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const SubmissionForm = () => {
    const { user } = useAuthContext()
    const [language, setLanguage] = useState('')
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [output, setOutput] = useState('')

    const runCode = async (e) => {
        e.preventDefault()

        if (!user){
            setError('You must be logged in')
            return
        }

        const payload = {language, code, input}
        const response = await fetch('/api/code/run', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setLanguage('')
            setCode('')
            setInput('')
            setError(null)
            setEmptyFields([])
            setOutput(json.output)
            console.log('Submission Made', json.output)
        }
    }

    const submitCode = () => {
        console.log('Submit code here')
    }

    return (
        <form className="create">
            <label>Select a programming language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="java">Java</option>
                <option value="py">Python</option>
                <option value="cpp">C ++ </option>
            </select>
            
            <label>Enter your code:</label>
            <textarea
                rows="10"
                cols="50"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={emptyFields.includes('code') ? 'error' : ''}
            />

            <label>Enter input here:</label>
            <textarea
                rows="5"
                cols="50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={emptyFields.includes('input') ? 'error' : ''}
            />  
            <button type="button" onClick={runCode}>Run Code</button>
            <button type="button" onClick={submitCode}>Submit Code</button>
            {error && <div className="error">{error}</div>}

            {output && <div className='output'>{output}</div>}
        </form>
    )

}

export default SubmissionForm
