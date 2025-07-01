import React from "react";
import { Home as HomeIcon, MessageCircle, Gift, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const iconSize = 18;
const navItems = [
  { label: "Home", icon: <HomeIcon size={iconSize} />, path: "/" },
  { label: "Chat", icon: <MessageCircle size={iconSize} />, path: "/chat-page" },
  { label: "Refer", icon: <Gift size={iconSize} />, path: "/referral" },
  { label: "Voice", icon: <Mic size={iconSize} />, path: "/voice" },
];

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-rose-100 flex justify-around items-center h-12 shadow-lg w-full max-w-md mx-auto">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 focus:outline-none transition-colors duration-150 ${location.pathname === item.path ? "text-rose-500" : "text-gray-400"}`}
          onClick={() => navigate(item.path)}
        >
          <span className="mb-0.5">{item.icon}</span>
          <span className="text-[11px] font-semibold leading-none">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
