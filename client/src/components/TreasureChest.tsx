import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coins, Gift, Play, Users, Crown, X, Star, Zap, Sparkles, TrendingUp } from "lucide-react";
import { useCoin } from "../context/CoinProvider";
import { usePremium } from "../context/PremiumProvider";

interface TreasureChestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TreasureChest({ isOpen, onClose }: TreasureChestProps) {
  const { coins, watchAd, referFriend } = useCoin();
  const { isPremium } = usePremium();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const coinPacks = [
    { coins: 50, price: "₹29", popular: false, bonus: "" },
    { coins: 120, price: "₹59", popular: true, bonus: "+20 Bonus!" },
    { coins: 250, price: "₹99", popular: false, bonus: "+50 Bonus!" },
    { coins: 500, price: "₹179", popular: false, bonus: "+100 Bonus!" },
  ];

  const handlePurchasePack = (pack: typeof coinPacks[0]) => {
    // Simulate in-app purchase
    alert(`🎉 You purchased ${pack.coins} coins for ${pack.price}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border-2 border-rose-200 shadow-3xl relative overflow-hidden my-4 min-h-fit max-h-[95vh]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-orange-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-16 left-8 w-4 h-4 bg-pink-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-8 right-4 w-5 h-5 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        <CardHeader className="text-center relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-2 text-rose-500 hover:bg-rose-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X size={22} />
          </Button>
          
          {/* Animated Treasure Chest */}
          <div className="flex justify-center mb-6">
            <div className={`relative ${isAnimating ? 'animate-bounce' : ''} transform hover:scale-110 transition-transform duration-300`}>
              <div className="w-24 h-20 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-xl relative overflow-hidden shadow-2xl border-2 border-yellow-300">
                {/* Chest body */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500"></div>
                {/* Chest lid */}
                <div className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 rounded-t-xl transform-gpu transition-transform duration-500 ${isAnimating ? 'rotate-12 -translate-y-3' : ''}`}></div>
                {/* Lock */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full border border-yellow-500 shadow-sm"></div>
                {/* Sparkles */}
                {isAnimating && (
                  <>
                    <div className="absolute -top-3 -left-3 text-yellow-400 text-xl animate-ping">✨</div>
                    <div className="absolute -top-4 -right-2 text-orange-400 text-lg animate-ping" style={{animationDelay: '0.2s'}}>✨</div>
                    <div className="absolute -top-2 left-1/2 text-yellow-300 text-lg animate-ping" style={{animationDelay: '0.4s'}}>✨</div>
                    <div className="absolute -bottom-1 -left-2 text-pink-400 text-sm animate-ping" style={{animationDelay: '0.6s'}}>✨</div>
                    <div className="absolute -bottom-2 -right-1 text-purple-400 text-sm animate-ping" style={{animationDelay: '0.8s'}}>✨</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            💰 Coin Store! 💰
          </CardTitle>
          
          {/* Current Balance */}
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-3 inline-block mt-3 border-2 border-rose-300 shadow-lg">
            <div className="flex items-center gap-3">
              <Coins className="h-6 w-6 text-rose-600 animate-pulse" />
              <span className="font-extrabold text-xl text-rose-700">{coins} Coins</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10 overflow-y-auto max-h-[calc(95vh-200px)] pb-6">
          {/* Free Coin Options */}
          <div className="space-y-3">
            <h3 className="font-bold text-rose-800 text-center flex items-center justify-center gap-3 text-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              🎁 Earn Free Coins
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={watchAd}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="h-6 w-6" />
                    <div className="flex flex-col items-start">
                      <span className="text-base">Watch Ad</span>
                      <span className="text-xs text-green-100 font-medium">Get 4 coins instantly</span>
                    </div>
                  </div>
                  <div className="bg-green-400 px-2 py-1 rounded-full