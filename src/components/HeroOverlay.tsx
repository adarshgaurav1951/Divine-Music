import React, { useState } from 'react';
import { Flame, Sparkles, Compass, ArrowDown, Bell } from 'lucide-react';
import { CameraPreset, SceneManager } from '../three/SceneManager';
import { useLanguage } from '../context/LanguageContext';

interface HeroOverlayProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  sceneManager: SceneManager | null;
  onOpenAartiModal: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  currentPreset,
  onSelectPreset,
  sceneManager
}) => {
  const { t } = useLanguage();
  const [aartiNotice, setAartiNotice] = useState<string | null>(null);

  const handleOfferAartiClick = () => {
    if (sceneManager) {
      sceneManager.startAartiOffering();
      setAartiNotice('🪔 Aarti offered to Maa Kali! Sacred bells & Shankh echoing. 8s divine illumination active.');
      setTimeout(() => {
        setAartiNotice(null);
      }, 8000);
    }
  };

  const handleBurstCelebration = () => {
    if (sceneManager) {
      sceneManager.burstFestiveFireworks();
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(70px, 8vh, 90px) clamp(16px, 3vw, 36px) clamp(20px, 4vh, 32px)',
      zIndex: 10
    }}>
      {/* Top Center: Divine Badges & Shloka Banner */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        maxWidth: 750,
        margin: '0 auto'
      }}>
        {/* Aarti Active Banner Toast */}
        {aartiNotice && (
          <div style={{
            padding: '8px 18px',
            background: 'linear-gradient(135deg, rgba(216, 33, 56, 0.4), rgba(255, 119, 0, 0.45))',
            border: '1px solid #ffc83b',
            borderRadius: '25px',
            color: '#fff',
            fontSize: '12px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '0.5px',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.3s ease',
            boxShadow: '0 0 25px rgba(255, 119, 0, 0.5)',
            marginBottom: 4
          }}>
            {aartiNotice}
          </div>
        )}

        <div style={{
          padding: '4px 14px',
          background: 'rgba(255, 200, 59, 0.12)',
          border: '1px solid rgba(255, 200, 59, 0.35)',
          borderRadius: '20px',
          color: '#ffc83b',
          fontSize: '11px',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          backdropFilter: 'blur(10px)'
        }}>
          ✨ {t('heroSubtitle')}
        </div>

        <h1 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(28px, 4.4vw, 54px)',
          fontWeight: 900,
          letterSpacing: '2px',
          margin: 0,
          lineHeight: 1.1,
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 200, 59, 0.3)'
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: 'clamp(13px, 1.5vw, 16px)',
          color: '#fbe2a0',
          letterSpacing: '0.8px',
          margin: 0,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
        }}>
          ॐ जयंती मंगला काली भद्रकाली कपालिनी । दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥
        </p>

        {/* Hero CTA Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 12,
          pointerEvents: 'auto'
        }}>
          {/* Primary Action 1: Offer Aarti (Triggers ghanti, shankh, 8s light boost) */}
          <button
            onClick={handleOfferAartiClick}
            className="btn-divine"
            style={{
              padding: '12px 26px',
              fontSize: '13.5px',
              boxShadow: '0 0 25px rgba(255, 119, 0, 0.5)'
            }}
          >
            <Bell size={16} color="#ffd700" />
            <span>Offer aarti</span>
          </button>

          {/* Primary Action 2: Light a Diya (Scrolls smoothly to virtual diya altar) */}
          <a
            href="#diya"
            className="btn-divine"
            style={{
              textDecoration: 'none',
              padding: '12px 26px',
              fontSize: '13.5px',
              background: 'linear-gradient(135deg, rgba(216, 33, 56, 0.4), rgba(255, 119, 0, 0.45))',
              border: '1px solid #ffc83b'
            }}
          >
            <Flame size={16} color="#ff7700" />
            <span>Light a diya</span>
          </a>

          {/* Sky Fireworks Trigger */}
          <button
            onClick={handleBurstCelebration}
            className="btn-divine-minimal"
            style={{
              padding: '11px 18px',
              fontSize: '12px',
              background: 'rgba(12, 10, 24, 0.7)'
            }}
            title="Burst festive sky crackers beside Maa Kali"
          >
            <Sparkles size={14} color="#ffd700" />
            <span>Fireworks</span>
          </button>
        </div>
      </div>

      {/* Bottom Center: Perspective Switcher & Interaction Hints */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        pointerEvents: 'auto',
        marginTop: 'auto'
      }}>
        {/* Floating Perspective Selector Dock */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px',
          borderRadius: '35px'
        }}>
          <button
            onClick={() => onSelectPreset('darshan')}
            style={{
              padding: '8px 18px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'darshan'
                ? 'linear-gradient(135deg, rgba(216, 33, 56, 0.45), rgba(255, 119, 0, 0.45))'
                : 'transparent',
              color: currentPreset === 'darshan' ? '#ffc83b' : 'rgba(255, 255, 255, 0.7)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'darshan' ? 'rgba(255, 200, 59, 0.7)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🔥</span>
            <span>Statue view</span>
          </button>

          <button
            onClick={() => onSelectPreset('courtyard')}
            style={{
              padding: '8px 18px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'courtyard'
                ? 'linear-gradient(135deg, rgba(255, 170, 0, 0.45), rgba(255, 200, 59, 0.45))'
                : 'transparent',
              color: currentPreset === 'courtyard' ? '#ffc83b' : 'rgba(255, 255, 255, 0.7)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'courtyard' ? 'rgba(255, 200, 59, 0.7)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🏖️</span>
            <span>Beach & bonfire</span>
          </button>

          <button
            onClick={() => onSelectPreset('panoramic')}
            style={{
              padding: '8px 18px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'panoramic'
                ? 'linear-gradient(135deg, rgba(32, 213, 210, 0.35), rgba(255, 200, 59, 0.35))'
                : 'transparent',
              color: currentPreset === 'panoramic' ? '#ffc83b' : 'rgba(255, 255, 255, 0.7)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'panoramic' ? 'rgba(255, 200, 59, 0.7)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Compass size={14} />
            <span>Sunset panorama</span>
          </button>
        </div>

        {/* Scroll Indicator & Subtle Interaction Hint */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4
        }}>
          <span style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.65)',
            background: 'rgba(7, 7, 18, 0.55)',
            padding: '4px 14px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.4px'
          }}>
            {t('heroHint')}
          </span>

          <a
            href="#about"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: '#ffc83b',
              fontSize: '11px',
              fontFamily: 'var(--font-serif)',
              textDecoration: 'none',
              marginTop: 4,
              opacity: 0.85,
              animation: 'bounceIndicator 2s infinite'
            }}
          >
            <span>Scroll to explore</span>
            <ArrowDown size={13} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes bounceIndicator {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(5px); }
          60% { transform: translateY(3px); }
        }
      `}</style>
    </div>
  );
};
