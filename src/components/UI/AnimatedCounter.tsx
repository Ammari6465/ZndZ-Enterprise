import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "15,000+", "120+", "50+", "99.8%"
  duration?: number; // ms
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract numeric part and suffix
  const numericMatch = value.match(/[\d.,]+/);
  const rawNumberStr = numericMatch ? numericMatch[0].replace(/,/g, '') : '0';
  const targetNum = parseFloat(rawNumberStr);
  const isFloat = rawNumberStr.includes('.');
  const prefix = value.substring(0, value.indexOf(numericMatch ? numericMatch[0] : ''));
  const suffix = value.substring(value.indexOf(numericMatch ? numericMatch[0] : '') + (numericMatch ? numericMatch[0].length : 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = targetNum * easeProgress;

      let formattedNum = '';
      if (isFloat) {
        formattedNum = currentVal.toFixed(1);
      } else {
        formattedNum = Math.floor(currentVal).toLocaleString();
      }

      setDisplayValue(formattedNum);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, targetNum, duration, isFloat]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};
