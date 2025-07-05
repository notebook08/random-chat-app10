import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, X, Users } from "lucide-react";

interface StayConnectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStayConnected: (wantToStay: boolean) => void;
  partnerName?: string;
}

export default function StayConnectedModal({ 
  isOpen, 
  onClose, 
  onStayConnected, 
  partnerName = "Stranger" 
}: StayConnectedModalProps) {
  const [isWaiting, setIsWaiting] = useState(false);

  if (!isOpen) return null;

  const handleStayConnected = () => {
    setIsWaiting(true);
    onStayConnected(true);
  };

  const handleDontStay = () => {
    onStayConnected(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm mx-auto bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-rose-200 shadow-2xl">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-1"
          >
            <X size={20} />
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-rose-700">
            Stay Connected?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-2">
              Do you want to stay connected with <span className="font-semibold text-rose-600">{partnerName}</span>?
            </p>
            <p className="text-sm text-gray-500">
              You'll be added to each other's friends list and can video call anytime!
            </p>
          </div>

          {isWaiting ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Waiting for {partnerName}'s response...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={handleStayConnected}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 rounded-xl shadow-md"
              >
                <Users className="h-5 w-5 mr-2" />
                Yes, Stay Connected! 💕
              </Button>
              
              <Button
                onClick={handleDontStay}
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl"
              >
                No, Thanks
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}