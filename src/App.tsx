import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Anchor, 
  Compass, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  Download, 
  Search, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  ArrowRight, 
  Clock, 
  ArrowUpRight, 
  Globe, 
  Activity, 
  X,
  Menu,
  ChevronDown,
  Sun,
  Moon,
  Award,
  Users,
  Package,
  Calendar,
  Target,
  Heart,
  MessageSquare,
  ExternalLink,
  FileDown,
  Star,
  Ship,
  Factory,
  Briefcase,
  HelpCircle,
  Quote,
  Zap,
  BarChart3,
  ThumbsUp,
  Building,
  File,
  MessageCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const logo = '/Logo_ZndZEnterprise.png';

// Testimonials Type
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

// Testimonials Data
const TESTIMONIALS: Testimonial[] = [
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

// Define Product Type
interface Product {
  id: string;
  name: string;
  impaCode: string;
  category: 'Deck & Rigging' | 'Personal Protective Equipment (PPE)' | 'Fire & Safety Equipment' | 'Navigation & Bridge Equipment' | 'Engine Room & Maintenance Tools' | 'Electrical Supplies' | 'Cabin & Housekeeping Stores' | 'Sealants, Adhesives & Welding Supplies';
  description: string;
  specs: {
    [key: string]: string;
  };
  priceEstimate: number;
  imageUrl: string;
}

// Define Cart Item Type
interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

// Define Sourcing Node Type
interface SourcingNode {
  name: string;
  code: string;
  lat: string;
  lon: string;
  leadTime: string;
  activeVessels: number;
  availableItems: number;
  congestion: 'Low' | 'Medium' | 'High';
  status: 'ACTIVE' | 'HIGH CAPACITY' | 'OPTIMAL';
  timezone: string;
}

// Global Port Nodes
const PORT_NODES: SourcingNode[] = [
  {
    name: 'Mumbai HQ',
    code: 'BOM-NODE',
    lat: '18.9220° N',
    lon: '72.8347° E',
    leadTime: '12 Hours',
    activeVessels: 48,
    availableItems: 1250,
    congestion: 'Low',
    status: 'ACTIVE',
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
    status: 'ACTIVE',
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

// Product Inventory
const PRODUCT_INVENTORY: Product[] = [
  // Deck & Rigging
  {
    id: 'prod-1',
    name: 'PP Rope Cargo Net Sling',
    impaCode: '232152',
    category: 'Deck & Rigging',
    description: 'High-strength polypropylene rope cargo net slings, 3x3 meters size. Designed for robust lifting operations and cargo securing on vessel deck.',
    specs: {
      'Size': '3x3 meters',
      'Material': 'High-tensile PP Rope',
      'Max SWL': '3.2 Tons',
      'Application': 'Cargo Sling & Handling'
    },
    priceEstimate: 185,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-2',
    name: 'Cable Grips Heavy Duty',
    impaCode: '214506',
    category: 'Deck & Rigging',
    description: 'Double weave wire mesh cable grips for securing, pulling, and support of marine cables, rigging, and wire ropes.',
    specs: {
      'Diameter Range': '25 - 38 mm',
      'Material': 'Galvanized Steel Wire',
      'Weave': 'Double Weave Mesh',
      'Breaking Load': '45 kN'
    },
    priceEstimate: 38,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-3',
    name: 'Bow Shackle Marine Grade',
    impaCode: '231401',
    category: 'Deck & Rigging',
    description: 'Bow-shaped shackles with screw pin, conforming to rigorous IMPA and marine towing standard specifications.',
    specs: {
      'Working Load Limit': '4.75 Tons',
      'Material': 'Forged Alloy Steel',
      'Finish': 'Hot Dipped Galvanized',
      'Pin Diameter': '22 mm'
    },
    priceEstimate: 29,
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-4',
    name: 'Wooden Pilot Ladder (SOLAS Compliant)',
    impaCode: '232032',
    category: 'Deck & Rigging',
    description: 'Marine embarkation/pilot ladder with hardwood steps, rubber bottom steps, and heavy manila ropes. Fully certified to SOLAS and ISO 799 standards.',
    specs: {
      'Step Material': 'Hardwood & Non-slip Rubber',
      'Rope Material': '4-strand Manila Rope',
      'Certification': 'SOLAS / EC-MED Approved',
      'Length Options': '3 meters to 30 meters'
    },
    priceEstimate: 420,
    imageUrl: 'https://images.unsplash.com/photo-1598156105829-84724ea988a2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-21',
    name: 'Lashing Snatch Block',
    impaCode: '231751',
    category: 'Deck & Rigging',
    description: 'Heavy duty single sheave marine lashing snatch block with hook and safety clasp, designed for deck rigging and cargo operations.',
    specs: {
      'Sheave Diameter': '150 mm',
      'Max SWL': '5.0 Tons',
      'Material': 'Cast Steel & Bronze Bushings',
      'Wire Rope Size': '12 - 16 mm'
    },
    priceEstimate: 145,
    imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600'
  },

  // Personal Protective Equipment (PPE)
  {
    id: 'prod-10',
    name: 'Leather Palm Working Gloves',
    impaCode: '190111',
    category: 'Personal Protective Equipment (PPE)',
    description: 'Heavy duty cowhide leather palm working gloves with reinforced canvas cuffs, designed for rigging and hard machinery operations.',
    specs: {
      'Material': 'Split Cowhide Leather',
      'Cuff': 'Canvas Safety Cuff',
      'Reinforcement': 'Double Stitched Palm',
      'Classification': 'EN388 Compliant'
    },
    priceEstimate: 12,
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-11',
    name: 'Yellow Rain Suit with Hood',
    impaCode: '190437',
    category: 'Personal Protective Equipment (PPE)',
    description: '100% waterproof heavy-weight PVC coated polyester rain suit with hood, snap-fastening front and storm-flap seal.',
    specs: {
      'Material': 'PVC on Polyester',
      'Thickness': '0.35 mm',
      'Seams': 'Welded Waterproof',
      'Color': 'High-Visibility Yellow'
    },
    priceEstimate: 45,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-12',
    name: 'Steel-Toe Rubber Safety Boots',
    impaCode: '190231',
    category: 'Personal Protective Equipment (PPE)',
    description: 'High calf safety rubber boots fitted with anti-rust steel toe caps and steel midsoles for maximum crush resistance on wet deck.',
    specs: {
      'Safety Cap': 'Steel Toe Cap 200J',
      'Midsole': 'Steel Anti-penetration',
      'Height': 'Full Calf Height',
      'Sole': 'Oil and Slip Resistant'
    },
    priceEstimate: 62,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-22',
    name: 'Boilersuits Blue 100% Cotton',
    impaCode: '190546',
    category: 'Personal Protective Equipment (PPE)',
    description: 'High-comfort 100% pre-shrunk cotton boilersuits with reflection stripes, action back, and utility tool pockets designed for deck and engine crews.',
    specs: {
      'Weight': '300 gsm heavy-duty',
      'Material': '100% Pre-shrunk Cotton',
      'Retroreflective': '3M reflective tapes',
      'Closure': 'Two-way heavy duty brass zipper'
    },
    priceEstimate: 38,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600'
  },

  // Fire & Safety Equipment
  {
    id: 'prod-8',
    name: 'Life Jacket Light',
    impaCode: '3301',
    category: 'Fire & Safety Equipment',
    description: 'Bright water-activated LED life jacket safety light with durable attachment clip. Essential personal safety equipment.',
    specs: {
      'Light Type': 'Water-activated LED',
      'Battery Life': 'Minimum 8 hours',
      'Luminous Intensity': '> 0.75 cd',
      'Approval': 'SOLAS / LSA / MED'
    },
    priceEstimate: 28,
    imageUrl: 'https://images.unsplash.com/photo-1517420784867-114f6e4d397c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-9',
    name: 'Heavy-Duty Marine Fire Hose',
    impaCode: '330705',
    category: 'Fire & Safety Equipment',
    description: 'Robust circular woven synthetic fiber hose with durable synthetic rubber inner lining and brass couplings for vessel deck operations.',
    specs: {
      'Diameter': '50 mm',
      'Length': '20 meters',
      'Working Pressure': '1.5 MPa',
      'Bursting Pressure': '4.5 MPa'
    },
    priceEstimate: 240,
    imageUrl: 'https://images.unsplash.com/photo-1563201375-d4fc5ebe6122?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-23',
    name: 'SOLAS Polyurethane Lifebuoy Ring',
    impaCode: '330151',
    category: 'Fire & Safety Equipment',
    description: 'Cross-linked high-density orange polyethylene lifebuoy shell, filled with polyurethane foam. Conforms strictly to SOLAS / LSA standards.',
    specs: {
      'Outer Diameter': '720 mm',
      'Inner Diameter': '440 mm',
      'Weight': '2.5 kg',
      'Reflective Tape': '4 retrograde strips'
    },
    priceEstimate: 75,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-24',
    name: 'IMO Symbols',
    impaCode: '336849',
    category: 'Fire & Safety Equipment',
    description: 'High-luminance photoluminescent rigid PVC escape route and fire equipment markers conforming to IMO resolutions and ISO standards.',
    specs: {
      'Material': 'Self-extinguishing Rigid PVC',
      'Luminance': 'Class C high glow rating',
      'Thickness': '1.2 mm',
      'Backing': 'Heavy industrial self-adhesive'
    },
    priceEstimate: 8,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },

  // Navigation & Bridge Equipment
  {
    id: 'prod-25',
    name: 'Binoculars 7x50',
    impaCode: '370344',
    category: 'Navigation & Bridge Equipment',
    description: 'Highly professional marine binoculars with built-in compass and rangefinder reticle. High light transmission multi-coated optics for dawn/dusk navigation.',
    specs: {
      'Magnification': '7x',
      'Objective Lens': '50 mm diameter',
      'Field of View': '132m / 1000m',
      'Waterproofing': 'Nitrogen purged, waterproof/fogproof'
    },
    priceEstimate: 290,
    imageUrl: 'https://images.unsplash.com/photo-1590132801459-29c8e87f87f2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-26',
    name: 'Marine Clock',
    impaCode: '370204',
    category: 'Navigation & Bridge Equipment',
    description: 'Luxury polished heavy marine brass clock with quartz movement and rubber gasket for moisture exclusion in marine bridge environments.',
    specs: {
      'Base Diameter': '180 mm',
      'Case Material': 'Polished Cast Brass',
      'Dial Color': 'Classic Ivory White',
      'Accuracy': 'Quartz +/- 10s per month'
    },
    priceEstimate: 165,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-27',
    name: 'Nautical Sextant',
    impaCode: '370331',
    category: 'Navigation & Bridge Equipment',
    description: 'Standard brass scale split-view marine navigation sextant, supplied in premium varnished wooden box for traditional astronavigation backups.',
    specs: {
      'Frame Material': 'Cast Corrosion-Resistant Brass',
      'Measuring Range': '-5 to 125 degrees',
      'Telescope': '4 x 40 magnification',
      'Sighting Light': 'LED battery-powered arc illumination'
    },
    priceEstimate: 680,
    imageUrl: 'https://images.unsplash.com/photo-1601309590055-6677f5207923?auto=format&fit=crop&q=80&w=600'
  },

  // Engine Room & Maintenance Tools
  {
    id: 'prod-5',
    name: 'Sump Pump 440V',
    impaCode: '591621',
    category: 'Engine Room & Maintenance Tools',
    description: 'Vertical multi-stage centrifugal pump for high-capacity bilge water removal, ballast operations, and general seawater circulation.',
    specs: {
      'Flow Rate': '120 m³/h',
      'Operating Pressure': '0.6 MPa',
      'Motor Rating': '30 kW',
      'Power Source': '440V / 60Hz'
    },
    priceEstimate: 4820,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-16',
    name: 'Pneumatic Angle Grinder',
    impaCode: '590301',
    category: 'Engine Room & Maintenance Tools',
    description: 'High-power air-operated angle grinder designed for intensive surface descaling, rust removal, and steel welding preparation.',
    specs: {
      'Wheel Diameter': '180 mm (7")',
      'Free Speed': '7600 rpm',
      'Air Consumption': '1.2 m³/min',
      'Inlet Size': '3/8" NPT'
    },
    priceEstimate: 410,
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-28',
    name: 'Torque Wrench',
    impaCode: '611426',
    category: 'Engine Room & Maintenance Tools',
    description: 'Click-type industrial precision torque wrench with quick release drive head, for critical diesel cylinder and pipeline bolting.',
    specs: {
      'Drive Size': '3/4" Square Drive',
      'Torque Range': '150 - 750 Nm',
      'Material': 'Hardened Chrome-Vanadium Steel',
      'Accuracy': 'Clockwise calibration +/- 3%'
    },
    priceEstimate: 285,
    imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-29',
    name: 'Oil Grease Remover',
    impaCode: '5510',
    category: 'Engine Room & Maintenance Tools',
    description: 'Industrial strength oil and grease remover, high efficiency cleaning solvent for marine mechanical systems and engine rooms.',
    specs: {
      'Container': '25 Liters Drum',
      'Base Formula': 'Surfactant-solvent blend',
      'pH Level': '11.2',
      'Application': 'Engine and deck degreasing'
    },
    priceEstimate: 195,
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8f30413b46?auto=format&fit=crop&q=80&w=600'
  },

  // Electrical Supplies
  {
    id: 'prod-20',
    name: 'Digital Multi Tester',
    impaCode: '795754',
    category: 'Electrical Supplies',
    description: 'Digital high-resistance insulation tester / megohmmeter for electric motors, ship generators, and wiring insulation diagnostics.',
    specs: {
      'Test Voltage': '250V / 500V / 1000V',
      'Measuring Range': '0.1MΩ to 2000MΩ',
      'Display': 'Large backlit LCD panel',
      'Power Source': '6x 1.5V AA Batteries'
    },
    priceEstimate: 340,
    imageUrl: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-30',
    name: 'Marine Watertight Wall Light',
    impaCode: '792068',
    category: 'Electrical Supplies',
    description: 'Heavy solid cast brass watertight LED wall fixture / bulkhead lamp with robust outer wire cage, ideal for corridors, wet passage walkways, and engine room decks.',
    specs: {
      'IP Rating': 'IP66 Wet Location',
      'Voltage': 'AC 110V - 220V',
      'Power': '12W LED Globe Included',
      'Housing': 'Polished Brass & Glass'
    },
    priceEstimate: 110,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-31',
    name: 'Watertight Cable Connector',
    impaCode: '794751',
    category: 'Electrical Supplies',
    description: 'High-strength heavy watertight cable connectors and cable compression joints for secure, waterproof cable entries into marine terminal boxes.',
    specs: {
      'Sealing Ring': 'Neoprene weather-proof',
      'Cable Entry Range': '8 - 15 mm',
      'Ingress Protection': 'IP68 certified',
      'Material': 'Nickel-plated marine brass'
    },
    priceEstimate: 18,
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600'
  },

  // Cabin & Housekeeping Stores
  {
    id: 'prod-13',
    name: 'Plastic Checkered Table Cloth',
    impaCode: '150652',
    category: 'Cabin & Housekeeping Stores',
    description: 'Durable, easily cleanable PVC plastic table cloth in classic blue/white checkered pattern, suited for vessel galley and messrooms.',
    specs: {
      'Pattern': 'Checkered Blue/White',
      'Material': 'Waterproof PVC',
      'Dimensions': '137 x 180 cm',
      'Cleaning': 'Wipe-clean Surface'
    },
    priceEstimate: 18,
    imageUrl: 'https://images.unsplash.com/photo-1595181745417-6415a770beee?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-14',
    name: 'Non-Skid Rubber Sheeting',
    impaCode: '150691',
    category: 'Cabin & Housekeeping Stores',
    description: 'Textured rubberized non-skid underlay sheeting to prevent movement of tableware and cabin items during heavy sea state roll.',
    specs: {
      'Width': '90 cm',
      'Material': 'Slip-resistant PVC Mesh',
      'Roll Length': '10 meters',
      'Thickness': '1.5 mm'
    },
    priceEstimate: 34,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-32',
    name: 'Bed Sheets',
    impaCode: '150107',
    category: 'Cabin & Housekeeping Stores',
    description: 'Premium hotel-grade poly-cotton composite bed sheets and fitted linens designed specifically for ship bunk sizes.',
    specs: {
      'Fabric Composition': '70% Cotton / 30% Polyester',
      'Laundering': 'Withstands industrial chlorine washing',
      'Dimensions': '140 x 200 cm bunk size',
      'Thread Count': '200 TC heavy-duty'
    },
    priceEstimate: 45,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600'
  },

  // Sealants, Adhesives & Welding Supplies
  {
    id: 'prod-6',
    name: 'Non-Asbestos Gasket Sheet',
    impaCode: '811071',
    category: 'Sealants, Adhesives & Welding Supplies',
    description: 'High-temperature compressed non-asbestos fiber gasket sheet, optimized for engine hot-water, steam, gas and oil lines.',
    specs: {
      'Max Temperature': '400 °C',
      'Max Pressure': '10 MPa',
      'Thickness': '2.0 mm',
      'Dimensions': '1500 x 1500 mm'
    },
    priceEstimate: 95,
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-33',
    name: 'Devcon Plastic Steel Putty',
    impaCode: '812251',
    category: 'Sealants, Adhesives & Welding Supplies',
    description: 'High-grade metal-filled epoxy putty compound for emergency repairs, hull patches, leak sealing, and rebuilding worn metal parts on vessels.',
    specs: {
      'Container': '500g Can with hardener',
      'Working Time': '20 Minutes',
      'Full Cure': '16 Hours at 24°C',
      'Compressive Strength': '82 MPa'
    },
    priceEstimate: 24,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'prod-34',
    name: 'Coated Brass Brazing Filler Metal',
    impaCode: '850451',
    category: 'Sealants, Adhesives & Welding Supplies',
    description: 'High-quality flux-coated brass brazing filler metal rods for joining copper, steel, and marine alloy piping structures.',
    specs: {
      'Rod Diameter': '3.0 mm',
      'Rod Length': '500 mm',
      'Melting Point': '890 - 900°C',
      'Tensile Strength': '380 MPa'
    },
    priceEstimate: 78,
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
  }
];

// Industries We Serve
const INDUSTRIES = [
  { name: 'Shipping & Logistics', icon: Ship, count: '50+' },
  { name: 'Oil & Gas', icon: Factory, count: '30+' },
  { name: 'Navy & Defense', icon: ShieldCheck, count: '15+' },
  { name: 'Cruise & Ferries', icon: Heart, count: '25+' },
  { name: 'Fishing & Aquaculture', icon: Anchor, count: '40+' },
  { name: 'Offshore Platforms', icon: Building, count: '20+' }
];

// Certifications
const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', icon: Award, description: 'Quality Management System' },
  { name: 'ISO 14001:2015', icon: Award, description: 'Environmental Management' },
  { name: 'OHSAS 18001', icon: ShieldCheck, description: 'Occupational Health & Safety' },
  { name: 'IMPA Certified', icon: CheckCircle, description: 'International Marine Purchasing' },
  { name: 'ISSA Member', icon: CheckCircle, description: 'International Ship Suppliers Association' }
];

// FAQ Data - Optimized with B2B Procurement Keywords for SEO
const FAQS = [
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

// Client Logos
const CLIENT_LOGOS = [
  { name: 'MSC', logo: 'MSC' },
  { name: 'Maersk', logo: 'MAERSK' },
  { name: 'DP World', logo: 'DPW' },
  { name: 'CMA CGM', logo: 'CMA CGM' },
  { name: 'Hapag Lloyd', logo: 'HL' },
  { name: 'Cosco', logo: 'COSCO' }
];

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return false;
  });

// Intersection Observer for animations
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Helper function for ref callbacks
  const setSectionRef = (key: string) => (el: HTMLElement | null): void => {
    sectionRefs.current[key] = el;
  };

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-white', 'text-[#00214E]');
      document.body.classList.add('bg-[#0A0F1A]', 'text-[#F5F2ED]');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#0A0F1A]', 'text-[#F5F2ED]');
      document.body.classList.add('bg-white', 'text-[#00214E]');
    }
  }, [darkMode]);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Page Metadata & Canonical Links for SEO
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "ZndZ Enterprise | IMPA Certified Marine Supply, Sourcing & Ship Chandler India",
      nodes: "ZndZ Enterprise | Sourcing Nodes & Global Port Coverage",
      about: "ZndZ Enterprise | IMPA/ISSA Ship Chandler Story & Quality Standards",
      catalogue: "ZndZ Enterprise | Technical Sourcing Directory (IMPA Deck, Engine, PPE, Safety)",
      contact: "ZndZ Enterprise | B2B Marine Procurement & 24/7 Operations Desk"
    };
    const descriptions: Record<string, string> = {
      home: "IMPA/ISSA certified marine supplier ZndZ Enterprise offers reliable 24/7 ship chandling & procurement across global ports. Request a B2B marine supply quote today!",
      nodes: "Track ZndZ's global maritime sourcing nodes. Direct port dispatch in Mumbai (JNPT), Singapore, Rotterdam, Dubai, Houston with certified 12-hour lead times.",
      about: "Established in 2022 in Mumbai, ZndZ Enterprise is a premier IMPA/ISSA certified marine importer and exporter serving the global shipping, offshore, and logistics industries.",
      catalogue: "Browse 500+ IMPA/ISSA certified marine products. Search deck, rigging, PPE, safety, engine, electrical, cabin, sealants, and welding supplies.",
      contact: "Contact ZndZ Enterprise 24/7 marine supply desk. Call +91 96197 95252 or email saleszndzenterprise@gmail.com for immediate B2B port quotes."
    };

    if (titles[activeTab]) {
      document.title = titles[activeTab];
    }

    // Dynamic Description Meta
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (descriptions[activeTab]) {
      metaDesc.setAttribute('content', descriptions[activeTab]);
    }

    // Dynamic Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const path = activeTab === 'home' ? '' : `#${activeTab}`;
    canonical.setAttribute('href', `https://zndzenterprise.com/${path}`);
  }, [activeTab]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll spy to dynamically highlight navigation links based on scroll position
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'catalogue', 'nodes', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero') {
            setActiveTab('home');
          } else if (sectionIds.includes(id)) {
            setActiveTab(id);
          }
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObserver.observe(el);
    });

    return () => spyObserver.disconnect();
  }, []);

  // RFQ Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Interactive Sourcing Map State
  const [selectedNode, setSelectedNode] = useState<SourcingNode>(PORT_NODES[0]);

  // Inventory Filter/Search States
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Deck & Rigging' | 'Personal Protective Equipment (PPE)' | 'Fire & Safety Equipment' | 'Navigation & Bridge Equipment' | 'Engine Room & Maintenance Tools' | 'Electrical Supplies' | 'Cabin & Housekeeping Stores' | 'Sealants, Adhesives & Welding Supplies'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // RFQ Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vesselName, setVesselName] = useState('');
  const [deliveryPort, setDeliveryPort] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedRfq, setSubmittedRfq] = useState<any>(null);

  // PDF Catalogue download simulator states
  const [downloadProgress, setDownloadProgress] = useState(-1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Statistics Counter Animation (Runs once on mount)
  const [counters, setCounters] = useState({ products: 0, clients: 0, ports: 0, projects: 0, experience: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => {
        const nextProducts = prev.products < 500 ? prev.products + 25 : 500;
        const nextClients = prev.clients < 150 ? prev.clients + 12 : 150;
        const nextPorts = prev.ports < 20 ? prev.ports + 1 : 20;
        const nextProjects = prev.projects < 250 ? prev.projects + 20 : 250;
        const nextExperience = prev.experience < 10 ? prev.experience + 1 : 10;

        if (nextProducts === 500 && nextClients === 150 && nextPorts === 20 && nextProjects === 250 && nextExperience === 10) {
          clearInterval(interval);
        }
        return { products: nextProducts, clients: nextClients, ports: nextPorts, projects: nextProjects, experience: nextExperience };
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCT_INVENTORY.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.impaCode.includes(searchQuery) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Total Estimated Value of RFQ Cart
  const totalCartValue = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.priceEstimate * item.quantity), 0);
  }, [cart]);

  // Cart Management Functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Trigger small visual success feedback
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const updateItemNotes = (productId: string, notes: string) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, customNotes: notes } : item));
  };

  // Populate form with cart data
  const handlePopulateFormWithCart = () => {
    if (cart.length === 0) return;
    const cartSummary = cart.map(item => `- IMPA ${item.product.impaCode}: ${item.product.name} (Qty: ${item.quantity})${item.customNotes ? ` [Spec: ${item.customNotes}]` : ''}`).join('\n');
    setAdditionalDetails(prev => {
      const base = prev ? prev + '\n\n' : '';
      return `${base}--- Auto-Populated RFQ Cart Items ---\n${cartSummary}\nTotal Value Estimate: $${totalCartValue}`;
    });
    // Smooth scroll to contact
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle Form Submission
  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please provide at least your Name and Email address.");
      return;
    }

    const rfqNumber = `RFQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRfq = {
      rfqId: rfqNumber,
      clientName: fullName,
      clientEmail: email,
      vesselName: vesselName || 'Not Specified',
      destinationPort: deliveryPort || 'Direct Supply Hub',
      details: additionalDetails,
      items: [...cart],
      estimatedTotal: totalCartValue,
      submissionDate: new Date().toLocaleString(),
    };

    setSubmittedRfq(newRfq);
    setFormSubmitted(true);
  };

  // Reset RFQ states
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

  // PDF Catalogue simulation trigger
  const triggerPdfDownload = () => {
    setDownloadProgress(0);
    setDownloadSuccess(false);
  };

  useEffect(() => {
    if (downloadProgress >= 0 && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress(prev => prev + 10);
      }, 150);
      return () => clearTimeout(timer);
    } else if (downloadProgress === 100) {
      setDownloadSuccess(true);
      // Trigger actual download of catalog manifest in TXT form to fulfill "my data" integration beautifully
      try {
        const catalogText = `ZndZ Enterprise - Marine Supply Catalogue 2024\n==================================================\n\n` + 
          PRODUCT_INVENTORY.map(p => `IMPA ${p.impaCode} | ${p.name}\nCategory: ${p.category}\nDescription: ${p.description}\nSpecs:\n` + 
          Object.entries(p.specs).map(([k, v]) => `  - ${k}: ${v}`).join('\n') + `\nEstimated Price: $${p.priceEstimate}\n--------------------------------------------------\n`).join('\n');
        
        const blob = new Blob([catalogText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'zndz_marine_supplies_catalog_2024.txt');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Download failed", err);
      }
      const timer = setTimeout(() => {
        setDownloadProgress(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [downloadProgress]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#00214E] font-sans antialiased relative selection:bg-[#1B4F8C] selection:text-white flex flex-col overflow-x-hidden">
      
      {/* SOLID, LAYERED FIXED HEADER */}
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0A0F1A]/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-b border-[#00214E]/10 dark:border-white/10' 
          : 'bg-white dark:bg-[#0A0F1A] border-b border-[#00214E]/5 dark:border-white/5 shadow-none'
      }`}>
        {/* BRAND SIGNATURE BANNER - Steel/Marine Blue Gradient */}
        <div 
          className="w-full bg-gradient-to-r from-[#1B4F8C] to-[#2E6DAE] text-white text-[10px] sm:text-xs font-mono font-medium py-1.5 sm:py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-1.5 relative z-50 overflow-hidden border-b border-white/15"
          style={{ minHeight: '40px' }}
        >
          {/* subtle watermark inside banner */}
          <div className="absolute right-12 top-[-10px] opacity-10 pointer-events-none">
            <Anchor className="w-16 h-16 rotate-12 text-white" />
          </div>
          <div className="flex items-center gap-3.5 flex-wrap justify-center">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E8F1FA]" /> +91 96197 95252</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:inline"></span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#E8F1FA]" /> saleszndzenterprise@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider font-extrabold text-[9px] sm:text-[10px]">
            <span className="text-[#E8F1FA]">Headquarters: Mumbai, India</span>
            <span className="text-white/40">|</span>
            <span className="text-[#E8F1FA]">IMPA / ISSA Standards</span>
          </div>
        </div>

        {/* SOLID NAVBAR CONTAINER */}
        <nav className={`w-full flex items-center justify-between px-4 sm:px-8 md:px-12 bg-transparent transition-all duration-300 ${
          scrolled ? 'h-20 sm:h-20 md:h-22' : 'h-24 sm:h-26 md:h-28'
        }`}>
          {/* Logo and Lockup Block */}
          <div className="flex items-center gap-3 sm:gap-4 py-1.5 min-w-0">
            <img 
              src={logo} 
              alt="ZndZ Enterprise Logo - Ship Chandler & Marine Procurement India" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#1B4F8C]/20 flex-shrink-0 shadow-md"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl md:text-2xl font-sans font-black tracking-tight whitespace-nowrap text-[#1B4F8C] dark:text-[#F5F2ED]">ZndZ Enterprise</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-extrabold text-[#1B4F8C] dark:text-[#2E6DAE] mt-0.5 whitespace-nowrap">
                Industrial Marine Sourcing
              </span>
            </div>
          </div>

          {/* Desktop Links - Spaced luxuriously with micro-animations & active highlight bar */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[10px] md:text-xs uppercase tracking-[0.2em] lg:tracking-[0.25em] font-bold h-full">
            <a 
              href="#hero" 
              onClick={() => setActiveTab('home')} 
              className={`group relative py-2 transition-all duration-300 hover:text-[#2E6DAE] ${
                activeTab === 'home' ? 'text-[#2E6DAE]' : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80'
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#2E6DAE] transition-all duration-300 ${
                activeTab === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="#about" 
              onClick={() => setActiveTab('about')} 
              className={`group relative py-2 transition-all duration-300 hover:text-[#2E6DAE] ${
                activeTab === 'about' ? 'text-[#2E6DAE]' : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80'
              }`}
            >
              <span>Certifications</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#2E6DAE] transition-all duration-300 ${
                activeTab === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="#catalogue" 
              onClick={() => setActiveTab('catalogue')} 
              className={`group relative py-2 transition-all duration-300 hover:text-[#2E6DAE] ${
                activeTab === 'catalogue' ? 'text-[#2E6DAE]' : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80'
              }`}
            >
              <span>Catalogue</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#2E6DAE] transition-all duration-300 ${
                activeTab === 'catalogue' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="#nodes" 
              onClick={() => setActiveTab('nodes')} 
              className={`group relative py-2 transition-all duration-300 hover:text-[#2E6DAE] ${
                activeTab === 'nodes' ? 'text-[#2E6DAE]' : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80'
              }`}
            >
              <span>Coverage/Network</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#2E6DAE] transition-all duration-300 ${
                activeTab === 'nodes' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setActiveTab('contact')} 
              className={`group relative py-2 transition-all duration-300 hover:text-[#2E6DAE] ${
                activeTab === 'contact' ? 'text-[#2E6DAE]' : 'text-[#00214E]/80 dark:text-[#F5F2ED]/80'
              }`}
            >
              <span>Contact</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#2E6DAE] transition-all duration-300 ${
                activeTab === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          </div>

          {/* Right Side Actions: CTA & Spaced Utility Icons */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Header B2B Primary CTA - Solid Brand Color Navy (#1B4F8C) */}
            <a 
              href="#contact"
              onClick={() => setActiveTab('contact')}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-[#1B4F8C] hover:bg-[#2E6DAE] text-white dark:bg-[#2E6DAE] dark:hover:bg-[#1B4F8C] transition-all duration-300 text-xs uppercase tracking-wider font-extrabold rounded-lg shrink-0 shadow-md min-h-[44px]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Single utility icon: Cart Icon with Background Fill on Hover */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full border-2 border-[#1B4F8C]/20 hover:border-[#1B4F8C] hover:bg-[#1B4F8C]/10 dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-[#2E6DAE] transition-all duration-300 flex items-center justify-center group min-w-[44px] min-h-[44px]"
              title="Open Quote Request Basket"
              id="rfq-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-[#1B4F8C] dark:text-[#F5F2ED]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E6DAE] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border-2 border-[#1B4F8C]/20 text-[#1B4F8C] dark:text-[#F5F2ED] dark:border-white/20 flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* BACKGROUND GRAPHIC ACCENTS - hidden on very small screens */}
      <div className="hidden sm:block absolute top-[40%] right-[15%] w-4 h-4 border border-[#2E6DAE] rotate-45 animate-pulse pointer-events-none z-10"></div>
      <div className="hidden sm:block absolute bottom-[10%] left-[30%] w-px h-24 bg-[#00214E] opacity-10 pointer-events-none z-10"></div>
      <div className="hidden sm:block absolute top-[80%] left-[5%] w-4 h-4 border border-[#00214E] opacity-15 rotate-12 pointer-events-none z-10"></div>

      {/* MOBILE NAV OVERLAY - improved spacing */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#F5F2ED] text-[#00214E] flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 animate-fade-in">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 sm:top-6 right-3 sm:right-4 p-3 rounded-full border border-[#00214E]/30 hover:bg-[#00214E]/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-8 text-lg sm:text-xl md:text-3xl font-serif italic text-left">
            <a href="#hero" onClick={() => { setMobileMenuOpen(false); setActiveTab('home'); }} className="hover:text-[#2E6DAE] transition-colors py-2">Home</a>
            <a href="#about" onClick={() => { setMobileMenuOpen(false); setActiveTab('about'); }} className="hover:text-[#2E6DAE] transition-colors py-2">Certifications &amp; Standards</a>
            <a href="#catalogue" onClick={() => { setMobileMenuOpen(false); setActiveTab('catalogue'); }} className="hover:text-[#2E6DAE] transition-colors py-2">Technical Catalogue</a>
            <a href="#nodes" onClick={() => { setMobileMenuOpen(false); setActiveTab('nodes'); }} className="hover:text-[#2E6DAE] transition-colors py-2">Coverage/Network</a>
            <a href="#contact" onClick={() => { setMobileMenuOpen(false); setActiveTab('contact'); }} className="hover:text-[#2E6DAE] transition-colors py-2">Contact Sourcing Desk</a>
          </div>
          <div className="mt-auto border-t border-[#00214E]/10 pt-5 sm:pt-6 flex flex-col gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60">Mumbai Headquarters</span>
            <span className="text-[11px] sm:text-xs font-semibold select-all">saleszndzenterprise@gmail.com</span>
            <a href="tel:+919619795252" className="text-[11px] sm:text-xs font-semibold select-all">+91 9619795252</a>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 pt-[136px] sm:pt-[144px] md:pt-[152px] overflow-x-hidden">

        {/* HERO SECTION - Premium Industrial Design */}
        <section id="hero" ref={setSectionRef('hero')} className="min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center relative px-3 sm:px-6 md:px-12 py-8 sm:py-10 md:py-20 border-b border-[#00214E]/10 overflow-hidden">
          {/* Industrial Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-95 z-0"></div>
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-0 left-0 w-96 h-96 border border-[#2E6DAE]/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-[#035CA8]/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Subtle Watermarked Compass/Anchor Graphic in Pale Blue as a Background Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center">
            <svg className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] text-[#E8F1FA] rotate-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20M12 4l3 3M12 4L9 7M12 20l3-3M12 20l-3-3M4 12l3-3M4 12l3 3M20 12l-3-3M20 12l-3 3" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 w-full relative z-10 items-center">
            
            {/* Left Vertical Stamp (Editorial Style) - hidden on mobile */}
            <div className="hidden lg:col-span-1 lg:flex flex-col justify-end h-72 pb-8">
              <div className="origin-bottom-left -rotate-90 whitespace-nowrap flex items-center gap-6">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-80">Est. 2022 • IMPA Supplier</span>
                <div className="w-24 h-[1px] bg-[#2E6DAE] opacity-30"></div>
              </div>
            </div>

            {/* Middle Content */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 md:gap-8">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#2E6DAE]/10 text-[#2E6DAE] px-3 sm:px-4 py-1 sm:py-1.5 self-start border border-[#2E6DAE]/20 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold">
                <Anchor className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                <span>IMPA &amp; ISSA Certified Global Marine Supplier</span>
              </div>

               <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-black tracking-tight flex flex-col uppercase font-sans text-white">
                <span>India's Leading</span>
                <span className="flex items-center flex-wrap gap-1 sm:gap-2 md:gap-4 text-[#2E6DAE]">
                  IMPA Supplier
                  <span className="inline-block w-8 sm:w-12 md:w-16 lg:w-24 h-[1.5px] sm:h-[2px] bg-[#2E6DAE] self-center"></span>
                </span>
              </h1>

              <p className="font-serif italic text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-xl border-l-2 border-[#2E6DAE] pl-3 sm:pl-4 md:pl-6 py-1 sm:py-2 leading-relaxed">
                ZndZ Enterprise specializes in sourcing Deck, Engine, PPE & Safety equipment with certified 12-hour dispatch in Mumbai (JNPT), major Indian ports, and global maritime hubs. Minimize downtime with 24/7/365 professional chandling.
              </p>

              {/* B2B Proof Points Grid - Visible Above Fold */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 sm:py-4 border-y border-white/10 font-mono text-white max-w-2xl">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#2E6DAE]">500+</div>
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/60">Vessels Provisioned</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#2E6DAE]">20+</div>
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/60">Ports &amp; Nodes</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#2E6DAE]">24/7/365</div>
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/60">Operations Desk</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#2E6DAE]">&lt; 3 Hours</div>
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/60">Quote Turnaround</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 md:gap-5 pt-2">
                <a 
                  href="#contact"
                  className="bg-[#1B4F8C] hover:bg-[#2E6DAE] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-lg transition-all duration-300 shadow-xl text-center w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 group"
                >
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Request a Quote</span>
                </a>
                <a 
                  href="#catalogue"
                  className="border border-white/30 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-lg hover:bg-white hover:text-[#0F172A] transition-all duration-300 text-center w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 group"
                >
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Browse Catalogue</span>
                </a>
              </div>
            </div>

            {/* Right Picture (Premium Industrial Style) */}
            <div className="lg:col-span-4 relative flex justify-center pt-2 lg:pt-0">
              <div className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] h-[220px] sm:h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Industrial marine equipment and ship deck supplies" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Trust badge overlay */}
              <div className="absolute -bottom-2 sm:-bottom-3 right-1 sm:right-2 bg-white/90 p-3 sm:p-4 border border-white/20 text-[8px] sm:text-[10px] font-mono flex flex-col gap-1 sm:gap-2 shadow-md max-w-[140px] sm:max-w-[180px] md:max-w-none backdrop-blur-sm">
                <span className="font-bold text-[#2E6DAE]">ISO 9001:2015 CERTIFIED</span>
                <span className="text-[#00214E]">10+ Years Experience</span>
              </div>
            </div>

          </div>
        </section>

        {/* GLOBAL TRUST BAR - Certification Logos & Core Speed Accents */}
        <div className="bg-[#F5F2ED] py-6 border-b border-[#00214E]/10 px-3 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 md:gap-4">
            
            {/* Accreditation Badge */}
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6DAE] animate-pulse shrink-0"></span>
              <span className="font-mono text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#00214E]">GLOBAL ACCREDITATIONS:</span>
            </div>

            {/* Certs List */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10">
              
              {/* IMPA */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#00214E]/10 rounded shadow-xs">
                <span className="font-sans font-black text-xs text-[#00214E] tracking-tighter">IMPA</span>
                <span className="text-[8px] font-mono font-bold text-gray-400">MEMBER</span>
              </div>

              {/* ISSA */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#00214E]/10 rounded shadow-xs">
                <span className="font-sans font-black text-xs text-[#00214E] tracking-tighter">ISSA</span>
                <span className="text-[8px] font-mono font-bold text-[#2E6DAE]">REGISTERED</span>
              </div>

              {/* ISO 9001 */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#00214E]/10 rounded shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[8px] font-mono font-bold text-[#00214E]">ISO 9001:2015</span>
              </div>

              {/* ISO 14001 */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#00214E]/10 rounded shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[8px] font-mono font-bold text-[#00214E]">ISO 14001:2015</span>
              </div>

            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[9px] sm:text-[10px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2E6DAE]" />
                <span>24/7 Sourcing Desk</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#2E6DAE]" />
                <span>20+ Global Ports Covered</span>
              </div>
            </div>

          </div>
        </div>

        {/* TRUST INDICATORS - Premium Stats Section */}
        <section id="trust" ref={setSectionRef('trust')} className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-12 sm:py-20 md:py-28 px-3 sm:px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%232E6DAE\\" fill-opacity=\\"0.03\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Trust & Excellence</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
                Why Industry Leaders Choose Us.
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 text-center">
              <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#2E6DAE]">
                  {counters.experience}+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold">Years Experience</span>
              </div>

              <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#2E6DAE]">
                  {counters.projects}+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold">Projects Completed</span>
              </div>

              <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#2E6DAE]">
                  {counters.clients}+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold">Happy Clients</span>
              </div>

              <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#2E6DAE]">
                  24/7
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold">Support</span>
              </div>

              <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#2E6DAE]">
                  {counters.ports}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold">Global Nodes</span>
              </div>
            </div>

            {/* Certifications Row */}
            <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold text-white/60">Certified By</span>
                <div className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-12">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <cert.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E6DAE]" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION - Client Logos */}
        <section className="bg-white border-b border-[#00214E]/10 py-4 sm:py-8 overflow-hidden">
          <div className="whitespace-nowrap flex overflow-hidden">
            <div className="flex items-center space-x-8 sm:space-x-20 px-4 animate-marquee text-[10px] sm:text-[13px] uppercase tracking-[0.25em] sm:tracking-[0.4em] font-extrabold text-[#00214E]/30">
              {CLIENT_LOGOS.map((client, i) => (
                <span key={i} className="px-2">{client.logo}</span>
              ))}
              <span className="text-[#2E6DAE]">•</span>
            </div>
            <div className="flex items-center space-x-8 sm:space-x-20 px-4 animate-marquee text-[10px] sm:text-[13px] uppercase tracking-[0.25em] sm:tracking-[0.4em] font-extrabold text-[#00214E]/30" aria-hidden="true">
              {CLIENT_LOGOS.map((client, i) => (
                <span key={i} className="px-2">{client.logo}</span>
              ))}
              <span className="text-[#2E6DAE]">•</span>
            </div>
          </div>
        </section>

        {/* INDUSTRIAL SPECS / ABOUT SECTION - Enhanced */}
        <section id="about" ref={setSectionRef('about')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white relative border-b border-[#00214E]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left intro */}
            <div className="lg:col-span-6 flex flex-col justify-between border-r-0 lg:border-r border-[#00214E]/10 pr-0 lg:pr-12">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Our Story</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic tracking-tight mb-4 sm:mb-6 md:mb-8">
                  Engineering Excellence Since 2022.
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#00214E]/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl">
                  ZndZ Enterprise operates at the structural intersection of heavy industrial shipping supplies and sophisticated digital dispatch networks. We do not simply fulfill requests; we manage the absolute procurement framework for vessels traversing global corridors.
                </p>
              </div>

              {/* Company Timeline */}
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-2 border-[#2E6DAE] pl-3 sm:pl-4 md:pl-6">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#2E6DAE]">2022</span>
                  <h4 className="text-base sm:text-lg font-serif italic font-medium mt-1">Company Founded</h4>
                  <p className="text-[10px] sm:text-xs text-[#00214E]/70 mt-1">Established in Mumbai with focus on IMPA-certified marine supplies.</p>
                </div>
                <div className="border-l-2 border-[#2E6DAE] pl-3 sm:pl-4 md:pl-6">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#2E6DAE]">2023</span>
                  <h4 className="text-base sm:text-lg font-serif italic font-medium mt-1">Global Expansion</h4>
                  <p className="text-[10px] sm:text-xs text-[#00214E]/70 mt-1">Opened logistics hubs in Singapore, Dubai, and Rotterdam.</p>
                </div>
                <div className="border-l-2 border-[#2E6DAE] pl-3 sm:pl-4 md:pl-6">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#2E6DAE]">2024</span>
                  <h4 className="text-base sm:text-lg font-serif italic font-medium mt-1">ISO Certification</h4>
                  <p className="text-[10px] sm:text-xs text-[#00214E]/70 mt-1">Achieved ISO 9001:2015 quality management certification.</p>
                </div>
              </div>
            </div>

            {/* Right showcase - Why Choose ZndZ (B2B Differentiators) */}
            <div className="lg:col-span-6 flex flex-col justify-center bg-[#F5F2ED] p-4 sm:p-6 md:p-8 lg:p-12 relative border border-[#00214E]/10 overflow-hidden rounded-xl">
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[8px] sm:text-[9px] font-mono opacity-50 uppercase">Why Choose ZndZ</div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="border-b border-[#00214E]/10 pb-3 sm:pb-4">
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2E6DAE]">DIFFERENTIATOR 01</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#00214E] mt-0.5">Certified IMPA &amp; ISSA Sourcing</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/80 mt-1 leading-relaxed">
                    Direct access to over 50,000 listed marine product codes. All engine parts, deck machinery, and safety equipment conform to international IACS, SOLAS, and ISO standards.
                  </p>
                </div>

                <div className="border-b border-[#00214E]/10 pb-3 sm:pb-4">
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2E6DAE]">DIFFERENTIATOR 02</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#00214E] mt-0.5">24/7 Sourcing &amp; Global Hub Network</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/80 mt-1 leading-relaxed">
                    Operating strategic dispatch points near critical lanes: Rotterdam, Singapore, Houston, Dubai, and Mumbai. We synchronize deliveries with custom harbor agent coordinates.
                  </p>
                </div>

                <div className="border-b border-[#00214E]/10 pb-3 sm:pb-4">
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2E6DAE]">DIFFERENTIATOR 03</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#00214E] mt-0.5">Guaranteed 3-Hour Quote Window</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/80 mt-1 leading-relaxed">
                    Our dedicated marine procurement desk evaluates complex requisition sheets or custom item requests, returning fully itemized B2B quotations within 3 hours.
                  </p>
                </div>

                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2E6DAE]">DIFFERENTIATOR 04</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#00214E] mt-0.5">Billing Transparency &amp; Custom Auditing</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/80 mt-1 leading-relaxed">
                    Flat-rate port delivery with zero hidden administrative or courier surcharges. Fleet managers receive clean, audit-ready invoices and compliance sheets.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INDUSTRIES WE SERVE SECTION */}
        <section id="industries" ref={setSectionRef('industries')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Market Verticals</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight mb-4 sm:mb-6">
                Industries We Serve.
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto">
                Our industrial solutions cater to diverse maritime sectors with specialized equipment and tailored procurement strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {INDUSTRIES.map((industry, i) => (
                <div key={i} className="bg-white border border-[#00214E]/10 p-4 sm:p-6 md:p-8 text-center group hover:border-[#2E6DAE]/30 transition-all duration-300 card-hover">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full bg-[#F5F2ED] border border-[#00214E]/10 flex items-center justify-center group-hover:bg-[#2E6DAE] transition-all duration-300">
                    <industry.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#2E6DAE] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-serif italic font-medium mb-2">{industry.name}</h4>
                  <p className="text-[10px] sm:text-xs text-[#00214E]/60">{industry.count} Clients Served</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL CATALOGUE (INTEGRATED BROWSER) */}
        <section id="catalogue" ref={setSectionRef('catalogue')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-10 md:mb-12">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Core Inventory</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic tracking-tight">
                Technical Supply Directory.
              </h3>
              <p className="text-xs sm:text-sm text-[#00214E]/60 mt-1 sm:mt-2 max-w-xl">
                Browse our prioritized items list. Filter by category, search by IMPA code, and add items directly to your active RFQ request.
              </p>
            </div>
          </div>

          {/* INTERACTIVE BROWSER CONTROLS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Search Input */}
            <div className="col-span-12 lg:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search by product name, specification, or IMPA code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#00214E]/20 py-3 sm:py-3.5 md:py-4 pl-10 sm:pl-12 pr-8 sm:pr-10 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] focus:ring-1 focus:ring-[#2E6DAE] font-sans rounded-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-[#00214E] transition-colors"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="col-span-12 lg:col-span-7 flex overflow-x-auto lg:flex-wrap gap-1.5 sm:gap-2 items-center pb-2 lg:pb-0 scrollbar-hide -mx-3 sm:-mx-6 px-3 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth snap-x">
              {([
                'All', 
                'Deck & Rigging', 
                'Personal Protective Equipment (PPE)', 
                'Fire & Safety Equipment', 
                'Navigation & Bridge Equipment', 
                'Engine Room & Maintenance Tools', 
                'Electrical Supplies', 
                'Cabin & Housekeeping Stores', 
                'Sealants, Adhesives & Welding Supplies'
              ] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 sm:px-3.5 md:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider border transition-all duration-300 flex-shrink-0 snap-start min-h-[36px] sm:min-h-[44px] rounded-lg ${selectedCategory === cat ? 'bg-[#2E6DAE] text-white border-[#2E6DAE]' : 'bg-white text-[#00214E]/70 border-[#00214E]/10 hover:border-[#2E6DAE]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Description Banner - IMPA/ISSA Compliance Proofing */}
          <div className="bg-[#F5F2ED] border-l-4 border-[#2E6DAE] p-4 rounded-r-lg mb-6 shadow-xs animate-fade-in">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-500 block mb-1">Active Sourcing Category Info</span>
            <p className="text-xs sm:text-sm text-[#00214E] font-medium leading-relaxed">
              {selectedCategory === 'All' && "Comprehensive IMPA/ISSA marine inventory: Sourcing mechanical parts, high-performance deck machinery, SOLAS-compliant safety gear, and provisions."}
              {selectedCategory === 'Deck & Rigging' && "Deck & Rigging Sourcing: Premium marine grade shackles, snatch blocks, double-weave cable grips, SOLAS pilot ladders, mooring lines, lashing hardware, wire rope cuts, and chain hoists."}
              {selectedCategory === 'Personal Protective Equipment (PPE)' && "Personal Protective Equipment (PPE) Sourcing: Heavy-duty boilersuits, specialized safety gloves (leather palm, high-aramid), steel-toe boots, protective helmets, goggles, and full-body harnesses."}
              {selectedCategory === 'Fire & Safety Equipment' && "Fire & Safety Equipment Sourcing: Certified fire hoses, brass extinguisher couplings, life jackets/lifebuoys, fiberglass fire blankets, and photoluminescent IMO safety signs."}
              {selectedCategory === 'Navigation & Bridge Equipment' && "Navigation & Bridge Equipment Sourcing: High-precision prism binoculars, solid brass quartz clocks, sextants, chart divider tools, barometers, and specialized chronometers."}
              {selectedCategory === 'Engine Room & Maintenance Tools' && "Engine Room & Maintenance Tools Sourcing: Multi-stage bilge pumps, pneumatic angle grinders, heavy-duty torque wrenches, synthetic lubricants, and precision indicators."}
              {selectedCategory === 'Electrical Supplies' && "Electrical Supplies Sourcing: Watertight brass LED ceiling fixtures, cable glands, digital insulation test instruments, and voltage transformers."}
              {selectedCategory === 'Cabin & Housekeeping Stores' && "Cabin & Housekeeping Stores Sourcing: Cotton vessel bed linens, checkered table cloths, non-skid deck rubber sheeting, tableware sets, and specialized galley items."}
              {selectedCategory === 'Sealants, Adhesives & Welding Supplies' && "Sealants, Adhesives & Welding Supplies Sourcing: High-temperature non-asbestos gasket sheets, underwater-curing epoxy putties, mild steel welding electrodes, and anti-corrosive tapes."}
            </p>
          </div>

          {/* SEARCH RESULTS COUNT */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#00214E]/60 font-mono">
            <span className="max-w-full">Showing {filteredProducts.length} of {PRODUCT_INVENTORY.length} prioritized register items</span>
            {cart.length > 0 && (
              <button 
                onClick={handlePopulateFormWithCart}
                className="text-[#2E6DAE] hover:underline font-bold flex items-center gap-1 min-h-[36px]"
              >
                Assemble RFQ with {cart.length} items <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* PRODUCT CARDS GRID - Enhanced Premium Design */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProducts.map(product => {
                const isItemInCart = cart.some(item => item.product.id === product.id);
                return (
                  <div 
                    key={product.id} 
                    className="bg-white border border-[#00214E]/10 flex flex-col group hover:border-[#2E6DAE]/40 transition-all duration-500 hover:shadow-xl relative overflow-hidden rounded-xl"
                  >
                    {/* Image Section - Larger images */}
                    <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-100 border border-[#00214E]/5 overflow-hidden relative mb-3 sm:mb-4 md:mb-5">
                      <img 
                        src={product.imageUrl} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={product.name}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#00214E] text-white font-mono text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 uppercase tracking-wider rounded">
                        {product.category}
                      </span>
                      <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-[#1B4F8C] text-white font-mono text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 font-bold rounded">
                        IMPA {product.impaCode}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-1 mb-3 sm:mb-4 flex-1 px-3 sm:px-4">
                      <h4 className="font-serif italic text-lg sm:text-xl md:text-2xl font-medium tracking-tight group-hover:text-[#2E6DAE] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#00214E]/70 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Specifications List - Enhanced */}
                    <div className="border-t border-b border-[#00214E]/5 py-2 sm:py-3 mb-3 sm:mb-4 px-3 sm:px-4">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1 sm:mb-1.5">Technical Specifications</div>
                      <div className="grid grid-cols-1 gap-y-1.5 sm:gap-y-2 gap-x-1.5 sm:gap-x-2 text-[9px] sm:text-[10px] font-mono">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between">
                            <span className="opacity-40">{key}:</span>
                            <span className="font-semibold text-right text-gray-800" title={val}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing estimate & Action - Enhanced Buttons */}
                    <div className="flex items-center justify-between gap-2 mt-auto px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold opacity-40">Est. Price</span>
                        <span className="text-lg sm:text-xl font-semibold text-gray-800">${product.priceEstimate}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-1 sm:gap-1.5 min-h-[36px] sm:min-h-[44px] rounded-lg ${
                              isItemInCart 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/40 hover:bg-[#2E6DAE] hover:text-white hover:border-transparent' 
                                : 'bg-[#00214E] text-white hover:bg-[#2E6DAE]'
                            }`}
                        >
                          {isItemInCart ? (
                            <>
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>Add More</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>Request Quote</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 sm:p-8 md:p-12 border border-[#00214E]/10 text-center flex flex-col items-center justify-center gap-3 sm:gap-4 rounded-xl">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 animate-spin" />
              <h4 className="text-base sm:text-lg font-serif italic">No technical supplies found</h4>
              <p className="text-[10px] sm:text-xs text-[#00214E]/60 max-w-sm">No items matching "{searchQuery}" could be located in register. Try searching for "mooring", "pump" or code "330101".</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#00214E] text-white hover:bg-[#2E6DAE] text-[9px] sm:text-[10px] uppercase tracking-wider font-bold min-h-[36px] sm:min-h-[44px] rounded-lg"
              >
                Clear Search Filter
              </button>
            </div>
          )}

        </section>

        {/* INTERACTIVE LOGISTICS NODES HUB & SOURCING DETAILS */}
        <section id="nodes" ref={setSectionRef('nodes')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white relative border-b border-[#00214E]/10">
          <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none uppercase font-serif font-black text-[80px] sm:text-[120px] md:text-[160px] tracking-widest flex items-center justify-center text-[#00214E]">
            GLOBAL
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 relative z-10">
            
            {/* Left Info Panel */}
            <div className="lg:col-span-4 flex flex-col justify-center border-l-0 lg:border-l-2 border-[#2E6DAE] pl-0 lg:pl-6 md:pl-12">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Global Network</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight mb-4 sm:mb-5 md:mb-6">
                Optimized Sourcing Nodes.
              </h3>
              <p className="text-xs sm:text-sm text-[#00214E]/80 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                We operate 5 major primary marine hubs located near key international lanes. Select a terminal to inspect current inventory depth, vessel congestion index, and direct ETA routing.
              </p>

              {/* Quick info list */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
                {PORT_NODES.map(node => (
                  <button
                    key={node.code}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3.5 border transition-all duration-300 min-h-[44px] rounded-lg ${selectedNode.code === node.code ? 'bg-[#00214E] text-white border-[#00214E]' : 'bg-[#F5F2ED] text-[#00214E] border-[#00214E]/10 hover:border-[#2E6DAE]'}`}
                  >
                    <span className="text-[10px] sm:text-xs font-mono font-bold truncate mr-2">{node.name}</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <span className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 font-mono whitespace-nowrap rounded ${node.status === 'OPTIMAL' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-[#2E6DAE]/20 text-[#2E6DAE]'}`}>
                        {node.status}
                      </span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Map/Dashboard Container */}
            <div className="lg:col-span-8 bg-[#F5F2ED] border border-[#00214E]/10 p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 relative overflow-hidden rounded-xl">
            
              {/* STYLIZED SVG OR DIRECT SCHEMATIC WORLD MAP */}
              <div className="flex-1 flex flex-col justify-between border border-[#00214E]/10 bg-white p-3 sm:p-4 md:p-5 relative overflow-hidden rounded-lg">
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 text-[7px] sm:text-[9px] font-mono opacity-50 uppercase">LOGISTICS_NODE_ROUTING: ACTIVE</div>
                
                {/* Visual grid representing the marine coordinates */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-[0.03]">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[#00214E]"></div>
                  ))}
                </div>

                <div className="relative flex-1 flex items-center justify-center py-3 sm:py-4 md:py-6">
                  {/* Decorative map graphics */}
                  <div className="w-full max-w-xs sm:max-w-md h-28 sm:h-36 md:h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 border border-[#00214E]/5 relative rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Globe className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-200/50 absolute" />
                    <Activity className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#2E6DAE]/10 absolute animate-pulse" />
                    
                    {/* Node points plotting */}
                    {PORT_NODES.map((node, i) => {
                      const positions = [
                        { top: '35%', left: '72%' }, // Mumbai
                        { top: '55%', left: '80%' }, // Singapore
                        { top: '22%', left: '48%' }, // Rotterdam
                        { top: '38%', left: '20%' }, // Houston
                        { top: '35%', left: '60%' }, // Dubai
                      ];
                      const pos = positions[i] || { top: '50%', left: '50%' };
                      const isSelected = node.code === selectedNode.code;
                      
                      return (
                        <button
                          key={node.code}
                          onClick={() => setSelectedNode(node)}
                          className="absolute w-3 h-3 sm:w-4 sm:h-4 -translate-x-1/2 -translate-y-1/2 group z-20"
                          style={pos}
                          title={node.name}
                        >
                          <span className={`absolute inset-0 rounded-full ${isSelected ? 'bg-[#2E6DAE] animate-ping' : 'bg-gray-400 opacity-50'}`}></span>
                          <span className={`absolute inset-0.5 rounded-full border border-white ${isSelected ? 'bg-[#2E6DAE]' : 'bg-gray-600'}`}></span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#00214E]/10 pt-2 sm:pt-4 flex flex-wrap justify-between items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-mono text-[#00214E]/70">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2E6DAE] animate-pulse"></span>
                    <span>ACTIVE VESSEL SIGNALS EN-ROUTE: 312</span>
                  </div>
                  <div>
                    <span>Selected: <span className="font-bold text-[#2E6DAE]">{selectedNode.name}</span> ({selectedNode.code})</span>
                  </div>
                </div>
              </div>

              {/* Sourcing node specifications (Editorial table layout) */}
              <div className="w-full lg:w-72 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1.5 sm:mb-2">Selected Hub Data</div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-serif italic mb-3 sm:mb-4 border-b border-[#00214E]/10 pb-1.5 sm:pb-2">{selectedNode.name}</h4>

                  <div className="space-y-2 sm:space-y-3.5 text-[10px] sm:text-xs font-mono">
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">LOCATION</span>
                      <span className="font-semibold text-right">{selectedNode.lat}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">COORDINATE</span>
                      <span className="font-semibold text-right">{selectedNode.lon}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">LEAD TIME</span>
                      <span className="font-semibold text-[#2E6DAE] text-right">{selectedNode.leadTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">ACTIVE VESSELS</span>
                      <span className="font-semibold text-right">{selectedNode.activeVessels}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">CATALOG PARTS</span>
                      <span className="font-semibold text-right">{selectedNode.availableItems} in stock</span>
                    </div>
                    <div className="flex justify-between border-b border-[#00214E]/5 pb-1">
                      <span className="opacity-50">CONGESTION</span>
                      <span className="font-semibold text-right">{selectedNode.congestion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">LOCAL TIME</span>
                      <span className="font-semibold text-right">{selectedNode.timezone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 border-t border-[#00214E]/10 text-[9px] sm:text-[10px] leading-relaxed text-gray-500 font-mono">
                  Dispatch routes automatically recalibrate based on weather and harbor traffic algorithms.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* REQUISITION PROCESS TIMELINE */}
        <section ref={setSectionRef('process')} className="py-12 sm:py-20 md:py-32 bg-[#F5F2ED] border-b border-[#00214E]/10">
          <div className="px-4 sm:px-6 md:px-12 mb-10 sm:mb-16 text-center">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">How We Work</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
              Requisition Lifecycle
            </h3>
          </div>

          <div className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connecting line on desktop */}
              <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[1px] bg-[#2E6DAE] opacity-20 z-0"></div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border border-[#00214E]/15 text-[#00214E] group-hover:bg-[#2E6DAE] group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg font-mono font-bold shadow-sm">
                  01
                </div>
                <h4 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-extrabold mt-3 sm:mt-4 md:mt-6 mb-1 sm:mb-2">Inquiry RFQ</h4>
                <p className="text-[10px] sm:text-xs text-[#00214E]/70 px-2 sm:px-4 leading-relaxed">
                  Submit specification details alongside accurate vessel berthing ETA and IMPA codes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border border-[#00214E]/15 text-[#00214E] group-hover:bg-[#2E6DAE] group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg font-mono font-bold shadow-sm">
                  02
                </div>
                <h4 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-extrabold mt-3 sm:mt-4 md:mt-6 mb-1 sm:mb-2">Verification</h4>
                <p className="text-[10px] sm:text-xs text-[#00214E]/70 px-2 sm:px-4 leading-relaxed">
                  Our algorithm cross-checks immediate local availability against closest global logistics nodes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border border-[#00214E]/15 text-[#00214E] group-hover:bg-[#2E6DAE] group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg font-mono font-bold shadow-sm">
                  03
                </div>
                <h4 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-extrabold mt-3 sm:mt-4 md:mt-6 mb-1 sm:mb-2">Consolidation</h4>
                <p className="text-[10px] sm:text-xs text-[#00214E]/70 px-2 sm:px-4 leading-relaxed">
                  Cargo consolidated at the targeted hub with specialized seaworthy marine packaging.
                </p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#2E6DAE] text-white transition-all duration-300 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg font-mono font-bold shadow-md">
                  04
                </div>
                <h4 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider font-extrabold mt-3 sm:mt-4 md:mt-6 mb-1 sm:mb-2 text-[#2E6DAE]">Safe Delivery</h4>
                <p className="text-[10px] sm:text-xs text-[#00214E]/70 px-2 sm:px-4 leading-relaxed">
                  Final boarding supply directly to the vessel deck or port terminal prior to cargo operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section ref={setSectionRef('testimonials')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Client Voices</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
                What Our Partners Say.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#F5F2ED] p-4 sm:p-6 md:p-8 border border-[#00214E]/10 relative group hover:border-[#2E6DAE]/30 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < testimonial.rating ? 'fill-[#2E6DAE] text-[#2E6DAE]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-[#00214E]/80 leading-relaxed mb-4 sm:mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00214E] text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-[10px] sm:text-xs font-semibold uppercase">{testimonial.name}</h5>
                      <p className="text-[9px] sm:text-[10px] text-[#00214E]/60">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Sourcing Case Studies - Fleet Turnaround Showcases */}
        <section id="case-studies" className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Operational Records</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
                Fleet Turnaround Case Studies.
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto mt-2">
                Review verified documentation of critical provisioning and technical dispatch operations executed under extreme schedule pressure.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              
              {/* Case Study 1 */}
              <div className="bg-white border border-[#00214E]/10 p-5 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#00214E]/10 pb-3 mb-4 font-mono text-[9px] sm:text-[10px]">
                    <span className="text-[#2E6DAE] font-bold">EMERGENCY TECHNICAL SUPPLY</span>
                    <span>PORT OF SINGAPORE (OPL)</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif italic mb-3 text-[#00214E]">Emergency Engine Valve and Gasket Mobilization</h4>
                  <p className="text-xs sm:text-sm text-[#00214E]/80 mb-6 leading-relaxed">
                    A 14,000 TEU cellular container vessel suffered auxiliary cooling pipe leakage 12 miles outside Singapore. A complete set of custom ClassNK-vetted high-pressure gaskets and relief valves was sourced, verified, and delivered to the vessel deck via supply boat within 5.5 hours, preventing off-hire charterer claims.
                  </p>
                  
                  {/* Case Specs */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 bg-[#F5F2ED] rounded-lg text-[9px] sm:text-[11px] font-mono mb-6">
                    <div>
                      <div className="text-gray-400">VESSEL CLASS</div>
                      <div className="font-bold">Post-Panamax</div>
                    </div>
                    <div>
                      <div className="text-gray-400">REQUISITION</div>
                      <div className="font-bold">Engine Stores</div>
                    </div>
                    <div>
                      <div className="text-gray-400">TURNAROUND</div>
                      <div className="font-bold text-[#2E6DAE]">5.5 Hours</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#2E6DAE]">
                  <span>IMPA Code Reference Series: 27-33</span>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white border border-[#00214E]/10 p-5 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#00214E]/10 pb-3 mb-4 font-mono text-[9px] sm:text-[10px]">
                    <span className="text-[#2E6DAE] font-bold">COMPLETE DECK PROVISIONING</span>
                    <span>JNPT PORT, MUMBAI</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif italic mb-3 text-[#00214E]">VLCC Supertanker Full Deck Rigging Provisions</h4>
                  <p className="text-xs sm:text-sm text-[#00214E]/80 mb-6 leading-relaxed">
                    During a 16-hour harbor turnaround, a 300,000 DWT crude oil tanker required comprehensive replacement of certified mooring steel wires, safety nets, lashing turnbuckles, and Solas line throwers. ZndZ consolidated 12 tons of IMPA/ISSA code compliant gear and executed deck crane transfer under extreme harbor wind conditions.
                  </p>
                  
                  {/* Case Specs */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 bg-[#F5F2ED] rounded-lg text-[9px] sm:text-[11px] font-mono mb-6">
                    <div>
                      <div className="text-gray-400">VESSEL CLASS</div>
                      <div className="font-bold">VLCC Tanker</div>
                    </div>
                    <div>
                      <div className="text-gray-400">REQUISITION</div>
                      <div className="font-bold">Deck &amp; Safety</div>
                    </div>
                    <div>
                      <div className="text-gray-400">TURNAROUND</div>
                      <div className="font-bold text-[#2E6DAE]">14 Hours</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#2E6DAE]">
                  <span>IACS Quality Audit Certifications Included</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Marine Procurement Insights & Bulletin - B2B Blog / SEO Content Engine */}
        <section id="insights" className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white border-b border-[#00214E]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Maritime Intelligence</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
                Procurement Insights &amp; Bulletin.
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#00214E]/70 max-w-2xl mx-auto mt-2">
                Read deep-dive technical articles written by our marine superintendents to streamline vessel sourcing, audit compliance, and port supply chains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Article 1 */}
              <article className="border border-[#00214E]/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="p-5 sm:p-6">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-[#2E6DAE]">PORT LOGISTICS &amp; COMPLIANCE</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#00214E] mt-1.5 mb-3">Optimizing Vessel Turnaround: Emergency Sourcing Strategies</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/70 leading-relaxed">
                    How proactive alignment with accredited ship chandlers simplifies outer port limits (OPL) transfers, reduces terminal dwell time, and avoids structural harbor demurrage.
                  </p>
                </div>
                <div className="p-5 sm:p-6 bg-[#F5F2ED]/50 border-t border-[#00214E]/5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-gray-400">
                  <span>Author: Capt. R. Mehta</span>
                  <span className="font-bold text-[#2E6DAE]">5 Min Read</span>
                </div>
              </article>

              {/* Article 2 */}
              <article className="border border-[#00214E]/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="p-5 sm:p-6">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-[#2E6DAE]">PROCUREMENT SYSTEMS</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#00214E] mt-1.5 mb-3">Demystifying IMPA &amp; ISSA Coding in Modern Marine Supply</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/70 leading-relaxed">
                    A technical checklist for procurement desks to avoid part specification mismatches and streamline fleet-wide catalog ordering using standardized digital indexes.
                  </p>
                </div>
                <div className="p-5 sm:p-6 bg-[#F5F2ED]/50 border-t border-[#00214E]/5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-gray-400">
                  <span>Author: J. Sanyal, Supt.</span>
                  <span className="font-bold text-[#2E6DAE]">7 Min Read</span>
                </div>
              </article>

              {/* Article 3 */}
              <article className="border border-[#00214E]/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="p-5 sm:p-6">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-[#2E6DAE]">IMO REGULATIONS</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#00214E] mt-1.5 mb-3">Green Port Sourcing: Navigating Fleet Decarbonization</h4>
                  <p className="text-[11px] sm:text-xs text-[#00214E]/70 leading-relaxed">
                    Evaluating regional carbon offsets, local provisioning efficiencies, and optimized sourcing node allocations to satisfy strict new IMO CII fleet emissions guidelines.
                  </p>
                </div>
                <div className="p-5 sm:p-6 bg-[#F5F2ED]/50 border-t border-[#00214E]/5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-gray-400">
                  <span>Author: S. Venkatesh</span>
                  <span className="font-bold text-[#2E6DAE]">6 Min Read</span>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section ref={setSectionRef('faqs')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-[#F5F2ED] border-b border-[#00214E]/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Common Questions</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight">
                Frequently Asked Questions.
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white border border-[#00214E]/10 overflow-hidden rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between text-left min-h-[44px]"
                  >
                    <span className="text-xs sm:text-sm md:text-base font-semibold pr-4">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-[10px] sm:text-[10px] md:text-sm text-[#00214E]/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVE DEMAND / CONTACT & REQUEST QUOTE FORM */}
        <section id="contact" ref={setSectionRef('contact')} className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 md:px-12 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE] block mb-3 sm:mb-4">Connect With Us</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight mb-4 sm:mb-6 md:mb-8">
                Mobilize Supply Chain.
              </h3>
              <p className="text-xs sm:text-sm text-[#00214E]/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-md">
                Initiate a requisition ticket immediately. Provide vessel dimensions, berthing ETA, port requirements, and product index numbers to receive custom quotes within 4 hours.
              </p>

              {/* Contact specs */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-40 mb-1.5 sm:mb-2">Headquarters</h5>
                    <div className="w-full h-28 sm:h-32 md:h-44 bg-white/50 border border-[#00214E]/10 overflow-hidden relative shadow-inner rounded-lg">
                      <iframe
                        src="https://maps.google.com/maps?q=2A,%201404,%20SBUT%202,%20New%20Hind%20Mill%20Colony,%20Mumbai%20-%20400033,%20Maharashtra,%20INDIA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0 filter grayscale contrast-110 brightness-95"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        title="ZndZ Enterprise Headquarters Location Map"
                      ></iframe>
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold mt-1.5 sm:mt-2">2A, 1404, SBUT 2, New Hind Mill Colony, Mumbai - 400033, Maharashtra, INDIA</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h5 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-40">Operations Supply Desk</h5>
                    <a href="mailto:saleszndzenterprise@gmail.com" id="contact-email-link" className="text-[10px] sm:text-xs font-semibold mt-1 text-[#2E6DAE] hover:underline block">saleszndzenterprise@gmail.com</a>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h5 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-40">24/7 Operations Helpline</h5>
                    <a href="tel:+919619795252" id="contact-phone-link" className="text-[10px] sm:text-xs font-semibold mt-1 text-[#2E6DAE] hover:underline block">+91 9619795252</a>
                    <p className="text-[10px] sm:text-xs font-semibold">Emergency Dispatch: Ext. 99</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#00214E]/10 text-[#2E6DAE] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h5 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold opacity-40">Business Hours</h5>
                    <p className="text-[10px] sm:text-xs font-semibold mt-1">24/7 Operations - All Time Zones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Panel */}
            <div className="lg:col-span-7 bg-white p-4 sm:p-6 md:p-8 lg:p-12 border border-[#00214E]/15 shadow-xl relative rounded-xl">
              
              {!formSubmitted ? (
                <form onSubmit={handleSubmitRfq} className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex flex-col gap-1 sm:gap-1.5 pb-2 border-b border-[#00214E]/10">
                    <h4 className="text-base sm:text-lg md:text-xl font-serif italic font-medium">Requisition & Quote Request</h4>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wider opacity-60">Submit details to create a formal supply inquiry file.</p>
                  </div>

                  {cart.length > 0 && (
                    <div className="p-3 sm:p-4 bg-[#2E6DAE]/5 border border-[#2E6DAE]/25 text-[10px] sm:text-xs text-[#00214E]">
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                        <span className="font-bold text-[#2E6DAE]">RFQ CART INTEGRATION ACTIVE</span>
                        <span className="font-mono">{cart.length} items selected</span>
                      </div>
                      <p className="text-[10px] sm:text-[10px] mb-2 sm:mb-3 text-[#00214E]/80">You have configured custom items in your RFQ cart. Clicking populate will automatically embed item codes into inquiry details.</p>
                      <button
                        type="button"
                        onClick={handlePopulateFormWithCart}
                        className="px-2.5 sm:px-3 py-1.5 sm:py-1.5 bg-[#00214E] text-white hover:bg-[#2E6DAE] text-[9px] sm:text-[10px] uppercase font-bold transition-colors min-h-[36px] rounded"
                      >
                        Populate Form Details
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold">Officer Name <span className="text-[#2E6DAE]">*</span></label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe (Procurement Head)"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-transparent border border-[#00214E]/15 p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] min-h-[44px] rounded"
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold">Official Email <span className="text-[#2E6DAE]">*</span></label>
                      <input 
                        type="email" 
                        required
                        placeholder="j.doe@shipping-co.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border border-[#00214E]/15 p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] min-h-[44px] rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold">Vessel Name / IMO Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Ever Given / IMO 9817731"
                        value={vesselName}
                        onChange={(e) => setVesselName(e.target.value)}
                        className="bg-transparent border border-[#00214E]/15 p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] min-h-[44px] rounded"
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold">Target Port of Supply Delivery</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Port of Rotterdam / Terminal 3"
                        value={deliveryPort}
                        onChange={(e) => setDeliveryPort(e.target.value)}
                        className="bg-transparent border border-[#00214E]/15 p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] min-h-[44px] rounded"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold">Inquiry Requisition Specifics</label>
                    <textarea 
                      rows={4}
                      placeholder="Specify material specifications, quantity requirements, dimensions, target berthing dates, or required certificates (SOLAS, IACS, ISO)..."
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      className="bg-transparent border border-[#00214E]/15 p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-[#2E6DAE] rounded"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#00214E] text-white hover:bg-[#2E6DAE] py-3 sm:py-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 min-h-[48px] rounded-lg"
                  >
                    <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Submit Quote Requisition</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-4 sm:gap-6 animate-fade-in text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2E6DAE]/10 border border-[#2E6DAE]/20 text-[#2E6DAE] rounded-full flex items-center justify-center self-start">
                    <Check className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>

                  <div className="border-b border-[#00214E]/10 pb-3 sm:pb-4">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#00214E]">RFQ Requisition Submitted</h4>
                    <p className="text-[10px] sm:text-xs text-[#00214E]/60 mt-1">Formal ticket created. Current operations response: ACTIVE / 4h window.</p>
                  </div>

                  <div className="bg-[#F5F2ED] p-4 sm:p-5 md:p-6 border border-[#00214E]/10 text-[10px] sm:text-xs font-mono space-y-2 sm:space-y-3">
                    <div className="flex justify-between border-b border-gray-300 pb-1 sm:pb-1.5 text-[#2E6DAE]">
                      <span className="font-bold">SYSTEM TICKET ID</span>
                      <span className="font-extrabold">{submittedRfq?.rfqId}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1 sm:pb-1.5">
                      <span className="opacity-60">REQUISITION OFFICER</span>
                      <span className="font-bold">{submittedRfq?.clientName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1 sm:pb-1.5">
                      <span className="opacity-60">VESSEL / IMO</span>
                      <span className="font-bold">{submittedRfq?.vesselName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-1 sm:pb-1.5">
                      <span className="opacity-60">TARGET HUB</span>
                      <span className="font-bold">{submittedRfq?.destinationPort}</span>
                    </div>
                    {submittedRfq?.items.length > 0 && (
                      <div className="border-b border-gray-300 pb-1 sm:pb-1.5">
                        <span className="opacity-60 block mb-1">REGISTERED CART ITEMS:</span>
                        <ul className="list-disc pl-3 sm:pl-4 space-y-0.5 sm:space-y-1 text-[#00214E]/80">
                          {submittedRfq.items.map((item: any) => (
                            <li key={item.product.id}>
                              {item.product.name} (Qty: {item.quantity}) - IMPA {item.product.impaCode}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <span className="opacity-60 block mb-1">COMMUNICATION DETAILS:</span>
                      <p className="text-[#00214E]/80 italic font-serif text-[10px] sm:text-[11px] bg-white p-2 sm:p-2.5 border border-gray-300">{submittedRfq?.details || 'No additional text specified'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 bg-white border border-[#00214E] text-[#00214E] hover:bg-gray-100 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 min-h-[44px] rounded"
                    >
                      Print Manifest
                    </button>
                    <button 
                      onClick={handleNewRfq}
                      className="flex-1 bg-[#00214E] text-white hover:bg-[#2E6DAE] py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 min-h-[44px] rounded"
                    >
                      Create New RFQ
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - Enhanced Rich Footer */}
      <footer className="bg-[#00214E] text-[#F5F2ED] border-t border-black w-full relative z-10 overflow-hidden">
        {/* Signature Diagonal-Cut Banner Shape: Deep Navy to Steel Blue Gradient */}
        <div 
          className="w-full bg-gradient-to-r from-[#1B4F8C] to-[#2E6DAE] h-10 md:h-14 relative"
          style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' }}
        >
          {/* subtle compass watermark on right of footer top block */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
            <Anchor className="w-8 h-8 text-white rotate-45" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-24 max-w-7xl mx-auto">
        
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 sm:gap-4.5">
              <img 
                src={logo} 
                alt="ZndZ Enterprise Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#2E6DAE]/30 flex-shrink-0 shadow-md"
              />
              <div className="font-serif italic text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F2ED] tracking-tight">ZndZ Enterprise</div>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed max-w-sm">
              Precision procurement and technical shipping support for global maritime fleet operators. Engineered for reliability, built for the challenges of high seas navigation.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://linkedin.com/company/zndz-enterprise" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors cursor-pointer flex items-center justify-center text-[9px] sm:text-xs font-bold">IN</a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors cursor-pointer flex items-center justify-center text-[9px] sm:text-xs font-bold">FB</a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-700 hover:border-[#2E6DAE] hover:text-[#2E6DAE] transition-colors cursor-pointer flex items-center justify-center text-[9px] sm:text-xs font-bold">X</a>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex flex-col gap-3 sm:gap-5">
            <h5 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold text-[#2E6DAE]">Supply Index</h5>
            <ul className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400 font-mono">
              <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Deck Stores</a></li>
              <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Engine Parts</a></li>
              <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">Safety Equipment</a></li>
              <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">ISSA Directory</a></li>
              <li><a href="#catalogue" className="hover:text-white py-1 inline-block transition-colors">IMPA Directory</a></li>
            </ul>
          </div>

<div className="col-span-1 sm:col-span-1 lg:col-span-3 flex flex-col gap-3 sm:gap-5">
            <h5 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold text-[#2E6DAE]">Primary Sourcing Nodes</h5>
            <ul className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400 font-mono">
              <li className="py-0.5">Middle East Hub: Dubai / Abu Dhabi</li>
              <li className="py-0.5">Europe Corridor: Rotterdam / Antwerp</li>
              <li className="py-0.5">Americas Hub: Houston Terminal</li>
              <li className="py-0.5">Asia-Pacific: Singapore Node</li>
              <li className="py-0.5">Mumbai Headquarters: India</li>
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-3 sm:gap-5">
            <h5 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-extrabold text-[#2E6DAE]">Contact Info</h5>
            <ul className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400 font-mono">
              <li className="py-0.5">2A, 1404, SBUT 2, New Hind Mill Colony</li>
              <li className="py-0.5">Mumbai - 400033, Maharashtra, INDIA</li>
              <li className="py-0.5">+91 9619795252</li>
              <li className="py-0.5">saleszndzenterprise@gmail.com</li>
            </ul>
          </div>

        </div>

        <div className="px-4 sm:px-6 md:px-12 py-5 sm:py-8 border-t border-gray-800 text-center text-[9px] sm:text-[10px] text-gray-500 font-mono max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <span>© 2026 ZndZ Enterprise. All Rights Reserved.</span>
            <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 flex-wrap">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="text-gray-700 hidden sm:inline">|</span>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-[9px] sm:text-[10px]"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* REQUISITION BASKET SIDEBAR MODAL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in" onClick={() => setCartOpen(false)}>
          <div 
            className="w-full sm:max-w-md md:max-w-lg bg-[#F5F2ED] h-full shadow-2xl border-l border-[#00214E]/20 flex flex-col justify-between p-4 sm:p-5 md:p-8 animate-slide-left overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div>
              <div className="flex justify-between items-start border-b border-[#00214E]/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold text-[#2E6DAE]">Logistics Desk</span>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-serif italic font-medium">Requisition Basket</h4>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 sm:p-2 border border-[#00214E]/15 hover:bg-[#00214E] hover:text-[#F5F2ED] transition-colors rounded-full min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Basket Content */}
              {cart.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4 font-mono">You have compiled the following technical supplies. Customize quantities or specify custom specs below.</p>
                  
                  <div className="space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.product.id} className="bg-white border border-[#00214E]/10 p-3 sm:p-4 relative group rounded-lg">
                        
                        {/* Remove item absolute */}
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1 hover:bg-blue-50 text-gray-400 hover:text-[#2E6DAE] rounded transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>

                        <div className="flex gap-2 sm:gap-3">
                          <img 
                            src={item.product.imageUrl} 
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover border border-gray-100 flex-shrink-0 rounded" 
                            alt={item.product.name} 
                          />
                          <div className="flex-1 min-w-0 pr-5 sm:pr-6">
                            <span className="text-[8px] sm:text-[9px] font-mono text-[#2E6DAE]">IMPA {item.product.impaCode}</span>
                            <h5 className="text-[11px] sm:text-sm font-semibold truncate text-[#00214E]">{item.product.name}</h5>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">{item.product.category}</p>
                          </div>
                        </div>

                        {/* Adjust qty and specs */}
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-dashed border-[#00214E]/10 flex flex-wrap gap-2 sm:gap-3 items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-2 border border-[#00214E]/15 bg-[#F5F2ED] rounded">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 sm:p-1 px-1.5 sm:px-2.5 hover:bg-[#00214E]/5 text-[10px] sm:text-xs font-bold min-w-[32px] min-h-[32px] flex items-center justify-center"
                            >
                              <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            </button>
                            <span className="text-[10px] sm:text-xs font-mono font-bold w-5 sm:w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 sm:p-1 px-1.5 sm:px-2.5 hover:bg-[#00214E]/5 text-[10px] sm:text-xs font-bold min-w-[32px] min-h-[32px] flex items-center justify-center"
                            >
                              <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            </button>
                          </div>

                          <div className="flex flex-col text-right">
                            <span className="text-[8px] sm:text-[9px] text-gray-400 uppercase">Estimated price</span>
                            <span className="text-[10px] sm:text-xs font-semibold text-[#00214E]">${item.product.priceEstimate * item.quantity}</span>
                          </div>
                        </div>

                        {/* Item custom specs notes */}
                        <div className="mt-1.5 sm:mt-2.5">
                          <input 
                            type="text"
                            placeholder="Add specific dimension, material grade notes..."
                            value={item.customNotes || ''}
                            onChange={(e) => updateItemNotes(item.product.id, e.target.value)}
                            className="w-full bg-[#F5F2ED]/50 border border-[#00214E]/10 p-1.5 sm:p-2 text-[9px] sm:text-[10px] font-mono focus:outline-none focus:border-[#2E6DAE] min-h-[36px] rounded"
                          />
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Summary math */}
                  <div className="border-t border-[#00214E]/10 pt-3 sm:pt-4 mt-4 sm:mt-6">
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono font-bold mb-1.5 sm:mb-2">
                      <span className="opacity-60">TOTAL DIRECT ITEMS</span>
                      <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-mono font-extrabold border-b border-[#00214E]/10 pb-3 sm:pb-4 mb-3 sm:mb-4">
                      <span className="text-[#2E6DAE]">ESTIMATED VALUE</span>
                      <span className="text-sm sm:text-base text-[#00214E]">${totalCartValue}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 sm:py-16 text-center flex flex-col items-center justify-center gap-3 sm:gap-4 border border-dashed border-[#00214E]/10 bg-white p-4 sm:p-6 rounded-lg">
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 animate-spin" />
                  <h5 className="text-sm sm:text-base font-serif italic text-gray-800">Your basket is currently empty</h5>
                  <p className="text-[10px] sm:text-xs text-gray-400 max-w-xs leading-relaxed">Add high-fidelity marine hardware and technical items from the supply catalogue to assemble an operational RFQ.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#00214E] text-white hover:bg-[#2E6DAE] text-[9px] sm:text-[10px] uppercase tracking-wider font-bold min-h-[44px] rounded"
                  >
                    Browse Directory
                  </button>
                </div>
              )}
            </div>

            {/* Modal actions */}
            {cart.length > 0 && (
              <div className="mt-auto border-t border-[#00214E]/10 pt-3 sm:pt-4 flex flex-col gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    handlePopulateFormWithCart();
                    setCartOpen(false);
                  }}
                  className="w-full bg-[#2E6DAE] text-white py-3 sm:py-3.5 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-center transition-all duration-300 hover:bg-[#2E6DAE]/90 min-h-[48px] rounded"
                >
                  Populate RFQ Inquiry Form
                </button>
                <button
                  onClick={() => setCart([])}
                  className="w-full bg-white border border-[#00214E]/10 text-gray-500 py-3 sm:py-3.5 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 hover:text-[#2E6DAE] hover:border-[#2E6DAE] min-h-[48px] rounded"
                >
                  Clear Requisition Cart
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
