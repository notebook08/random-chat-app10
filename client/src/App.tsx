import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import VideoChat from "./screens/VideoChat";
import SplashScreen from "./components/SplashScreen";
import ReferToUnlock from "./screens/ReferToUnlock";
import ReferralCodeScreen from "./screens/ReferralCode";
import GenderSelect from "./screens/GenderSelect";
import ChatPage from "./screens/ChatPage";
import VoicePage from "./screens/VoicePage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import IntroScreen from "./screens/IntroScreen";
import UserSetup from "./screens/UserSetup";
import PersonalChat from "./screens/PersonalChat";

import { useNavigate } from "react-router-dom";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSplash) {
      // Check if user has completed setup
      const userData = localStorage.getItem("ajnabicam_user_data");
      const firstOpen = localStorage.getItem("ajnabicam_first_open");
      
      if (!firstOpen) {
        localStorage.setItem("ajnabicam_first_open", "true");
        navigate("/intro", { replace: true });
      } else if (!userData || !JSON.parse(userData).setupComplete) {
        navigate("/intro", { replace: true });
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
        <Route path="/intro" element={<IntroScreen />} />
        <Route path="/user-setup" element={<UserSetup />} />
        <Route path="/referral" element={<ReferralCodeScreen />} />
        <Route path="/gender-select" element={<GenderSelect />} />
        <Route path="/chat" element={<VideoChat />} />
        <Route path="/refer" element={<ReferToUnlock />} />
        <Route path="/chat-page" element={<ChatPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat/:userId" element={<PersonalChat />} />
      </Routes>
    </div>
  );
}

export default App;