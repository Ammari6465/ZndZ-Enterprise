import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Product, CartItem } from './types';
import { Navbar } from './components/Header/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { TrustBar } from './components/Trust/TrustBar';
import { AboutSection } from './components/About/AboutSection';
import { IndustriesSection } from './components/Industries/IndustriesSection';
import { CatalogueSection } from './components/Catalogue/CatalogueSection';
import { LogisticsNodesSection } from './components/Nodes/LogisticsNodesSection';
import { ProcessTimelineSection } from './components/Timeline/ProcessTimelineSection';
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection';
import { InsightsSection } from './components/Insights/InsightsSection';
import { FaqSection } from './components/Faq/FaqSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { ParticleBackground } from './components/UI/ParticleBackground';
import { MagneticCursor } from './components/UI/MagneticCursor';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const setSectionRef = useCallback((id: string) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Navbar scroll background & Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 250;
      const sections = ['hero', 'about', 'catalogue', 'nodes', 'contact'];

      for (const sectionId of sections) {
        const el = sectionRefs.current[sectionId];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId === 'hero' ? 'home' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Handlers
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: newQty } : item
    ));
  }, [removeFromCart]);

  const updateItemNotes = useCallback((productId: string, notes: string) => {
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, customNotes: notes } : item
    ));
  }, []);

  const totalCartValue = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.priceEstimate * item.quantity), 0);
  }, [cart]);

  const handlePopulateFormWithCart = useCallback(() => {
    const contactEl = sectionRefs.current['contact'];
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreClick = useCallback(() => {
    const catEl = sectionRefs.current['catalogue'];
    if (catEl) {
      catEl.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('catalogue');
    }
  }, []);

  const handleRequestQuoteClick = useCallback(() => {
    const contactEl = sectionRefs.current['contact'];
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('contact');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2ED] dark:bg-[#0A0F1A] text-[#00214E] dark:text-[#F5F2ED] font-sans antialiased selection:bg-[#2E6DAE] selection:text-white transition-colors duration-300 overflow-x-hidden relative">
      
      {/* WCAG 2.2 AA Skip to Main Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#00214E] focus:text-white focus:ring-2 focus:ring-[#2E6DAE] focus:ring-offset-2 focus:rounded-xl font-mono text-xs font-bold shadow-2xl transition-all"
      >
        Skip to main content
      </a>

      {/* Screen Reader Live Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {cart.length > 0 ? `Requisition basket contains ${cart.length} item${cart.length === 1 ? '' : 's'}` : 'Requisition basket is empty'}
      </div>

      {/* Subtle Ocean Atmospheric Background Particles */}
      <ParticleBackground />

      {/* Interactive Magnetic Pointer */}
      <MagneticCursor />

      {/* Navbar */}
      <Navbar
        scrolled={scrolled}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCartOpen={setCartOpen}
        cartCount={cart.length}
      />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        <HeroSection 
          onExploreClick={handleExploreClick}
          onRequestQuoteClick={handleRequestQuoteClick}
          setSectionRef={setSectionRef}
        />

        <TrustBar />

        <AboutSection setSectionRef={setSectionRef} />

        <IndustriesSection setSectionRef={setSectionRef} />

        <CatalogueSection 
          cart={cart}
          addToCart={addToCart}
          setSectionRef={setSectionRef}
        />

        <LogisticsNodesSection setSectionRef={setSectionRef} />

        <ProcessTimelineSection setSectionRef={setSectionRef} />

        <TestimonialsSection setSectionRef={setSectionRef} />

        <InsightsSection setSectionRef={setSectionRef} />

        <FaqSection setSectionRef={setSectionRef} />

        <ContactSection 
          cart={cart}
          setCart={setCart}
          setSectionRef={setSectionRef}
        />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Requisition Basket Drawer */}
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        updateItemNotes={updateItemNotes}
        handlePopulateFormWithCart={handlePopulateFormWithCart}
        totalCartValue={totalCartValue}
      />
    </div>
  );
}

export default App;