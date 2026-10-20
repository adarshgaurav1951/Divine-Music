import React from 'react';
import { Calendar, Flame, Moon, Sparkles } from 'lucide-react';

export const FestivalsSection: React.FC = () => {
  const rituals = [
    {
      title: 'Bhoot Chaturdashi & 14 Diyas (Choddo Pradeep)',
      timing: 'The eve of Kali Puja / Diwali',
      desc: 'Devotees light 14 sacred earthen lamps (Choddo Pradeep) outside their homes to welcome the light of ancestors and ward off malevolent spirits before the dark Amavasya night.'
    },
    {
      title: 'Midnight Shyama Puja Rituals',
      timing: 'Kartik Amavasya (New Moon Night)',
      desc: 'Worship commences at midnight with the offering of red hibiscus flowers (Jaba Phool), sandalwood, rice, and traditional sweets. Tantric and Vedic chants echo throughout the night.'
    },
    {
      title: 'Pushpanjali & Sacred Bhog',
      timing: 'Early morning of Diwali',
      desc: 'Devotees fast throughout the night and break their fast after the holy Pushpanjali flower offering, receiving sanctified Khichuri, Payesh (kheer), and Labra bhog.'
    },
    {
      title: 'Immersion & Shanti Jal (Peace Waters)',
      timing: 'Following days',
      desc: 'After days of celebration, clay murtis are immersed into rivers amidst jubilant cries of "Maa Aasche Bochhor Abar Hobe" (Mother will return again next year), and devotees receive sacred water for peace and long life.'
    }
  ];

  return (
    <section id="festivals" style={{
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
          <Calendar size={13} color="#ffd700" />
          <span>Sacred Traditions & Puja Timing</span>
        </div>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(26px, 3.8vw, 44px)',
          fontWeight: 800,
          letterSpacing: '1.5px',
          marginBottom: 14
        }}>
          Shyama Puja & Diwali Celebrations
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#fbe2a0',
          maxWidth: 750,
          margin: '0 auto'
        }}>
          How the sacred festival of lights and the divine awakening of Goddess Kali converge on Kartik Amavasya.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22
      }}>
        {rituals.map((r, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '26px 22px',
              borderRadius: '18px',
              border: '1px solid rgba(255, 200, 59, 0.22)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#ff7700',
              fontSize: '11.5px',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700
            }}>
              <Moon size={14} color="#ffaa33" />
              <span>{r.timing}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-divine)',
              fontSize: '17px',
              color: '#ffc83b',
              margin: 0,
              fontWeight: 700
            }}>
              {r.title}
            </h3>

            <p style={{
              fontSize: '13px',
              color: '#b8b8cc',
              lineHeight: 1.6,
              margin: 0
            }}>
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
