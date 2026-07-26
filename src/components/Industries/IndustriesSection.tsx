import React, { memo } from 'react';
import { INDUSTRIES } from '../../data/constants';
import { MotionCard } from '../UI/MotionCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface IndustriesSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = memo(({ setSectionRef }) => {
  return (
    <section ref={setSectionRef('industries')} className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Sector Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Industries We Serve.
            </h2>
            <p className="text-xs sm:text-sm text-[#00214E]/70 max-w-xl mx-auto mt-2">
              Tailored provisioning solutions for specialized vessel types and offshore maritime operations.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <ScrollAnimate key={i} direction="up" delay={i * 0.08}>
                <MotionCard tiltDegree={3} className="h-full bg-[#F5F2ED] p-5 sm:p-6 rounded-xl border border-[#00214E]/10 flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-full border border-[#00214E]/10 text-[#2E6DAE] group-hover:bg-[#2E6DAE] group-hover:text-white transition-colors flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#00214E] mb-1">{ind.name}</h3>
                  <span className="text-[10px] font-mono text-[#2E6DAE] font-extrabold">{ind.count} Fleets</span>
                </MotionCard>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </section>
  );
});

IndustriesSection.displayName = 'IndustriesSection';
