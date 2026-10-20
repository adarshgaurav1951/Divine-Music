import React, { useState } from 'react';
import { X, Bell, Flame, Flower2, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { spatialAudio } from '../audio/SpatialAudio';
import { SceneManager } from '../three/SceneManager';

interface AartiRitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  sceneManager: SceneManager | null;
}

export const AartiRitualModal: React.FC<AartiRitualModalProps> = ({
  isOpen,
  onClose,
  sceneManager
}) => {
  const [aartiWaved, setAartiWaved] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRingBell = () => {
    spatialAudio.playBell();
    if (sceneManager) {
      sceneManager.particleEngine.triggerInteractiveBurst(new THREE.Vector3(0, 0, 1), 60);
    }
    setBlessingMessage('🔔 Sacred temple bell rung. May peace and divine grace prevail!');
  };

  const handleShankh = () => {
    spatialAudio.playShankh();
    setBlessingMessage('🐚 Sacred Shankhnaad resonated across the heavens!');
  };

  const handleWaveAarti = () => {
    setAartiWaved(true);
    spatialAudio.playBell();
    setBlessingMessage('🔥 Deepa Aarti offered to Maa Shyama Kali! Jai Maa Kali!');

    setTimeout(() => {
      setAartiWaved(false);
    }, 2500);
  };

  const handleOfferFlowers = () => {
    spatialAudio.playBell();
    // Confetti shower with sacred floral colors (marigold gold, vermillion red, lotus pink)
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffc83b', '#e61c38', '#ff7700', '#ff99c8']
    });

    setBlessingMessage('🌸 Pushpanjali offered! "ॐ जयंती मंगला काली..."');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(5, 5, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: 560,
        width: '100%',
        padding: '30px',
        textAlign: 'center',
        position: 'relative',
        border: '1px solid rgba(255, 200, 59, 0.5)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: '24px',
          marginBottom: '8px'
        }}>
          Sacred Aarti & Pushpanjali
        </h2>
        <p style={{ fontSize: '14px', color: '#b8b8cc', marginBottom: '24px' }}>
          Perform sacred temple offerings directly from your screen.
        </p>

        {/* Animated Aarti Thali Display */}
        <div style={{
          width: 140,
          height: 140,
          margin: '0 auto 24px',
          borderRadius: '50%',
          border: '3px solid #ffc83b',
          background: 'radial-gradient(circle, rgba(255, 200, 59, 0.25) 0%, rgba(255, 119, 0, 0.1) 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(255, 200, 59, 0.35)',
          animation: aartiWaved ? 'waveThali 1.2s infinite ease-in-out' : 'none'
        }}>
          <span style={{ fontSize: '38px', filter: 'drop-shadow(0 0 10px #ffaa00)' }}>🪔</span>
          <span style={{ fontSize: '11px', color: '#ffc83b', fontFamily: 'var(--font-serif)', marginTop: 4 }}>
            PANCHA-PRADEEP
          </span>
        </div>

        <style>{`
          @keyframes waveThali {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
            50% { transform: translateY(-10px) rotate(10deg) scale(1.05); }
          }
        `}</style>

        {/* Action Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <button
            onClick={handleWaveAarti}
            className="btn-divine"
            style={{ padding: '12px', fontSize: '13px' }}
          >
            <Flame size={16} color="#ff7700" />
            Wave Aarti Thali
          </button>

          <button
            onClick={handleOfferFlowers}
            className="btn-divine"
            style={{ padding: '12px', fontSize: '13px' }}
          >
            <Flower2 size={16} color="#ff77aa" />
            Offer Flowers
          </button>

          <button
            onClick={handleRingBell}
            className="btn-divine"
            style={{ padding: '12px', fontSize: '13px' }}
          >
            <Bell size={16} color="#ffd700" />
            Ring Temple Bell
          </button>

          <button
            onClick={handleShankh}
            className="btn-divine"
            style={{ padding: '12px', fontSize: '13px' }}
          >
            <Volume2 size={16} color="#20d5d2" />
            Blow Shankh
          </button>
        </div>

        {/* Real-time Blessing Feedback */}
        {blessingMessage && (
          <div style={{
            padding: '12px',
            background: 'rgba(255, 200, 59, 0.15)',
            border: '1px solid #ffc83b',
            borderRadius: '10px',
            color: '#fff',
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            animation: 'fadeIn 0.3s ease'
          }}>
            {blessingMessage}
          </div>
        )}
      </div>
    </div>
  );
};
