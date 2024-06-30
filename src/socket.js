
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './context/AuthContext';

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
 
  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      query: { userId },
    });
    
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;

