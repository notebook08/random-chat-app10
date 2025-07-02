import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';

export default function IntroScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/user-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Welcome to AjnabiCam - Start Your Journey</title>
        <meta name="description" content="Connect with new people through video chat" />
      </Helmet>

      {/* App Name */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">AjnabiCam</h1>
        <p className="text-white/80 text-lg">Connect with new people</p>
      </div>

      {/* Animation Area */}
      <div className="relative w-80 h-80 mb-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center overflow-hidden">
        {/* Animated Hearts */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-6xl">💝</div>
          <div className="absolute top-4 right-4 animate-bounce text-2xl">💖</div>
          <div className="absolute bottom-4 left-4 animate-ping text-xl">💕</div>
        </div>

        {/* Video Call Animation */}
        <div className="relative z-10 flex items-center justify-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center animate-pulse">
            <span className="text-2xl">👩🏻</span>
          </div>
          <div className="text-white text-2xl animate-bounce">📹</div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center animate-pulse">
            <span className="text-2xl">👨🏻</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <Button 
        onClick={handleStart}
        className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        START
      </Button>
    </div>
  );
}