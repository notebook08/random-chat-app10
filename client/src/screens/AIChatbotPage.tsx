import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Bot, Send, Sparkles } from 'lucide-react';

const AIChatbotPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiResponse = {
        text: "I'm a placeholder AI response. This feature is coming soon! Your message was: \"" + inputMessage + "\"",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Helmet>
        <title>AjnabiCam - AI Chat Assistant</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full max-w-md mx-auto bg-white px-2 py-4 relative pb-20">
        {/* Header */}
        <div className="w-full flex items-center p-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold text-xl rounded-t-2xl shadow-lg">
          <button 
            onClick={handleBackClick} 
            className="mr-3 text-white font-bold text-xl hover:scale-110 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="flex-grow text-center">AI Chat Assistant</h1>
          <Bot className="h-6 w-6" />
        </div>

        <div className="w-full flex flex-col bg-white rounded-b-2xl border border-purple-100 shadow-xl mb-6 overflow-hidden flex-1">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                  }`}
                >
                  {!message.isUser && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                    </div>
                  )}
                  <div className="leading-relaxed">{message.text}</div>
                  <div className={`text-xs text-right mt-2 ${
                    message.isUser ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 max-w-xs px-4 py-3 rounded-2xl shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feature Notice */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Coming Soon!</span>
            </div>
            <p className="text-xs text-purple-600">
              AI Chat Assistant is currently in development. This is a placeholder interface to demonstrate the feature.
            </p>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-purple-100">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to AI..."
                className="flex-1 px-4 py-3 rounded-full border border-purple-300 focus:ring-2 focus:ring-purple-400 bg-purple-50"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transform hover:scale-105 transition-all duration-200"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <BottomNavBar />
      </main>
    </>
  );
};

export default AIChatbotPage;