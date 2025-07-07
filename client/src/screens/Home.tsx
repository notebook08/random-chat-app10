import { useCallback, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { playSound } from "../lib/audio";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Crown, Coins, Mic } from "lucide-react";
import GenderFilter from "../components/GenderFilter";
import PremiumPaywall from "../components/PremiumPaywall";
import TreasureChest from "../components/TreasureChest";
import BottomNavBar from "../components/BottomNavBar";
import { usePremium } from "../context/PremiumProvider";
import { useCoin } from "../context/CoinProvider";
import { useLanguage } from "../context/LanguageProvider";

const bannerImages = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
  'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
  'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop'
];

export default function Home() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { isPremium, setPremium } = usePremium();
  const { coins } = useCoin();
  const { t } = useLanguage();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showTreasureChest, setShowTreasureChest] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartCall = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      playSound('join');
      
      // Send user profile to server for premium priority matching
      socket?.emit("user:profile", {
        isPremium,
        genderFilter: "any", // This would come from the gender filter component
        voiceOnly: false
      });
      
      navigate("/video-chat");
    },
    [navigate, socket, isPremium]
  );

  const handleVoiceChat = useCallback(() => {
    navigate("/voice");
  }, [navigate]);

  const handleUpgrade = () => {
    setShowPaywall(true);
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
        <title>{t('app.name')} - Random Video Chat - Live chat with ajnabis</title>
      </Helmet>
      <main className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white relative pb-20">
        {/* Enhanced Header */}
        <header className="w-full bg-gradient-to-r from-rose-500 to-pink-600 shadow-sm px-6 py-6 border-b border-pink-100">
          <div className="flex items-center justify-between">
            {/* Premium Badge */}
            <div className="flex items-center gap-3">
              {isPremium && (
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
                  <Crown className="h-4 w-4 text-white" />
                  <span className="text-white text-xs font-bold">PREMIUM</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Voice Chat Button */}
              <Button
                onClick={handleVoiceChat}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-3 py-2 rounded-full shadow-md transform hover:scale-105 transition-all duration-200"
              >
                <Mic className="h-4 w-4 mr-1" />
                Voice
              </Button>
              
              {/* Coins Button */}
              <Button
                onClick={() => setShowTreasureChest(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition-all duration-200"
              >
                <Coins className="h-4 w-4 mr-2" />
                {coins}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col px-6 py-6">
          {/* App Name aligned with banner */}
          <div className="mb-4">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              {t('app.name')}
            </h1>
            <p className="text-rose-100 text-sm font-medium">
              {t('app.tagline')}
            </p>
          </div>

          {/* Enhanced Banner Carousel */}
          <div className="w-full mb-6 relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
              >
                {bannerImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img
                      src={image}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Carousel Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentBannerIndex === index ? 'bg-white w-6' : 'bg-rose-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="w-full grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-4 text-center shadow-sm border border-rose-200 hover:scale-105 hover:shadow-lg transition-all duration-200">
              <span className="text-3xl mb-2 block">🎥</span>
              <div className="font-bold text-sm text-rose-700">{t('home.features.hd')}</div>
              <div className="text-xs text-rose-400">Crystal clear</div>
            </div>
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-4 text-center shadow-sm border border-rose-200 hover:scale-105 hover:shadow-lg transition-all duration-200">
              <span className="text-3xl mb-2 block">🔒</span>
              <div className="font-bold text-sm text-rose-700">{t('home.features.secure')}</div>
              <div className="text-xs text-rose-400">Encrypted</div>
            </div>
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-4 text-center shadow-sm border border-rose-200 hover:scale-105 hover:shadow-lg transition-all duration-200">
              <span className="text-3xl mb-2 block">⚡</span>
              <div className="font-bold text-sm text-rose-700">{t('home.features.instant')}</div>
              <div className="text-xs text-rose-400">Connect now</div>
            </div>
          </div>

          {/* Enhanced Gender Filter */}
          <div className="w-full mb-6">
            <GenderFilter
              isPremium={isPremium}
              onGenderSelect={(gender: string) => {
                console.log("Selected gender:", gender);
              }}
              onUpgrade={handleUpgrade}
            />
          </div>

          {/* Enhanced Main Action Button */}
          <div className="w-full">
            <Button
              className="w-full py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={handleStartCall}
            >
              🚀 {t('home.start')}
            </Button>
          </div>

          <div className="text-xs text-center text-rose-400 mt-6 px-4">
            By using {t('app.name')}, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>

        <BottomNavBar />
      </main>

      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePremiumPurchase}
      />

      <TreasureChest
        isOpen={showTreasureChest}
        onClose={() => setShowTreasureChest(false)}
      />
    </>
  );
}