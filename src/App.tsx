import React, { useState, useEffect, useRef } from 'react';
import { SceneManager, CameraPreset } from './three/SceneManager';
import { spatialAudio } from './audio/SpatialAudio';
import { LanguageProvider } from './context/LanguageContext';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroOverlay } from './components/HeroOverlay';
import { AboutSection } from './components/AboutSection';
import { AartiSection } from './components/AartiSection';
import { TemplesSection } from './components/TemplesSection';
import { VirtualDiyaSection } from './components/VirtualDiyaSection';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sceneManager, setSceneManager] = useState<SceneManager | null>(null);

  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentPreset, setCurrentPreset] = useState<CameraPreset>('courtyard');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Initialize SceneManager once canvas mounts
  useEffect(() => {
    if (!canvasRef.current) return;

    const manager = new SceneManager(canvasRef.current);
    setSceneManager(manager);

    return () => {
      manager.destroy();
    };
  }, []);

  const handleEnterDarshan = () => {
    setHasEntered(true);
    spatialAudio.init();
    spatialAudio.setMasterMute(false);
    spatialAudio.playBell();

    if (sceneManager) {
      sceneManager.switchPreset('courtyard');
    }
  };

  const handleSelectPreset = (preset: CameraPreset) => {
    setCurrentPreset(preset);
    if (sceneManager) {
      sceneManager.switchPreset(preset);
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    spatialAudio.setMasterMute(nextMute);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100%', overflowX: 'hidden' }}>
      {/* Custom Golden Spark Cursor */}
      <CustomCursor />

      {/* Fixed 3D WebGL Background Canvas */}
      <canvas
        id="webgl-canvas"
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: hasEntered ? 'auto' : 'none'
        }}
      />

      {/* Preloader / Sacred Entry Gate */}
      {!hasEntered && (
        <Preloader onEnter={handleEnterDarshan} />
      )}

      {/* Main Full-Fledged Website Experience */}
      {hasEntered && (
        <>
          {/* Top Sticky Navbar */}
          <Navbar
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />

          {/* Hero Section with 3D Interaction Overlay */}
          <section
            id="hero"
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              zIndex: 1
            }}
          >
            <HeroOverlay
              currentPreset={currentPreset}
              onSelectPreset={handleSelectPreset}
              sceneManager={sceneManager}
              onOpenAartiModal={() => sceneManager?.startAartiOffering()}
            />
          </section>

          {/* Continuous Scrollable Real-World Content Sections */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(21, 4, 10, 0.88) 6%, rgba(21, 4, 10, 0.96) 20%, #15040a 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
            {/* a) About Maa Kali */}
            <AboutSection />

            {/* b) Mantra Counter ("ॐ क्रीं कालिकायै नमः" + Aarti) */}
            <AartiSection />

            {/* c) Famous Temples (Kalighat, Dakshineswar, Kalka Ji) */}
            <TemplesSection />

            {/* d) Diya aur Prayer Wall (Floating Diya + Prayer List) */}
            <VirtualDiyaSection />

            {/* e) Footer */}
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
