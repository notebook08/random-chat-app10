import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';
import PremiumPaywall from '../components/PremiumPaywall';
import LanguageSelector from '../components/LanguageSelector';
import SettingsModal from '../components/SettingsModal';
import HelpSupportModal from '../components/HelpSupportModal';
import { Crown, Camera, Copy, Star, Gift, ArrowLeft, Edit3, Check, Settings, User, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { usePremium } from '../context/PremiumProvider';
import { useLanguage } from '../context/LanguageProvider';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isPremium, setPremium } = usePremium();
  const { t } = useLanguage();

  const [username, setUsername] = useState<string>('User');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userGender, setUserGender] = useState<string>('other');
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [settingsType, setSettingsType] = useState<'privacy' | 'notifications' | 'account' | 'general' | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const referralId = 'AJNABICAM12345';

  // Gender-specific avatar URLs
  const getDefaultAvatar = (gender: string): string => {
    switch (gender) {
      case 'male':
        return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
      case 'female':
        return 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
      default:
        return 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
    }
  };

  // Load user data on component mount
  useEffect(() => {
    const userData = localStorage.getItem('ajnabicam_user_data');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.username) {
          setUsername(parsedData.username);
        }
        if (parsedData.gender) {
          setUserGender(parsedData.gender);
        }
        
        // Set default avatar based on gender if no custom profile image
        const savedProfileImage = localStorage.getItem('ajnabicam_profile_image');
        if (savedProfileImage) {
          setProfileImage(savedProfileImage);
        } else {
          setProfileImage(getDefaultAvatar(parsedData.gender || 'other'));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Set default avatar for 'other' gender if parsing fails
        setProfileImage(getDefaultAvatar('other'));
      }
    } else {
      // Set default avatar if no user data exists
      setProfileImage(getDefaultAvatar('other'));
    }
  }, []);

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
        const imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
        localStorage.setItem('ajnabicam_profile_image', imageDataUrl);
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
    
    // Update user data in localStorage
    const userData = localStorage.getItem('ajnabicam_user_data');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.username = username;
        localStorage.setItem('ajnabicam_user_data', JSON.stringify(parsedData));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
    
    console.log('Username updated to:', username);
  };

  const handlePremiumClick = () => {
    setShowPaywall(true);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralId);
    alert(t('profile.referral.copy') + '!');
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

  const handleSettingsClick = (type: 'privacy' | 'notifications' | 'account' | 'general') => {
    setSettingsType(type);
    setShowSettingsModal(true);
  };

  return (
    <>
      <Helmet>
        <title>{t('app.name')} - {t('profile.title')}</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full max-w-md mx-auto bg-gradient-to-br from-rose-50 to-pink-50 px-2 py-4 relative pb-20">
        {/* Header */}
        <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-xl rounded-t-2xl shadow-xl relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <div className="relative z-10 flex items-center justify-between w-full">
          <button onClick={handleBackClick} className="text-white font-bold text-xl hover:scale-110 transition-transform">
            <ArrowLeft size={24} />
          </button>
            <h1 className="flex-grow text-center text-2xl font-extrabold tracking-wide">{t('profile.title')}</h1>
          <button 
            onClick={handlePremiumClick}
              className="hover:scale-110 transition-transform bg-white/20 backdrop-blur-sm rounded-full p-2"
          >
            <Crown className="h-6 w-6 text-yellow-300" />
          </button>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white/90 backdrop-blur-sm rounded-b-2xl border border-rose-100 shadow-2xl mb-6 overflow-hidden">
          {/* Premium Status Banner */}
          {isPremium ? (
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 text-white text-center relative overflow-hidden">
              {/* Sparkle animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
              <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-8 w-8 text-yellow-200 animate-bounce" />
                  <h2 className="text-xl font-extrabold">{t('profile.premium.active')}</h2>
                  <Crown className="h-8 w-8 text-yellow-200 animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
                <p className="text-yellow-100 text-base font-medium">
                {t('profile.premium.enjoying')}
              </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 text-white text-center cursor-pointer relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]" onClick={handlePremiumClick}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
              <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-8 w-8 text-yellow-200 animate-pulse" />
                  <h2 className="text-xl font-extrabold">{t('profile.premium.upgrade')}</h2>
              </div>
                <p className="text-purple-100 text-base font-medium mb-4">
                {t('profile.premium.unlock')}
              </p>
                <div className="flex justify-center gap-6 text-purple-100 text-sm font-medium">
                <span>{t('profile.premium.features.gender')}</span>
                <span>{t('profile.premium.features.voice')}</span>
                <span>{t('profile.premium.features.unlimited')}</span>
              </div>
                <div className="mt-3 text-yellow-200 text-sm font-bold animate-pulse">
                  ✨ Tap to upgrade now! ✨
                </div>
              </div>
            </div>
          )}

          {/* Profile Section */}
          <div className="p-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="relative">
                <div
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 flex justify-center items-center overflow-hidden cursor-pointer border-4 border-rose-300 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative"
                  onClick={handleImageUploadClick}
                >
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-20"></div>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="object-cover w-full h-full relative z-10" />
                  ) : (
                    <div className="text-center relative z-10">
                      <User className="h-16 w-16 text-rose-600 mx-auto mb-3 animate-pulse" />
                      <div className="text-rose-700 text-sm font-bold">{t('profile.addPhoto')}</div>
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
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Username Section */}
            <div className="mb-10">
              <label htmlFor="username" className="font-bold text-rose-800 text-xl mb-4 block flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-rose-600" />
                </div>
                {t('profile.username')}
              </label>
              {isEditingUsername ? (
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="flex-grow px-6 py-4 rounded-2xl border-2 border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-500 bg-rose-50 text-lg font-semibold transition-all duration-200"
                    autoFocus
                  />
                  <Button
                    onClick={handleUsernameSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-grow px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 font-bold text-lg border-2 border-rose-200 shadow-sm">
                    {username}
                  </div>
                  <Button
                    onClick={() => setIsEditingUsername(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Edit3 className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 shadow-xl mb-8 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse"></div>
              <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-green-600 animate-bounce" />
                </div>
                <label className="font-bold text-green-800 text-xl">{t('profile.referral.title')}</label>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base text-green-600 font-bold">{t('profile.referral.id')}</span>
                    <div className="font-mono text-green-800 text-xl font-extrabold tracking-wider">{referralId}</div>
                  </div>
                  <Button
                    onClick={handleCopyReferral}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    {t('profile.referral.copy')}
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-base text-green-700 font-bold mb-3">
                  {t('profile.referral.reward')}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {t('profile.referral.share')}
                </p>
              </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-rose-800 text-xl flex items-center gap-3 mb-6">
                <div className="bg-rose-100 p-2 rounded-full">
                  <Settings className="h-6 w-6 text-rose-600" />
                </div>
                {t('profile.settings')}
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleSettingsClick('privacy')}
                  className="w-full text-left px-6 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all duration-300 border border-rose-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  <span className="text-rose-700 font-bold text-lg">{t('profile.settings.privacy')}</span>
                </button>
                
                <button 
                  onClick={() => handleSettingsClick('notifications')}
                  className="w-full text-left px-6 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all duration-300 border border-rose-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  <span className="text-rose-700 font-bold text-lg">{t('profile.settings.notifications')}</span>
                </button>
                
                <button 
                  onClick={() => handleSettingsClick('account')}
                  className="w-full text-left px-6 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all duration-300 border border-rose-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                >
                  <span className="text-rose-700 font-bold text-lg">{t('profile.settings.account')}</span>
                </button>

                <button 
                  onClick={() => setShowLanguageSelector(true)}
                  className="w-full text-left px-6 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all duration-300 border border-rose-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] flex items-center gap-3"
                >
                  <Globe className="h-5 w-5 text-rose-600" />
                  <span className="text-rose-700 font-bold text-lg">{t('profile.settings.language')}</span>
                </button>
                
                <button 
                  onClick={() => setShowHelpModal(true)}
                  className="w-full text-left px-6 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all duration-300 border border-rose-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] flex items-center gap-3"
                >
                  <Settings className="h-5 w-5 text-rose-600" />
                  <span className="text-rose-700 font-bold text-lg">Help & Support</span>
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

      <LanguageSelector
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => {
          setShowSettingsModal(false);
          setSettingsType(null);
        }}
        settingType={settingsType}
      />

      <HelpSupportModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </>
  );
};

export default ProfilePage;