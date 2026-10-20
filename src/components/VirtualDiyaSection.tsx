import React, { useState, useEffect } from 'react';
import { Flame, Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { spatialAudio } from '../audio/SpatialAudio';
import { useLanguage } from '../context/LanguageContext';
import { prayerService, PrayerEntry } from '../services/prayerService';

export const VirtualDiyaSection: React.FC = () => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  const [prayers, setPrayers] = useState<PrayerEntry[]>([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [floatingDiyas, setFloatingDiyas] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    prayerService.getPrayers().then(setPrayers);
  }, []);

  const handleLightDiya = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    spatialAudio.playBell();

    // Trigger floating ascending diya animation on screen
    const newFloatingId = Date.now();
    const randomLeft = 30 + Math.random() * 40; // 30% to 70% of screen width
    setFloatingDiyas(prev => [...prev, { id: newFloatingId, left: randomLeft }]);

    // Clean up floating diya after animation completes (3.5s)
    setTimeout(() => {
      setFloatingDiyas(prev => prev.filter(d => d.id !== newFloatingId));
    }, 3500);

    // Save prayer via service (async architecture ready for Supabase/Firebase)
    const newPrayer = await prayerService.addPrayer(name, message, city);
    setPrayers(prev => [newPrayer, ...prev]);

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f5c042', '#d82138', '#ff7700']
    });

    setName('');
    setCity('');
    setMessage('');
    setIsSubmitting(false);
  };

  const handleLike = async (id: string) => {
    await prayerService.likePrayer(id);
    setPrayers(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <section id="diya" style={{
      padding: 'clamp(50px, 8vh, 85px) clamp(20px, 4vw, 40px)',
      maxWidth: 960,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Floating Ascending Diyas Container */}
      {floatingDiyas.map(d => (
        <div
          key={d.id}
          style={{
            position: 'fixed',
            bottom: '12%',
            left: `${d.left}%`,
            zIndex: 9999,
            pointerEvents: 'none',
            fontSize: '44px',
            animation: 'floatDiyaAscend 3.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards',
            filter: 'drop-shadow(0 0 20px #ff7700)'
          }}
        >
          🪔
        </div>
      ))}

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
          {isHindi ? 'संकल्प एवं दीप प्रज्वलन' : 'Dedication & prayers'}
        </span>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(24px, 3.2vw, 38px)',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '1px'
        }}>
          {isHindi ? 'दीपक प्रज्वलन एवं प्रार्थना स्थल' : 'Light a diya & prayer wall'}
        </h2>
      </div>

      {/* Clean Dedication Form */}
      <div className="glass-panel" style={{
        padding: '30px 28px',
        borderRadius: '16px',
        marginBottom: 36,
        border: '1px solid rgba(245, 192, 66, 0.3)'
      }}>
        <h3 style={{
          fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-divine)',
          fontSize: '18px',
          color: '#f5c042',
          margin: '0 0 16px'
        }}>
          {isHindi ? 'माँ के चरणों में दीपक जलाएं और प्रार्थना लिखें' : 'Light a sacred diya with your prayer'}
        </h3>

        <form onSubmit={handleLightDiya} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 5 }}>
                {isHindi ? 'आपका नाम *' : 'Your name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={isHindi ? 'उदा. सुमित सेन' : 'e.g. Sumit Sen'}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(21, 4, 10, 0.65)',
                  border: '1px solid rgba(245, 192, 66, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 5 }}>
                {isHindi ? 'शहर / स्थान' : 'City / Location'}
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder={isHindi ? 'उदा. कोलकाता, भारत' : 'e.g. Kolkata, India'}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(21, 4, 10, 0.65)',
                  border: '1px solid rgba(245, 192, 66, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 5 }}>
              {isHindi ? 'आपकी प्रार्थना या संकल्प *' : 'Your prayer or wish *'}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={isHindi ? 'माँ से अपनी प्रार्थना, परिवार के स्वास्थ्य व शांति की कामना लिखें...' : 'Write your prayer for health, peace, or gratitude...'}
              style={{
                width: '100%',
                padding: '11px 14px',
                background: 'rgba(21, 4, 10, 0.65)',
                border: '1px solid rgba(245, 192, 66, 0.25)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '13.5px',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-divine"
            style={{
              padding: '12px 24px',
              fontSize: '13.5px',
              alignSelf: 'flex-start',
              marginTop: 4
            }}
          >
            <Flame size={15} color="#ff7700" />
            <span>{isHindi ? 'पवित्र दिया जलाएं' : 'Light a diya'}</span>
          </button>
        </form>
      </div>

      {/* Devotee Prayer List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{
          fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-divine)',
          fontSize: '18px',
          color: '#f5c042',
          margin: '0 0 4px'
        }}>
          {isHindi ? 'भक्तों की प्रार्थनाएं' : 'Recent prayers'}
        </h3>

        {prayers.map(p => (
          <div
            key={p.id}
            className="glass-panel"
            style={{
              padding: '18px 22px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              border: '1px solid rgba(245, 192, 66, 0.18)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '14px', color: '#f5c042', fontWeight: 700 }}>
                  {p.name}
                </span>
                {p.city && (
                  <span style={{ fontSize: '11.5px', color: '#b8b8cc', marginLeft: 8 }}>
                    • {p.city}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleLike(p.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff77aa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
                title="Bless this prayer"
              >
                <Heart size={13} fill="#ff77aa" />
                <span>{p.likes}</span>
              </button>
            </div>

            <p style={{
              fontSize: '13.5px',
              color: '#e4d8dc',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: isHindi ? 'var(--font-devanagari)' : 'var(--font-primary)'
            }}>
              "{p.message}"
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatDiyaAscend {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(-80px) scale(1.1);
          }
          70% {
            opacity: 0.9;
            transform: translateY(-340px) scale(1.2);
          }
          100% {
            transform: translateY(-520px) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
