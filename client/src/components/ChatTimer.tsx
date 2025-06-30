
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Crown, Infinity } from "lucide-react";

interface ChatTimerProps {
  isPremium: boolean;
  isConnected: boolean;
  partnerPremium: boolean;
  onTimeUp: () => void;
  onUpgrade: () => void;
}

export default function ChatTimer({ isPremium, isConnected, partnerPremium, onTimeUp, onUpgrade }: ChatTimerProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const hasPremiumAccess = isPremium || partnerPremium;

  useEffect(() => {
    if (isConnected) {
      if (!hasPremiumAccess) {
        setIsActive(true);
        setTimeLeft(15 * 60); // Reset to 15 minutes for new session
      } else {
        setIsActive(false);
      }
    } else {
      setIsActive(false);
    }
  }, [isConnected, hasPremiumAccess]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0 && !hasPremiumAccess) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, hasPremiumAccess, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 300) return "text-green-600"; // > 5 minutes
    if (timeLeft > 60) return "text-yellow-600"; // > 1 minute
    return "text-red-600"; // < 1 minute
  };

  if (!isConnected) return null;

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800 dark:text-white">
              Chat Time
            </span>
          </div>
          
          {hasPremiumAccess ? (
            <div className="flex items-center gap-2 text-purple-600">
              <Infinity className="h-5 w-5" />
              <span className="font-bold">Unlimited</span>
              <Crown className="h-4 w-4 text-yellow-500" />
              {partnerPremium && !isPremium && (
                <span className="text-xs text-green-600">(Partner Premium)</span>
              )}
            </div>
          ) : (
            <div className={`font-mono text-xl font-bold ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
        
        {!hasPremiumAccess && (
          <>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeLeft > 300 ? 'bg-green-500' :
                  timeLeft > 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(timeLeft / (15 * 60)) * 100}%` }}
              />
            </div>
            
            {timeLeft < 300 && ( // Show upgrade prompt when < 5 minutes left
              <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  ⏰ Continue this amazing conversation! Get Premium for unlimited time with this person.
                </p>
                <Button
                  size="sm"
                  onClick={onUpgrade}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade Now - ₹99/week
                </Button>
              </div>
            )}
          </>
        )}
        
        {hasPremiumAccess && (
          <div className="mt-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg text-center">
            <p className="text-sm text-green-600 dark:text-green-400">
              ✨ {isPremium ? "You have" : "Your partner has"} Premium - Enjoy unlimited chat time! 💕
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
