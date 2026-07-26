import React, { memo } from 'react';
import { FileText, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface ProcessTimelineSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Requisition Ticket',
    subtitle: 'Submit IMPA codes or custom product lists via online portal or direct RFQ form.',
    icon: FileText
  },
  {
    number: '02',
    title: 'Technical Verification',
    subtitle: 'Superintendents cross-reference specification drawings, ClassNK/DNV certificates, and IMPA indexes.',
    icon: ShieldCheck
  },
  {
    number: '03',
    title: 'Customs & Mobilization',
    subtitle: 'Expedited port authority clearances and staging at local OPL supply launch pads.',
    icon: Truck
  },
  {
    number: '04',
    title: 'Deck Delivery Signoff',
    subtitle: 'Direct transfer to vessel deck with signed manifests, MSDS sheets, and material test reports.',
    icon: CheckCircle2
  }
];

export const ProcessTimelineSection: React.FC<ProcessTimelineSectionProps> = memo(({ setSectionRef }) => {
  return (
    <section ref={setSectionRef('process')} className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
            Requisition to Deck Delivery Protocol.
          </h2>
          <p className="text-xs sm:text-sm text-[#00214E]/70 max-w-xl mx-auto mt-2">
            A standardized, audit-ready 4-stage logistics pipeline designed for seamless vessel turnarounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-[#00214E]/10 shadow-sm relative flex flex-col justify-between group hover:border-[#2E6DAE] transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-mono font-black text-[#2E6DAE]">{step.number}</span>
                    <div className="w-10 h-10 bg-[#2E6DAE]/10 text-[#2E6DAE] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#00214E] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#00214E]/70 leading-relaxed">{step.subtitle}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-100 font-mono text-[9px] uppercase tracking-wider text-[#2E6DAE] font-bold">
                  Stage {index + 1} Verified
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProcessTimelineSection.displayName = 'ProcessTimelineSection';
