import { useEffect } from 'react'
import { useProblemListContext } from '../hooks/useProblemListContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

// components
import ProblemListDetails from '../components/ProblemListDetails'
import ProblemForm from '../components/ProblemForm'

const Home = () => {
    const {problems, dispatch} = useProblemListContext()
    const {user} = useAuthContext()
    
    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('/api/problems', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            // array of problems objects
            const json = await response.json()

            if ( response.ok ) {
                // update global context instead of local states
                dispatch({type: 'SET_PROBLEMS', payload: json})
            }
        }
        if (user){
            fetchProblems()
        }
    }, [dispatch, user]) // fire only once when component renders
    
    return (
        <div className="home">   
            <div className='problems'>
                {problems && problems.map((problem) => (
                    <Link key={problem._id} to={`/problems/${problem._id}`}>
                        <ProblemListDetails key={problem._id} problem={problem} />
                    </Link>
                ))}
            </div>
            <ProblemForm />
        </div>
    )
}

export default Home