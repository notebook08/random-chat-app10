import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'pt' | 'ar' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Name
    'app.name': 'AjnabiCam',
    'app.tagline': 'Connect with strangers instantly',
    
    // Onboarding
    'onboarding.welcome': 'Welcome to AjnabiCam',
    'onboarding.subtitle': 'Set up your profile to get started',
    'onboarding.username': 'Username',
    'onboarding.username.placeholder': 'Enter your username',
    'onboarding.gender': 'Gender',
    'onboarding.gender.male': 'Male',
    'onboarding.gender.female': 'Female',
    'onboarding.gender.other': 'Other',
    'onboarding.language': 'Language',
    'onboarding.continue': 'Continue',
    'onboarding.skip': 'Skip for now',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'Start Chatting',
    'home.features.hd': 'HD Video',
    'home.features.secure': 'Secure',
    'home.features.instant': 'Instant',
    
    // Navigation
    'nav.home': 'Home',
    'nav.chat': 'Chat',
    'nav.friends': 'Friends',
    'nav.voice': 'Voice',
    'nav.profile': 'Profile',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.back': 'Back',
  },
  hi: {
    // App Name
    'app.name': 'अजनबीकैम',
    'app.tagline': 'अजनबियों से तुरंत जुड़ें',
    
    // Onboarding
    'onboarding.welcome': 'अजनबीकैम में आपका स्वागत है',
    'onboarding.subtitle': 'शुरू करने के लिए अपनी प्रोफ़ाइल सेट करें',
    'onboarding.username': 'उपयोगकर्ता नाम',
    'onboarding.username.placeholder': 'अपना उपयोगकर्ता नाम दर्ज करें',
    'onboarding.gender': 'लिंग',
    'onboarding.gender.male': 'पुरुष',
    'onboarding.gender.female': 'महिला',
    'onboarding.gender.other': 'अन्य',
    'onboarding.language': 'भाषा',
    'onboarding.continue': 'जारी रखें',
    'onboarding.skip': 'अभी छोड़ें',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'चैट शुरू करें',
    'home.features.hd': 'HD वीडियो',
    'home.features.secure': 'सुरक्षित',
    'home.features.instant': 'तुरंत',
    
    // Navigation
    'nav.home': 'होम',
    'nav.chat': 'चैट',
    'nav.friends': 'दोस्त',
    'nav.voice': 'आवाज़',
    'nav.profile': 'प्रोफ़ाइल',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.back': 'वापस',
  },
  es: {
    // App Name
    'app.name': 'AjnabiCam',
    'app.tagline': 'Conecta con extraños al instante',
    
    // Onboarding
    'onboarding.welcome': 'Bienvenido a AjnabiCam',
    'onboarding.subtitle': 'Configura tu perfil para comenzar',
    'onboarding.username': 'Nombre de usuario',
    'onboarding.username.placeholder': 'Ingresa tu nombre de usuario',
    'onboarding.gender': 'Género',
    'onboarding.gender.male': 'Masculino',
    'onboarding.gender.female': 'Femenino',
    'onboarding.gender.other': 'Otro',
    'onboarding.language': 'Idioma',
    'onboarding.continue': 'Continuar',
    'onboarding.skip': 'Omitir por ahora',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'Comenzar a chatear',
    'home.features.hd': 'Video HD',
    'home.features.secure': 'Seguro',
    'home.features.instant': 'Instantáneo',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.chat': 'Chat',
    'nav.friends': 'Amigos',
    'nav.voice': 'Voz',
    'nav.profile': 'Perfil',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.back': 'Atrás',
  },
  fr: {
    // App Name
    'app.name': 'AjnabiCam',
    'app.tagline': 'Connectez-vous instantanément avec des inconnus',
    
    // Onboarding
    'onboarding.welcome': 'Bienvenue sur AjnabiCam',
    'onboarding.subtitle': 'Configurez votre profil pour commencer',
    'onboarding.username': "Nom d'utilisateur",
    'onboarding.username.placeholder': "Entrez votre nom d'utilisateur",
    'onboarding.gender': 'Genre',
    'onboarding.gender.male': 'Masculin',
    'onboarding.gender.female': 'Féminin',
    'onboarding.gender.other': 'Autre',
    'onboarding.language': 'Langue',
    'onboarding.continue': 'Continuer',
    'onboarding.skip': 'Passer pour maintenant',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'Commencer à chatter',
    'home.features.hd': 'Vidéo HD',
    'home.features.secure': 'Sécurisé',
    'home.features.instant': 'Instantané',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.chat': 'Chat',
    'nav.friends': 'Amis',
    'nav.voice': 'Voix',
    'nav.profile': 'Profil',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.back': 'Retour',
  },
  de: {
    // App Name
    'app.name': 'AjnabiCam',
    'app.tagline': 'Verbinde dich sofort mit Fremden',
    
    // Onboarding
    'onboarding.welcome': 'Willkommen bei AjnabiCam',
    'onboarding.subtitle': 'Richte dein Profil ein, um zu beginnen',
    'onboarding.username': 'Benutzername',
    'onboarding.username.placeholder': 'Gib deinen Benutzernamen ein',
    'onboarding.gender': 'Geschlecht',
    'onboarding.gender.male': 'Männlich',
    'onboarding.gender.female': 'Weiblich',
    'onboarding.gender.other': 'Andere',
    'onboarding.language': 'Sprache',
    'onboarding.continue': 'Weiter',
    'onboarding.skip': 'Vorerst überspringen',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'Chat starten',
    'home.features.hd': 'HD Video',
    'home.features.secure': 'Sicher',
    'home.features.instant': 'Sofort',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.chat': 'Chat',
    'nav.friends': 'Freunde',
    'nav.voice': 'Stimme',
    'nav.profile': 'Profil',
    
    // Common
    'common.loading': 'Lädt...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.back': 'Zurück',
  },
  pt: {
    // App Name
    'app.name': 'AjnabiCam',
    'app.tagline': 'Conecte-se instantaneamente com estranhos',
    
    // Onboarding
    'onboarding.welcome': 'Bem-vindo ao AjnabiCam',
    'onboarding.subtitle': 'Configure seu perfil para começar',
    'onboarding.username': 'Nome de usuário',
    'onboarding.username.placeholder': 'Digite seu nome de usuário',
    'onboarding.gender': 'Gênero',
    'onboarding.gender.male': 'Masculino',
    'onboarding.gender.female': 'Feminino',
    'onboarding.gender.other': 'Outro',
    'onboarding.language': 'Idioma',
    'onboarding.continue': 'Continuar',
    'onboarding.skip': 'Pular por agora',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'Começar a conversar',
    'home.features.hd': 'Vídeo HD',
    'home.features.secure': 'Seguro',
    'home.features.instant': 'Instantâneo',
    
    // Navigation
    'nav.home': 'Início',
    'nav.chat': 'Chat',
    'nav.friends': 'Amigos',
    'nav.voice': 'Voz',
    'nav.profile': 'Perfil',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.back': 'Voltar',
  },
  ar: {
    // App Name
    'app.name': 'أجنبي كام',
    'app.tagline': 'تواصل مع الغرباء فوراً',
    
    // Onboarding
    'onboarding.welcome': 'مرحباً بك في أجنبي كام',
    'onboarding.subtitle': 'قم بإعداد ملفك الشخصي للبدء',
    'onboarding.username': 'اسم المستخدم',
    'onboarding.username.placeholder': 'أدخل اسم المستخدم',
    'onboarding.gender': 'الجنس',
    'onboarding.gender.male': 'ذكر',
    'onboarding.gender.female': 'أنثى',
    'onboarding.gender.other': 'آخر',
    'onboarding.language': 'اللغة',
    'onboarding.continue': 'متابعة',
    'onboarding.skip': 'تخطي الآن',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': 'بدء المحادثة',
    'home.features.hd': 'فيديو عالي الدقة',
    'home.features.secure': 'آمن',
    'home.features.instant': 'فوري',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.chat': 'المحادثة',
    'nav.friends': 'الأصدقاء',
    'nav.voice': 'الصوت',
    'nav.profile': 'الملف الشخصي',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.back': 'رجوع',
  },
  zh: {
    // App Name
    'app.name': '陌生人摄像头',
    'app.tagline': '立即与陌生人连接',
    
    // Onboarding
    'onboarding.welcome': '欢迎来到陌生人摄像头',
    'onboarding.subtitle': '设置您的个人资料以开始',
    'onboarding.username': '用户名',
    'onboarding.username.placeholder': '输入您的用户名',
    'onboarding.gender': '性别',
    'onboarding.gender.male': '男性',
    'onboarding.gender.female': '女性',
    'onboarding.gender.other': '其他',
    'onboarding.language': '语言',
    'onboarding.continue': '继续',
    'onboarding.skip': '暂时跳过',
    
    // Languages
    'language.english': 'English',
    'language.hindi': 'हिंदी (Hindi)',
    'language.spanish': 'Español (Spanish)',
    'language.french': 'Français (French)',
    'language.german': 'Deutsch (German)',
    'language.portuguese': 'Português (Portuguese)',
    'language.arabic': 'العربية (Arabic)',
    'language.chinese': '中文 (Chinese)',
    
    // Home Screen
    'home.start': '开始聊天',
    'home.features.hd': '高清视频',
    'home.features.secure': '安全',
    'home.features.instant': '即时',
    
    // Navigation
    'nav.home': '首页',
    'nav.chat': '聊天',
    'nav.friends': '朋友',
    'nav.voice': '语音',
    'nav.profile': '个人资料',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.cancel': '取消',
    'common.save': '保存',
    'common.back': '返回',
  },
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('ajnabicam_language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ajnabicam_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];