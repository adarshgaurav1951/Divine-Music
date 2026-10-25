import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Compass, ArrowDown, Bell, RotateCw, ZoomIn, ZoomOut, RotateCcw, Eye } from 'lucide-react';
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
  const [currentDegree, setCurrentDegree] = useState<number>(0);
  const [isParikrama, setIsParikrama] = useState<boolean>(false);

  // Bind angle change from SceneManager
  useEffect(() => {
    if (!sceneManager) return;

    sceneManager.onAngleChange = (deg, parikramaActive) => {
      setCurrentDegree(deg);
      setIsParikrama(parikramaActive);
    };

    return () => {
      if (sceneManager) {
        sceneManager.onAngleChange = undefined;
      }
    };
  }, [sceneManager]);

  const handleOfferAartiClick = () => {
    if (sceneManager) {
      sceneManager.startAartiOffering();
      setAartiNotice('🪔 Deepa Aarti offered to Maa Kali! Temple bells & Shankh echoing. Sacred 360° illumination active.');
      setTimeout(() => {
        setAartiNotice(null);
      }, 8500);
    }
  };

  const handleBurstCelebration = () => {
    if (sceneManager) {
      sceneManager.burstFestiveFireworks();
    }
  };

  const handleToggleParikrama = () => {
    if (sceneManager) {
      const active = sceneManager.toggleParikrama();
      setIsParikrama(active);
      if (active) {
        onSelectPreset('parikrama');
      }
    }
  };

  const handleZoom = (amount: number) => {
    if (sceneManager) {
      sceneManager.zoomBy(amount);
    }
  };

  const handleReset = () => {
    if (sceneManager) {
      sceneManager.resetView();
      onSelectPreset('fullbody');
    }
  };

  const handleSetHeading = (deg: number) => {
    if (sceneManager) {
      sceneManager.setAzimuthDegrees(deg);
    }
  };

  // Human-friendly directional description
  const getDirectionText = (deg: number) => {
    if (deg >= 338 || deg <= 22) return 'North • Maa Kali Full Body Darshan';
    if (deg > 22 && deg < 68) return 'North-East • Golden Pillar Archway';
    if (deg >= 68 && deg <= 112) return 'East • Temple Mandapa Colonnade';
    if (deg > 112 && deg < 158) return 'South-East • Festive Courtyard Steps';
    if (deg >= 158 && deg <= 202) return 'South • Diwali Sky & Fireworks';
    if (deg > 202 && deg < 248) return 'South-West • Sanctum Diya Altar';
    if (deg >= 248 && deg <= 292) return 'West • Ancient Stone Sanctum Hall';
    return 'North-West • Hanging Sacred Bells';
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(64px, 7.5vh, 84px) clamp(14px, 2.8vw, 32px) clamp(14px, 3vh, 26px)',
      zIndex: 10
    }}>
      {/* Top Center: Divine Badges & Shloka Banner */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 6,
        maxWidth: 780,
        margin: '0 auto'
      }}>
        {/* Aarti Active Banner Toast */}
        {aartiNotice && (
          <div style={{
            padding: '7px 18px',
            background: 'linear-gradient(135deg, rgba(216, 33, 56, 0.6), rgba(255, 119, 0, 0.6))',
            border: '1px solid #ffd700',
            borderRadius: '25px',
            color: '#fff',
            fontSize: '12px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '0.5px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(255, 119, 0, 0.6)',
            animation: 'fadeIn 0.3s ease',
            marginBottom: 4
          }}>
            {aartiNotice}
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 14px',
          background: 'rgba(255, 200, 59, 0.12)',
          border: '1px solid rgba(255, 200, 59, 0.35)',
          borderRadius: '20px',
          color: '#ffc83b',
          fontSize: '11px',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          backdropFilter: 'blur(10px)'
        }}>
          <span>✨</span>
          <span>{t('heroSubtitle')}</span>
        </div>

        <h1 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(26px, 4vw, 50px)',
          fontWeight: 900,
          letterSpacing: '2px',
          margin: 0,
          lineHeight: 1.1,
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 200, 59, 0.35)'
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: 'clamp(12.5px, 1.4vw, 15px)',
          color: '#fbe2a0',
          letterSpacing: '0.8px',
          margin: 0,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)'
        }}>
          ॐ जयंती मंगला काली भद्रकाली कपालिनी । दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥
        </p>

        {/* Hero CTA Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 8,
          pointerEvents: 'auto'
        }}>
          {/* Action 1: Offer Aarti */}
          <button
            onClick={handleOfferAartiClick}
            className="btn-divine"
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              boxShadow: '0 0 25px rgba(255, 119, 0, 0.5)'
            }}
          >
            <Bell size={15} color="#ffd700" />
            <span>Offer Aarti</span>
          </button>

          {/* Action 2: 360° Parikrama Orbit Toggle */}
          <button
            onClick={handleToggleParikrama}
            className="btn-divine"
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              background: isParikrama
                ? 'linear-gradient(135deg, rgba(255, 200, 59, 0.6), rgba(255, 119, 0, 0.65))'
                : 'linear-gradient(135deg, rgba(40, 20, 50, 0.6), rgba(90, 40, 100, 0.5))',
              border: '1px solid #ffc83b',
              boxShadow: isParikrama ? '0 0 25px rgba(255, 200, 59, 0.6)' : 'none'
            }}
            title="Auto-rotate in 360° sacred Parikrama around Maa Kali"
          >
            <RotateCw size={15} color="#ffd700" style={{ animation: isParikrama ? 'spin 4s linear infinite' : 'none' }} />
            <span>{isParikrama ? 'Parikrama active' : '360° Parikrama'}</span>
          </button>

          {/* Action 3: Light a Diya */}
          <a
            href="#diya"
            className="btn-divine"
            style={{
              textDecoration: 'none',
              padding: '10px 22px',
              fontSize: '13px',
              background: 'linear-gradient(135deg, rgba(216, 33, 56, 0.4), rgba(255, 119, 0, 0.45))',
              border: '1px solid #ffc83b'
            }}
          >
            <Flame size={15} color="#ff7700" />
            <span>Light a Diya</span>
          </a>

          {/* Action 4: Sky Fireworks */}
          <button
            onClick={handleBurstCelebration}
            className="btn-divine-minimal"
            style={{
              padding: '9px 16px',
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

      {/* Floating Side Tools: 360° Angle Dial & Zoom Controls */}
      <div style={{
        position: 'absolute',
        right: 'clamp(12px, 2vw, 24px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'auto',
        zIndex: 20
      }}>
        {/* 360° Degree Badge */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '8px 10px',
          borderRadius: '16px',
          background: 'rgba(12, 8, 22, 0.85)',
          border: '1px solid rgba(255, 200, 59, 0.35)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          <Compass size={18} color="#ffc83b" style={{ transform: `rotate(${-currentDegree}deg)`, transition: 'transform 0.1s linear' }} />
          <span style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffd700',
            fontWeight: 700,
            marginTop: 4
          }}>
            {currentDegree}°
          </span>
          <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.5px' }}>
            360° VIEW
          </span>
        </div>

        {/* Cardinal Direction Snaps */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '4px',
          borderRadius: '14px',
          background: 'rgba(12, 8, 22, 0.85)'
        }}>
          <button
            onClick={() => handleSetHeading(0)}
            title="North: Maa Kali Full-Body Darshan"
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              background: currentDegree >= 350 || currentDegree <= 10 ? 'rgba(255, 200, 59, 0.25)' : 'transparent',
              color: '#ffc83b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            0° N
          </button>
          <button
            onClick={() => handleSetHeading(90)}
            title="East: Temple Mandapa Colonnade"
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              background: currentDegree >= 80 && currentDegree <= 100 ? 'rgba(255, 200, 59, 0.25)' : 'transparent',
              color: '#ffc83b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            90° E
          </button>
          <button
            onClick={() => handleSetHeading(180)}
            title="South: Courtyard & Sky Fireworks"
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              background: currentDegree >= 170 && currentDegree <= 190 ? 'rgba(255, 200, 59, 0.25)' : 'transparent',
              color: '#ffc83b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            180° S
          </button>
          <button
            onClick={() => handleSetHeading(270)}
            title="West: Sanctum Hall Lamps"
            style={{
              padding: '6px 8px',
              fontSize: '11px',
              background: currentDegree >= 260 && currentDegree <= 280 ? 'rgba(255, 200, 59, 0.25)' : 'transparent',
              color: '#ffc83b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            270° W
          </button>
        </div>

        {/* Zoom & Reset Buttons */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '4px',
          borderRadius: '14px',
          background: 'rgba(12, 8, 22, 0.85)'
        }}>
          <button
            onClick={() => handleZoom(2.0)}
            title="Zoom In"
            style={{
              padding: '7px',
              background: 'transparent',
              border: 'none',
              color: '#ffc83b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => handleZoom(-2.0)}
            title="Zoom Out"
            style={{
              padding: '7px',
              background: 'transparent',
              border: 'none',
              color: '#ffc83b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            title="Reset View to Full-Body Darshan"
            style={{
              padding: '7px',
              background: 'transparent',
              border: 'none',
              color: '#ffc83b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Center: Perspective Switcher & Interaction Hints */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'auto',
        marginTop: 'auto'
      }}>
        {/* Real-time Directional Orientation Pill */}
        <div style={{
          fontSize: '11px',
          color: '#ffd700',
          background: 'rgba(10, 6, 20, 0.8)',
          padding: '4px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 200, 59, 0.3)',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(8px)'
        }}>
          <Eye size={12} color="#ffc83b" />
          <span>{getDirectionText(currentDegree)}</span>
        </div>

        {/* Floating Perspective Selector Dock */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 6,
          padding: '6px',
          borderRadius: '35px',
          background: 'rgba(10, 6, 20, 0.85)',
          border: '1px solid rgba(255, 200, 59, 0.35)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
        }}>
          {/* 1. Full Aarti & Devotees (Center Maa Kali + Left & Right Devotees) */}
          <button
            onClick={() => onSelectPreset('full')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'full' || currentPreset === 'fullbody' || currentPreset === 'courtyard' ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'full' || currentPreset === 'fullbody' || currentPreset === 'courtyard'
                ? 'linear-gradient(135deg, rgba(216, 33, 56, 0.55), rgba(255, 119, 0, 0.55))'
                : 'transparent',
              color: currentPreset === 'full' || currentPreset === 'fullbody' || currentPreset === 'courtyard' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>🪔</span>
            <span>{t('fullAartiView')}</span>
          </button>

          {/* 2. Maa Kali Darshan (Image 2 Close-up: Fiery Halo, Crown, Tongue, Weapons) */}
          <button
            onClick={() => onSelectPreset('darshan')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'darshan' ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'darshan'
                ? 'linear-gradient(135deg, rgba(255, 119, 0, 0.55), rgba(255, 200, 59, 0.55))'
                : 'transparent',
              color: currentPreset === 'darshan' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>👑</span>
            <span>{t('kaliDarshanView')}</span>
          </button>

          {/* 3. Left Devotees (Image 3: Family with brass bell & lamps) */}
          <button
            onClick={() => onSelectPreset('devotees_left')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'devotees_left' ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'devotees_left'
                ? 'linear-gradient(135deg, rgba(216, 33, 56, 0.55), rgba(160, 30, 90, 0.55))'
                : 'transparent',
              color: currentPreset === 'devotees_left' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>🔔</span>
            <span>{t('leftDevoteesView')}</span>
          </button>

          {/* 4. Right Devotees (Image 4: Family praying with lamps) */}
          <button
            onClick={() => onSelectPreset('devotees_right')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'devotees_right' ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'devotees_right'
                ? 'linear-gradient(135deg, rgba(255, 140, 0, 0.55), rgba(216, 33, 56, 0.55))'
                : 'transparent',
              color: currentPreset === 'devotees_right' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>🙏</span>
            <span>{t('rightDevoteesView')}</span>
          </button>

          {/* 5. 360° Parikrama Orbit */}
          <button
            onClick={() => onSelectPreset('parikrama')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'parikrama' || isParikrama ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'parikrama' || isParikrama
                ? 'linear-gradient(135deg, rgba(255, 170, 0, 0.55), rgba(255, 200, 59, 0.55))'
                : 'transparent',
              color: currentPreset === 'parikrama' || isParikrama ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>🔄</span>
            <span>{t('parikramaView')}</span>
          </button>

          {/* 6. 360° Sunset Panorama */}
          <button
            onClick={() => onSelectPreset('panoramic')}
            style={{
              padding: '8px 16px',
              borderRadius: '25px',
              border: currentPreset === 'panoramic' ? '1px solid #ffd700' : '1px solid transparent',
              background: currentPreset === 'panoramic'
                ? 'linear-gradient(135deg, rgba(32, 213, 210, 0.45), rgba(255, 200, 59, 0.45))'
                : 'transparent',
              color: currentPreset === 'panoramic' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
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
            <span>{t('panoramaView')}</span>
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
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'rgba(7, 7, 18, 0.65)',
            padding: '4px 14px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.4px',
            textAlign: 'center'
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
              marginTop: 2,
              opacity: 0.85,
              animation: 'bounceIndicator 2s infinite'
            }}
          >
            <span>Scroll for sacred wisdom</span>
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
