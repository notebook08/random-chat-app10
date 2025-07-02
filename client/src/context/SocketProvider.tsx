import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

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
        const socketUrl = `https://${window.location.hostname}:8000`;
        const newSocket = io(socketUrl);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}