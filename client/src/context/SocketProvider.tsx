import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Socket } from 'socket.io-client';
import io from 'socket.io-client'; // Import io

interface ISocketContext {
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context){
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}

export const SocketProvider = ({children} : {children: ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Only initialize socket when needed
        if (!socket) {
            const socketUrl = import.meta.env.VITE_API_SERVER_URL || 
                `http://${window.location.hostname.replace(/--\d+--/, '--80--')}`;
            const newSocket = io(socketUrl, {
                transports: ['websocket', 'polling'],
                secure: false
            });
            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}