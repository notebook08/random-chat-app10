
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Video, Users } from 'lucide-react';

const IntroScreen = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/user-setup');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      {/* App Name */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">AjnabiCam</h1>
        <p className="text-rose-100 text-lg">Connect with strangers worldwide</p>
      </div>

      {/* Animation Area */}
      <div className="relative mb-12 p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center space-x-8 mb-6">
          {/* Woman Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
              <span className="text-3xl">👩🏽</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>

          {/* Connection Animation */}
          <div className="flex flex-col items-center space-y-2">
            <Video className="w-8 h-8 text-white animate-pulse" />
            <div className="flex space-x-1">
              <Heart className="w-4 h-4 text-red-400 animate-bounce" />
              <Heart className="w-4 h-4 text-red-400 animate-bounce delay-200" />
              <Heart className="w-4 h-4 text-red-400 animate-bounce delay-400" />
            </div>
          </div>

          {/* Man Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce delay-300">
              <span className="text-3xl">👨🏽</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Features */}
        <div className="flex justify-center space-x-6 text-white/80">
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Meet People</span>
          </div>
          <div className="text-center">
            <Video className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Video Chat</span>
          </div>
          <div className="text-center">
            <Heart className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Make Friends</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={isAnimating}
        className={`w-full max-w-md py-4 px-8 bg-white text-rose-600 font-bold text-lg rounded-2xl shadow-xl transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-70' : 'hover:scale-105 hover:shadow-2xl'
        } active:scale-95`}
      >
        {isAnimating ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Starting...</span>
          </div>
        ) : (
          'START'
        )}
      </button>

      {/* Tagline */}
      <p className="text-white/70 text-center mt-6 text-sm max-w-sm">
        Experience the magic of spontaneous connections. Start your journey today!
      </p>
    </div>
  );
};

export default IntroScreen;
