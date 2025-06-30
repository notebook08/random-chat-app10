
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, User, Crown } from "lucide-react";

interface GenderFilterProps {
  isPremium: boolean;
  onGenderSelect: (gender: string) => void;
  onUpgrade: () => void;
}

export default function GenderFilter({ isPremium, onGenderSelect, onUpgrade }: GenderFilterProps) {
  const [selectedGender, setSelectedGender] = useState<string>("any");

  const genderOptions = [
    { id: "any", label: "Anyone", icon: Users, description: "Connect with all genders" },
    { id: "male", label: "Male", icon: User, description: "Connect with males only" },
    { id: "female", label: "Female", icon: User, description: "Connect with females only" }
  ];

  const handleGenderChange = (gender: string) => {
    if (!isPremium && gender !== "any") {
      onUpgrade();
      return;
    }
    setSelectedGender(gender);
    onGenderSelect(gender);
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gender Preference
          {!isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {genderOptions.map((option) => {
            const Icon = option.icon;
            const isLocked = !isPremium && option.id !== "any";
            
            return (
              <Button
                key={option.id}
                variant={selectedGender === option.id ? "default" : "outline"}
                className={`justify-start h-auto p-3 ${
                  isLocked ? "opacity-50 relative" : ""
                }`}
                onClick={() => handleGenderChange(option.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {isLocked && (
                    <Crown className="h-4 w-4 text-yellow-500 ml-auto" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        
        {!isPremium && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              🎯 Want to filter by gender? Upgrade to Premium!
            </p>
            <Button
              size="sm"
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Crown className="h-4 w-4 mr-1" />
              Get Premium
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
