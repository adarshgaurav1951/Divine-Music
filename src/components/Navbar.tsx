import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Menu, X, Globe, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { spatialAudio } from '../audio/SpatialAudio';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAartiModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleMute }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isSongPlaying, setIsSongPlaying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicHovered, setIsMusicHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = spatialAudio.toggleSong();
    setIsSongPlaying(next);
  };

  const navLinks = [
    { href: '#hero', label: language === 'hi' ? 'होम' : 'Home' },
    { href: '#about', label: language === 'hi' ? 'माँ काली परिचय' : 'About' },
    { href: '#aarti', label: language === 'hi' ? 'आरती व मंत्र' : 'Aarti' },
    { href: '#temples', label: language === 'hi' ? 'प्रसिद्ध तीर्थ' : 'Temples' },
    { href: '#prayers', label: language === 'hi' ? 'प्रार्थना वेदी' : 'Prayer Wall' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      backgroundColor: isScrolled ? 'rgba(21, 4, 10, 0.92)' : 'rgba(21, 4, 10, 0.45)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: isScrolled ? '1px solid rgba(245, 192, 66, 0.28)' : '1px solid rgba(245, 192, 66, 0.12)',
      padding: isScrolled ? '10px 24px' : '14px 28px',
      boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none'
    }}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Brand Logo & Name */}
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 8px rgba(255, 200, 59, 0.8))' }}>🪔</span>
          <div>
            <span className="text-gold-gradient" style={{
              fontFamily: 'var(--font-divine)',
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontWeight: 800,
              letterSpacing: '1.2px',
              display: 'block',
              lineHeight: 1.15
            }}>
              DIVINE MAA KALI
            </span>
            <span style={{
              fontSize: '9.5px',
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '1.2px',
              display: 'block'
            }}>
              {language === 'hi' ? 'श्यामा पूजा एवं दीप दर्शन' : 'Shyama Puja & Darshan'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-desktop-links" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22
        }}>
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              style={{
                textDecoration: 'none',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '13px',
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                letterSpacing: '0.4px',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#f5c042';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Actions: Minimal Hover Music Player, Language Toggle, Mute */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Minimal Music Player Button that expands on hover */}
          <div
            onMouseEnter={() => setIsMusicHovered(true)}
            onMouseLeave={() => setIsMusicHovered(false)}
            onClick={() => setIsMusicHovered(!isMusicHovered)}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(28, 8, 16, 0.75)',
              border: '1px solid rgba(245, 192, 66, 0.35)',
              borderRadius: '25px',
              height: 32,
              padding: isMusicHovered ? '4px 12px' : '4px',
              width: isMusicHovered ? 'auto' : 32,
              gap: isMusicHovered ? 8 : 0,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}
            title="Music Player (Hover to expand)"
          >
            <button
              onClick={handleToggleSong}
              style={{
                background: 'none',
                border: 'none',
                color: '#f5c042',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                width: 24,
                height: 24
              }}
            >
              {isMusicHovered ? (
                isSongPlaying ? <Pause size={13} /> : <Play size={13} />
              ) : (
                <Music size={14} />
              )}
            </button>

            {isMusicHovered && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                animation: 'fadeIn 0.2s ease'
              }}>
                <span style={{ fontSize: '11px', color: '#f5c042', fontWeight: 600 }}>
                  Aigiri Nandini • Brodha V
                </span>
                {isSongPlaying && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 10 }}>
                    <div style={{ width: 2, height: '60%', background: '#d82138', borderRadius: 1, animation: 'eq 0.8s infinite' }} />
                    <div style={{ width: 2, height: '100%', background: '#f5c042', borderRadius: 1, animation: 'eq 1.2s infinite 0.2s' }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            style={{
              background: 'rgba(245, 192, 66, 0.12)',
              border: '1px solid rgba(245, 192, 66, 0.35)',
              borderRadius: '20px',
              padding: '5px 12px',
              color: '#f5c042',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease'
            }}
            title="Switch Language (English / हिन्दी)"
          >
            <Globe size={13} />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="btn-icon-minimal"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={14} color="#ff5555" /> : <Volume2 size={14} color="#f5c042" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: '#f5c042',
              cursor: 'pointer',
              display: 'none',
              padding: 4
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(21, 4, 10, 0.98)',
          backdropFilter: 'blur(25px)',
          borderBottom: '1px solid rgba(245, 192, 66, 0.3)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
        }}>
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: 600,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};
