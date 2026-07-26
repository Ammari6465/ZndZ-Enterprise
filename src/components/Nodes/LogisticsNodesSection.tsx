import React, { memo, useState } from 'react';
import { MapPin, Clock, Compass } from 'lucide-react';
import { SourcingNode } from '../../types';
import { PORT_NODES } from '../../data/constants';
import { LogisticsDispatchMap } from './LogisticsDispatchMap';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface LogisticsNodesSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const LogisticsNodesSection: React.FC<LogisticsNodesSectionProps> = memo(({ setSectionRef }) => {
  const [selectedNode, setSelectedNode] = useState<SourcingNode>(PORT_NODES[0]);

  return (
    <section 
      id="nodes" 
      ref={setSectionRef('nodes')}
      className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Global Dispatch Network
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Primary Sourcing Nodes &amp; Port Hubs.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto mt-2">
              Strategic distribution centers positioned at high-volume maritime corridors for zero-delay vessel replenishment.
            </p>
          </div>
        </ScrollAnimate>

        {/* Interactive 2D Dispatch Corridors Map */}
        <ScrollAnimate direction="up" delay={0.15} className="mb-10 sm:mb-12">
          <LogisticsDispatchMap 
            nodes={PORT_NODES}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
          />
        </ScrollAnimate>

        {/* Interactive Hub Selector & Detail Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node List Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-mono text-gray-400 font-bold mb-3">
              Select Primary Hub Location
            </h3>
            {PORT_NODES.map((node) => {
              const isSelected = selectedNode.name === node.name;
              return (
                <button
                  key={node.code}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#2E6DAE] ${
                    isSelected
                      ? 'bg-[#00214E] text-white border-[#00214E] shadow-lg scale-[1.01]'
                      : 'bg-[#F5F2ED] text-[#00214E] border-[#00214E]/10 hover:border-[#2E6DAE] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isSelected ? 'bg-[#2E6DAE] text-white' : 'bg-white border border-[#00214E]/10 text-[#2E6DAE]'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{node.name}</h4>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {node.code} • {node.timezone}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded-full ${
                    isSelected 
                      ? 'bg-[#2E6DAE] text-white' 
                      : 'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {node.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Node Realtime Dashboard */}
          <div className="lg:col-span-7 bg-[#00214E] text-white p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
              <Compass className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start border-b border-white/15 pb-4 mb-6">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#2E6DAE]">Active Logistics Hub</span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">{selectedNode.name}</h3>
                  <p className="text-xs font-mono text-gray-300 mt-0.5">Coordinates: {selectedNode.lat}, {selectedNode.lon}</p>
                </div>
                <span className="px-3 py-1 bg-[#2E6DAE] text-white text-xs font-mono font-bold rounded">
                  {selectedNode.code}
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#2E6DAE] transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase">Avg Lead Time</div>
                  <div className="text-lg font-bold text-[#2E6DAE] mt-1">{selectedNode.leadTime}</div>
                  <div className="text-[9px] text-gray-400">Direct to Deck</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#2E6DAE] transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase">Active Vessels</div>
                  <div className="text-lg font-bold text-white mt-1">{selectedNode.activeVessels} Callings</div>
                  <div className="text-[9px] text-gray-400">Current Window</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#2E6DAE] transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase">Stock Inventory</div>
                  <div className="text-lg font-bold text-white mt-1">{selectedNode.availableItems} SKUs</div>
                  <div className="text-[9px] text-gray-400">Ready for Dispatch</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#2E6DAE] transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase">Harbor Congestion</div>
                  <div className="text-lg font-bold text-green-400 mt-1">{selectedNode.congestion}</div>
                  <div className="text-[9px] text-gray-400">Smooth Clearance</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 col-span-2 sm:col-span-2 hover:border-[#2E6DAE] transition-colors">
                  <div className="text-[10px] text-gray-400 uppercase">Operational Status</div>
                  <div className="text-xs font-bold text-white mt-1">Full 24/7 Crew &amp; Tugboat Transfer Service</div>
                  <div className="text-[9px] text-gray-400">OPL Delivery Enabled</div>
                </div>
              </div>

              {/* Direct Requisition CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E6DAE] hover:bg-[#1B4F8C] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
              >
                <span>Request Delivery To {selectedNode.name}</span>
                <Clock className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

LogisticsNodesSection.displayName = 'LogisticsNodesSection';
