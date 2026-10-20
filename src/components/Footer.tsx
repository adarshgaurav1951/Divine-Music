import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" style={{
      borderTop: '1px solid rgba(245, 192, 66, 0.22)',
      background: 'linear-gradient(to bottom, rgba(21, 4, 10, 0.85) 0%, #0d0206 100%)',
      padding: 'clamp(40px, 6vh, 65px) clamp(20px, 4vw, 40px) 24px',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        textAlign: 'center'
      }}>
        {/* Sacred Sanskrit Shloka */}
        <div style={{
          padding: '20px 24px',
          background: 'rgba(245, 192, 66, 0.04)',
          border: '1px solid rgba(245, 192, 66, 0.2)',
          borderRadius: '14px',
          margin: '0 auto',
          maxWidth: 720,
          width: '100%'
        }}>
          <p style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: '14.5px',
            color: '#fbe2a0',
            lineHeight: 1.8,
            margin: 0
          }}>
            सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥<br />
            ॐ जयंती मंगला काली भद्रकाली कपालिनी । दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥
          </p>
        </div>

        {/* Minimal Navigation & Music Credit */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          fontSize: '13px'
        }}>
          <a href="#hero" style={{ color: '#b8b8cc', textDecoration: 'none' }}>{isHindi ? 'होम' : 'Home'}</a>
          <a href="#about" style={{ color: '#b8b8cc', textDecoration: 'none' }}>{isHindi ? 'माँ काली परिचय' : 'About'}</a>
          <a href="#aarti" style={{ color: '#b8b8cc', textDecoration: 'none' }}>{isHindi ? 'आरती व मंत्र' : 'Aarti'}</a>
          <a href="#temples" style={{ color: '#b8b8cc', textDecoration: 'none' }}>{isHindi ? 'प्रसिद्ध तीर्थ' : 'Temples'}</a>
          <a href="#diya" style={{ color: '#b8b8cc', textDecoration: 'none' }}>{isHindi ? 'प्रार्थना वेदी' : 'Prayer Wall'}</a>
        </div>

        <p style={{ fontSize: '12px', color: '#a09498', margin: 0 }}>
          🎵 Soundtrack: <span style={{ color: '#f5c042' }}>"Aigiri Nandini"</span> by <span style={{ color: '#f5c042' }}>Brodha V</span>.
        </p>

        {/* Back to Top */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={scrollToTop}
            className="btn-divine-minimal"
            style={{
              padding: '6px 16px',
              fontSize: '11.5px',
              gap: 6
            }}
          >
            <ArrowUp size={13} />
            <span>{isHindi ? 'शीर्ष पर जाएं' : 'Back to top'}</span>
          </button>
        </div>

        {/* Copyright & Reverence */}
        <div style={{
          fontSize: '11.5px',
          color: 'rgba(255, 255, 255, 0.45)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4
        }}>
          <span>© {new Date().getFullYear()} Divine Maa Shyama Kali Darshan •</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            Dedicated with <Heart size={11} color="#d82138" fill="#d82138" /> for devotees worldwide
          </span>
        </div>
      </div>
    </footer>
  );
};
