import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { spatialAudio } from '../audio/SpatialAudio';
import { useLanguage } from '../context/LanguageContext';

interface PrayerMessage {
  id: string;
  name: string;
  location: string;
  message: string;
  date: string;
  likes: number;
}

const INITIAL_PRAYERS: PrayerMessage[] = [
  {
    id: 'p-1',
    name: 'Debashis Roy',
    location: 'Kolkata',
    message: 'Maa, please bless all beings on earth with courage to conquer fear and ego. May our families stay blessed with good health.',
    date: 'Today',
    likes: 54
  },
  {
    id: 'p-2',
    name: 'Meera Patel',
    location: 'Ahmedabad',
    message: 'On this sacred Diwali night, seeking Maa Kali’s maternal grace for my parents’ recovery and peace across the world.',
    date: 'Today',
    likes: 42
  },
  {
    id: 'p-3',
    name: 'Rohan Sharma',
    location: 'Toronto, Canada',
    message: 'Watching this darshan from miles away. Feeling the divine energy and heat of the sacred bonfire. Jai Maa Kali!',
    date: 'Yesterday',
    likes: 38
  }
];

export const PrayerWallSection: React.FC = () => {
  const { t } = useLanguage();

  const [prayers, setPrayers] = useState<PrayerMessage[]>(() => {
    const saved = localStorage.getItem('divine_kali_prayers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed parsing prayers:', e);
      }
    }
    return INITIAL_PRAYERS;
  });

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('divine_kali_prayers', JSON.stringify(prayers));
  }, [prayers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    spatialAudio.playBell();

    const newPrayer: PrayerMessage = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Sacred Devotee',
      message: message.trim(),
      date: 'Just now',
      likes: 1
    };

    setPrayers([newPrayer, ...prayers]);

    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#ffc83b', '#ff7700', '#ffd700']
    });

    setName('');
    setLocation('');
    setMessage('');
  };

  const handleLike = (id: string) => {
    setPrayers(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <section id="prayers" style={{
      padding: 'clamp(60px, 9vh, 100px) clamp(20px, 4vw, 48px)',
      maxWidth: 1300,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 46 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 14px',
          background: 'rgba(255, 200, 59, 0.1)',
          border: '1px solid rgba(255, 200, 59, 0.3)',
          borderRadius: '20px',
          color: '#ffc83b',
          fontSize: '11px',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>
          <MessageSquare size={13} color="#ffd700" />
          <span>Devotee Community & Wishes</span>
        </div>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(26px, 3.8vw, 44px)',
          fontWeight: 800,
          letterSpacing: '1.5px',
          marginBottom: 14
        }}>
          {t('prayerTitle')}
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#fbe2a0',
          maxWidth: 750,
          margin: '0 auto'
        }}>
          {t('prayerSubtitle')}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 32,
        alignItems: 'start'
      }}>
        {/* Post Form */}
        <div className="glass-panel" style={{
          padding: '30px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 200, 59, 0.3)'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-divine)',
            fontSize: '19px',
            color: '#ffc83b',
            marginBottom: 16
          }}>
            ✍️ Leave Your Prayer at Maa's Feet
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 6, fontWeight: 600 }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Anandita Sen"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(10, 8, 20, 0.65)',
                  border: '1px solid rgba(255, 200, 59, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 6, fontWeight: 600 }}>
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. New Delhi, India"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(10, 8, 20, 0.65)',
                  border: '1px solid rgba(255, 200, 59, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#b8b8cc', marginBottom: 6, fontWeight: 600 }}>
                Your Prayer / Wish *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your prayers, blessings for loved ones, or gratitude..."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(10, 8, 20, 0.65)',
                  border: '1px solid rgba(255, 200, 59, 0.25)',
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
              className="btn-divine"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '13.5px',
                marginTop: 6
              }}
            >
              <Send size={15} color="#ffd700" />
              <span>{t('btnPostPrayer')}</span>
            </button>
          </form>
        </div>

        {/* Prayer Feed */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxHeight: 520,
          overflowY: 'auto',
          paddingRight: 6
        }}>
          {prayers.map(p => (
            <div
              key={p.id}
              className="glass-panel"
              style={{
                padding: '18px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 200, 59, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '14.5px', color: '#ffc83b', margin: 0, fontWeight: 700 }}>
                    {p.name}
                  </h4>
                  <span style={{ fontSize: '11px', color: '#b8b8cc' }}>
                    {p.location} • {p.date}
                  </span>
                </div>

                <button
                  onClick={() => handleLike(p.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    color: '#ff77aa',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer'
                  }}
                  title="Bless this prayer"
                >
                  <Heart size={12} fill="#ff77aa" />
                  <span>{p.likes}</span>
                </button>
              </div>

              <p style={{
                fontSize: '13px',
                color: '#e0e0ec',
                lineHeight: 1.6,
                margin: 0
              }}>
                "{p.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
