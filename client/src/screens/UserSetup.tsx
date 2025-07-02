
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Camera, Crown } from 'lucide-react';

const UserSetup: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFreeTrial = () => {
    // Navigate to premium trial
    navigate('/premium-trial');
  };

  const handleContinueFree = () => {
    // Save user data and continue to main app
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_gender', gender);
    if (profileImage) {
      localStorage.setItem('user_profile_image', profileImage);
    }
    navigate('/');
  };

  const isFormValid = name.trim() && gender;

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Setup Your Profile</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-rose-50 to-pink-100 px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">Help others know you better</p>
          </div>

          {/* Profile Setup Card */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-rose-200 mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-rose-700">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-rose-300 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleImageUpload}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                      <span className="text-sm text-rose-600 font-medium">Add Photo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Tap to add your photo</p>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white/90"
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      gender === 'male'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">👨</div>
                    <div className="font-semibold">Male</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      gender === 'female'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 bg-white hover:border-pink-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">👩</div>
                    <div className="font-semibold">Female</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleFreeTrial}
              disabled={!isFormValid}
              className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              <Crown className="h-5 w-5 mr-2" />
              Start Free Trial - ₹19
            </Button>
            
            <Button
              onClick={handleContinueFree}
              disabled={!isFormValid}
              variant="outline"
              className="w-full py-4 text-lg font-semibold rounded-xl border-2 border-rose-300 text-rose-600 bg-white hover:bg-rose-50 disabled:opacity-50"
            >
              Continue for Free
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>
    </>
  );
};

export default UserSetup;
