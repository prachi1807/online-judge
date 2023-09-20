import { useEffect } from 'react'
import { React, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'
import SubmissionForm from './SubmissionForm'

const ProblemPage = () => {
    const { problemId } = useParams()
    const { user } = useAuthContext()
    const [ fetchedProblem, setFetchedProblem ] = useState()
    
    const fetchProblemData = async () => {
        const response = await fetch('/api/problems/' + problemId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const problemData = await response.json()
        if (response.ok){
            setFetchedProblem(problemData)
        }
    }

    useEffect(() => {
        if (user) {
            fetchProblemData();
        }
    }, [user])

    if (fetchedProblem) {
        return (
            <div className="home">   
                <div className='problems'>
                    <h2>{fetchedProblem.title}</h2>
                    <p>Description: {fetchedProblem.description}</p>
                    <p>Tag: {fetchedProblem.tag}</p>
                    <p>Difficulty: {fetchedProblem.difficulty}</p>

                    <Link to={`/problems/${problemId}/submissions`}> 
                        <button>Submissions</button>
                    </Link>
                    <button>Leaderboard</button>
                </div>
                <SubmissionForm problemId={problemId}/>
            </div>
        )
    } 
}

export default ProblemPage
