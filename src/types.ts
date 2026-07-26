export interface Product {
  id: string;
  name: string;
  impaCode: string;
  category: 'Deck & Rigging' | 'Personal Protective Equipment (PPE)' | 'Fire & Safety Equipment' | 'Navigation & Bridge Equipment' | 'Engine Room & Maintenance Tools' | 'Electrical Supplies' | 'Cabin & Housekeeping Stores' | 'Sealants, Adhesives & Welding Supplies';
  description: string;
  specs: Record<string, string>;
  priceEstimate: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

export interface SourcingNode {
  name: string;
  code: string;
  status: 'OPTIMAL' | 'HIGH CAPACITY' | 'EXPEDITED';
  leadTime: string;
  lat: string;
  lon: string;
  activeVessels: number;
  availableItems: number;
  congestion: string;
  timezone: string;
}

export interface Certification {
  name: string;
  iconName: string;
  description: string;
}

export interface Industry {
  name: string;
  iconName: string;
  count: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface SubmittedRfq {
  rfqId: string;
  clientName: string;
  clientEmail: string;
  vesselName: string;
  destinationPort: string;
  details: string;
  items: CartItem[];
  estimatedTotal: number;
  submissionDate: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
}

export interface CaseStudy {
  id: string;
  categoryTag: string;
  locationTag: string;
  title: string;
  description: string;
  vesselClass: string;
  requisitionType: string;
  turnaroundTime: string;
  impaReference: string;
}
