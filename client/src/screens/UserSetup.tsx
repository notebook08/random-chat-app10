import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function UserSetup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFreeTrial = () => {
    const userData = {
      name,
      gender,
      photo,
      setupComplete: true,
      isPremium: true,
      trialExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    localStorage.setItem('ajnabicam_user_data', JSON.stringify(userData));
    navigate('/');
  };

  const handleContinueFree = () => {
    const userData = {
      name,
      gender,
      photo,
      setupComplete: true,
      isPremium: false
    };
    localStorage.setItem('ajnabicam_user_data', JSON.stringify(userData));
    navigate('/');
  };

  const isFormValid = name.trim() && gender;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Setup Your Profile - AjnabiCam</title>
        <meta name="description" content="Create your profile to start connecting" />
      </Helmet>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Setup Your Profile</h1>
            <p className="text-gray-600">Tell us about yourself</p>
          </div>

          <div className="space-y-4">
            {/* Photo Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                {photo ? (
                  <img 
                    src={photo} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-purple-200">
                    <span className="text-gray-400 text-sm">Photo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Tap to add photo</p>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    gender === 'male' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  👨 Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    gender === 'female' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  👩 Female
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleFreeTrial}
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                👑 Start Free Trial
              </Button>

              <Button
                onClick={handleContinueFree}
                disabled={!isFormValid}
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 py-3 rounded-lg font-semibold"
              >
                Continue for Free
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}