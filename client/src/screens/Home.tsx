import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { playSound } from "../lib/audio";
import { useSocket } from "../context/SocketProvider";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
// import LogoContent from "../components/LogoContent";
// import { Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Crown, Gift, Menu } from "lucide-react";

// Premium Feature Components (assumed implementations)
import GenderFilter from "../components/GenderFilter";
// import VoiceOnlyToggle from "../components/VoiceOnlyToggle";
import PremiumPaywall from "../components/PremiumPaywall";
import BottomNavBar from "../components/BottomNavBar";

export default function Home() {
  const { socket, setSocket } = useSocket();
  const navigate = useNavigate();

  // Premium State
  const [isPremium, setIsPremium] = useState(() => {
    // Check for premium trial validity
    const trial = localStorage.getItem("ajnabicam_premium_trial");
    const expiry = localStorage.getItem("ajnabicam_premium_trial_expiry");
    if (trial === "true" && expiry && Date.now() < Number(expiry)) {
      return true;
    }
    return false;
  });
  const [showPaywall, setShowPaywall] = useState(false);
  // const [isVoiceOnly, setIsVoiceOnly] = useState(false);

  // Handler for free trial button
  const handleFreeTrial = () => {
    playSound('swipe');
    navigate("/premium-trial");
  };

  // Handler for refer button: go to referral code screen
  const handleRefer = () => {
    navigate("/referral");
  };

  const handleStartCall = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      playSound('join');
      if (!socket) {
        const newSocket = io(import.meta.env.VITE_API_SERVER_URL);
        setSocket(newSocket);
      }
      navigate("/chat");
    },
    [setSocket, socket, navigate]
  );

  const handleUpgrade = () => {
    setShowPaywall(true);
  };

  const handlePremiumPurchase = () => {
    // Simulate successful purchase and set premium status
    setIsPremium(true);
    setShowPaywall(false);
  };


  return (
    <>
      <Helmet>
        <title>AjnabiCam - Random Video Chat - Live chat with ajnabis</title>
      </Helmet>
      <main className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-2 py-4 relative">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-4 w-full max-w-md rounded-2xl bg-white p-4 border border-rose-100 relative">
          <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-rose-100 mb-2 overflow-hidden shadow-xl">
            <img
              src="/splash-image.png"
              alt="AjnabiCam Splash"
              className="object-cover w-full h-full"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          {isPremium && (
            <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full text-xs font-bold text-white mt-1">
              <Crown className="h-3 w-3" /> PREMIUM
            </div>
          )}
          <h1 className="text-xl font-bold text-rose-600 mt-2 mb-1">AjnabiCam</h1>
          <p className="text-xs text-rose-400 font-medium mb-2">Live chat with ajnabis</p>
          {/* Free Trial Button at Top removed as requested */}
        </div>

        {/* Features - single row, native style */}
        <div className="w-full max-w-md flex flex-row justify-between items-stretch gap-2 mb-4">
          <div className="flex-1 flex flex-col items-center bg-rose-50 rounded-lg p-2 mx-1 min-w-0">
            <span className="text-lg mb-1">🎥</span>
            <div className="font-semibold text-xs text-rose-700 text-center truncate">HD Video</div>
            <div className="text-[10px] text-rose-400 text-center truncate">Crystal clear calls</div>
          </div>
          <div className="flex-1 flex flex-col items-center bg-pink-50 rounded-lg p-2 mx-1 min-w-0">
            <span className="text-lg mb-1">🔒</span>
            <div className="font-semibold text-xs text-pink-700 text-center truncate">Secure</div>
            <div className="text-[10px] text-pink-400 text-center truncate">End-to-end encrypted</div>
          </div>
          <div className="flex-1 flex flex-col items-center bg-fuchsia-50 rounded-lg p-2 mx-1 min-w-0">
            <span className="text-lg mb-1">⚡</span>
            <div className="font-semibold text-xs text-fuchsia-700 text-center truncate">Instant</div>
            <div className="text-[10px] text-fuchsia-400 text-center truncate">Connect in seconds</div>
          </div>
        </div>

        {/* Premium Controls */}
        <div className="w-full max-w-md space-y-3 mb-6">
          <GenderFilter
            isPremium={isPremium}
            onGenderSelect={(gender: string) => {
              if (gender === "male" || gender === "female") {
                // Add logic if needed
              }
            }}
            onUpgrade={handleUpgrade}
          />

        </div>

        {/* Main Action Buttons */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-4">
          <Button
            className="w-full py-3 text-base font-bold rounded-xl bg-rose-500 text-white"
            onClick={handleStartCall}
          >
            Milo Abhi!
          </Button>
          {!isPremium && (
            <Button
              onClick={handleFreeTrial}
              className="w-full py-3 text-base font-bold rounded-xl bg-yellow-400 text-white border-2 border-yellow-300 shadow-md"
            >
              START FREE TRIAL for just ₹19
            </Button>
          )}
          {!isPremium && (
            <Button
              onClick={handleUpgrade}
              variant="outline"
              className="w-full py-3 text-base font-semibold rounded-xl border-rose-300 text-rose-600 bg-white"
            >
              <Crown size={20} className="mr-2" />
              Get Premium - Unlock All Features!
            </Button>
          )}
          {!isPremium && (
            <Button
              onClick={handleRefer}
              className="w-full py-3 text-base font-bold rounded-xl bg-green-500 text-white border-2 border-green-300 shadow-md"
            >
              Refer to 1 Friend & Unlock 24h Premium
            </Button>
          )}
        </div>

        <div className="text-xs text-center text-rose-300 mt-2">
          By using AjnabiCam, you agree to our Terms of Service and Privacy Policy.
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