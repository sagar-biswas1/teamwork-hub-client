
import { useState, useEffect } from 'react';

const useAuthTokenObserver = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authToken') {
        setAuthToken(event.newValue);
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return authToken;
};

export default useAuthTokenObserver;
