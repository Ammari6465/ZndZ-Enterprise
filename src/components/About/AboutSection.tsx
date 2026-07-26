import React, { memo } from 'react';
import { Award, Check } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/constants';
import { MotionCard } from '../UI/MotionCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface AboutSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = memo(({ setSectionRef }) => {
  return (
    <section id="about" ref={setSectionRef('about')} className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Company Standard &amp; Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Certified Maritime Supply Chain Excellence.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto mt-3 leading-relaxed">
              Headquartered in Mumbai, ZndZ Enterprise delivers precision ship chandling, technical deck provisions, engine room spares, and SOLAS safety gear across major global port nodes.
            </p>
          </div>
        </ScrollAnimate>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <ScrollAnimate direction="right">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#00214E]">
                Engineered for Zero Vessel Dwell Time.
              </h3>
              <p className="text-xs sm:text-sm text-[#00214E]/80 leading-relaxed mt-3">
                In maritime shipping, every hour in port incurs heavy charterer demurrage fees. ZndZ Enterprise combines technical expertise with a globally coordinated procurement desk to ensure exact IMPA/ISSA code matching and expedited delivery to outer port limit (OPL) anchorages.
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E6DAE]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#00214E]">100% IMPA / ISSA Catalog Compliance</h4>
                    <p className="text-[11px] sm:text-xs text-[#00214E]/70">Exact 6-digit code verification prevents specification mismatches on delivery.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E6DAE]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#00214E]">24/7 Port Emergency Dispatch</h4>
                    <p className="text-[11px] sm:text-xs text-[#00214E]/70">Dedicated technical dispatch desk operating round the clock across all time zones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E6DAE]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#00214E]">IACS &amp; SOLAS Quality Audits</h4>
                    <p className="text-[11px] sm:text-xs text-[#00214E]/70">All safety gear and heavy mechanical parts accompanied by recognized Class certificates.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          {/* Right Image & Certifications Showcase */}
          <div className="lg:col-span-6">
            <ScrollAnimate direction="left">
              <MotionCard tiltDegree={2} className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#00214E]/10">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000" 
                  alt="ZndZ Enterprise Cargo & Port Delivery Operations" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00214E]/90 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#2E6DAE]">Operations Verification</span>
                  <span className="text-sm sm:text-base font-bold">Port of Mumbai / JNPT Terminal Operations</span>
                </div>
              </MotionCard>
            </ScrollAnimate>
          </div>

        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERTIFICATIONS.map((cert, index) => (
            <ScrollAnimate key={index} direction="up" delay={index * 0.08}>
              <MotionCard tiltDegree={3} className="h-full bg-white p-5 rounded-xl border border-[#00214E]/10 shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#2E6DAE]/10 text-[#2E6DAE] rounded-full flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00214E] mb-1">{cert.name}</h4>
                <p className="text-[10px] sm:text-[11px] text-[#00214E]/70 font-mono">{cert.description}</p>
              </MotionCard>
            </ScrollAnimate>
          ))}
        </div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
