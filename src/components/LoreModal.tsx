import React from 'react';
import { X, Sparkles, BookOpen } from 'lucide-react';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoreModal: React.FC<LoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(5, 5, 15, 0.82)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: 720,
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative',
        border: '1px solid rgba(255, 200, 59, 0.4)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <BookOpen color="#ffc83b" size={28} />
          <div>
            <h2 className="text-gold-gradient" style={{
              fontFamily: 'var(--font-divine)',
              fontSize: '24px',
              letterSpacing: '1px'
            }}>
              Katha & Sacred Significance
            </h2>
            <p style={{ fontSize: '13px', color: '#b8b8cc' }}>
              The Convergence of Shyama Puja & Deepavali
            </p>
          </div>
        </div>

        {/* Section 1: Shyama Puja */}
        <div style={{
          marginBottom: 24,
          background: 'rgba(13, 31, 60, 0.35)',
          padding: '18px',
          borderRadius: '12px',
          borderLeft: '4px solid #d91438'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            color: '#ff7799',
            fontSize: '18px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Sparkles size={16} /> Maa Kali & Shyama Puja
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e0e0ea', marginBottom: '10px' }}>
            On the new moon night (*Kartik Amavasya*), while lights shine across the nation, Bengal, Assam, and Odisha celebrate **Shyama Puja**. Maa Kali represents the boundless primordial cosmic energy (*Shakti*), the vanquisher of ignorance, ego, and darkness.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e0e0ea' }}>
            Her fierce form reminds devotees that light must conquer inner darkness. The fiery halo, glowing *Trinetra* (third eye of wisdom), and triumphant posture over Lord Shiva symbolize divine stillness subduing uncontrollable cosmic fury.
          </p>
        </div>

        {/* Section 2: Sacred Iconography & Rituals */}
        <div style={{
          marginBottom: 24,
          background: 'rgba(255, 200, 59, 0.08)',
          padding: '18px',
          borderRadius: '12px',
          borderLeft: '4px solid #ffc83b'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            color: '#ffc83b',
            fontSize: '18px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Sparkles size={16} /> Sacred Iconography & Rituals
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e0e0ea', marginBottom: '10px' }}>
            **The Mundamala (Garland of Skulls):** Represents the 50 letters of the Sanskrit alphabet (Varnamala), the cosmic sound vibrations (*Nada Brahma*) through which creation manifests.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e0e0ea', marginBottom: '10px' }}>
            **The Khadga (Curved Scimitar):** Cuts through the illusions of Maya, severed ego, and worldly attachment to awaken spiritual liberation (*Moksha*).
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e0e0ea' }}>
            **Jaba Phool & Pancha-Pradeep Aarti:** Devotees offer vibrant crimson hibiscus flowers (*Rakta Jaba*) and wave five-tiered brass oil lamps while resonant *Dhak* drums and brass bells sanctify the atmosphere.
          </p>
        </div>

        {/* Sacred Closing Chant */}
        <div style={{
          textAlign: 'center',
          padding: '14px',
          background: 'rgba(255, 200, 59, 0.08)',
          borderRadius: '10px'
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            color: '#ffc83b',
            fontSize: '14px',
            fontStyle: 'italic'
          }}>
            "May the eternal light of Maa Shyama Kali dispel all fears, vanquish all sorrows, and illuminate our inner consciousness with supreme peace and devotion."
          </span>
        </div>
      </div>
    </div>
  );
};
