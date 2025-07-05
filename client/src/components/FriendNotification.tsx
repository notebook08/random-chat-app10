import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Video, X } from "lucide-react";

interface FriendNotificationProps {
  friendName: string;
  onCall: () => void;
  onDismiss: () => void;
}

export default function FriendNotification({ friendName, onCall, onDismiss }: FriendNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 10000); // Auto dismiss after 10 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl border-0 animate-slide-down">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span className="font-semibold text-sm">Friend Online</span>
              </div>
              <p className="text-white font-medium">
                <span className="font-bold">{friendName}</span> is online now - call them?
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
              className="text-white hover:bg-white/20 p-1"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => {
                setIsVisible(false);
                onCall();
              }}
              className="flex-1 bg-white text-green-600 hover:bg-gray-100 font-semibold py-2 rounded-lg"
            >
              <Video className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            
            <Button
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
              variant="ghost"
              className="text-white hover:bg-white/20 px-4"
            >
              Later
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}