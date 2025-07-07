import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { useLanguage, languages, Language } from '../context/LanguageProvider';
import { Globe, User, Users, ChevronDown } from 'lucide-react';

export default function OnboardingScreen() {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (username.trim() && gender) {
      // Save user data with setup complete flag
      const userData = {
        username: username.trim(),
        gender,
        language,
        setupComplete: true,
        onboardingComplete: true
      };
      localStorage.setItem('ajnabicam_user_data', JSON.stringify(userData));
      navigate('/');
    }
  };

  const handleSkip = () => {
    // Save minimal data to indicate onboarding was seen
    const userData = {
      username: 'User',
      gender: 'other',
      language,
      setupComplete: true,
      onboardingComplete: true
    };
    localStorage.setItem('ajnabicam_user_data', JSON.stringify(userData));
    navigate('/');
  };

  const genderOptions = [
    { value: 'male', label: t('onboarding.gender.male'), emoji: '👨' },
    { value: 'female', label: t('onboarding.gender.female'), emoji: '👩' },
    { value: 'other', label: t('onboarding.gender.other'), emoji: '🧑' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎥</div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {t('onboarding.welcome')}
          </h1>
          <p className="text-gray-600">{t('onboarding.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t('onboarding.language')}
            </label>
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white flex items-center justify-between hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currentLanguage?.flag}</span>
                  <span className="font-medium">{currentLanguage?.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-purple-50 flex items-center gap-3 transition-colors ${
                        language === lang.code ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('onboarding.username')}
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('onboarding.username.placeholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={20}
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('onboarding.gender')}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGender(option.value)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    gender === option.value 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-300 text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleContinue}
              disabled={!username.trim() || !gender}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {t('onboarding.continue')}
            </Button>
            
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold"
            >
              {t('onboarding.skip')}
            </Button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your information is kept private and secure
          </p>
        </div>
      </Card>
    </div>
  );
}