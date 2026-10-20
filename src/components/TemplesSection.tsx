import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TemplesSection: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const temples = [
    {
      name: isHindi ? 'दक्षिणेश्वर काली मंदिर' : 'Dakshineswar Kali Temple',
      location: isHindi ? 'कोलकाता, पश्चिम बंगाल' : 'Kolkata, West Bengal',
      desc: isHindi
        ? 'हुगली नदी तट पर स्थित पावन तीर्थ, जहाँ रामकृष्ण परमहंस ने माँ भवतारिणी के साक्षात् दर्शन किए थे।'
        : 'Sacred shrine on the Hooghly river where Sri Ramakrishna attained divine vision of Bhavatarini Maa.'
    },
    {
      name: isHindi ? 'कालीघाट काली मंदिर' : 'Kalighat Kali Temple',
      location: isHindi ? 'कोलकाता, पश्चिम बंगाल' : 'Kolkata, West Bengal',
      desc: isHindi
        ? 'प्राचीन शक्तिपीठ जहाँ सती के दाहिने पैर की उंगलियाँ गिरी थीं, यहाँ की प्रतिमा में स्वर्ण नेत्र व जिह्वा सुशोभित हैं।'
        : 'Ancient Shakti Peetha where Sati\'s right toes fell, celebrated for the sacred touchstone idol with golden tongue.'
    },
    {
      name: isHindi ? 'कालका जी मंदिर' : 'Kalka Ji Temple',
      location: isHindi ? 'नई दिल्ली' : 'New Delhi',
      desc: isHindi
        ? 'महाभारत कालीन ऐतिहासिक सिद्धपीठ, जहाँ पाण्डवों ने कुरुक्षेत्र युद्ध से पूर्व माँ कालिका की आराधना की थी।'
        : 'Historical Mahabharata-era Siddha Peetha where the Pandavas worshipped Goddess Kalika for strength and victory.'
    }
  ];

  return (
    <section id="temples" style={{
      padding: 'clamp(50px, 8vh, 85px) clamp(20px, 4vw, 40px)',
      maxWidth: 960,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Header */}
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
          {isHindi ? 'पवित्र शक्तिपीठ' : 'Sacred shrines'}
        </span>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(24px, 3.2vw, 38px)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '1px'
        }}>
          {isHindi ? 'प्रसिद्ध पावन तीर्थ' : 'Famous temples'}
        </h2>
      </div>

      {/* 3 Clean, Peaceful Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        {temples.map((temple, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '22px 26px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              border: '1px solid rgba(245, 192, 66, 0.22)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
              <h3 style={{
                fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-divine)',
                fontSize: '17px',
                color: '#f5c042',
                margin: 0,
                fontWeight: 700
              }}>
                {temple.name}
              </h3>
              <span style={{
                fontSize: '12px',
                color: '#b8b8cc',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                <MapPin size={11} color="#d82138" />
                {temple.location}
              </span>
            </div>

            <p style={{
              fontSize: '13.5px',
              color: '#e4d8dc',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-primary)'
            }}>
              {temple.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
