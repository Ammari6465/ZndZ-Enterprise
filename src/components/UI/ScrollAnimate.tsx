import React from 'react';
import { motion, Variants } from 'motion/react';

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.4
}) => {
  let x = 0;
  let y = 0;

  if (direction === 'up') y = 24;
  if (direction === 'down') y = -24;
  if (direction === 'left') x = 24;
  if (direction === 'right') x = -24;

  const variants: Variants = {
    hidden: { opacity: 0, x, y, scale: 0.98 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
