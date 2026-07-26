import React, { memo } from 'react';
import { INSIGHTS_ARTICLES } from '../../data/constants';

interface InsightsSectionProps {
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = memo(({ setSectionRef }) => {
  return (
    <section id="insights" ref={setSectionRef('insights')} className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
            Maritime Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E]">
            Procurement Insights &amp; Bulletin.
          </h2>
          <p className="text-xs sm:text-sm text-[#00214E]/70 max-w-2xl mx-auto mt-2">
            Technical articles written by marine superintendents to streamline vessel sourcing, audit compliance, and port supply chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {INSIGHTS_ARTICLES.map((article) => (
            <article 
              key={article.id}
              className="border border-[#00214E]/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white"
            >
              <div className="p-5 sm:p-6">
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-[#2E6DAE]">
                  {article.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#00214E] mt-1.5 mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#00214E]/70 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div className="p-4 sm:p-5 bg-[#F5F2ED]/50 border-t border-[#00214E]/5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-gray-500">
                <span>Author: {article.author}</span>
                <span className="font-bold text-[#2E6DAE]">{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

InsightsSection.displayName = 'InsightsSection';
