import React from 'react';
import { SourcingNode } from '../../types';
import { Anchor, MapPin, Compass, Globe, ArrowUpRight, Zap } from 'lucide-react';

interface LogisticsDispatchMapProps {
  nodes: SourcingNode[];
  selectedNode: SourcingNode;
  onSelectNode: (node: SourcingNode) => void;
  className?: string;
}

export const LogisticsDispatchMap: React.FC<LogisticsDispatchMapProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
  className = ''
}) => {
  // Map normalized 2D x/y percentages for major port hubs on a world map layout
  const getNodeCoordinates = (code: string) => {
    switch (code) {
      case 'BOM-NODE': return { x: 67, y: 52 }; // Mumbai HQ (Center)
      case 'SIN-NODE': return { x: 78, y: 62 }; // Singapore
      case 'RTM-NODE': return { x: 48, y: 32 }; // Rotterdam
      case 'HOU-NODE': return { x: 24, y: 42 }; // Houston
      case 'DXB-NODE': return { x: 61, y: 46 }; // Dubai
      default: return { x: 50, y: 50 };
    }
  };

  const mumbaiCoords = getNodeCoordinates('BOM-NODE');

  return (
    <div
      className={`relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#001433] via-[#001D42] to-[#00214E] shadow-2xl flex flex-col justify-between p-4 sm:p-6 ${className}`}
      role="region"
      aria-label="Interactive 2D Global Supply Dispatch Corridors Map"
    >
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* Latitude / Longitude Decorative Grid Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#2E6DAE" strokeDasharray="4 4" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#2E6DAE" strokeDasharray="4 4" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#2E6DAE" strokeDasharray="4 4" />
        <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#2E6DAE" strokeDasharray="4 4" />
        <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#2E6DAE" strokeDasharray="4 4" />
      </svg>

      {/* SVG Connecting Dispatch Arc Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E6DAE" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#2E6DAE" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {nodes.map((node) => {
          if (node.code === 'BOM-NODE') return null;
          const targetCoords = getNodeCoordinates(node.code);
          const isSelected = selectedNode.code === node.code;

          // Quadratic curve control point elevated above straight line
          const midX = (mumbaiCoords.x + targetCoords.x) / 2;
          const midY = Math.min(mumbaiCoords.y, targetCoords.y) - 18;

          return (
            <g key={`arc-${node.code}`}>
              <path
                d={`M ${mumbaiCoords.x}% ${mumbaiCoords.y}% Q ${midX}% ${midY}% ${targetCoords.x}% ${targetCoords.y}%`}
                fill="none"
                stroke={isSelected ? '#38BDF8' : 'url(#arcGrad)'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? '6 3' : '4 4'}
                className={isSelected ? 'animate-pulse' : 'opacity-60'}
              />
            </g>
          );
        })}
      </svg>

      {/* Top Bar Floating Status */}
      <div className="relative z-20 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 bg-[#00214E]/90 border border-white/15 px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 backdrop-blur-md shadow-md">
          <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-bold text-[10px] sm:text-xs">GLOBAL SOURCING CORRIDORS MAP</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
          <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold text-white">Major Strategic Port Hubs</span>
        </div>
      </div>

      {/* Map Nodes Plotting */}
      <div className="relative w-full h-full z-20 my-2">
        {nodes.map((node) => {
          const coords = getNodeCoordinates(node.code);
          const isSelected = selectedNode.code === node.code;
          const isHQ = node.code === 'BOM-NODE';

          return (
            <div
              key={node.code}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => onSelectNode(node)}
                className={`group relative flex flex-col items-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-[#001433] rounded-full p-1 min-h-[44px] min-w-[44px] justify-center ${
                  isSelected ? 'z-30 scale-110' : 'z-20'
                }`}
                aria-label={`Select port node ${node.name} (${node.code})`}
              >
                {/* Static Highlight Ring */}
                <span
                  className={`absolute inset-0 rounded-full transition-all ${
                    isHQ
                      ? 'bg-amber-400/20 border border-amber-400/40'
                      : isSelected
                      ? 'bg-cyan-400/30 border border-cyan-400/50'
                      : 'bg-[#2E6DAE]/20'
                  }`}
                />

                {/* Node Dot / Marker Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border shadow-xl transition-colors ${
                    isHQ
                      ? 'bg-amber-500 text-slate-950 border-amber-300'
                      : isSelected
                      ? 'bg-[#38BDF8] text-[#001433] border-white'
                      : 'bg-[#00214E] text-slate-200 border-[#2E6DAE]'
                  }`}
                >
                  {isHQ ? <Anchor className="w-4 h-4" /> : <MapPin className="w-3.5 h-3.5" />}
                </div>

                {/* Hover / Active Badge Pill */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold whitespace-nowrap border shadow-md transition-all ${
                    isSelected
                      ? 'bg-[#38BDF8] text-[#001433] border-white scale-105'
                      : 'bg-[#00214E]/90 text-slate-200 border-white/10 group-hover:bg-[#2E6DAE] group-hover:text-white'
                  }`}
                >
                  {node.name} {isHQ && '(HQ)'}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Selected Node Dashboard Strip */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 bg-[#00214E]/90 border border-white/15 p-3 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#2E6DAE]/30 border border-[#2E6DAE] flex items-center justify-center text-cyan-300 shrink-0">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Selected Primary Hub</div>
            <div className="text-xs sm:text-sm font-bold text-white font-sans">{selectedNode.name} ({selectedNode.code})</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 font-mono text-[11px] text-slate-200">
          <div className="hidden sm:block">
            <span className="text-slate-400 text-[10px] uppercase block">Lead Time</span>
            <span className="font-bold text-emerald-400">{selectedNode.leadTime}</span>
          </div>
          <div className="hidden sm:block border-l border-white/15 pl-4">
            <span className="text-slate-400 text-[10px] uppercase block">Timezone</span>
            <span className="font-bold text-white">{selectedNode.timezone}</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E6DAE] hover:bg-[#1B4F8C] text-white font-bold text-xs rounded-lg transition-all min-h-[36px]"
          >
            <span>Request Hub Supply</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
