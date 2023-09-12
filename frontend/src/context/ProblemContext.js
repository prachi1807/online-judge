// to keep local state in sync with the data updates made in db
import { createContext, useReducer } from "react";

export const ProblemsContext = createContext()

export const problemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROBLEMS': 
            return {
                problem: action.payload
            }
        default:
            return state
    }
}

export const ProblemsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(problemsReducer, {
        problem: null  // inital value
    })

    return (
        <ProblemsContext.Provider value={{...state, dispatch}}>
            { children }
        </ProblemsContext.Provider>
    )
}
