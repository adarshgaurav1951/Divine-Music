import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Flame, Compass, Maximize2, Play, Pause } from 'lucide-react';
import { CameraPreset, SceneManager } from '../three/SceneManager';
import { spatialAudio } from '../audio/SpatialAudio';

interface HUDProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenLore: () => void;
  onOpenAarti: () => void;
  sceneManager: SceneManager | null;
}

export const HUD: React.FC<HUDProps> = ({
  currentPreset,
  onSelectPreset,
  isMuted,
  onToggleMute,
  onOpenLore,
  onOpenAarti,
  sceneManager
}) => {
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(true);

  const handleToggleSong = () => {
    const nextState = spatialAudio.toggleSong();
    setIsSongPlaying(nextState);
  };

  const handleBurstCelebration = () => {
    if (sceneManager) {
      // Bursts festive fireworks beside Maa Kali in the sky/background
      sceneManager.burstFestiveFireworks();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(12px, 2vw, 20px)',
      animation: 'hudFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {/* Top Navigation Bar: Minimalist Gallery Aesthetic */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        gap: 8
      }}>
        {/* Subtle Minimal Branding */}
        <div className="glass-panel-minimal" style={{
          padding: '6px 14px',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderRadius: '30px'
        }}>
          <span style={{ fontSize: '18px', filter: 'drop-shadow(0 0 6px rgba(255, 200, 59, 0.6))' }}>🪔</span>
          <div>
            <h1 className="text-gold-gradient" style={{
              fontFamily: 'var(--font-divine)',
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              fontWeight: 700,
              letterSpacing: '1.2px',
              margin: 0,
              lineHeight: 1.15
            }}>
              DIVINE MAA KALI
            </h1>
            <p style={{
              fontSize: '9.5px',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Sacred Beach Bonfire Darshan
            </p>
          </div>
        </div>

        {/* Minimalist Soundtrack Player */}
        <div className="glass-panel-minimal" style={{
          padding: '5px 12px',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderRadius: '30px'
        }}>
          <button
            onClick={handleToggleSong}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffc83b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 200, 59, 0.15)',
              transition: 'background 0.2s ease'
            }}
            title={isSongPlaying ? 'Pause Kali Song' : 'Play Kali Song'}
          >
            {isSongPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#ffc83b', letterSpacing: '0.4px' }}>
              🎵 Aigiri Nandini — Brodha V
            </span>
            <span style={{ fontSize: '8.5px', color: 'rgba(255, 255, 255, 0.55)' }}>
              {isSongPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>

          {/* Equalizer animation */}
          {isSongPlaying && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
              <div style={{ width: 2.5, height: '60%', background: '#ff7700', borderRadius: 2, animation: 'eq 0.8s ease-in-out infinite' }} />
              <div style={{ width: 2.5, height: '100%', background: '#ffc83b', borderRadius: 2, animation: 'eq 1.2s ease-in-out infinite 0.2s' }} />
              <div style={{ width: 2.5, height: '40%', background: '#ffd700', borderRadius: 2, animation: 'eq 0.6s ease-in-out infinite 0.4s' }} />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}>
          {/* Virtual Aarti Offering */}
          <button
            onClick={onOpenAarti}
            className="btn-divine-minimal"
            title="Perform Virtual Aarti Offering"
          >
            <Flame size={14} color="#ff7700" />
            <span className="hud-label">Aarti Offering</span>
          </button>

          {/* Burst Fireworks beside Kali Maa */}
          <button
            onClick={handleBurstCelebration}
            className="btn-divine-minimal"
            title="Burst festive sky crackers beside Maa Kali"
          >
            <Sparkles size={14} color="#ffd700" />
            <span className="hud-label">Fireworks</span>
          </button>

          {/* Katha / Sacred Lore */}
          <button
            onClick={onOpenLore}
            className="btn-icon-minimal"
            title="Read Sacred Katha & Lore"
          >
            <BookOpen size={16} />
          </button>

          {/* Master Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="btn-icon-minimal"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} color="#ff5555" /> : <Volume2 size={16} color="#ffc83b" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="btn-icon-minimal"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {/* Bottom Center: Perspective Switcher & Subtle Interaction Hint */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'auto',
        marginBottom: 6
      }}>
        {/* Floating Perspective Selector Dock */}
        <div className="glass-panel-minimal" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px',
          borderRadius: '35px'
        }}>
          <button
            onClick={() => onSelectPreset('darshan')}
            style={{
              padding: '7px 16px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'darshan'
                ? 'linear-gradient(135deg, rgba(217, 20, 56, 0.4), rgba(255, 119, 0, 0.4))'
                : 'transparent',
              color: currentPreset === 'darshan' ? '#ffc83b' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'darshan' ? 'rgba(255, 200, 59, 0.6)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🔥</span>
            <span>Maa Kali Statue</span>
          </button>

          <button
            onClick={() => onSelectPreset('courtyard')}
            style={{
              padding: '7px 16px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'courtyard'
                ? 'linear-gradient(135deg, rgba(255, 170, 0, 0.4), rgba(255, 200, 59, 0.4))'
                : 'transparent',
              color: currentPreset === 'courtyard' ? '#ffc83b' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'courtyard' ? 'rgba(255, 200, 59, 0.6)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🏖️</span>
            <span>Beach & Bonfire</span>
          </button>

          <button
            onClick={() => onSelectPreset('panoramic')}
            style={{
              padding: '7px 16px',
              borderRadius: '25px',
              border: 'none',
              background: currentPreset === 'panoramic'
                ? 'linear-gradient(135deg, rgba(32, 213, 210, 0.3), rgba(255, 200, 59, 0.3))'
                : 'transparent',
              color: currentPreset === 'panoramic' ? '#ffc83b' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentPreset === 'panoramic' ? 'rgba(255, 200, 59, 0.6)' : 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Compass size={13} />
            <span>Sunset Panorama</span>
          </button>
        </div>

        {/* Minimal Unobtrusive Interaction Hint */}
        <div style={{
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.55)',
          background: 'rgba(7, 7, 18, 0.4)',
          padding: '3px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          letterSpacing: '0.4px'
        }}>
          ✨ Drag to orbit view • Tap for sparklers • Celebrate with Fireworks
        </div>
      </div>

      <style>{`
        @keyframes hudFadeIn {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes eq {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
        .glass-panel-minimal {
          background: rgba(8, 8, 18, 0.45);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 200, 59, 0.22);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: all 0.25s ease;
        }
        .glass-panel-minimal:hover {
          border-color: rgba(255, 200, 59, 0.45);
          background: rgba(8, 8, 18, 0.65);
        }
        .btn-divine-minimal {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: rgba(14, 12, 28, 0.55);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 200, 59, 0.35);
          border-radius: 25px;
          color: #ffc83b;
          font-family: var(--font-serif);
          font-size: 11.5px;
          font-weight: 600;
          letterSpacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-divine-minimal:hover {
          background: rgba(255, 200, 59, 0.2);
          border-color: #ffc83b;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255, 200, 59, 0.25);
        }
        .btn-icon-minimal {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(14, 12, 28, 0.55);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 200, 59, 0.25);
          border-radius: 50%;
          color: #ffc83b;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-icon-minimal:hover {
          background: rgba(255, 200, 59, 0.2);
          border-color: #ffc83b;
          transform: translateY(-1px);
        }
        @media (max-width: 680px) {
          .hud-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
