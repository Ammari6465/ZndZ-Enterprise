import React from 'react';

export const OceanReflectionBar: React.FC = () => {
  return (
    <div className="relative w-full h-8 overflow-hidden bg-[#001B3F] border-b border-[#2E6DAE]/20">
      <div 
        className="absolute inset-0 opacity-40 bg-repeat-x animate-wave-slow"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(46, 109, 174, 0.4) 0%, rgba(0, 33, 78, 0) 70%)`,
          backgroundSize: '120px 30px'
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E6DAE]/60 to-transparent" />
    </div>
  );
};
