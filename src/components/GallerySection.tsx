import React, { useState } from 'react';
import { Image as ImageIcon, Eye, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'forms' | 'rituals' | 'temples';
  image: string;
  desc: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Maa Kali Beachside Mahā-Āratī with Devotees',
    category: 'rituals',
    image: '/textures/maa_kali_devotees_aarti_sanctum.jpg',
    desc: 'Grand seaside celebration where families gather on the beach to offer deepa aarti and ring sacred bells to Mother Kali.'
  },
  {
    id: 'g-2',
    title: 'Maa Kali Fiery Avatar & Flaming Halo',
    category: 'forms',
    image: '/textures/maa_kali_fiery_avatar.jpg',
    desc: 'Fierce and glorious manifestation with radiant solar fire halo, Trinetra, sacred sword, trident, and glowing clay diyas.'
  },
  {
    id: 'g-3',
    title: 'Devotees Ringing Temple Bells & Offering Lamps',
    category: 'rituals',
    image: '/textures/devotees_left.png',
    desc: 'Devout family offering pradeep lamps and chiming the sacred brass bell in joyous reverence.'
  },
  {
    id: 'g-4',
    title: 'Sacred Prayers & Diya Thali Worship',
    category: 'rituals',
    image: '/textures/devotees_right.png',
    desc: 'Devotees standing with hands folded in prayer and illuminating the twilight shoreline with brass lamps.'
  },
  {
    id: 'g-5',
    title: '360° Illuminated Temple Courtyard & Sky Fireworks',
    category: 'temples',
    image: '/textures/temple_sanctum_360_panorama.jpg',
    desc: 'Diwali night panoramic spectacle with thousands of glowing brass diyas, ancient carved stone columns, and festive fireworks.'
  },
  {
    id: 'g-6',
    title: 'Maa Kali Viraat Swaroop (Full Body Standing)',
    category: 'forms',
    image: '/textures/kali_full_body_standing.jpg',
    desc: 'Majestic full-body standing darshan of Goddess Kali from Her golden crown to Her sacred lotus feet upon Lord Shiva.'
  }
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'forms' | 'rituals' | 'temples'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" style={{
      padding: 'clamp(60px, 9vh, 100px) clamp(20px, 4vw, 48px)',
      maxWidth: 1300,
      margin: '0 auto',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
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
          <ImageIcon size={13} color="#ffd700" />
          <span>Sacred Art & Darshan</span>
        </div>

        <h2 className="text-gold-gradient" style={{
          fontFamily: 'var(--font-divine)',
          fontSize: 'clamp(26px, 3.8vw, 44px)',
          fontWeight: 800,
          letterSpacing: '1.5px',
          marginBottom: 14
        }}>
          Divine Gallery of Maa Kali
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#fbe2a0',
          maxWidth: 720,
          margin: '0 auto 24px'
        }}>
          Explore celestial depictions, sacred pujas, and timeless shrines dedicated to the Divine Mother.
        </p>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 10
        }}>
          {[
            { id: 'all', label: 'All Darshans' },
            { id: 'forms', label: 'Divine Forms (Rupas)' },
            { id: 'rituals', label: 'Pujas & Aarti' },
            { id: 'temples', label: 'Sacred Shrines' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
              style={{
                padding: '8px 20px',
                borderRadius: '25px',
                border: activeCategory === tab.id ? '1px solid #ffc83b' : '1px solid rgba(255, 255, 255, 0.12)',
                background: activeCategory === tab.id ? 'rgba(255, 200, 59, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: activeCategory === tab.id ? '#ffc83b' : '#b8b8cc',
                fontSize: '12.5px',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24
      }}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="glass-panel"
            onClick={() => setSelectedItem(item)}
            style={{
              borderRadius: '18px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 119, 0, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 8, 20, 0.9) 0%, rgba(10, 8, 20, 0.2) 60%, transparent 100%)'
              }} />
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffc83b'
              }}>
                <ZoomIn size={16} />
              </div>
            </div>

            <div style={{ padding: '16px 20px' }}>
              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                color: '#fff',
                margin: '0 0 6px',
                fontWeight: 700
              }}>
                {item.title}
              </h4>
              <p style={{
                fontSize: '12.5px',
                color: '#b8b8cc',
                lineHeight: 1.5,
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(5, 5, 12, 0.92)',
          backdropFilter: 'blur(16px)',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: 750,
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(255, 200, 59, 0.5)'
          }}>
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
            />

            <div style={{ padding: '24px 28px' }}>
              <h3 className="text-gold-gradient" style={{
                fontFamily: 'var(--font-divine)',
                fontSize: '22px',
                margin: '0 0 8px'
              }}>
                {selectedItem.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: '#e0e0ec', lineHeight: 1.6, margin: 0 }}>
                {selectedItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
