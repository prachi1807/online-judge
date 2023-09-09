import { useEffect } from 'react'
import { useProblemListContext } from '../hooks/useProblemListContext'

// components
import ProblemListDetails from '../components/ProblemListDetails'

const Home = () => {
    const {problems, dispatch} = useProblemListContext()
    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/problems')
            // array of problems objects
            const json = await response.json()

            if ( response.ok ) {
                // update global context instead of local states
                dispatch({type: 'SET_PROBLEMS', payload: json})
            }
        }
        fetchProblems()
    }, [dispatch]) // fire only once when component renders
    
    return (
        <div className="home">   
            <div className='problems'>
                {problems && problems.map((problem) => (
                    <ProblemListDetails key={problem._id} problem={problem} />
                ))}
            </div>
        </div>
    )
}

export default Home