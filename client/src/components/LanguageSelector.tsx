import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Globe, X, Check } from 'lucide-react';
import { useLanguage, languages, Language } from '../context/LanguageProvider';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ isOpen, onClose }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);

  if (!isOpen) return null;

  const handleSave = () => {
    setLanguage(selectedLanguage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto bg-white border-2 border-purple-200 shadow-2xl max-h-[80vh] overflow-hidden">
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-purple-700">
            {t('onboarding.language')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto max-h-96">
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLanguage === lang.code
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="h-5 w-5 text-purple-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
            >
              {t('common.save')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}