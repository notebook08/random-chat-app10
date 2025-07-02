
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-advance after 3 seconds if user doesn't interact
    const timer = setTimeout(() => {
      handleStart();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/user-setup');
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center justify-center animate-fade-in px-6">
        {/* App Name */}
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
          AjnabiCam
        </h1>
        
        {/* Animation Container */}
        <div className="relative mb-8 w-80 h-60 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200">
            {/* Animated hearts */}
            <div className="absolute top-4 left-4 text-red-500 text-2xl animate-bounce">💖</div>
            <div className="absolute top-8 right-6 text-pink-500 text-xl animate-pulse">💕</div>
            <div className="absolute bottom-6 left-8 text-red-400 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>❤️</div>
            
            {/* Video call simulation */}
            <div className="flex h-full">
              {/* Beautiful Indian woman */}
              <div className="flex-1 bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">👩🏻</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Priya
                </div>
              </div>
              
              {/* Handsome Indian man */}
              <div className="flex-1 bg-gradient-to-br from-blue-300 to-indigo-300 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">👨🏻</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Arjun
                </div>
              </div>
            </div>
            
            {/* Connection indicator */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
              Connected
            </div>
          </div>
        </div>
        
        {/* Start Button */}
        <Button 
          onClick={handleStart}
          className="w-64 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          START
        </Button>
        
        {/* Subtitle */}
        <p className="text-purple-700 text-lg font-medium mt-4 text-center animate-pulse">
          Connect with amazing people instantly
        </p>
      </div>
    </div>
  );
}
