import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";



const PrivateRoute = ({ children }) => {
    const { authUser ,isLoading } = useAuthContext();
    const location = useLocation();

    console.log({authUser, isLoading})
    if(isLoading){
        return <progress className="progress w-56"></progress>
    }

    if (authUser) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;