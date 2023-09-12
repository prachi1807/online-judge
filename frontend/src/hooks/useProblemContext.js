import { ProblemsContext } from "../context/ProblemContext";
import { useContext } from "react";

export const useProblemContext = () => {
    const context = useContext(ProblemsContext)
    if (!context) {
        throw Error('ProblemsContext must be used inside an ProblemsContextProvider')
    }
    return context
}