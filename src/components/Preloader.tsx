import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PreloaderProps {
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onEnter }) => {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 14 + 10);
      });
    }, 110);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#060511',
      backgroundImage: 'radial-gradient(circle at center, #1c1032 0%, #05040d 85%)',
      padding: '24px',
      textAlign: 'center',
      transition: 'opacity 0.8s ease'
    }}>
      {/* Decorative Rotating Rangoli Ring & Flaming Diya */}
      <div style={{
        position: 'relative',
        width: 140,
        height: 140,
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px dashed #ffc83b',
          borderRadius: '50%',
          animation: 'rotateRangoli 20s linear infinite',
          opacity: 0.65
        }} />
        <div style={{
          position: 'absolute',
          inset: 12,
          border: '1px solid rgba(255, 119, 0, 0.45)',
          borderRadius: '50%'
        }} />

        {/* Flaming Diya with flickering aura */}
        <div className="floating-diya" style={{
          fontSize: '56px',
          filter: 'drop-shadow(0 0 25px rgba(255, 170, 0, 0.8))'
        }}>
          🪔
        </div>
      </div>

      <style>{`
        @keyframes rotateRangoli {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Main Sacred Title */}
      <h1 className="text-gold-gradient" style={{
        fontFamily: 'var(--font-divine)',
        fontSize: 'clamp(26px, 4.5vw, 44px)',
        fontWeight: 900,
        letterSpacing: '2px',
        marginBottom: '10px',
        textShadow: '0 0 35px rgba(255, 200, 59, 0.45)'
      }}>
        {t('heroTitle')}
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(13px, 1.8vw, 16px)',
        color: '#ffc83b',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: '20px',
        opacity: 0.95
      }}>
        {language === 'hi' ? 'पवित्र दीपावली एवं श्यामा पूजा 3D दर्शन' : 'Sacred Diwali Night 3D WebGL Darshan'}
      </p>

      {/* Sacred Shloka Quotation */}
      <div style={{
        maxWidth: 580,
        padding: '16px 24px',
        background: 'rgba(255, 200, 59, 0.06)',
        border: '1px solid rgba(255, 200, 59, 0.25)',
        borderRadius: '14px',
        marginBottom: '32px'
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          color: '#fbe2a0',
          lineHeight: '1.7',
          fontStyle: 'italic',
          margin: 0
        }}>
          "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।<br />
          शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥<br />
          ॐ जयंती मंगला काली भद्रकाली कपालिनी ॥"
        </p>
      </div>

      {/* Progress Bar & Gate Interaction */}
      {!isLoaded ? (
        <div style={{ width: '280px' }}>
          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #ff7700, #ffc83b)',
              borderRadius: '10px',
              transition: 'width 0.2s ease',
              boxShadow: '0 0 12px #ffc83b'
            }} />
          </div>
          <span style={{ fontSize: '12px', color: '#b8b8cc', letterSpacing: '1px' }}>
            {language === 'hi' ? `पवित्र दृश्य एवं संगीत संजोया जा रहा है • ${progress}%` : `Preparing Sacred Geometry & Music • ${progress}%`}
          </span>
        </div>
      ) : (
        <button
          onClick={onEnter}
          className="btn-divine"
          style={{
            padding: '14px 36px',
            fontSize: '16px',
            letterSpacing: '2px',
            animation: 'pulseGlow 2s infinite'
          }}
        >
          <Sparkles size={18} color="#ffd700" />
          {language === 'hi' ? 'दर्शन में प्रवेश करें' : 'Click to Enter Darshan'}
        </button>
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 200, 59, 0.4); }
          50% { box-shadow: 0 0 35px rgba(255, 119, 0, 0.7); }
        }
      `}</style>

      {/* Audio Unlock Notice */}
      <span style={{
        position: 'absolute',
        bottom: 24,
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.45)',
        letterSpacing: '0.5px'
      }}>
        ✨ Headphones recommended for 3D spatial temple bells, Aarti & music.
      </span>
    </div>
  );
};
