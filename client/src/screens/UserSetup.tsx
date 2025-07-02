
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
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Tell us about yourself to get started</p>
        </div>

        <div className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div 
              onClick={handleImageUpload}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-4 border-white shadow-lg overflow-hidden"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-sm font-medium">Add Photo</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">Tap to add your photo</p>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map((option) => (
                <button
                  key={option}
                  onClick={() => setGender(option.toLowerCase())}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    gender === option.toLowerCase()
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleFreeTrial}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Start Free Trial ✨
            </button>
            
            <button
              onClick={handleContinueFree}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-medium border-2 transition-all ${
                isFormValid
                  ? 'border-purple-500 text-purple-600 hover:bg-purple-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Upload, Crown } from 'lucide-react';

const UserSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    photo: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStartFreeTrial = () => {
    setIsSubmitting(true);
    // Save user data to localStorage
    localStorage.setItem('ajnabicam_user_data', JSON.stringify({
      name: formData.name,
      gender: formData.gender,
      setupComplete: true,
      isPremium: true,
      premiumExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days trial
    }));
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleContinueFree = () => {
    setIsSubmitting(true);
    // Save user data to localStorage
    localStorage.setItem('ajnabicam_user_data', JSON.stringify({
      name: formData.name,
      gender: formData.gender,
      setupComplete: true,
      isPremium: false
    }));
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const isFormValid = formData.name.trim() && formData.gender && formData.photo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Tell us a bit about yourself to get started</p>
        </div>

        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="w-24 h-24 mx-auto flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <>
                  <Camera className="w-8 h-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartFreeTrial}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transform transition-all duration-300 ${
              isFormValid && !isSubmitting ? 'hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span>Start Free Trial</span>
          </button>

          <button
            onClick={handleContinueFree}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-6 bg-gray-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ${
              isFormValid && !isSubmitting ? 'hover:scale-105 hover:shadow-xl hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Setting up...</span>
              </div>
            ) : (
              'Continue for Free'
            )}
          </button>
        </div>

        {/* Premium Benefits */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <p className="text-xs text-yellow-800 text-center">
            <Crown className="w-4 h-4 inline mr-1" />
            Premium includes: Gender filters, Unlimited skips, HD video quality & more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSetup;
