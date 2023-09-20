import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Submission = () => {
    const { user } = useAuthContext()
    const { problemId } = useParams();
    const [ submissions, setSubmissions ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchProblemSubmissionData = async () => {
            try {
                const response = await fetch(`/api/submissions/?problem_id=${problemId}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${user.token}`
                    }
                })
                
                if (response.ok) {
                    const data = await response.json()
                    setSubmissions(data)
                }
                else if (response.status === 404) {
                    setError('No submissions found for this problem.')
                }
            } catch (error) {
                console.error('Error fetching submissions:', error)
                setError('An error occurred while fetching submissions.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchProblemSubmissionData()

      }, [problemId, user])
    

    return (
        <div className="submissions">   
            <h2>Submissions:</h2>
            
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && submissions.length === 0 && (
                <p>No submissions found for this problem.</p>
            )}

            {!isLoading && !error && submissions.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Verdict</th>
                            <th>Score</th>
                        </tr>

                        <tbody>
                            {submissions.map((submission, index) => (
                                <tr key={index}>
                                    <td>{formatDistanceToNow(new Date(submission.createdAt), {addSuffix: true})}</td>
                                    <td>{submission.verdict}</td>
                                    <td>{submission.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </thead>
                </table>
            )}
        </div>
    )
}

export default Submission
