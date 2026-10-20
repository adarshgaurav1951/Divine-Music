import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth trailer follow
    let animId: number;
    const follow = () => {
      setTrailerPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner glowing flame spark */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: isClicking ? 14 : 9,
          height: isClicking ? 14 : 9,
          borderRadius: '50%',
          backgroundColor: '#ffc83b',
          boxShadow: '0 0 14px #ff7700, 0 0 24px #ffc83b',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s ease, height 0.15s ease'
        }}
      />
      {/* Outer soft golden ring aura */}
      <div
        style={{
          position: 'fixed',
          top: trailerPos.y,
          left: trailerPos.x,
          width: isClicking ? 42 : 32,
          height: isClicking ? 42 : 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 200, 59, 0.45)',
          boxShadow: '0 0 18px rgba(255, 119, 0, 0.3)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease'
        }}
      />
    </>
  );
};
