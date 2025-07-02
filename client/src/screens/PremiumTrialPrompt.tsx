
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';
import { Crown, Star, Shield, Zap, Heart, Check } from 'lucide-react';

const PremiumTrialPrompt: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpgradeClick = () => {
    console.log('Navigating to upgrade page...');
    // Simulate premium activation
    const now = Date.now();
    const expiry = now + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem("ajnabicam_premium_trial", "true");
    localStorage.setItem("ajnabicam_premium_trial_expiry", expiry.toString());
    alert("🎉 Premium Trial Activated! Welcome to the premium experience!");
    navigate('/');
  };

  const premiumFeatures = [
    { icon: Star, title: "Ad-Free Experience", desc: "Enjoy uninterrupted conversations" },
    { icon: Shield, title: "Enhanced Privacy", desc: "Advanced security controls" },
    { icon: Zap, title: "Gender Filter", desc: "Connect with your preference" },
    { icon: Heart, title: "Unlimited Chats", desc: "No time limits on conversations" },
    { icon: Crown, title: "Priority Support", desc: "Get help when you need it" },
  ];

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Premium Trial</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 px-2 py-4 relative pb-20">
        {/* Header */}
        <div className="w-full max-w-md flex items-center p-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-xl rounded-t-2xl shadow-lg">
          <button onClick={handleBackClick} className="mr-3 text-white font-bold text-xl hover:scale-110 transition-transform">&larr;</button>
          <h1 className="flex-grow text-center">Premium Trial</h1>
          <Crown className="h-6 w-6 text-yellow-300" />
        </div>

        <div className="w-full max-w-md flex flex-col bg-white rounded-b-2xl border border-purple-200 shadow-2xl mb-6 overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <Crown className="h-12 w-12 text-yellow-300" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Go Premium!</h2>
              <p className="text-purple-100 text-lg mb-4">Unlock the full AjnabiCam experience</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                <span className="text-yellow-300 font-bold text-xl">₹19</span>
                <span className="text-purple-100 ml-2">for 7 days</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="p-6 space-y-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 shadow-sm">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full mr-4">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-800">{feature.title}</h3>
                  <p className="text-sm text-purple-600">{feature.desc}</p>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Star className="inline h-6 w-6 mr-2" />
              Start Premium Trial
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-purple-600 font-medium">✨ No commitment • Cancel anytime</p>
              <p className="text-xs text-purple-500 mt-2">
                Premium trial includes all features. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
        
        <BottomNavBar />
      </main>
    </>
  );
};

export default PremiumTrialPrompt;
