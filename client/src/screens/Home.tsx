import { useCallback, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { playSound } from "../lib/audio";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Crown } from "lucide-react";
import GenderFilter from "../components/GenderFilter";
import PremiumPaywall from "../components/PremiumPaywall";
import BottomNavBar from "../components/BottomNavBar";
import { usePremium } from "../context/PremiumProvider";

const bannerImages = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
  'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
  'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop'
];

export default function Home() {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { isPremium, setPremium } = usePremium();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

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
      navigate("/video-chat");
    },
    [navigate]
  );

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
        <title>AjnabiCam - Random Video Chat - Live chat with ajnabis</title>
      </Helmet>
      <main className="flex flex-col min-h-screen w-full bg-gradient-to-br from-rose-50 to-pink-100 relative pb-20">
        {/* Header */}
        <header className="w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              AjnabiCam
            </h1>
            {isPremium && (
              <Crown className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center px-4 py-6">
          {/* Banner Carousel */}
          <div className="w-full max-w-md mb-6 relative">
            <div className="overflow-hidden rounded-2xl shadow-lg">
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

            {/* Carousel Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentBannerIndex === index ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="w-full max-w-md grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <span className="text-2xl mb-2 block">🎥</span>
              <div className="font-semibold text-sm text-rose-700">HD Video</div>
              <div className="text-xs text-rose-400">Crystal clear</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <span className="text-2xl mb-2 block">🔒</span>
              <div className="font-semibold text-sm text-rose-700">Secure</div>
              <div className="text-xs text-rose-400">Encrypted</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <span className="text-2xl mb-2 block">⚡</span>
              <div className="font-semibold text-sm text-rose-700">Instant</div>
              <div className="text-xs text-rose-400">Connect now</div>
            </div>
          </div>

          {/* Gender Filter */}
          <div className="w-full max-w-md mb-6">
            <GenderFilter
              isPremium={isPremium}
              onGenderSelect={(gender: string) => {
                console.log("Selected gender:", gender);
              }}
              onUpgrade={handleUpgrade}
            />
          </div>

          {/* Main Action Button */}
          <div className="w-full max-w-md">
            <Button
              className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={handleStartCall}
            >
              🚀 Milo Abhi!
            </Button>
          </div>

          <div className="text-xs text-center text-rose-400 mt-6 px-4">
            By using AjnabiCam, you agree to our Terms of Service and Privacy Policy.
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
}