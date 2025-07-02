
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function UserSetup() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartFreeTrial = () => {
    if (name && gender) {
      localStorage.setItem('userSetup', JSON.stringify({ name, gender, hasPhoto: !!photo }));
      navigate('/premium-trial');
    }
  };

  const handleContinueFree = () => {
    if (name && gender) {
      localStorage.setItem('userSetup', JSON.stringify({ name, gender, hasPhoto: !!photo }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            AjnabiCam
          </h1>
          <p className="text-gray-600">Setup your profile to get started</p>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Profile preview" 
                  className="w-full h-full rounded-full object-cover border-4 border-purple-200"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-purple-200">
                  <span className="text-gray-500 text-3xl">📷</span>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                <span className="text-sm">+</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">Add your photo</p>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                  gender === 'male' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-300 text-gray-700 hover:border-purple-300'
                }`}
              >
                👨 Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                  gender === 'female' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-300 text-gray-700 hover:border-purple-300'
                }`}
              >
                👩 Female
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleStartFreeTrial}
              disabled={!name || !gender}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👑 Start Free Trial
            </Button>
            
            <Button
              onClick={handleContinueFree}
              disabled={!name || !gender}
              variant="outline"
              className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue for Free
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
