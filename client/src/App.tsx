import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./screens/Home";
import VideoChat from "./screens/VideoChat";
import SplashScreen from "./components/SplashScreen";
import ReferToUnlock from "./screens/ReferToUnlock";
import ReferralCodeScreen from "./screens/ReferralCode";
import GenderSelect from "./screens/GenderSelect";
import ChatPage from "./screens/ChatPage";
import VoicePage from "./screens/VoicePage";
import HomePage from "./screens/HomePage";

import { useNavigate } from "react-router-dom";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSplash) {
      // Only run on first app open after splash
      const firstOpen = localStorage.getItem("ajnabicam_first_open");
      if (!firstOpen) {
        localStorage.setItem("ajnabicam_first_open", "true");
        // Go to referral code screen
        navigate("/referral", { replace: true });
      }
    }
  }, [showSplash, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/referral" element={<ReferralCodeScreen />} />
        <Route path="/gender-select" element={<GenderSelect />} />
        <Route path="/chat" element={<VideoChat />} />
        <Route path="/refer" element={<ReferToUnlock />} />
        <Route path="/chat-page" element={<ChatPage />} />
        <Route path="/voice" element={<VoicePage />} />
      </Routes>
    </div>
  );
}

export default App;
