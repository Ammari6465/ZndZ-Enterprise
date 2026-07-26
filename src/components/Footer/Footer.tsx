import React, { memo } from 'react';
import { Anchor, Sun, Moon } from 'lucide-react';
import { logo } from '../../data/constants';

interface FooterProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const Footer: React.FC<FooterProps> = memo(({ darkMode, setDarkMode }) => {
  return (
    <footer className="bg-[#00214E] text-[#F5F2ED] border-t border-black w-full relative z-10 overflow-hidden">
      
      {/* Signature Diagonal-Cut Banner Shape */}
      <div 
        className="w-full bg-gradient-to-r from-[#1B4F8C] to-[#2E6DAE] h-10 md:h-14 relative"
        style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' }}
      >
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <Anchor className="w-8 h-8 text-white rotate-45" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20 max-w-7xl mx-auto">
      
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <img 
              src={logo} 
              alt="ZndZ Enterprise Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#2E6DAE]/30 flex-shrink-0 shadow-md"
            />
            <div className="font-serif italic text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F2ED] tracking-tight">ZndZ Enterprise</div>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-300 leading-relaxed max-w-sm">
            Precision procurement and technical shipping support for global maritime fleet operators. Engineered for reliability, built for the challenges of high seas navigation.
          </p>
          <div className="flex gap-3">
            <a href="https://linkedin.com/company/zndz-enterprise" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors flex items-center justify-center text-xs font-bold rounded">IN</a>
            <a href="#" className="w-9 h-9 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors flex items-center justify-center text-xs font-bold rounded">FB</a>
            <a href="#" className="w-9 h-9 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors flex items-center justify-center text-xs font-bold rounded">X</a>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex flex-col gap-3">
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#2E6DAE]">Supply Index</h4>
          <ul className="flex flex-col gap-1.5 text-[10px] sm:text-xs text-gray-300 font-mono">
            <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Deck Stores</a></li>
            <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Engine Parts</a></li>
            <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Safety Equipment</a></li>
            <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">ISSA Directory</a></li>
            <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">IMPA Directory</a></li>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#2E6DAE]">Primary Sourcing Nodes</h4>
          <ul className="flex flex-col gap-1.5 text-[10px] sm:text-xs text-gray-300 font-mono">
            <li className="py-0.5">Middle East Hub: Dubai / Abu Dhabi</li>
            <li className="py-0.5">Europe Corridor: Rotterdam / Antwerp</li>
            <li className="py-0.5">Americas Hub: Houston Terminal</li>
            <li className="py-0.5">Asia-Pacific: Singapore Node</li>
            <li className="py-0.5">Mumbai Headquarters: India</li>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#2E6DAE]">Contact Info</h4>
          <ul className="flex flex-col gap-1.5 text-[10px] sm:text-xs text-gray-300 font-mono">
            <li className="py-0.5">2A, 1404, SBUT 2, New Hind Mill Colony</li>
            <li className="py-0.5">Mumbai - 400033, Maharashtra, INDIA</li>
            <li className="py-0.5">+91 9619795252</li>
            <li className="py-0.5">saleszndzenterprise@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className="px-4 sm:px-6 md:px-12 py-6 border-t border-gray-800 text-center text-[10px] sm:text-xs text-gray-400 font-mono max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <span>© 2026 ZndZ Enterprise. All Rights Reserved.</span>
          <div className="flex items-center justify-center sm:justify-end gap-4 flex-wrap">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-[10px] sm:text-xs"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-300" />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
