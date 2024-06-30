import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstancePublic } from "../api/axiosConfig"; // Assuming axiosInstancePublic is properly configured

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // Function to verify access token from local storage
    const verifyAccessToken = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem("authToken");

        if (accessToken) {
          // Make request to backend API to verify token using Axios
          const response = await axiosInstancePublic.post(
            "/v1/auth/verify-token",
            {
              accessToken,
            }
          );

          if (response.status === 200) {
            const userData = response.data.user;
            setAuthUser(userData); // Update authUser state with user data
          } else {
            // Handle unauthorized or other error responses
            setAuthUser(null); // Clear authUser state if token is invalid
          }
        } else {
          setAuthUser(null); // Clear authUser state if no token found in local storage
        }
      } catch (error) {
        console.error("Error verifying access token:", error);
        setAuthUser(null); // Clear authUser state on error
        setError(error.message); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false when verification is complete
      }
    };

    verifyAccessToken(); // Invoke the verification function on component mount
  }, []);

  // Function to handle logout
  const logout = () => {
    setAuthUser(null); // Clear authUser state
    localStorage.removeItem("accessToken"); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ authUser,setAuthUser, isLoading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
