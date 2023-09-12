import { useEffect } from 'react'
import { React, useState } from "react"
import { useParams } from "react-router-dom"

import { useAuthContext } from '../hooks/useAuthContext'
import { useProblemContext } from "../hooks/useProblemContext"
import ProblemForm from '../components/ProblemForm'

const ProblemView = ({ problem }) => {
    return (
        <div className='problem-list-details'>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
        </div>
    )
}

const ProblemDetails = () => {
    const { problemId } = useParams()
    const { user } = useAuthContext()
    const { problem, dispatch } = useProblemContext('')
    const [ fetchedProblem, setFetchedProblem ] = useState('')
    
    useEffect(() => {
        const fetchProblemData = async () => {
            const response = await fetch('/api/problems/' + problemId, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            
            const json = await response.json()
            if (response.ok){
                dispatch({type: 'SET_PROBLEMS', payload: json})
                setFetchedProblem(json)
            }
            
        }
        if (user){
            fetchProblemData()
        }
    }, [dispatch, user])


    return (
        <div className="home">   
            <div className='problems'>
                {problem && problem.map((_problem) => (
                    <ProblemView key={_problem._id} problem={_problem} />
                ))}
            </div>
        </div>
    )
}

export default ProblemDetails