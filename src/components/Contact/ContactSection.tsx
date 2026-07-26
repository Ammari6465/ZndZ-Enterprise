import React, { memo, useState, FormEvent, useCallback } from 'react';
import { MapPin, Mail, Phone, Clock, Send, Check } from 'lucide-react';
import { CartItem, SubmittedRfq } from '../../types';
import { MotionCard } from '../UI/MotionCard';
import { ScrollAnimate } from '../UI/ScrollAnimate';

interface ContactSectionProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  setSectionRef: (id: string) => (node: HTMLElement | null) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = memo(({
  cart,
  setCart,
  setSectionRef
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vesselName, setVesselName] = useState('');
  const [deliveryPort, setDeliveryPort] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedRfq, setSubmittedRfq] = useState<SubmittedRfq | null>(null);

  const handlePopulateFormWithCart = useCallback(() => {
    if (cart.length === 0) return;
    const cartSummary = cart.map(i => 
      `• ${i.product.name} (Qty: ${i.quantity}, IMPA: ${i.product.impaCode}${i.customNotes ? `, Specs: ${i.customNotes}` : ''})`
    ).join('\n');

    setAdditionalDetails(prev => {
      const header = '=== REQUISITION CART ITEMS ===\n';
      if (prev.includes(header)) return prev;
      return prev ? `${prev}\n\n${header}${cartSummary}` : `${header}${cartSummary}`;
    });
  }, [cart]);

  const handleSubmitRfq = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const rfqId = `RFQ-ZNDZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmitted: SubmittedRfq = {
      rfqId,
      clientName: fullName,
      clientEmail: email,
      vesselName: vesselName || 'Not Specified',
      destinationPort: deliveryPort || 'Direct OPL / Unspecified',
      details: additionalDetails,
      items: [...cart],
      estimatedTotal: cart.reduce((acc, item) => acc + (item.product.priceEstimate * item.quantity), 0),
      submissionDate: new Date().toLocaleString()
    };

    setSubmittedRfq(newSubmitted);
    setFormSubmitted(true);
  };

  const handleNewRfq = () => {
    setFormSubmitted(false);
    setSubmittedRfq(null);
    setFullName('');
    setEmail('');
    setVesselName('');
    setDeliveryPort('');
    setAdditionalDetails('');
    setCart([]);
  };

  return (
    <section 
      id="contact" 
      ref={setSectionRef('contact')}
      className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollAnimate direction="right">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#2E6DAE] block mb-2 sm:mb-3">
                Connect With Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-[#00214E] mb-4 sm:mb-6">
                Mobilize Supply Chain.
              </h2>
              <p className="text-xs sm:text-sm text-[#00214E]/80 leading-relaxed mb-6 sm:mb-8 max-w-md">
                Initiate a requisition ticket immediately. Provide vessel dimensions, berthing ETA, port requirements, and product index numbers to receive custom quotes within 4 hours.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-60 mb-1">Headquarters</h3>
                    <div className="w-full h-32 sm:h-40 bg-white/50 border border-[#00214E]/10 overflow-hidden relative shadow-inner rounded-lg mb-2">
                      <iframe
                        src="https://maps.google.com/maps?q=2A,%201404,%20SBUT%202,%20New%20Hind%20Mill%20Colony,%20Mumbai%20-%20400033,%20Maharashtra,%20INDIA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0 filter grayscale contrast-110 brightness-95"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        title="ZndZ Enterprise Headquarters Location Map"
                      ></iframe>
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-[#00214E]">2A, 1404, SBUT 2, New Hind Mill Colony, Mumbai - 400033, Maharashtra, INDIA</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 rounded-lg shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-60">Operations Supply Desk</h3>
                    <a href="mailto:saleszndzenterprise@gmail.com" id="contact-email-link" className="text-xs sm:text-sm font-semibold text-[#2E6DAE] hover:underline block mt-0.5">saleszndzenterprise@gmail.com</a>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 rounded-lg shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-60">24/7 Operations Helpline</h3>
                    <a href="tel:+919619795252" id="contact-phone-link" className="text-xs sm:text-sm font-semibold text-[#2E6DAE] hover:underline block mt-0.5">+91 9619795252</a>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center shrink-0 rounded-lg shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-60">Business Hours</h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#00214E] mt-0.5">24/7 Operations - All Time Zones</p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <ScrollAnimate direction="left">
              <MotionCard tiltDegree={1.5} className="bg-white p-6 sm:p-8 md:p-10 border border-[#00214E]/15 shadow-xl relative rounded-2xl">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmitRfq} className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1 pb-3 border-b border-[#00214E]/10">
                      <h3 className="text-lg sm:text-xl font-serif italic text-[#00214E]">Requisition &amp; Quote Request</h3>
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#00214E]/60">Submit details to create a formal supply inquiry file.</p>
                    </div>

                    {cart.length > 0 && (
                      <div className="p-3 sm:p-4 bg-[#2E6DAE]/10 border border-[#2E6DAE]/30 rounded-xl text-xs text-[#00214E]">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-bold text-[#2E6DAE] uppercase font-mono">RFQ CART INTEGRATION ACTIVE</span>
                          <span className="font-mono text-[11px] font-bold">{cart.length} items selected</span>
                        </div>
                        <p className="text-[11px] text-[#00214E]/80 mb-3">You have configured custom items in your RFQ cart. Click below to embed item codes into inquiry details.</p>
                        <button
                          type="button"
                          onClick={handlePopulateFormWithCart}
                          className="px-3 py-1.5 bg-[#00214E] hover:bg-[#2E6DAE] text-white text-[10px] uppercase font-mono font-bold transition-colors rounded min-h-[36px]"
                        >
                          Populate Form Details
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="officer-name" className="text-[9px] uppercase tracking-widest font-bold text-[#00214E]">Officer Name <span className="text-[#2E6DAE]">*</span></label>
                        <input 
                          id="officer-name"
                          type="text" 
                          required
                          aria-required="true"
                          autoComplete="name"
                          placeholder="John Doe (Procurement Head)"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-transparent border border-[#00214E]/15 p-3 text-xs focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 min-h-[44px] rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="official-email" className="text-[9px] uppercase tracking-widest font-bold text-[#00214E]">Official Email <span className="text-[#2E6DAE]">*</span></label>
                        <input 
                          id="official-email"
                          type="email" 
                          required
                          aria-required="true"
                          autoComplete="email"
                          placeholder="j.doe@shipping-co.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent border border-[#00214E]/15 p-3 text-xs focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 min-h-[44px] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="vessel-name" className="text-[9px] uppercase tracking-widest font-bold text-[#00214E]">Vessel Name / IMO Number</label>
                        <input 
                          id="vessel-name"
                          type="text" 
                          placeholder="e.g. Ever Given / IMO 9817731"
                          value={vesselName}
                          onChange={(e) => setVesselName(e.target.value)}
                          className="bg-transparent border border-[#00214E]/15 p-3 text-xs focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 min-h-[44px] rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="delivery-port" className="text-[9px] uppercase tracking-widest font-bold text-[#00214E]">Target Port of Supply Delivery</label>
                        <input 
                          id="delivery-port"
                          type="text" 
                          placeholder="e.g. Port of Rotterdam / Terminal 3"
                          value={deliveryPort}
                          onChange={(e) => setDeliveryPort(e.target.value)}
                          className="bg-transparent border border-[#00214E]/15 p-3 text-xs focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 min-h-[44px] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="requisition-details" className="text-[9px] uppercase tracking-widest font-bold text-[#00214E]">Inquiry Requisition Specifics</label>
                      <textarea 
                        id="requisition-details"
                        rows={4}
                        placeholder="Specify material specifications, quantity requirements, dimensions, target berthing dates, or required certificates (SOLAS, IACS, ISO)..."
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        className="bg-transparent border border-[#00214E]/15 p-3 text-xs focus:outline-none focus:border-[#2E6DAE] focus:ring-2 focus:ring-[#2E6DAE]/20 rounded-lg"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#00214E] hover:bg-[#2E6DAE] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 min-h-[48px] rounded-lg hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Requisition</span>
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col gap-6 animate-fade-in text-left">
                    <div className="w-14 h-14 bg-[#2E6DAE]/10 border border-[#2E6DAE]/20 text-[#2E6DAE] rounded-full flex items-center justify-center self-start">
                      <Check className="w-7 h-7" />
                    </div>

                    <div className="border-b border-[#00214E]/10 pb-4">
                      <h3 className="text-xl sm:text-2xl font-serif italic text-[#00214E]">RFQ Requisition Submitted</h3>
                      <p className="text-xs text-[#00214E]/60 mt-1">Formal ticket created. Current operations response: ACTIVE / 4h window.</p>
                    </div>

                    <div className="bg-[#F5F2ED] p-5 border border-[#00214E]/10 text-xs font-mono space-y-3 rounded-xl">
                      <div className="flex justify-between border-b border-gray-300 pb-2 text-[#2E6DAE]">
                        <span className="font-bold">SYSTEM TICKET ID</span>
                        <span className="font-extrabold">{submittedRfq?.rfqId}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="opacity-60">REQUISITION OFFICER</span>
                        <span className="font-bold">{submittedRfq?.clientName}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="opacity-60">VESSEL / IMO</span>
                        <span className="font-bold">{submittedRfq?.vesselName}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span className="opacity-60">TARGET HUB</span>
                        <span className="font-bold">{submittedRfq?.destinationPort}</span>
                      </div>
                      {submittedRfq && submittedRfq.items.length > 0 && (
                        <div className="border-b border-gray-300 pb-2">
                          <span className="opacity-60 block mb-1">REGISTERED CART ITEMS:</span>
                          <ul className="list-disc pl-4 space-y-1 text-[#00214E]/80">
                            {submittedRfq.items.map((item) => (
                              <li key={item.product.id}>
                                {item.product.name} (Qty: {item.quantity}) - IMPA {item.product.impaCode}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <span className="opacity-60 block mb-1">COMMUNICATION DETAILS:</span>
                        <p className="text-[#00214E]/80 italic font-serif text-xs bg-white p-3 border border-gray-300 rounded">{submittedRfq?.details || 'No additional text specified'}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 bg-white border border-[#00214E] text-[#00214E] hover:bg-gray-100 py-3 text-xs uppercase tracking-wider font-bold transition-all min-h-[44px] rounded-lg"
                      >
                        Print Manifest
                      </button>
                      <button 
                        onClick={handleNewRfq}
                        className="flex-1 bg-[#00214E] text-white hover:bg-[#2E6DAE] py-3 text-xs uppercase tracking-wider font-bold transition-all min-h-[44px] rounded-lg"
                      >
                        Create New RFQ
                      </button>
                    </div>
                  </div>
                )}
              </MotionCard>
            </ScrollAnimate>
          </div>

        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
