import { useContext } from "react"
import AuthContext from "../auth/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    const context = useContext(AuthContext)
    return context.isSignedIn ? children : <Navigate to={"/login"}/>
}

export default ProtectedRoute;