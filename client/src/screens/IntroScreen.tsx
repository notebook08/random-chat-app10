
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';

const IntroScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/user-setup');
  };

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Connect with Amazing People</title>
      </Helmet>
      <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 px-4 relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-pink-300/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-rose-300/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-300/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-60 right-10 w-14 h-14 bg-pink-400/30 rounded-full animate-pulse"></div>
        </div>

        {/* App Name */}
        <div className="text-center mb-8 z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AjnabiCam
          </h1>
          <p className="text-lg text-gray-600 font-medium">Connect with amazing people worldwide</p>
        </div>

        {/* Animation Container */}
        <div className="relative mb-12 z-10">
          <div className="relative w-80 h-80 mx-auto">
            {/* Video Call Animation */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-200 overflow-hidden">
              {/* Female Video */}
              <div className="absolute top-4 left-4 w-32 h-40 bg-gradient-to-br from-pink-200 to-rose-300 rounded-2xl shadow-lg flex flex-col items-center justify-center animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="text-xs font-semibold text-rose-700">Priya</div>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 animate-ping"></div>
              </div>

              {/* Male Video */}
              <div className="absolute bottom-4 right-4 w-32 h-40 bg-gradient-to-br from-blue-200 to-purple-300 rounded-2xl shadow-lg flex flex-col items-center justify-center animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div className="text-xs font-semibold text-purple-700">Arjun</div>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 animate-ping"></div>
              </div>

              {/* Floating Hearts */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <span className="absolute text-red-400 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
                  <span className="absolute text-pink-400 text-lg animate-bounce left-8 -top-4" style={{ animationDelay: '0.5s' }}>💖</span>
                  <span className="absolute text-rose-400 text-xl animate-bounce -left-6 top-6" style={{ animationDelay: '1s' }}>💗</span>
                </div>
              </div>

              {/* Video Call Interface Elements */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📹</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎤</span>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📞</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Text */}
        <div className="text-center mb-8 z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet Amazing People</h2>
          <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
            Connect instantly with people from around the world. Make new friends, have meaningful conversations, and discover diverse cultures.
          </p>
        </div>

        {/* Start Button */}
        <div className="z-10">
          <Button
            onClick={handleStart}
            className="px-12 py-4 text-xl font-bold rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            ✨ START
          </Button>
        </div>
      </main>
    </>
  );
};

export default IntroScreen;
