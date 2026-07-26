import React, { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Anchor, Phone, Mail, ArrowRight, ShoppingBag, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { logo } from '../../data/constants';

interface NavbarProps {
  scrolled: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'Certifications', href: '#about' },
  { id: 'catalogue', label: 'Catalogue', href: '#catalogue' },
  { id: 'nodes', label: 'Coverage/Network', href: '#nodes' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = memo(({
  scrolled,
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  setCartOpen,
  cartCount
}) => {
  // Lock body scrolling & handle Escape key when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
      scrolled 
        ? 'bg-white/95 dark:bg-[#0A0F1A]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-[#00214E]/10 dark:border-white/10' 
        : 'bg-white dark:bg-[#0A0F1A] border-b border-[#00214E]/8 dark:border-white/8 shadow-none'
    }`}>
      {/* TOP INFORMATION BAR - Steel/Marine Blue Gradient */}
      <div 
        className="w-full bg-gradient-to-r from-[#1B4F8C] via-[#235D9F] to-[#2E6DAE] text-white text-[10px] sm:text-xs font-mono font-medium py-1.5 sm:py-2 px-3 sm:px-8 lg:px-12 relative z-50 border-b border-white/15 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-2 sm:gap-6">
          {/* Subtle watermark inside banner */}
          <div className="absolute right-12 top-[-10px] opacity-10 pointer-events-none hidden lg:block">
            <Anchor className="w-16 h-16 rotate-12 text-white" />
          </div>

          {/* Contact Details */}
          <div className="flex items-center gap-3 sm:gap-6 justify-between sm:justify-start w-full sm:w-auto">
            <a 
              href="tel:+919619795252" 
              className="group flex items-center gap-1.5 text-[#E8F1FA] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline shrink-0" 
              aria-label="Call +91 96197 95252"
            >
              <Phone className="w-3.5 h-3.5 text-[#93C5FD] group-hover:text-white transition-colors duration-200 shrink-0" />
              <span className="font-semibold tracking-tight text-[10px] sm:text-xs">+91 96197 95252</span>
            </a>

            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:inline-block" aria-hidden="true" />

            <a 
              href="mailto:saleszndzenterprise@gmail.com" 
              className="group flex items-center gap-1.5 text-[#E8F1FA] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline min-w-0" 
              aria-label="Email saleszndzenterprise@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-[#93C5FD] group-hover:text-white transition-colors duration-200 shrink-0" />
              <span className="font-semibold tracking-tight truncate max-w-[150px] xs:max-w-[190px] sm:max-w-none text-[10px] sm:text-xs">saleszndzenterprise@gmail.com</span>
            </a>
          </div>

          {/* Location & Certifications Badge - Shown on sm screens and up */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-5 uppercase tracking-wider font-extrabold text-[8.5px] sm:text-[10px] shrink-0">
            <span className="inline-flex items-center gap-1 text-[#E8F1FA] whitespace-nowrap">
              <MapPin className="w-3 h-3 text-[#93C5FD] shrink-0" />
              HQ: Mumbai, India
            </span>
            <span className="text-white/30" aria-hidden="true">|</span>
            <span className="inline-flex items-center gap-1 text-[#E8F1FA] whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-[#93C5FD] shrink-0" />
              IMPA / ISSA Standards
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR CONTAINER */}
      <div className="w-full">
        <nav 
          className={`max-w-[1400px] mx-auto w-full flex items-center justify-between px-3 sm:px-8 lg:px-12 transition-all duration-300 ease-in-out ${
            scrolled ? 'h-[62px] sm:h-[80px]' : 'h-[70px] sm:h-[88px]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo and Lockup Block */}
          <a 
            href="#hero" 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3.5 group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE] focus-visible:ring-offset-2 rounded-xl p-0.5 sm:p-1"
            aria-label="ZndZ Enterprise Home"
          >
            <img 
              src={logo} 
              alt="ZndZ Enterprise Logo - Ship Chandler & Marine Procurement India" 
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#1B4F8C]/20 group-hover:border-[#2E6DAE] transition-all duration-300 shadow-sm shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl md:text-[22px] font-sans font-black tracking-tight text-[#1B4F8C] dark:text-[#F5F2ED] leading-tight group-hover:text-[#2E6DAE] transition-colors duration-250 whitespace-nowrap">
                ZndZ Enterprise
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-extrabold text-[#2E6DAE] dark:text-[#60A5FA] mt-0.5 whitespace-nowrap leading-none">
                Industrial Marine Sourcing
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.15em] font-semibold h-full">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative py-2.5 px-1.5 min-h-[44px] flex items-center transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE] rounded-md ${
                    isActive
                      ? 'text-[#2E6DAE] dark:text-[#60A5FA] font-bold'
                      : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80 hover:text-[#2E6DAE] dark:hover:text-[#60A5FA]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span 
                    className={`absolute bottom-1 left-0 h-[2.5px] rounded-full bg-[#2E6DAE] dark:bg-[#60A5FA] transition-all duration-250 ease-out ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`} 
                  />
                </a>
              );
            })}
          </div>

          {/* Right Side Actions: CTA & Cart Utility Icon */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a 
              href="#contact"
              onClick={() => setActiveTab('contact')}
              className="hidden sm:inline-flex items-center justify-center gap-2.5 px-5 py-2.5 lg:px-6 lg:py-3 bg-[#1B4F8C] hover:bg-[#2E6DAE] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl shrink-0 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 ease-out group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE] focus-visible:ring-offset-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-250 ease-out group-hover:translate-x-1.5" />
            </a>

            {/* Cart Icon */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#1B4F8C]/20 hover:border-[#2E6DAE] bg-transparent hover:bg-[#1B4F8C]/5 dark:border-white/20 dark:hover:border-[#60A5FA] dark:hover:bg-white/5 transition-all duration-250 flex items-center justify-center group hover:scale-105 hover:-rotate-2 hover:shadow-[0_0_15px_rgba(46,109,174,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE]"
              title="Open Quote Request Basket"
              aria-label={`Open Quote Request Basket with ${cartCount} items`}
              id="rfq-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-[#1B4F8C] dark:text-[#F5F2ED] group-hover:text-[#2E6DAE] transition-colors duration-250" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E6DAE] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-full border-2 border-[#1B4F8C]/20 text-[#1B4F8C] dark:text-[#F5F2ED] dark:border-white/20 hover:border-[#2E6DAE] flex items-center justify-center transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE NAV OVERLAY DRAWER */}
      {mobileMenuOpen && createPortal(
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[100] bg-[#F5F2ED] dark:bg-[#0A0F1A] text-[#00214E] dark:text-[#F5F2ED] flex flex-col justify-between px-6 sm:px-10 pt-16 pb-8 animate-fade-in shadow-2xl overflow-y-auto"
        >
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full border border-[#00214E]/20 dark:border-white/20 hover:bg-[#00214E]/5 dark:hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DAE]"
            aria-label="Close mobile menu"
          >
            <X className="w-6 h-6 text-[#00214E] dark:text-[#F5F2ED]" />
          </button>

          <div className="flex flex-col gap-5 text-xl sm:text-2xl font-serif italic text-left mt-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.id}
                href={item.href} 
                onClick={() => { setMobileMenuOpen(false); setActiveTab(item.id); }} 
                className={`py-2.5 min-h-[48px] flex items-center transition-colors duration-200 border-b border-[#00214E]/10 dark:border-white/10 ${
                  activeTab === item.id ? 'text-[#2E6DAE] dark:text-[#60A5FA] font-bold not-italic' : 'hover:text-[#2E6DAE]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#00214E]/15 dark:border-white/15 flex flex-col gap-4">
            <a 
              href="#contact"
              onClick={() => { setMobileMenuOpen(false); setActiveTab('contact'); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1B4F8C] hover:bg-[#2E6DAE] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl shadow-md min-h-[48px]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex flex-col gap-1.5 text-xs text-[#00214E]/70 dark:text-[#F5F2ED]/70 font-mono">
              <span className="uppercase tracking-widest text-[10px] text-[#2E6DAE] font-bold">Mumbai Headquarters</span>
              <a href="mailto:saleszndzenterprise@gmail.com" className="font-semibold text-[#00214E] dark:text-[#F5F2ED] hover:underline break-all">saleszndzenterprise@gmail.com</a>
              <a href="tel:+919619795252" className="font-semibold text-[#00214E] dark:text-[#F5F2ED] hover:underline">+91 96197 95252</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';


