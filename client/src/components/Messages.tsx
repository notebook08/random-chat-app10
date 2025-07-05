import { useCallback, useEffect, useRef, useState } from "react"
import { useSocket } from "../context/SocketProvider"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

interface MessageProps{
    remoteChatToken: string | null;
    messagesArray: Array<{ sender: string; message: string; }>;
    setMessagesArray: React.Dispatch<React.SetStateAction<Array<{ sender: string; message: string }>>>;
}

interface ReceivedMessageProps {
    message: string;
    from: string;
}

export default function Messages({remoteChatToken, messagesArray, setMessagesArray}: MessageProps) {
    const {socket} = useSocket();
    const [message, setMessage] = useState<string>('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagesArray]);

    const handleSendMessage = () => {
        if (!message.trim() || !remoteChatToken) return;

        setMessagesArray((prev) => [...prev, {sender: 'You', message: message.trim()}]);
        setMessage('');
        
        socket?.emit("send:message", {message: message.trim(), targetChatToken: remoteChatToken});
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleSendMessage();
        }
    };

    const handleMessageReceived = useCallback(({message}: ReceivedMessageProps) => {
        setMessagesArray((prev) => [...prev, {sender: 'Stranger', message}])
    }, [setMessagesArray]);

    useEffect(() => {
        socket?.on("message:recieved", handleMessageReceived);

        return () => {
            socket?.off("message:recieved", handleMessageReceived);
        }
    }, [handleMessageReceived, socket]);

    return (
        <div className="flex flex-1 flex-col h-full">
            {/* Messages Area */}
            <div className="h-full overflow-y-auto p-4 bg-gray-200 dark:bg-gray-900 scrollbar-hide">
                {messagesArray.map((msg, ind) => (
                    <div key={ind} className="mb-2">
                        <strong className={`${msg.sender === 'You' ? 'text-green-600' : 'text-red-500'}`}>
                            {msg.sender}:
                        </strong> {msg.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 left-0 w-full flex gap-2 border-t border-gray-200 dark:border-gray-700 p-4">
                <Input 
                    ref={inputRef}
                    placeholder="Type a message..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    aria-label="Message input"
                    disabled={!remoteChatToken}
                    className="flex-1 bg-gray-200 dark:bg-gray-900"
                />
                <Button 
                    className="gap-2" 
                    onClick={handleSendMessage} 
                    disabled={!remoteChatToken || !message.trim()}
                    aria-label="Send message"
                >
                    <Send size={18} /> Send
                </Button>
            </div>
        </div>
    );
}