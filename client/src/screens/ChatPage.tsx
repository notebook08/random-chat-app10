import { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

const initialChats = [
  {
    id: 1,
    name: 'Aman',
    lastMessage: 'What’s up?',
    time: '10:24 AM',
    unread: true,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 2,
    name: 'Priya',
    lastMessage: 'Haha 😂',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 3,
    name: 'Stranger #314',
    lastMessage: 'Let’s connect again soon 💕',
    time: 'Monday',
    unread: true,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];



// export default ChatPage; // Removed duplicate default export


type Chat = typeof initialChats[number];

/* Duplicate PersonalChat component removed to resolve redeclaration error. */

/* Removed duplicate ChatPageWrapper to resolve redeclaration error */


// --- SOCKET.IO SETUP ---

const SOCKET_URL = 'http://localhost:5000'; // Change as needed

// --- SOCKET HOOK ---
function useChatSocket(setChats: React.Dispatch<React.SetStateAction<Chat[]>>) {
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('chats', (serverChats: Chat[]) => {
      setChats(serverChats);
    });

    socket.on('chat:update', (updatedChat: Chat) => {
      setChats(prev =>
        prev.map(chat => (chat.id === updatedChat.id ? updatedChat : chat))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [setChats]);
}

// --- MAIN WRAPPER ---
const ChatPageWrapper = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(initialChats);

  useChatSocket(setChats);

  if (selectedChat) {
    return (
      <PersonalChat
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
        setChats={setChats}
      />
    );
  }

  return <ChatPageContent onChatClick={setSelectedChat} chats={chats} setChats={setChats} />;
};

// --- PERSONAL CHAT SCREEN (NATIVE LAYOUT) ---
const PersonalChat = ({
  chat,
  onBack,
  setChats,
}: {
  chat: Chat;
  onBack: () => void;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}) => {
  const [messages, setMessages] = useState([
    { fromMe: false, text: chat.lastMessage, time: chat.time },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Optionally, fetch chat messages from server here
    setMessages([{ fromMe: false, text: chat.lastMessage, time: chat.time }]);
  }, [chat]);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        fromMe: true,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setInput('');

      // Update last message in chat list and emit to socket
      const updatedChat = {
        ...chat,
        lastMessage: input,
        time: newMsg.time,
        unread: false,
      };
      setChats(prev =>
        prev.map(c => (c.id === chat.id ? updatedChat : c))
      );

      const socket = io(SOCKET_URL);
      socket.emit('chat:update', updatedChat);
      socket.disconnect();
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 bg-pink-200 flex items-center">
        <button onClick={onBack} className="mr-3 text-pink-700 font-bold text-xl">&larr;</button>
        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover mr-3" />
        <span className="font-semibold text-pink-900 text-lg">{chat.name}</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-pink-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.fromMe
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-gray-800 border border-pink-200'
              }`}
            >
              <div>{msg.text}</div>
              <div className="text-xs text-right text-gray-400 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="p-3 bg-white flex items-center border-t border-pink-100">
        <input
          className="flex-1 px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-pink-400 text-white rounded-full font-semibold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

// --- CHAT LIST PAGE (USES SOCKET CHATS) ---
const ChatPageContent = ({
  onChatClick,
  chats,
  setChats,
}: {
  onChatClick: (chat: Chat) => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}) => {
  const [search, setSearch] = useState('');
  const [longPressedChatId, setLongPressedChatId] = useState<number | null>(null);
  let longPressTimer: NodeJS.Timeout;

  // Real-time sync
  useChatSocket(setChats);

  // Handle long press logic
  const handleMouseDown = (chatId: number) => {
    longPressTimer = setTimeout(() => {
      setLongPressedChatId(chatId);
    }, 600); // 600ms for long press
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimer);
  };

  const handleDelete = (chatId: number) => {
    setLongPressedChatId(null);
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    // Emit delete event to server for real-time sync
    const socket = io(SOCKET_URL);
    socket.emit('chat:delete', chatId);
    socket.disconnect();
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow overflow-hidden flex flex-col">
      <div className="p-4 bg-pink-200 text-pink-900 font-bold text-xl">
        AjnabiCam Chats 💬
      </div>
      <div className="px-4 pt-3 pb-2 bg-white">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div className="flex-1 overflow-y-auto divide-y">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-4 hover:bg-pink-50 cursor-pointer relative"
              onClick={() => {
                if (longPressedChatId !== chat.id) onChatClick(chat);
              }}
              onMouseDown={() => handleMouseDown(chat.id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={() => handleMouseDown(chat.id)}
              onTouchEnd={handleMouseUp}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{chat.name}</h2>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread && (
                <div className="ml-2 w-2 h-2 rounded-full bg-pink-500" />
              )}
              {longPressedChatId === chat.id && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(chat.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-2 bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    onClick={e => {
                      e.stopPropagation();
                      setLongPressedChatId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-4">No chats found</div>
        )}
      </div>
    </div>
  );
};

export default ChatPageWrapper;