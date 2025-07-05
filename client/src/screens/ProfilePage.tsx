import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';
import PremiumPaywall from '../components/PremiumPaywall';
import { Crown, Camera, Copy, Star, Gift, ArrowLeft, Edit3, Check, Settings, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { usePremium } from '../context/PremiumProvider';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPremium, setPremium } = usePremium();

  const [username, setUsername] = useState<string>('JohnDoe');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);

  const referralId = 'AJNABICAM12345';

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log('Selected file:', file.name);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameSave = () => {
    setIsEditingUsername(false);
    console.log('Username updated to:', username);
  };

  const handlePremiumClick = () => {
    setShowPaywall(true);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralId);
    alert('Referral code copied!');
  };

  const handlePremiumPurchase = (plan: string) => {
    const now = new Date();
    const expiry = new Date(now);
    if (plan === "weekly") {
      expiry.setDate(now.getDate() + 7);
    } else {
      expiry.setMonth(now.getMonth() + 1);
    }
    
    setPremium(true, expiry);
    setShowPaywall(false);
    alert(`🎉 Welcome to Premium! Your ${plan} subscription is now active!`);
  };

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Profile</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full max-w-md mx-auto bg-gradient-to-br from-rose-50 to-pink-50 px-2 py-4 relative pb-20">
        {/* Header */}
        <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xl rounded-t-2xl shadow-lg">
          <button onClick={handleBackClick} className="text-white font-bold text-xl hover:scale-110 transition-transform">
            <ArrowLeft size={24} />
          </button>
          <h1 className="flex-grow text-center">Profile</h1>
          <button 
            onClick={handlePremiumClick}
            className="hover:scale-110 transition-transform"
          >
            <Crown className="h-6 w-6 text-yellow-300" />
          </button>
        </div>

        <div className="w-full flex flex-col bg-white rounded-b-2xl border border-rose-100 shadow-xl mb-6 overflow-hidden">
          {/* Premium Status Banner */}
          {isPremium ? (
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-4 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-yellow-200" />
                <h2 className="text-lg font-bold">Premium Active</h2>
              </div>
              <p className="text-yellow-100 text-sm">
                Enjoying all premium features! ✨
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-4 text-white text-center cursor-pointer" onClick={handlePremiumClick}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-yellow-200" />
                <h2 className="text-lg font-bold">Upgrade to Premium</h2>
              </div>
              <p className="text-purple-100 text-sm mb-3">
                Unlock exclusive features and enhanced experience!
              </p>
              <div className="flex justify-center gap-4 text-purple-100 text-xs">
                <span>✓ Gender Filter</span>
                <span>✓ Voice Mode</span>
                <span>✓ Unlimited Time</span>
              </div>
            </div>
          )}

          {/* Profile Section */}
          <div className="p-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex justify-center items-center overflow-hidden cursor-pointer border-4 border-rose-300 shadow-xl hover:shadow-2xl transition-all duration-200"
                  onClick={handleImageUploadClick}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-center">
                      <User className="h-12 w-12 text-rose-600 mx-auto mb-2" />
                      <div className="text-rose-700 text-xs font-medium">Add Photo</div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  onClick={handleImageUploadClick}
                  className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Username Section */}
            <div className="mb-8">
              <label htmlFor="username" className="font-bold text-rose-800 text-lg mb-3 block flex items-center gap-2">
                <User className="h-5 w-5" />
                Username
              </label>
              {isEditingUsername ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="flex-grow px-4 py-3 rounded-xl border-2 border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50"
                    autoFocus
                  />
                  <Button
                    onClick={handleUsernameSave}
                    className="bg-green-500 text-white px-4 py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-grow px-4 py-3 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 font-semibold border-2 border-rose-200">
                    {username}
                  </div>
                  <Button
                    onClick={() => setIsEditingUsername(true)}
                    className="bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="h-6 w-6 text-green-600" />
                <label className="font-bold text-green-800 text-lg">Referral Rewards</label>
              </div>
              <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-green-600 font-medium">Your Referral ID</span>
                    <div className="font-mono text-green-800 text-lg font-bold">{referralId}</div>
                  </div>
                  <Button
                    onClick={handleCopyReferral}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-700 font-medium mb-2">
                  🎁 Refer 1 friend successfully = 24h Premium FREE!
                </p>
                <p className="text-xs text-green-600">
                  Share your code and both you and your friend get premium benefits
                </p>
              </div>
            </div>

            {/* Settings Section */}
            <div className="mt-6 space-y-3">
              <h3 className="font-bold text-rose-800 text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </h3>
              
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200">
                  <span className="text-rose-700 font-medium">Privacy Settings</span>
                </button>
                
                <button className="w-full text-left px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200">
                  <span className="text-rose-700 font-medium">Notification Preferences</span>
                </button>
                
                <button className="w-full text-left px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200">
                  <span className="text-rose-700 font-medium">Account Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <BottomNavBar />
      </main>

      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePremiumPurchase}
      />
    </>
  );
};

export default ProfilePage;