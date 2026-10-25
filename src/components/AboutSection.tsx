import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Shield, Heart, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const iconography = [
    {
      icon: <Sparkles size={20} color="#ffd700" />,
      titleEn: '1. Maha Mukut & Trinetra (Crown & Third Eye)',
      titleHi: '१. महा मुकुट एवं दिव्य त्रिनेत्र',
      descEn: 'The ornate golden crown symbolizes universal sovereignty. Her glowing Third Eye (Trinetra) burns away cosmic illusion (Maya) and pierces through past, present, and future.',
      descHi: 'स्वर्ण मुकुट ब्रह्मांडीय आधिपत्य का प्रतीक है। भाल पर स्थित पावन त्रिनेत्र समस्त माया और अविद्या को भस्म कर भूत, भविष्य व वर्तमान का सत्य उद्घाटित करता है।'
    },
    {
      icon: <Flame size={20} color="#ff7700" />,
      titleEn: '2. Khadga, Trishula & Abhaya Mudra',
      titleHi: '२. खड्ग, त्रिशूल एवं अभय मुद्रा',
      descEn: 'Her curved sword severs the root of ego and ignorance; the Trishula balances the three cosmic Gunas (Sattva, Rajas, Tamas); Her lower right hand bestows supreme fearlessness to all devotees.',
      descHi: 'हाथ का खड्ग अहंकार व अज्ञान की जड़ काटता है; त्रिशूल सत्त्व, रज और तम तीनों गुणों का संतुलन है; तथा अभय मुद्रा भक्तों को संसार के समस्त भयों से मुक्ति दिलाती है।'
    },
    {
      icon: <Shield size={20} color="#ff3366" />,
      titleEn: '3. Mundamala & Skirt of Arms',
      titleHi: '३. मुण्डमाला एवं कर-कांचन',
      descEn: 'Her garland of fifty skulls embodies the 50 primordial sound vibrations of the Sanskrit alphabet (Aksharamala). The skirt of severed arms represents liberation from the bindings of past karmas.',
      descHi: 'गले की पचास मुंडों की माला संस्कृत वर्णमाला के ५० नाद-ब्रह्म अक्षरों का प्रतीक है। कमर में भुजाओं की मेखला साधक को पूर्व संचित कर्मबंधनों से मुक्ति प्रदान करती है।'
    },
    {
      icon: <Heart size={20} color="#ffd700" />,
      titleEn: '4. Sacred Lotus Feet on Lord Shiva (Charan Kamal)',
      titleHi: '४. भगवान शिव पर पावन श्रीचरण (चरण कमल)',
      descEn: 'Her sacred lotus feet rest upon quiescent Lord Shiva on the golden lotus altar. This represents the ultimate philosophical truth: dynamic creative energy (Shakti) resting in union with pure unmanifest cosmic consciousness (Shiva).',
      descHi: 'भगवान शिव के वक्ष पर माँ के पावन चरण कमल स्थित हैं। यह दर्शाता है कि सक्रिय आदिशक्ति (प्रकृति) और शांत चेतना (शिव/पुरुष) का मिलन ही समस्त ब्रह्मांड का परम आधार है।'
    }
  ];

  return (
    <section id="about" style={{
      padding: 'clamp(50px, 8vh, 85px) clamp(20px, 4vw, 40px)',
      maxWidth: 1100,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Calm Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{
          fontSize: '11px',
          color: '#f5c042',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-serif)',
          display: 'block',
          marginBottom: 8
        }}>
          {isHindi ? 'पवित्र पूर्ण स्वरूप एवं तत्व' : 'Sacred Full-Body Iconography & Spiritual Essence'}
        </span>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(24px, 3.4vw, 40px)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '1px'
        }}>
          {isHindi ? 'माँ काली का विराट पूर्ण स्वरूप' : 'Viraat Swaroop: Full Standing Form of Maa Kali'}
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px',
          maxWidth: 680,
          margin: '10px auto 0',
          fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-serif)'
        }}>
          {isHindi
            ? 'शीश के स्वर्ण मुकुट से लेकर पावन चरण कमलों तक माँ का प्रत्येक अंग ब्रह्मांडीय रहस्यों और मातृ-कृपा से परिपूर्ण है।'
            : 'From the highest jewel of Her golden crown down to Her sacred lotus feet upon Lord Shiva, every aspect of Her standing posture embodies transcendent grace.'}
        </p>
      </div>

      {/* Grid: Full Standing Visual & Iconographic Insights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 28,
        alignItems: 'center',
        marginBottom: 32
      }}>
        {/* Left: Framed High-Res Standing Artwork Card */}
        <div className="glass-panel" style={{
          padding: 16,
          borderRadius: 20,
          border: '1px solid rgba(255, 200, 59, 0.35)',
          background: 'linear-gradient(180deg, rgba(30, 15, 38, 0.7) 0%, rgba(12, 6, 18, 0.85) 100%)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 119, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxHeight: 520,
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid rgba(255, 215, 0, 0.4)'
          }}>
            <img
              src="/textures/maa_kali_devotees_aarti_sanctum.jpg"
              alt="Maa Kali Beachside Aarti with Devotees"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 520,
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease'
              }}
              className="hover-zoom"
            />
            {/* Overlay Badges */}
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12,
              background: 'rgba(10, 5, 16, 0.88)',
              border: '1px solid rgba(255, 200, 59, 0.45)',
              borderRadius: 10,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(8px)'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#ffd700', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                  {isHindi ? 'माँ श्यामा काली • महाआरती व भक्तगण' : 'Maa Shyama Kali • Sacred Aarti & Devotees'}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.75)' }}>
                  {isHindi ? 'अग्नि प्रभा, दिव्य शस्त्र व पावन दीपमाला' : 'Fiery Solar Halo, Sacred Weapons & Diyas'}
                </div>
              </div>
              <a
                href="#hero"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.8), rgba(216, 33, 56, 0.8))',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: 20,
                  textDecoration: 'none',
                  border: '1px solid #ffd700'
                }}
              >
                {isHindi ? '360° दर्शन' : '360° Darshan'}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Iconography Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {iconography.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderRadius: 14,
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                border: '1px solid rgba(255, 200, 59, 0.25)',
                background: 'rgba(20, 10, 26, 0.65)'
              }}
            >
              <div style={{
                padding: 10,
                borderRadius: 10,
                background: 'rgba(255, 200, 59, 0.1)',
                border: '1px solid rgba(255, 200, 59, 0.3)',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{
                  margin: '0 0 6px 0',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#ffd700',
                  fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-serif)'
                }}>
                  {isHindi ? item.titleHi : item.titleEn}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: '#e4d8dc',
                  fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-primary)'
                }}>
                  {isHindi ? item.descHi : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Serene Spiritual Reflection */}
      <div className="glass-panel" style={{
        padding: '24px 30px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 200, 59, 0.3)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(30, 14, 40, 0.75), rgba(15, 6, 20, 0.85))'
      }}>
        <p style={{
          margin: 0,
          fontSize: '14.5px',
          lineHeight: 1.8,
          color: '#f5e4c8',
          fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-serif)'
        }}>
          {isHindi ? (
            <>
              कार्तिक अमावस्या (दीपावली) की पावन निशा में श्यामा पूजा का विशेष आध्यात्मिक विधान है। जहाँ दीपमालिकाएँ बाह्य अंधकार को दूर करती हैं, वहीं माँ काली का पूर्ण standing स्वरूप अंतर्मन के भय, संशय और अहंकार को भस्म कर साधक को मोक्ष और अभय का परमानंद प्रदान करता है।
            </>
          ) : (
            <>
              On the sacred night of Kartik Amavasya (Diwali), Shyama Puja is celebrated with immense reverence. As countless earthen lamps banish outward darkness, Goddess Kali in Her magnificent standing posture extinguishes all inward fear, doubt, and ego—bestowing upon Her devotee the eternal light of self-realization and fearless bliss.
            </>
          )}
        </p>
      </div>
    </section>
  );
};
