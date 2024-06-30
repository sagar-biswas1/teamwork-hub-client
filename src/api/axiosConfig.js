import axios from "axios";

// Base Axios instance for public APIs
export const axiosInstancePublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

// Base Axios instance for private APIs (with token)
export const axiosInstancePrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for private API instance
axiosInstancePrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepts 401 and 403 status
axiosInstancePrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const status = error.response.status;

    // for 401 or 403 remove the user token and move the user to the login
    if (status === 401 || status === 403) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    return Promise.reject(error);
  }
);
