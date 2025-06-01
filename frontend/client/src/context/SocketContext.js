import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000');
      socket.current.emit('addUser', user._id);
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};