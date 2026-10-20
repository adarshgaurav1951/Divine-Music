import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation
  navHome: { en: 'Home', hi: 'होम' },
  navAbout: { en: 'About Maa Kali', hi: 'माँ काली परिचय' },
  navAarti: { en: 'Aarti & Mantras', hi: 'आरती एवं मंत्र' },
  navVirtualDiya: { en: 'Light a Diya', hi: 'दीप प्रज्वलन' },
  navGallery: { en: 'Gallery', hi: 'दर्शन गैलरी' },
  navTemples: { en: 'Sacred Temples', hi: 'प्रसिद्ध मंदिर' },
  navFestivals: { en: 'Festivals', hi: 'उत्सव व पूजन' },
  navPrayers: { en: 'Prayer Wall', hi: 'प्रार्थना स्थल' },
  navContact: { en: 'Blessings', hi: 'आशीर्वाद' },

  // Hero
  heroSubtitle: {
    en: 'Sacred 3D Open-Air Beach Bonfire & Diwali Darshan',
    hi: 'पवित्र 3D समुद्र तट महायज्ञ, महाकाली दर्शन एवं दीपावली'
  },
  heroTitle: {
    en: 'DIVINE MAA SHYAMA KALI',
    hi: 'दिव्य माँ श्यामा काली'
  },
  btnEnterDarshan: {
    en: 'Enter Darshan',
    hi: 'दर्शन में प्रवेश करें'
  },
  btnLightDiya: {
    en: 'Light a Virtual Diya',
    hi: 'पवित्र दिया जलाएं'
  },
  statueView: { en: 'Maa Kali Statue', hi: 'माँ काली प्रतिमा' },
  bonfireView: { en: 'Beach & Bonfire', hi: 'तट एवं महायज्ञ' },
  panoramaView: { en: 'Sunset Panorama', hi: 'संध्या विहंगम दृश्य' },
  heroHint: {
    en: '✨ Drag to orbit view • Tap sky for festive sparklers • Scroll down to explore',
    hi: '✨ दृश्य घुमाने के लिए ड्रैग करें • आतिशबाज़ी के लिए आकाश छुएं • नीचे स्क्रॉल करें'
  },

  // About Section
  aboutTitle: { en: 'The Eternal Mother: Maa Kali', hi: 'सनातन जगन्माता: माँ काली' },
  aboutSubtitle: {
    en: 'Goddess of Time, Creation, Transformation, and Ultimate Liberation',
    hi: 'काल, सृष्टि, संहार और मोक्ष की आदि शक्ति'
  },
  aboutDesc1: {
    en: 'Maa Kali is the fierce yet profoundly compassionate form of Adi Parashakti. Representing the primordial cosmic void, She destroys ignorance, ego, and evil forces while fiercely protecting and nurturing Her devotees like a mother.',
    hi: 'माँ काली आदि पराशक्ति का अत्यंत तेजस्वी व करुणामयी स्वरूप हैं। वे अविद्या, अहंकार और अंधकार का नाश करती हैं और अपने भक्तों की एक स्नेहमयी माता की तरह रक्षा करती हैं।'
  },
  aboutDesc2: {
    en: 'On the sacred night of Kartik Amavasya (Diwali), Shyama Puja is celebrated with immense devotion across Bengal, Assam, Odisha, and worldwide, celebrating the triumph of eternal divine light over internal darkness.',
    hi: 'कार्तिक अमावस्या (दीपावली) की पवित्र रात्रि में श्यामा पूजा अत्यधिक श्रद्धा से मनाई जाती है, जो अंतरात्मा के अज्ञान पर दिव्य प्रकाश की विजय का प्रतीक है।'
  },

  // Symbolism Cards
  symDarkSkinTitle: { en: 'Dark Cosmic Skin', hi: 'श्याम वर्ण' },
  symDarkSkinDesc: {
    en: 'Just as all colors dissolve into blackness, all creation emerges from and returns into Her boundless infinite cosmic expanse.',
    hi: 'जिस प्रकार समस्त रंग काले रंग में विलीन हो जाते हैं, वैसे ही संपूर्ण सृष्टि उन्हीं में समाहित है।'
  },
  symMundamalaTitle: { en: 'Mundamala (Skull Garland)', hi: 'मुण्डमाला' },
  symMundamalaDesc: {
    en: 'Her garland of 50 skulls represents the 50 letters of the Sanskrit alphabet (Aksharamala), the divine vibrations through which creation exists.',
    hi: 'गले में 50 मुंडों की माला संस्कृत वर्णमाला के 50 अक्षरों (नाद ब्रह्म) का प्रतीक है।'
  },
  symWeaponsTitle: { en: 'Khadga, Trishul & Lotus', hi: 'खड्ग, त्रिशूल व कमल' },
  symWeaponsDesc: {
    en: 'The curved sword severs ego; the trident upholds cosmic order (Sattva, Rajas, Tamas); the lotus symbolizes eternal pure consciousness.',
    hi: 'खड्ग अहंकार का छेदन करता है, त्रिशूल त्रिगुणों का संतुलन है और कमल निर्मल चेतना का प्रतीक है।'
  },
  symTongueTitle: { en: 'Red Tongue & Lord Shiva', hi: 'जिह्वा व भगवान शिव' },
  symTongueDesc: {
    en: 'Biting Her tongue in sudden humility upon stepping on Lord Shiva, representing dynamic Shakti resting upon pure unmanifest Shiva consciousness.',
    hi: 'भगवान शिव के वक्ष पर चरण पड़ने से उत्पन्न लज्जा, जो शक्ति और शांत शिव चेतना के मिलन का द्योतक है।'
  },

  // Aarti & Mantra
  aartiTitle: { en: 'Sacred Aarti & Japa Mala', hi: 'पवित्र आरती एवं जप माला' },
  aartiSubtitle: {
    en: 'Chant sacred mantras and offer divine prayers to Maa Shyama Kali',
    hi: 'माँ श्यामा काली के दिव्य मंत्रों का जप और पावन आरती'
  },
  japaMalaCounter: { en: 'Mantra Japa Counter', hi: 'मंत्र जप काउंटर' },
  japaCount: { en: 'Japa Count', hi: 'जप संख्या' },
  tapToCount: { en: 'Tap Bead to Chant', hi: 'मनका दबाकर जप करें' },
  resetMala: { en: 'Reset Mala', hi: 'माला रीसेट करें' },
  completed108: {
    en: '✨ 108 Sacred Chants Completed! May Maa Kali shower eternal blessings!',
    hi: '✨ 108 पावन जप पूर्ण! माँ काली की असीम कृपा आप पर बनी रहे!'
  },
  btnWaveAarti: { en: 'Wave Aarti Thali', hi: 'आरती थाली घुमाएं' },
  btnOfferFlowers: { en: 'Offer Pushpanjali', hi: 'पुष्पांजलि अर्पित करें' },
  btnRingBell: { en: 'Ring Temple Bell', hi: 'घंटी बजाएं' },
  btnBlowShankh: { en: 'Blow Conch (Shankh)', hi: 'शंखनाद करें' },

  // Virtual Diya
  diyaTitle: { en: 'Light a Virtual Diya', hi: 'पवित्र दीप प्रज्वलित करें' },
  diyaSubtitle: {
    en: 'Dedicate a glowing diya with your name and prayer to illuminate the sacred altar',
    hi: 'अपने नाम व प्रार्थना के साथ पवित्र वेदी पर ज्योति प्रज्वलित करें'
  },
  diyaFormName: { en: 'Your Name', hi: 'आपका नाम' },
  diyaFormCity: { en: 'City / Country', hi: 'शहर / देश' },
  diyaFormPrayer: { en: 'Your Prayer / Sankalpa', hi: 'आपकी प्रार्थना / संकल्प' },
  diyaTypeMitti: { en: 'Earthen Clay Diya', hi: 'पवित्र मिट्टी का दिया' },
  diyaTypeBrass: { en: 'Brass Pancha-Deep', hi: 'पीतल पंच-प्रदीप' },
  diyaTypeAkhand: { en: 'Akhand Maha-Jyoti', hi: 'अखण्ड महा-ज्योति' },
  btnLightNow: { en: 'Light My Sacred Diya 🔥', hi: 'मेरी ज्योति प्रज्वलित करें 🔥' },
  diyasLitTotal: { en: 'Diyas Burning Worldwide', hi: 'संसार भर में प्रज्वलित पावन दीप' },

  // Temples
  templesTitle: { en: 'Famous Sacred Temples of Maa Kali', hi: 'माँ काली के सुप्रसिद्ध पावन तीर्थ' },
  templesSubtitle: {
    en: 'Holy shrines across India where millions experience the living presence of the Divine Mother',
    hi: 'भारत के वे सिद्ध शक्तिपीठ जहां माँ के जीवंत साक्षात् दर्शन होते हैं'
  },

  // Prayer Wall
  prayerTitle: { en: 'Community Devotee Prayer Wall', hi: 'भक्त प्रार्थना एवं संकल्प वेदी' },
  prayerSubtitle: {
    en: 'Read and share heartfelt prayers for health, peace, prosperity, and divine motherly grace',
    hi: 'समस्त भक्तों द्वारा माँ के श्रीचरणों में अर्पित प्रार्थनाएं व आशीष'
  },
  btnPostPrayer: { en: 'Post Your Prayer', hi: 'अपनी प्रार्थना अर्पित करें' }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('divine_kali_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('divine_kali_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
