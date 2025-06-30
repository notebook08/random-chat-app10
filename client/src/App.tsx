
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./screens/Home";
import VideoChat from "./screens/VideoChat";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<VideoChat />} />
      </Routes>
    </div>
  );
}

export default App;
