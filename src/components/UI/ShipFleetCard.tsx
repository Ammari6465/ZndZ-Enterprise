import React, { useState } from 'react';
import { Ship, Anchor, Gauge, ShieldCheck, Box, Compass, Navigation, Radio, CheckCircle2 } from 'lucide-react';

interface ShipFleetCardProps {
  className?: string;
}

export const ShipFleetCard: React.FC<ShipFleetCardProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'deck' | 'certs'>('fleet');

  return (
    <div
      className={`relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#001B3F] text-white flex flex-col justify-between p-5 sm:p-7 ${className}`}
      role="region"
      aria-label="Commercial Vessel & Supply Fleet Showcase"
    >
      {/* Background Maritime Image with Overlay */}
      <img
        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200"
        alt="Commercial Container Ship Vessel"
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay transition-opacity duration-700"
        loading="lazy"
        decoding="async"
      />

      {/* Subtle Gradient Shielding */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001433] via-[#001D42]/70 to-transparent pointer-events-none" />

      {/* Top Bar: Operational Status & Tab Pills */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 bg-[#00214E]/90 border border-white/15 px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 backdrop-blur-md shadow-md self-start sm:self-auto">
          <Ship className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold text-[10px] sm:text-xs">COMMERCIAL FLEET OVERVIEW</span>
        </div>

        {/* Interactive Spec Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#001433]/80 p-1 rounded-xl border border-white/10 backdrop-blur-md w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => setActiveTab('fleet')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all min-h-[36px] ${
              activeTab === 'fleet' ? 'bg-[#2E6DAE] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Vessel Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deck')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all min-h-[36px] ${
              activeTab === 'deck' ? 'bg-[#2E6DAE] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Cargo Deck
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certs')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all min-h-[36px] ${
              activeTab === 'certs' ? 'bg-[#2E6DAE] text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Standards
          </button>
        </div>
      </div>

      {/* Center Dynamic Content Area */}
      <div className="relative z-10 my-auto py-4">
        {activeTab === 'fleet' && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00214E] border border-white/20 flex items-center justify-center text-cyan-400 shadow-lg shrink-0">
                <Ship className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block font-bold">
                  Flagship Commercial Fleet
                </span>
                <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white">
                  Ultra Large Container Vessel (ULCV)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
              Equipped with heavy deck cranes and temperature-monitored reefer bays. Direct deck-to-deck transfer capability across all major Indian and international anchorage zones.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Length Overall (LOA)</div>
                <div className="font-bold text-white text-sm mt-0.5">399.9 Meters</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Max Beam Width</div>
                <div className="font-bold text-white text-sm mt-0.5">61.3 Meters</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deck' && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00214E] border border-white/20 flex items-center justify-center text-amber-400 shadow-lg shrink-0">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block font-bold">
                  Stores & Equipment Capacity
                </span>
                <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white">
                  Engine, Deck & Provisions
                </h3>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-mono text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IMPA 6-Digit Coded Technical Stores (50,000+ SKUs)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISSA Compliant Engine Room Spare Parts & Gaskets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SOLAS Lifeboats, Pyrotechnics & Breathing Apparatus</span>
              </li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm font-mono text-xs flex justify-between items-center">
              <span className="text-slate-300 text-[11px]">Reefer Plug Outlets</span>
              <span className="font-bold text-cyan-300">2,100 Plugs Available</span>
            </div>
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00214E] border border-white/20 flex items-center justify-center text-emerald-400 shadow-lg shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block font-bold">
                  Quality Assurance
                </span>
                <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white">
                  IACS & Class Certifications
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">ISO 9001:2015</div>
                  <div className="text-[9px] text-slate-400">Quality Management</div>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">SOLAS / MARPOL</div>
                  <div className="text-[9px] text-slate-400">Safety & Environmental</div>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">IMPA / ISSA</div>
                  <div className="text-[9px] text-slate-400">Member ID Certified</div>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <Gauge className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[11px]">24/7 OPL Supply</div>
                  <div className="text-[9px] text-slate-400">Outer Port Limits</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metrics Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-4 bg-[#00214E]/85 border border-white/15 rounded-xl p-3 backdrop-blur-md">
        <div className="flex items-center gap-2 text-left">
          <Anchor className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Max Capacity</div>
            <div className="text-xs sm:text-sm font-bold font-mono text-white">21,000 TEU</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-left border-x border-white/10 px-2 sm:px-4">
          <Gauge className="w-4 h-4 text-emerald-400 shrink-0 hidden sm:block" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Transit Speed</div>
            <div className="text-xs sm:text-sm font-bold font-mono text-white">22.5 Knots</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Class Rating</div>
            <div className="text-xs sm:text-sm font-bold font-mono text-white">ISO 14001</div>
          </div>
        </div>
      </div>
    </div>
  );
};
