import React, { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/constants';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface FaqSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = memo(({ setSectionRef }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section 
      ref={setSectionRef('faqs')}
      className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <ScrollAnimate direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
              Frequently Asked Questions.
            </h2>
          </div>
        </ScrollAnimate>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <ScrollAnimate key={i} direction="up" delay={i * 0.05}>
                <div className="bg-white border border-[#00214E]/10 overflow-hidden rounded-xl shadow-sm hover:border-[#2E6DAE]/40 transition-colors">
                  <button
                    id={`faq-button-${i}`}
                    onClick={() => toggleFaq(i)}
                    className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between text-left min-h-[52px] focus:outline-none focus:ring-2 focus:ring-[#2E6DAE] rounded-xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-semibold pr-4 text-[#00214E]">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div 
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-xs sm:text-sm text-[#00214E]/80 leading-relaxed border-t border-gray-100 pt-3"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollAnimate>
            );
          })}
        </div>

      </div>
    </section>
  );
});

FaqSection.displayName = 'FaqSection';
