import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coins, Gift, Play, Users, Crown, X } from "lucide-react";
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
    { coins: 50, price: "₹29", popular: false },
    { coins: 120, price: "₹59", popular: true },
    { coins: 250, price: "₹99", popular: false },
    { coins: 500, price: "₹179", popular: false },
  ];

  const handlePurchasePack = (pack: typeof coinPacks[0]) => {
    // Simulate in-app purchase
    alert(`🎉 You purchased ${pack.coins} coins for ${pack.price}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-2xl">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-1"
          >
            <X size={20} />
          </Button>
          
          {/* Animated Treasure Chest */}
          <div className="flex justify-center mb-4">
            <div className={`relative ${isAnimating ? 'animate-bounce' : ''}`}>
              <div className="w-20 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg relative overflow-hidden shadow-lg">
                {/* Chest body */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-700"></div>
                {/* Chest lid */}
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-lg transform-gpu transition-transform duration-500 ${isAnimating ? 'rotate-12 -translate-y-2' : ''}`}></div>
                {/* Lock */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
                {/* Sparkles */}
                {isAnimating && (
                  <>
                    <div className="absolute -top-2 -left-2 text-yellow-300 animate-ping">✨</div>
                    <div className="absolute -top-3 -right-1 text-yellow-300 animate-ping" style={{animationDelay: '0.2s'}}>✨</div>
                    <div className="absolute -top-1 left-1/2 text-yellow-300 animate-ping" style={{animationDelay: '0.4s'}}>✨</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Coin Treasure! 💰
          </CardTitle>
          
          {/* Current Balance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 inline-block mt-2">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-600" />
              <span className="font-bold text-lg text-yellow-700">{coins} Coins</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Free Coin Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-center">Earn Free Coins</h3>
            
            <Button
              onClick={watchAd}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Ad → Get 4 Coins
            </Button>
            
            <Button
              onClick={referFriend}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              <Users className="h-5 w-5 mr-2" />
              Refer Friend → Get 25 Coins
            </Button>
          </div>

          {/* Coin Packs */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-center">Buy Coin Packs</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {coinPacks.map((pack, index) => (
                <div
                  key={index}
                  className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    pack.popular 
                      ? "border-orange-400 bg-orange-50 shadow-lg scale-105" 
                      : "border-yellow-300 bg-yellow-50 hover:border-yellow-400"
                  }`}
                  onClick={() => handlePurchasePack(pack)}
                >
                  {pack.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular! 🔥
                    </div>
                  )}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Coins className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-yellow-700">{pack.coins}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">{pack.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Upgrade */}
          {!isPremium && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center border border-purple-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-700">Premium Benefits</span>
              </div>
              <p className="text-sm text-purple-600 mb-3">
                Get unlimited chat time and never worry about coins again!
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Upgrade to Premium
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-gray-500">
            💳 Secure payments • 🔒 Safe transactions • 💯 Instant delivery
          </p>
        </CardContent>
      </Card>
    </div>
  );
}