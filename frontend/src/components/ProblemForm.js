import { useState } from "react"
import { useProblemListContext } from "../hooks/useProblemListContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ProblemForm = () => {
    const {dispatch} = useProblemListContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [difficulty, setDifficulty] = useState('easy')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user){
            setError('You must be logged in')
            return
        }

        const test_cases = [
            {
                input: 10,
                output: 100
            } 
        ]
        const problem = {title, description, test_cases, tag, difficulty}
        const response = await fetch('/api/problems', {
            method: 'POST',
            body: JSON.stringify(problem),
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
            setTitle('')
            setDescription('')
            setTag('')
            setDifficulty('easy')
            setError(null)
            setEmptyFields([])
            console.log('New Problem Added', json)
            dispatch({type: 'CREATE_PROBLEM', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new problem</h3>
            
            <label>Problem Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description :</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Tag :</label>
            <input
                type="text"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                className={emptyFields.includes('tag') ? 'error' : ''}
            />

            <label>Difficulty :</label>
            <select value={difficulty} className={emptyFields.includes('difficulty') ? 'error' : ''} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select><br />      

            <button>Add Problem</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProblemForm
