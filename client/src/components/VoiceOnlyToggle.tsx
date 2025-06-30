
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mic, Video, Crown } from "lucide-react";

interface VoiceOnlyToggleProps {
  isPremium: boolean;
  isVoiceOnly: boolean;
  onToggle: (voiceOnly: boolean) => void;
  onUpgrade: () => void;
}

export default function VoiceOnlyToggle({ 
  isPremium, 
  isVoiceOnly, 
  onToggle, 
  onUpgrade 
}: VoiceOnlyToggleProps) {
  const handleToggle = () => {
    if (!isPremium) {
      onUpgrade();
      return;
    }
    onToggle(!isVoiceOnly);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Chat Mode
          {!isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={!isVoiceOnly ? "default" : "outline"}
            className="h-auto p-3"
            onClick={() => isPremium ? onToggle(false) : undefined}
          >
            <div className="flex flex-col items-center gap-2">
              <Video className="h-6 w-6" />
              <div className="text-xs">Video Call</div>
            </div>
          </Button>
          
          <Button
            variant={isVoiceOnly ? "default" : "outline"}
            className={`h-auto p-3 relative ${!isPremium ? "opacity-50" : ""}`}
            onClick={handleToggle}
          >
            <div className="flex flex-col items-center gap-2">
              <Mic className="h-6 w-6" />
              <div className="text-xs">Voice Only</div>
            </div>
            {!isPremium && (
              <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
            )}
          </Button>
        </div>
        
        {!isPremium && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              🎙️ Voice-only mode is for Premium users only!
            </p>
            <Button
              size="sm"
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Crown className="h-4 w-4 mr-1" />
              Upgrade Now
            </Button>
          </div>
        )}
        
        {isPremium && (
          <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-xs text-green-600 dark:text-green-400">
              ✨ Premium Feature Unlocked!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
