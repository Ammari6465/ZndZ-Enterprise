import React, { useRef, useState } from 'react';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltDegree?: number;
}

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className = '',
  onClick,
  tiltDegree = 3
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltDegree;
    const rotateY = ((x - centerX) / centerX) * tiltDegree;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`transition-all duration-300 ease-out will-change-transform ${
        isHovered ? 'shadow-2xl border-[#2E6DAE]/40 z-10' : 'shadow-sm'
      } ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};
