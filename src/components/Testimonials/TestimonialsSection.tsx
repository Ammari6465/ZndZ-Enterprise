import React, { memo } from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, CASE_STUDIES } from '../../data/constants';
import { MotionCard } from '../UI/MotionCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface TestimonialsSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = memo(({ setSectionRef }) => {
  return (
    <section ref={setSectionRef('case-studies')} className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Case Studies Header */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Proven Operations
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Fleet Turnaround Case Studies.
            </h2>
            <p className="text-xs sm:text-sm text-[#00214E]/70 max-w-2xl mx-auto mt-2">
              Real-world emergency mobilizations and complete deck provisioning executed under strict deadline constraints.
            </p>
          </div>
        </ScrollAnimate>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 sm:mb-20">
          {CASE_STUDIES.map((study, idx) => (
            <ScrollAnimate key={study.id} direction="up" delay={idx * 0.12}>
              <MotionCard tiltDegree={2.5} className="h-full bg-[#F5F2ED] border border-[#00214E]/10 p-6 sm:p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#00214E]/10 pb-3 mb-4 font-mono text-[9px] sm:text-[10px]">
                    <span className="text-[#2E6DAE] font-bold">{study.categoryTag}</span>
                    <span>{study.locationTag}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif italic mb-3 text-[#00214E]">{study.title}</h3>
                  <p className="text-xs sm:text-sm text-[#00214E]/80 mb-6 leading-relaxed">
                    {study.description}
                  </p>
                  
                  {/* Case Specs */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 bg-white rounded-lg text-[9px] sm:text-[11px] font-mono mb-6 border border-[#00214E]/10">
                    <div>
                      <div className="text-gray-400">VESSEL CLASS</div>
                      <div className="font-bold text-[#00214E]">{study.vesselClass}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">REQUISITION</div>
                      <div className="font-bold text-[#00214E]">{study.requisitionType}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">TURNAROUND</div>
                      <div className="font-bold text-[#2E6DAE]">{study.turnaroundTime}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#2E6DAE] font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{study.impaReference}</span>
                </div>
              </MotionCard>
            </ScrollAnimate>
          ))}
        </div>

        {/* Testimonials Header */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#2E6DAE] block mb-2">
              Client Endorsements
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#00214E]">
              Trusted by Global Fleet Superintendents.
            </h3>
          </div>
        </ScrollAnimate>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <ScrollAnimate key={test.id} direction="up" delay={idx * 0.1}>
              <MotionCard tiltDegree={3} className="h-full bg-white border border-[#00214E]/10 p-6 rounded-xl shadow-sm relative flex flex-col justify-between">
                <Quote className="w-8 h-8 text-[#2E6DAE]/20 absolute top-4 right-4" />
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#00214E]/80 leading-relaxed italic mb-6">
                    "{test.content}"
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-4 font-mono">
                  <div className="font-bold text-xs text-[#00214E]">{test.name}</div>
                  <div className="text-[10px] text-[#2E6DAE]">{test.position}, {test.company}</div>
                </div>
              </MotionCard>
            </ScrollAnimate>
          ))}
        </div>

      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';
