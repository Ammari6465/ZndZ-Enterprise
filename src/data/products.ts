import { Product } from '../types';

export const PRODUCT_INVENTORY: Product[] = [
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
