import React, { memo } from 'react';
import { Award, ShieldCheck, CheckCircle, Globe, Ship } from 'lucide-react';
import { CLIENT_LOGOS } from '../../data/constants';
import { AnimatedCounter } from '../UI/AnimatedCounter';

export const TrustBar: React.FC = memo(() => {
  return (
    <div className="w-full bg-[#00214E] text-[#F5F2ED] py-8 border-b border-[#00214E]/20 overflow-hidden">
      
      {/* Certifications Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-all duration-300 hover:scale-[1.02]">
            <Award className="w-5 h-5 text-[#2E6DAE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-xs font-bold text-white">ISO 9001:2015</div>
              <div className="text-[9px] text-gray-300">Quality Certified</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-all duration-300 hover:scale-[1.02]">
            <ShieldCheck className="w-5 h-5 text-[#2E6DAE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-xs font-bold text-white">IMPA / ISSA</div>
              <div className="text-[9px] text-gray-300">Registered Member</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-all duration-300 hover:scale-[1.02]">
            <CheckCircle className="w-5 h-5 text-[#2E6DAE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-xs font-bold text-white">ISO 14001:2015</div>
              <div className="text-[9px] text-gray-300">Environmental Mgt</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-all duration-300 hover:scale-[1.02]">
            <Globe className="w-5 h-5 text-[#2E6DAE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-xs font-bold text-white">SOLAS Approved</div>
              <div className="text-[9px] text-gray-300">ClassNK / DNV / LR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker / Marquee Section */}
      <div className="border-t border-b border-white/10 py-4 bg-white/5 relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-16 font-mono text-xs font-extrabold uppercase tracking-widest text-gray-300">
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Ship className="w-4 h-4 text-[#2E6DAE]" />
              <span className="text-white hover:text-[#2E6DAE] transition-colors">{logo.name}</span>
              <span className="text-gray-600 ml-8">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Metrics Grid with Count-up Animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2E6DAE]">
              <AnimatedCounter value="15,000+" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-widest mt-1">IMPA/ISSA Items</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2E6DAE]">
              <AnimatedCounter value="500+" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-widest mt-1">Vessels Supplied</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2E6DAE]">
              <AnimatedCounter value="20+" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-widest mt-1">Global Port Nodes</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#2E6DAE] transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2E6DAE]">
              <AnimatedCounter value="99.8%" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-widest mt-1">On-Time Turnaround</div>
          </div>
        </div>
      </div>

    </div>
  );
});

TrustBar.displayName = 'TrustBar';
