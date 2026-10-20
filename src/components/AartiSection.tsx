import React, { useState, useEffect } from 'react';
import { Bell, Flame, Flower2, Volume2, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { spatialAudio } from '../audio/SpatialAudio';
import { useLanguage } from '../context/LanguageContext';

export const AartiSection: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  // Mantra Japa Counter (Persisted in browser localStorage)
  const [japaCount, setJapaCount] = useState<number>(() => {
    const saved = localStorage.getItem('kali_mantra_count');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  const [isWavingThali, setIsWavingThali] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('kali_mantra_count', japaCount.toString());
  }, [japaCount]);

  const handleBeadClick = () => {
    spatialAudio.playBell();
    const nextCount = japaCount + 1;
    setJapaCount(nextCount);

    if (nextCount > 0 && nextCount % 108 === 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5c042', '#d82138', '#ff7700']
      });
      setNotification(isHindi ? '✨ 108 पावन जप पूर्ण! माँ काली की असीम कृपा आप पर बनी रहे।' : '✨ 108 chants completed! May Goddess Kali bless you with peace and strength.');
    }
  };

  const handleResetCount = () => {
    setJapaCount(0);
    setNotification(null);
  };

  const handleWaveThali = () => {
    setIsWavingThali(true);
    spatialAudio.playBell();
    setNotification(isHindi ? '🔥 दीप आरती माँ के चरणों में अर्पित की गई।' : '🔥 Earthen deepa aarti offered to Mother Kali.');
    setTimeout(() => {
      setIsWavingThali(false);
    }, 3000);
  };

  const handleOfferFlowers = () => {
    spatialAudio.playBell();
    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#f5c042', '#d82138', '#ff77aa']
    });
    setNotification(isHindi ? '🌸 पुष्पांजलि माँ के चरणों में अर्पित हुई।' : '🌸 Pushpanjali flowers offered at the holy lotus feet.');
  };

  const handleRingBell = () => {
    spatialAudio.playBell();
    setNotification(isHindi ? '🔔 पावन मंदिर की घंटी बजी।' : '🔔 Temple brass bell rung in devotion.');
  };

  const handleBlowShankh = () => {
    spatialAudio.playShankh();
    setNotification(isHindi ? '🐚 पावन शंखनाद गूंजा।' : '🐚 Divine conch sounded.');
  };

  return (
    <section id="aarti" style={{
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
          {isHindi ? 'जप साधना एवं आरती' : 'Mantra japa & sacred aarti'}
        </span>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(24px, 3.2vw, 38px)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '1px'
        }}>
          {isHindi ? 'मंत्र जप एवं आरती' : 'Mantra counter & aarti'}
        </h2>
      </div>

      {/* Main Peaceful Japa Counter Container */}
      <div className="glass-panel" style={{
        padding: '34px 28px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 30,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 16,
          right: 20
        }}>
          <button
            onClick={handleResetCount}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(245, 192, 66, 0.2)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f5c042',
              cursor: 'pointer'
            }}
            title="Reset counter"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Sacred Mantra Header */}
        <p style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: 'clamp(20px, 2.5vw, 26px)',
          color: '#f5c042',
          fontWeight: 700,
          margin: '0 0 6px'
        }}>
          ॐ क्रीं कालिकायै नमः
        </p>
        <span style={{ fontSize: '13px', color: '#b8b8cc', fontStyle: 'italic', marginBottom: 20 }}>
          Om Kreeng Kalikaye Namah
        </span>

        {/* Counter Circle Button */}
        <div style={{
          position: 'relative',
          width: 150,
          height: 150,
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="75"
              cy="75"
              r="64"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="75"
              cy="75"
              r="64"
              stroke="#f5c042"
              strokeWidth="6"
              fill="none"
              strokeDasharray={2 * Math.PI * 64}
              strokeDashoffset={2 * Math.PI * 64 * (1 - Math.min(108, japaCount % 108 === 0 && japaCount > 0 ? 108 : japaCount % 108) / 108)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.25s ease' }}
            />
          </svg>

          <button
            onClick={handleBeadClick}
            style={{
              position: 'absolute',
              width: 105,
              height: 105,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #220710 0%, #110307 100%)',
              border: '1.5px solid rgba(245, 192, 66, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(245, 192, 66, 0.3)',
              transition: 'transform 0.15s ease'
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            title="Click to chant"
          >
            <span style={{
              fontFamily: 'var(--font-divine)',
              fontSize: '26px',
              fontWeight: 800,
              color: '#f5c042',
              lineHeight: 1
            }}>
              {japaCount}
            </span>
            <span style={{ fontSize: '10px', color: '#b8b8cc', marginTop: 4 }}>
              {isHindi ? 'जप संख्या' : 'Chants'}
            </span>
          </button>
        </div>

        <button
          onClick={handleBeadClick}
          className="btn-divine"
          style={{ padding: '10px 24px', fontSize: '13px' }}
        >
          <span>📿</span>
          <span>{isHindi ? 'मनका घुमाएं (जाप करें)' : 'Count mantra bead'}</span>
        </button>
      </div>

      {/* Interactive Aarti Offerings */}
      <div className="glass-panel" style={{
        padding: '28px 24px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 30
      }}>
        <div style={{
          fontSize: '38px',
          marginBottom: 12,
          animation: isWavingThali ? 'waveThali 1.2s infinite ease-in-out' : 'none'
        }}>
          🪔
        </div>

        <h3 style={{
          fontFamily: 'var(--font-divine)',
          fontSize: '18px',
          color: '#f5c042',
          margin: '0 0 8px'
        }}>
          {isHindi ? 'पावन आरती एवं ध्वनि' : 'Sacred aarti & sound'}
        </h3>

        <p style={{ fontSize: '13px', color: '#b8b8cc', margin: '0 0 18px', maxWidth: 500 }}>
          {isHindi
            ? 'घंटी, शंख और दीप के साथ माँ काली की पावन आरती करें।'
            : 'Offer virtual deepa aarti with bell chime and conch sound.'}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          width: '100%'
        }}>
          <button onClick={handleWaveThali} className="btn-divine-minimal">
            <Flame size={14} color="#ff7700" />
            <span>{isHindi ? 'आरती थाली घुमाएं' : 'Wave aarti thali'}</span>
          </button>

          <button onClick={handleOfferFlowers} className="btn-divine-minimal">
            <Flower2 size={14} color="#ff77aa" />
            <span>{isHindi ? 'पुष्प अर्पित करें' : 'Offer flowers'}</span>
          </button>

          <button onClick={handleRingBell} className="btn-divine-minimal">
            <Bell size={14} color="#f5c042" />
            <span>{isHindi ? 'घंटी बजाएं' : 'Ring bell'}</span>
          </button>

          <button onClick={handleBlowShankh} className="btn-divine-minimal">
            <Volume2 size={14} color="#20d5d2" />
            <span>{isHindi ? 'शंखनाद करें' : 'Blow conch'}</span>
          </button>
        </div>

        {notification && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 18,
            fontSize: '12px',
            color: '#f5c042',
            background: 'rgba(245, 192, 66, 0.1)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(245, 192, 66, 0.25)'
          }}>
            <CheckCircle2 size={13} color="#f5c042" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Traditional Aarti Lyrics */}
      <div className="glass-panel" style={{
        padding: '26px 28px',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h4 style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: '18px',
          color: '#f5c042',
          margin: '0 0 16px',
          fontWeight: 700
        }}>
          माँ काली की आरती
        </h4>

        <div style={{
          fontSize: '14px',
          lineHeight: 1.9,
          color: '#e4d8dc',
          fontFamily: 'var(--font-devanagari)'
        }}>
          <p style={{ margin: 0 }}>
            मंगल की सेवा सुन मेरी देवा, हाथ जोड़ तेरे द्वार खड़े ।<br />
            पान सुपारी ध्वजा नारियल, ले ज्वाला तेरी भेंट धरे ॥<br />
            सुन जगदम्बे कर न विलम्बे, संतन के भंडार भरे ।<br />
            खड्ग खप्पर त्रिशूल विराजे, गल मुण्डन की माल धरे ॥<br />
            जय जय जय माँ श्यामा काली, सुख सम्पति देवे जनम जनम ॥
          </p>
        </div>
      </div>

      <style>{`
        @keyframes waveThali {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-6px) rotate(6deg) scale(1.05); }
        }
      `}</style>
    </section>
  );
};
