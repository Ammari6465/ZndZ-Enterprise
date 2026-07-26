import React, { memo } from 'react';
import { ArrowRight, Compass, ShieldCheck, Anchor } from 'lucide-react';
import { ShipFleetCard } from '../UI/ShipFleetCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';
import { OceanReflectionBar } from '../UI/OceanReflectionBar';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRequestQuoteClick: () => void;
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = memo(({
  onExploreClick,
  onRequestQuoteClick,
  setSectionRef
}) => {
  return (
    <>
      <section 
        id="hero" 
        ref={setSectionRef('hero')}
        aria-label="Hero Section"
        className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-6 md:px-12 bg-cover bg-center border-b border-[#00214E]/10 min-h-[85vh] sm:min-h-[88vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 33, 78, 0.95), rgba(0, 33, 78, 0.82)), url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920)'
        }}
      >
        {/* Compass Watermark Background */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block" aria-hidden="true">
          <Compass className="w-[500px] h-[500px] text-white animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <ScrollAnimate direction="up" delay={0.1}>
                {/* Top Tagline Pill */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#2E6DAE]/30 border border-[#2E6DAE]/50 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2E6DAE] animate-pulse"></span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E8F1FA]">
                    OPERATIONAL MARITIME LOGISTICS HUB
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-[1.1] mb-4 sm:mb-6">
                  Precision Ship Chandling &amp; <span className="text-[#2E6DAE]">Technical Marine Procurement.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base md:text-lg text-gray-200 leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl">
                  Delivering IMPA/ISSA code compliant stores, deck gear, engine parts, and SOLAS safety equipment directly to vessel decks across 20+ strategic port hubs worldwide.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
                  <button 
                    onClick={onExploreClick}
                    className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#2E6DAE] hover:bg-[#1B4F8C] text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded-lg shadow-xl flex items-center justify-center gap-2 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-white hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={onRequestQuoteClick}
                    className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded-lg backdrop-blur-sm min-h-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Request Instant Quote
                  </button>

                  <a 
                    href="#catalogue"
                    onClick={onExploreClick}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm text-gray-300 hover:text-white underline underline-offset-4 font-mono font-medium min-h-[48px] flex items-center justify-center text-center focus:outline-none focus:text-white"
                  >
                    Download IMPA Index Ref
                  </a>
                </div>
              </ScrollAnimate>
            </div>

            {/* Right Commercial Vessel Fleet Card */}
            <div className="lg:col-span-5">
              <ScrollAnimate direction="left" delay={0.2}>
                <ShipFleetCard />
              </ScrollAnimate>
            </div>

          </div>

          {/* Proof Points Grid */}
          <ScrollAnimate direction="up" delay={0.3} className="mt-8 pt-6 sm:pt-8 border-t border-white/15 font-mono text-[10px] sm:text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:border-[#2E6DAE] transition-colors">
                <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE] shrink-0" />
                <div>
                  <div className="font-extrabold text-white text-xs sm:text-sm">24/7 Ops</div>
                  <div className="text-gray-300 text-[9px] sm:text-[10px]">4hr Response</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:border-[#2E6DAE] transition-colors">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE] shrink-0" />
                <div>
                  <div className="font-extrabold text-white text-xs sm:text-sm">100% Certified</div>
                  <div className="text-gray-300 text-[9px] sm:text-[10px]">IACS / SOLAS</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:border-[#2E6DAE] transition-colors">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE] shrink-0" />
                <div>
                  <div className="font-extrabold text-white text-xs sm:text-sm">IMPA / ISSA</div>
                  <div className="text-gray-300 text-[9px] sm:text-[10px]">6-Digit Codes</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:border-[#2E6DAE] transition-colors">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE] shrink-0" />
                <div>
                  <div className="font-extrabold text-white text-xs sm:text-sm">Global Reach</div>
                  <div className="text-gray-300 text-[9px] sm:text-[10px]">20+ Port Hubs</div>
                </div>
              </div>
            </div>
          </ScrollAnimate>

        </div>
      </section>

      {/* Subtle Ocean Reflection Wave Effect Below Hero */}
      <OceanReflectionBar />
    </>
  );
});

HeroSection.displayName = 'HeroSection';
