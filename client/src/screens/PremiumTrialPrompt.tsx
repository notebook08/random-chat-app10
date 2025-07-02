import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';

const PremiumTrialPrompt: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpgradeClick = () => {
    // Logic to navigate to the actual upgrade/payment page
    console.log('Navigating to upgrade page...');
    // navigate('/upgrade-premium'); // Example navigation
  };

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Upgrade to Premium</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-100 px-2 py-4 relative pb-16">
        {/* Header */}
        <div className="w-full max-w-md flex items-center p-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold text-xl rounded-t-2xl shadow-lg">
          <button onClick={handleBackClick} className="mr-3 text-white font-bold text-xl">&larr;</button>
          <h1 className="flex-grow text-center">Upgrade to Premium</h1>
        </div>

        <div className="w-full max-w-md flex flex-col items-center bg-white p-6 rounded-b-2xl border border-pink-200 shadow-2xl mb-4 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-4 text-center">Unlock Exclusive Features!</h2>
          <p className="text-lg text-gray-600 mb-6 text-center">Elevate your experience with AjnabiCam Premium.</p>

          <div className="w-full space-y-4 mb-8">
            <div className="flex items-center bg-pink-50 p-3 rounded-lg shadow-sm">
              <span className="text-purple-500 text-2xl mr-3">✨</span>
              <p className="text-gray-800 font-medium">Ad-Free Experience</p>
            </div>
            <div className="flex items-center bg-pink-50 p-3 rounded-lg shadow-sm">
              <span className="text-purple-500 text-2xl mr-3">🔒</span>
              <p className="text-gray-800 font-medium">Enhanced Privacy Controls</p>
            </div>
            <div className="flex items-center bg-pink-50 p-3 rounded-lg shadow-sm">
              <span className="text-purple-500 text-2xl mr-3">💎</span>
              <p className="text-gray-800 font-medium">Exclusive Filters & Effects</p>
            </div>
            <div className="flex items-center bg-pink-50 p-3 rounded-lg shadow-sm">
              <span className="text-purple-500 text-2xl mr-3">⚡</span>
              <p className="text-gray-800 font-medium">Priority Customer Support</p>
            </div>
          </div>

          <button
            onClick={handleUpgradeClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Go Premium Now!
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">Cancel anytime. Terms and conditions apply.</p>
        </div>
        <BottomNavBar />
      </main>
    </>
  );
};

export default PremiumTrialPrompt;
