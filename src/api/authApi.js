// src/api/authApi.js
import {axiosInstancePublic} from "./axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthTokenObserver from "../hooks/useAuthTokenObserver";

export const registerUser = async (userData) => {
  const response = await axiosInstancePublic.post("/v1/auth/register", userData);
  return response.data;
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// Login API call
export const loginUser = async (userData) => {
    
  const response = await axiosInstancePublic.post("/v1/auth/login", userData);
  return response.data;
};

// Custom hook for login
export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        const accessToken = data.accessToken;
        localStorage.setItem("authToken", accessToken);
        alert("Login successful! Redirecting to Home...");
        // navigate("/");
        return accessToken; // Return accessToken after successful login
      },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
