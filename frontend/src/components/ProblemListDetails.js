const ProblemListDetails = ({problem}) => {
    
    return (
        <div className="problem-details">
            <h4>{problem.title}</h4>
            <p><strong>Tags: </strong>{problem.tag}</p>
            <p><strong>Difficulty: </strong>{problem.difficulty}</p>
            <span className="material-symbols-outlined">delete</span>
        </div>
    )
}

export default ProblemListDetails