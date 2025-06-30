import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { useSocket } from "../context/SocketProvider";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import LogoContent from "../components/LogoContent";
// import { Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Crown } from "lucide-react";

// Premium Feature Components (assumed implementations)
import GenderFilter from "../components/GenderFilter";
import VoiceOnlyToggle from "../components/VoiceOnlyToggle";
import PremiumPaywall from "../components/PremiumPaywall";

export default function Home() {
  const { socket, setSocket } = useSocket();
  const navigate = useNavigate();

  // Premium State
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null);
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);

  const handleStartCall = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
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
        <meta
          name="description"
          content="AjnabiCam - Random Video Chat is an innovative video chat application for live chat with ajnabis from all around the world. Built with a focus on ease of use and seamless interaction, AjnabiCam allows users to effortlessly start video calls, share screens, and exchange messages in real-time. Whether you're seeking to meet new people or simply enjoy face-to-face interactions with strangers, AjnabiCam delivers a smooth experience with user-friendly features. It prioritizes privacy, utilizing encrypted connections to ensure that all communications are secure. The platform's sleek and modern design, combined with features like quick user pairing, screen sharing, and integrated messaging, makes AjnabiCam a go-to choice for connecting with ajnabis worldwide."
        />
        <meta
          name="keywords"
          content="omegle, Random Video chat, Random call, Video call, omegle clone, omegle type apps, AjnabiCam, ajnabicam.com, meet, random chat, messages, video chat, screen sharing, real-time messaging, secure video calls"
        />
      </Helmet>
      <main className="flex flex-col justify-center h-full mx-auto w-full p-4 lg:p-8">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:justify-evenly mx-auto">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center text-center mb-8 lg:mb-0 w-full lg:w-auto">
            <div className="flex items-center justify-center mb-8 relative transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="120"
                  viewBox="0 0 150 120"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-auto w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] text-teal-600 dark:text-teal-400 drop-shadow-lg"
                >
                  <LogoContent />
                </svg>
                {/* Animated pulse effect */}
                <div className="absolute inset-0 bg-teal-400 opacity-20 rounded-full animate-pulse"></div>
              </div>
              {isPremium && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  PREMIUM
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-3 animate-fade-in">
                AjnabiCam
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                Live chat with ajnabis
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>

          {/* Description & Call-to-Action Section */}
          <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 shadow-2xl rounded-3xl p-6 md:p-8 w-full lg:w-[60%] mx-0 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Welcome to the Future of Video Chat
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
              </div>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 text-center">
                AjnabiCam - Random Video Chat for live chat with ajnabis worldwide. 
                Experience seamless video calls, screen sharing, and real-time messaging with 
                enterprise-grade security and a beautiful, intuitive interface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="text-center p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20">
                  <div className="text-2xl mb-2">🎥</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">HD Video</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Crystal clear calls</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">End-to-end encrypted</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Instant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Connect in seconds</p>
                </div>
              </div>
            </div>

            {/* Premium Controls */}
            <div className="space-y-4 mb-6">
              <GenderFilter
                isPremium={isPremium}
                onGenderSelect={setSelectedGender}
                onUpgrade={handleUpgrade}
              />

              <VoiceOnlyToggle
                isPremium={isPremium}
                isVoiceOnly={isVoiceOnly}
                onToggle={setIsVoiceOnly}
                onUpgrade={handleUpgrade}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 md:mb-8">
              <Button
                className="w-full sm:w-auto py-4 px-8 text-lg font-bold tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 rounded-2xl text-white border-0 relative overflow-hidden group"
                onClick={handleStartCall}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>🚀</span>
                  {isVoiceOnly ? "🎙️ Start Voice Chat" : "Milo Abhi!"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              {!isPremium && (
                <Button
                  onClick={handleUpgrade}
                  variant="outline"
                  className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold tracking-wider shadow-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2 border-gray-600 rounded-xl"
                >
                  <Crown size={24} />
                  Get Premium - Unlock All Features!
                </Button>
              )}
            </div>

            <div className="text-xs sm:text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
              By using AjnabiCam - Random Video Chat, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </main>

      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePremiumPurchase}
      />
    </>
  );
}