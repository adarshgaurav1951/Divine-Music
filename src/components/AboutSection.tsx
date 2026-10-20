import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();

  const isHindi = language === 'hi';

  return (
    <section id="about" style={{
      padding: 'clamp(50px, 8vh, 85px) clamp(20px, 4vw, 40px)',
      maxWidth: 960,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Calm Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span style={{
          fontSize: '11px',
          color: '#f5c042',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-serif)',
          display: 'block',
          marginBottom: 8
        }}>
          {isHindi ? 'पवित्र स्वरूप एवं तत्व' : 'Sacred form & significance'}
        </span>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(24px, 3.2vw, 38px)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '1px'
        }}>
          {isHindi ? 'माँ काली का दिव्य स्वरूप' : 'About Goddess Kali'}
        </h2>
      </div>

      {/* Serene, Uncluttered Paragraphs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontSize: '15px',
        lineHeight: 1.8,
        color: '#e4d8dc',
        fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-primary)'
      }}>
        <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: '14px' }}>
          <p style={{ margin: 0 }}>
            {isHindi ? (
              <>
                माँ काली आदि पराशक्ति का वह ममतामयी और संहारक स्वरूप हैं जो समय, प्रकृति और ब्रह्मांड के अनंत चक्र को नियंत्रित करती हैं। उनका श्यामल वर्ण उस असीम शून्य और रात्रि का प्रतीक है जिसमें से समस्त संसार उत्पन्न होता है और अंततः उसी में विलीन हो जाता है।
              </>
            ) : (
              <>
                Goddess Kali is the fierce yet profoundly compassionate manifestation of Adi Parashakti. Her dark skin represents the primordial cosmic void—the infinite space from which all existence arises and into which all creation eventually dissolves.
              </>
            )}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: '14px' }}>
          <p style={{ margin: 0 }}>
            {isHindi ? (
              <>
                उनके गले की मुण्डमाला संस्कृत वर्णमाला के पचास अक्षरों (नाद ब्रह्म) का प्रतीक है। उनके हाथों में स्थित खड्ग साधक के अज्ञान और अहंकार का छेदन करता है, त्रिशूल सृष्टि, स्थिति और संहार के संतुलन को दर्शाता है, तथा खिला हुआ कमल निर्मल चेतना और मोक्ष का वरदान देता है।
              </>
            ) : (
              <>
                Her garland of fifty skulls symbolizes the fifty sacred vibrations of the Sanskrit alphabet (Aksharamala). Her curved sword severs the veil of human ego, Her trident sustains cosmic balance, and the blooming lotus offers pure spiritual consciousness and liberation.
              </>
            )}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px 28px', borderRadius: '14px' }}>
          <p style={{ margin: 0 }}>
            {isHindi ? (
              <>
                कार्तिक अमावस्या (दीपावली) की रात्रि में श्यामा पूजा का विशेष महत्व है। जहाँ दीपावली पर घर-घर में दीपक जलाए जाते हैं, वहीं माँ काली अंतर्मन के अंधकार, भय और संशय को भस्म कर साधक को अभय प्रदान करती हैं।
              </>
            ) : (
              <>
                On the sacred night of Kartik Amavasya (Diwali), Shyama Puja is celebrated with deep reverence. As earthen lamps illuminate the night outside, Mother Kali burns away inner darkness, fear, and doubt, blessing Her devotees with supreme inner light and maternal peace.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
