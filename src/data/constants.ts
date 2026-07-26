import { 
  Ship, 
  Factory, 
  ShieldCheck, 
  Heart, 
  Anchor, 
  Building, 
  Award, 
  CheckCircle 
} from 'lucide-react';
import { 
  Testimonial, 
  SourcingNode, 
  FaqItem, 
  ClientLogo, 
  CaseStudy, 
  Article 
} from '../types';

export const logo = '/Logo_ZndZEnterprise.png';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Captain Rajesh Kumar',
    position: 'Fleet Manager',
    company: 'MSC Shipping',
    content: 'ZndZ Enterprise has been our trusted partner for over 3 years. Their 24/7 support and precise IMPA catalogued supplies have never let us down during critical vessel operations.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Sarah Chen',
    position: 'Procurement Director',
    company: 'Maersk Line',
    content: 'The quality assurance and technical specifications matching is exceptional. Every item arrives with proper certification and documentation.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Ahmed Al-Mansoori',
    position: 'Operations Head',
    company: 'DP World',
    content: 'Their global logistics network ensures our vessels get supplies on time, every time. The Dubai hub is particularly efficient for our regional operations.',
    rating: 4
  }
];

export const PORT_NODES: SourcingNode[] = [
  {
    name: 'Mumbai HQ',
    code: 'BOM-NODE',
    lat: '18.9220° N',
    lon: '72.8347° E',
    leadTime: '12 Hours',
    activeVessels: 48,
    availableItems: 1250,
    congestion: 'Low',
    status: 'OPTIMAL',
    timezone: 'IST (UTC+5.5)'
  },
  {
    name: 'Singapore Hub',
    code: 'SIN-NODE',
    lat: '1.3521° N',
    lon: '103.8198° E',
    leadTime: '8 Hours',
    activeVessels: 112,
    availableItems: 1800,
    congestion: 'Medium',
    status: 'OPTIMAL',
    timezone: 'SGT (UTC+8)'
  },
  {
    name: 'Rotterdam Port',
    code: 'RTM-NODE',
    lat: '51.9244° N',
    lon: '4.4777° E',
    leadTime: '18 Hours',
    activeVessels: 85,
    availableItems: 1400,
    congestion: 'Low',
    status: 'EXPEDITED',
    timezone: 'CET (UTC+1)'
  },
  {
    name: 'Houston Terminal',
    code: 'HOU-NODE',
    lat: '29.7604° N',
    lon: '-95.3698° E',
    leadTime: '16 Hours',
    activeVessels: 52,
    availableItems: 980,
    congestion: 'Medium',
    status: 'HIGH CAPACITY',
    timezone: 'CST (UTC-6)'
  },
  {
    name: 'Dubai Jebel Ali',
    code: 'DXB-NODE',
    lat: '25.2048° N',
    lon: '55.2708° E',
    leadTime: '10 Hours',
    activeVessels: 64,
    availableItems: 1100,
    congestion: 'Low',
    status: 'OPTIMAL',
    timezone: 'GST (UTC+4)'
  }
];

export const INDUSTRIES = [
  { name: 'Shipping & Logistics', icon: Ship, count: '50+' },
  { name: 'Oil & Gas', icon: Factory, count: '30+' },
  { name: 'Navy & Defense', icon: ShieldCheck, count: '15+' },
  { name: 'Cruise & Ferries', icon: Heart, count: '25+' },
  { name: 'Fishing & Aquaculture', icon: Anchor, count: '40+' },
  { name: 'Offshore Platforms', icon: Building, count: '20+' }
];

export const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', icon: Award, description: 'Quality Management System' },
  { name: 'ISO 14001:2015', icon: Award, description: 'Environmental Management' },
  { name: 'OHSAS 18001', icon: ShieldCheck, description: 'Occupational Health & Safety' },
  { name: 'IMPA Certified', icon: CheckCircle, description: 'International Marine Purchasing' },
  { name: 'ISSA Member', icon: CheckCircle, description: 'International Ship Suppliers Association' }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What are your standard delivery lead times at major international ports?',
    answer: 'For standard deck and engine provisions at our primary hubs (Mumbai, Singapore, Rotterdam, Dubai, Houston), lead times range between 12 and 24 hours from RFQ confirmation. Emergency ship chandling requests and critical machine parts can be mobilized in under 6 hours depending on anchoring or terminal berthing coordinates.'
  },
  {
    question: 'Do you enforce a Minimum Order Quantity (MOQ) or minimum invoice value?',
    answer: 'ZndZ Enterprise does not enforce rigid minimum order quantities. However, to offset fixed port custom clearings and terminal dispatch overheads, we recommend a minimum B2B requisition value of $500 USD per vessel call. Custom arrangements can be negotiated for fleets under management contracts.'
  },
  {
    question: 'What payment and credit terms do you extend to maritime fleet operators?',
    answer: 'We provide highly flexible credit facilities. Vetted shipping lines, ship management companies, and operators can obtain standard Net 30, Net 45, or Net 60 revolving credit accounts following short financial reviews. Direct transactions support telegraphic transfer (T/T), Cash Against Documents (CAD), or formal Letters of Credit (L/C).'
  },
  {
    question: 'Are all supplied stores and equipment fully IMPA/ISSA certified and Class approved?',
    answer: 'Yes, 100% of our inventory corresponds strictly to IMPA and ISSA directory specifications. We furnish official Class society approvals (such as Lloyd’s Register, DNV, ClassNK, ABS, Bureau Veritas) alongside standard manufacturer conformity declarations, SOLAS certifications, and safety data sheets (MSDS).'
  },
  {
    question: 'Which specific ports and offshore anchoring zones does your logistics network cover?',
    answer: 'While headquartered in Mumbai, our logistics network provides direct coverage to over 20 global ports. This includes full berthing and Outer Port Limit (OPL) supply operations in Mumbai (JNPT), Singapore, Rotterdam, Dubai (Jebel Ali), Fujairah, Antwerp, and Houston. We coordinate directly with local port agents for boarding clearances.'
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'MSC', logo: 'MSC' },
  { name: 'Maersk', logo: 'MAERSK' },
  { name: 'DP World', logo: 'DPW' },
  { name: 'CMA CGM', logo: 'CMA CGM' },
  { name: 'Hapag Lloyd', logo: 'HL' },
  { name: 'Cosco', logo: 'COSCO' }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    categoryTag: 'EMERGENCY TECHNICAL SUPPLY',
    locationTag: 'PORT OF SINGAPORE (OPL)',
    title: 'Emergency Engine Valve and Gasket Mobilization',
    description: 'A 14,000 TEU cellular container vessel suffered auxiliary cooling pipe leakage 12 miles outside Singapore. A complete set of custom ClassNK-vetted high-pressure gaskets and relief valves was sourced, verified, and delivered to the vessel deck via supply boat within 5.5 hours, preventing off-hire charterer claims.',
    vesselClass: 'Post-Panamax',
    requisitionType: 'Engine Stores',
    turnaroundTime: '5.5 Hours',
    impaReference: 'IMPA Code Reference Series: 27-33'
  },
  {
    id: 'case-2',
    categoryTag: 'COMPLETE DECK PROVISIONING',
    locationTag: 'JNPT PORT, MUMBAI',
    title: 'VLCC Supertanker Full Deck Rigging Provisions',
    description: 'During a 16-hour harbor turnaround, a 300,000 DWT crude oil tanker required comprehensive replacement of certified mooring steel wires, safety nets, lashing turnbuckles, and Solas line throwers. ZndZ consolidated 12 tons of IMPA/ISSA code compliant gear and executed deck crane transfer under extreme harbor wind conditions.',
    vesselClass: 'VLCC Tanker',
    requisitionType: 'Deck & Safety',
    turnaroundTime: '14 Hours',
    impaReference: 'IACS Quality Audit Certifications Included'
  }
];

export const INSIGHTS_ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'PORT LOGISTICS & COMPLIANCE',
    title: 'Optimizing Vessel Turnaround: Emergency Sourcing Strategies',
    excerpt: 'How proactive alignment with accredited ship chandlers simplifies outer port limits (OPL) transfers, reduces terminal dwell time, and avoids structural harbor demurrage.',
    author: 'Capt. R. Mehta',
    readTime: '5 Min Read'
  },
  {
    id: 'art-2',
    category: 'PROCUREMENT SYSTEMS',
    title: 'Demystifying IMPA & ISSA Coding in Modern Marine Supply',
    excerpt: 'A technical checklist for procurement desks to avoid part specification mismatches and streamline fleet-wide catalog ordering using standardized digital indexes.',
    author: 'J. Sanyal, Supt.',
    readTime: '7 Min Read'
  },
  {
    id: 'art-3',
    category: 'IMO REGULATIONS',
    title: 'Green Port Sourcing: Navigating Fleet Decarbonization',
    excerpt: 'Evaluating regional carbon offsets, local provisioning efficiencies, and optimized sourcing node allocations to satisfy strict new IMO CII fleet emissions guidelines.',
    author: 'S. Venkatesh',
    readTime: '6 Min Read'
  }
];
