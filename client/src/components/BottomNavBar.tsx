import React from "react";
import { Home as HomeIcon, MessageCircle, Mic, User, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const iconSize = 18;
const navItems = [
  { label: "Home", icon: <HomeIcon size={iconSize} />, path: "/" },
  { label: "Chat", icon: <MessageCircle size={iconSize} />, path: "/chat" },
  { label: "Friends", icon: <Users size={iconSize} />, path: "/friends" },
  { label: "Voice", icon: <Mic size={iconSize} />, path: "/voice" },
  { label: "Profile", icon: <User size={iconSize} />, path: "/profile" },
];

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-rose-100 flex justify-around items-center h-16 shadow-lg w-full max-w-md mx-auto">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center justify-center flex-1 py-2 px-1 focus:outline-none transition-all duration-200 ${
            location.pathname === item.path 
              ? "text-rose-500 scale-110" 
              : "text-gray-400 hover:text-rose-300"
          }`}
          onClick={() => navigate(item.path)}
        >
          <span className="mb-0.5">{item.icon}</span>
          <span className="text-[10px] font-semibold leading-none">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}