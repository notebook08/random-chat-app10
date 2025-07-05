import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, MoreVertical, Send, Search, X } from 'lucide-react';
import BottomNavBar from '../components/BottomNavBar';
import { useFriends } from '../context/FriendsProvider';

const initialChats = [
  {
    id: 1,
    name: 'Aman Kumar',
    lastMessage: 'What\'s up? How are you doing today?',
    time: '10:24 AM',
    unreadCount: 3,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isFriend: false,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    lastMessage: 'Haha 😂 That was so funny!',
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isFriend: false,
  },
  {
    id: 3,
    name: 'Stranger #314',
    lastMessage: 'Let\'s connect again soon 💕',
    time: 'Monday',
    unreadCount: 1,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isFriend: false,
  },
  {
    id: 4,
    name: 'Rahul Singh',
    lastMessage: 'Nice talking to you!',
    time: 'Tuesday',
    unreadCount: 2,
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isFriend: false,
  },
];

type Chat = typeof initialChats[number];

const ChatPageWrapper = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const { friends } = useFriends();

  // Merge friends into chats
  useEffect(() => {
    const friendChats = friends.map(friend => ({
      id: parseInt(friend.id) || Math.random(),
      name: friend.name,
      lastMessage: friend.isOnline ? 'Online now' : 'Tap to start chatting',
      time: friend.isOnline ? 'Online' : 'Offline',
      unreadCount: 0,
      avatar: friend.avatar,
      isFriend: true,
    }));

    setChats([...friendChats, ...initialChats]);
  }, [friends]);

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
    setMessages([{ fromMe: false, text: chat.lastMessage, time: chat.time }]);
    // Mark chat as read
    setChats(prev =>
      prev.map(c => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
    );
  }, [chat, setChats]);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        fromMe: true,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMsg]);
      setInput('');

      const updatedChat = {
        ...chat,
        lastMessage: input,
        time: newMsg.time,
        unreadCount: 0,
      };
      setChats(prev =>
        prev.map(c => (c.id === chat.id ? updatedChat : c))
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow-xl overflow-hidden flex flex-col relative pb-20">
      {/* Enhanced Header */}
      <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-600 flex items-center shadow-lg">
        <button 
          onClick={onBack} 
          className="mr-3 text-white hover:scale-110 transition-transform"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <img 
          src={chat.avatar} 
          alt={`${chat.name} avatar`} 
          className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-white shadow-md" 
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg block">{chat.name}</span>
            {chat.isFriend && (
              <span className="bg-green-400 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                Friend
              </span>
            )}
          </div>
          <span className="text-rose-100 text-xs">
            {chat.isFriend && chat.time === 'Online' ? 'Online' : 'Last seen recently'}
          </span>
        </div>
        <button className="text-white hover:scale-110 transition-transform">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-rose-50 to-pink-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-xs shadow-md ${
                msg.fromMe
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                  : 'bg-white text-gray-800 border border-rose-200'
              }`}
            >
              <div className="leading-relaxed">{msg.text}</div>
              <div className={`text-xs text-right mt-1 ${msg.fromMe ? 'text-rose-100' : 'text-gray-400'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Input */}
      <div className="p-4 bg-white flex items-center border-t border-rose-100 shadow-lg">
        <input
          className="flex-1 px-4 py-3 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          className="ml-3 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send size={16} />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [longPressedChatId, setLongPressedChatId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLongPress = (chatId: number) => {
    setLongPressedChatId(chatId);
  };

  const handleDelete = (chatId: number) => {
    setLongPressedChatId(null);
    setChats(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearch('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  // Separate friends and regular chats
  const friendChats = filteredChats.filter(chat => chat.isFriend);
  const regularChats = filteredChats.filter(chat => !chat.isFriend);

  return (
    <div className="max-w-md mx-auto h-screen bg-white shadow-xl overflow-hidden flex flex-col relative pb-20">
      {/* Enhanced Header */}
      <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="mr-3 hover:scale-110 transition-transform"
              aria-label="Go to home"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Chats</h1>
          </div>
          <div className="flex items-center gap-3">
            {totalUnreadCount > 0 && (
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-semibold">{totalUnreadCount} new</span>
              </div>
            )}
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isSearchActive ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      {isSearchActive && (
        <div className="px-4 pt-4 pb-2 bg-gradient-to-b from-rose-50 to-white border-b border-rose-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats and messages..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Friends Section */}
        {friendChats.length > 0 && (
          <>
            <div className="px-4 py-2 bg-green-50 border-b border-green-100">
              <h3 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Friends ({friendChats.length})
              </h3>
            </div>
            {friendChats.map((chat) => (
              <ChatItem
                key={`friend-${chat.id}`}
                chat={chat}
                onChatClick={onChatClick}
                onLongPress={handleLongPress}
                onDelete={handleDelete}
                longPressedChatId={longPressedChatId}
                setLongPressedChatId={setLongPressedChatId}
              />
            ))}
          </>
        )}

        {/* Regular Chats Section */}
        {regularChats.length > 0 && (
          <>
            {friendChats.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">Recent Chats</h3>
              </div>
            )}
            {regularChats.map((chat) => (
              <ChatItem
                key={`regular-${chat.id}`}
                chat={chat}
                onChatClick={onChatClick}
                onLongPress={handleLongPress}
                onDelete={handleDelete}
                longPressedChatId={longPressedChatId}
                setLongPressedChatId={setLongPressedChatId}
              />
            ))}
          </>
        )}

        {/* No Results */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center px-8">
            <div className="text-6xl mb-4">
              {search ? '🔍' : '💬'}
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {search ? 'No chats found' : 'No chats yet'}
            </h3>
            <p className="text-gray-500">
              {search 
                ? `No results for "${search}"`
                : 'Start a conversation to see your chats here'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

const ChatItem = ({
  chat,
  onChatClick,
  onLongPress,
  onDelete,
  longPressedChatId,
  setLongPressedChatId,
}: {
  chat: Chat;
  onChatClick: (chat: Chat) => void;
  onLongPress: (chatId: number) => void;
  onDelete: (chatId: number) => void;
  longPressedChatId: number | null;
  setLongPressedChatId: (id: number | null) => void;
}) => {
  return (
    <div
      className={`flex items-center p-4 hover:bg-rose-50 cursor-pointer relative border-b border-rose-100 transition-colors duration-200 ${
        chat.isFriend ? 'bg-green-50/50' : ''
      }`}
      onClick={() => {
        if (longPressedChatId !== chat.id) onChatClick(chat);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress(chat.id);
      }}
    >
      <div className="relative">
        <img
          src={chat.avatar}
          alt={`${chat.name} avatar`}
          className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 shadow-sm"
        />
        {chat.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
            {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
          </div>
        )}
        {chat.isFriend && chat.time === 'Online' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2">
            <h2 className={`font-semibold text-gray-800 truncate ${chat.unreadCount > 0 ? 'text-rose-700' : ''}`}>
              {chat.name}
            </h2>
            {chat.isFriend && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Friend
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.time}</span>
        </div>
        <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
          {chat.lastMessage}
        </p>
      </div>

      {longPressedChatId === chat.id && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex gap-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={e => {
              e.stopPropagation();
              onDelete(chat.id);
            }}
          >
            Delete
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setLongPressedChatId(null);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatPageWrapper;