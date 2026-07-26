import React, { useEffect, useState } from 'react';

export const MagneticCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if user is on fine pointer (mouse/desktop) and does NOT prefer reduced motion
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!pointerQuery.matches || motionQuery.matches) {
      setIsFinePointer(false);
      return;
    }
    setIsFinePointer(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('button, a, input, select, textarea, [role="button"]');
        setIsHovered(isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 ${
        isHovered
          ? 'w-10 h-10 border-2 border-[#2E6DAE] bg-[#2E6DAE]/15 backdrop-blur-[1px] scale-110'
          : 'w-6 h-6 border border-[#2E6DAE]/60 bg-transparent'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      <div className="w-1.5 h-1.5 bg-[#2E6DAE] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
