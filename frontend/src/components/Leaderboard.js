import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Leaderboard = () => {
    const { user } = useAuthContext()
    const { problemId } = useParams();
    const [ leaderboard, setLeaderboard ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch(`/api/submissions/leaderboard/?problem_id=${problemId}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${user.token}`
                    }
                })
                
                if (response.ok) {
                    const data = await response.json()
                    setLeaderboard(data)
                }
                else if (response.status === 404) {
                    setError('No submissions found for this problem.')
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error)
                setError('An error occurred while fetching leaderboard.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchLeaderboardData()

      }, [problemId, user])
    

    return (
        <div className="submissions">   
            <h2>Leaderboard:</h2>
            
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && leaderboard.length === 0 && (
                <p>No submissions found for this problem.</p>
            )}

            {!isLoading && !error && leaderboard.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User ID</th>
                            <th>Verdict</th>
                            <th>Score</th>
                        </tr>

                        <tbody>
                            {leaderboard.map((leaderboard, index) => (
                                <tr key={index}>
                                    <td>{formatDistanceToNow(new Date(leaderboard.createdAt), {addSuffix: true})}</td>
                                    <td>{leaderboard.user_id}</td>
                                    <td>{leaderboard.verdict}</td>
                                    <td>{leaderboard.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </thead>
                </table>
            )}
        </div>
    )
}

export default Leaderboard
