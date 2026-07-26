import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

// Node.js FileReader polyfill required for GLTFExporter
global.FileReader = class FileReader {
  readAsDataURL(blob) {
    blob.arrayBuffer().then(buf => {
      const base64 = Buffer.from(buf).toString('base64');
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

function createContainerShipScene() {
  const scene = new THREE.Scene();
  scene.name = "ContainerShipVessel";

  // --- MATERIALS (High-fidelity PBR) ---
  const matHullRed = new THREE.MeshStandardMaterial({
    name: "Hull_AntiFouling_Red",
    color: 0x801A1A,
    roughness: 0.5,
    metalness: 0.15
  });

  const matHullNavy = new THREE.MeshStandardMaterial({
    name: "Hull_Navy_Blue",
    color: 0x001B3F,
    roughness: 0.3,
    metalness: 0.4
  });

  const matDeckDark = new THREE.MeshStandardMaterial({
    name: "Deck_Steel_Dark",
    color: 0x1E293B,
    roughness: 0.65,
    metalness: 0.2
  });

  const matSuperstructureWhite = new THREE.MeshStandardMaterial({
    name: "Superstructure_White",
    color: 0xF1F5F9,
    roughness: 0.25,
    metalness: 0.1
  });

  const matGlass = new THREE.MeshStandardMaterial({
    name: "Bridge_Glass",
    color: 0x0F172A,
    roughness: 0.05,
    metalness: 0.95
  });

  const matSteelGrey = new THREE.MeshStandardMaterial({
    name: "Machinery_Steel",
    color: 0x475569,
    roughness: 0.4,
    metalness: 0.8
  });

  const matLifeboatOrange = new THREE.MeshStandardMaterial({
    name: "Lifeboat_Orange",
    color: 0xEA580C,
    roughness: 0.3,
    metalness: 0.1
  });

  const matFunnelBlue = new THREE.MeshStandardMaterial({
    name: "Funnel_ZndZ_Blue",
    color: 0x00214E,
    roughness: 0.3,
    metalness: 0.3
  });

  const matAccentBlue = new THREE.MeshStandardMaterial({
    name: "Accent_Bright_Blue",
    color: 0x2E6DAE,
    roughness: 0.3,
    metalness: 0.4
  });

  const matBrassGold = new THREE.MeshStandardMaterial({
    name: "Brass_Fittings",
    color: 0xD97706,
    roughness: 0.2,
    metalness: 0.9
  });

  // Shipping Line Container Colors (ISO standard PBR finishes)
  const containerLineMaterials = [
    new THREE.MeshStandardMaterial({ name: "ISO_Container_Evergreen", color: 0x006B3F, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_Maersk", color: 0x2596BE, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_MSC", color: 0xEAB308, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_CMACGM", color: 0x1D4ED8, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_Hapag", color: 0xEA580C, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_ONE", color: 0xDB2777, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_Cosco", color: 0x0284C7, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ name: "ISO_Container_HamburgSud", color: 0xDC2626, roughness: 0.4, metalness: 0.2 }),
  ];

  const shipRoot = new THREE.Group();
  shipRoot.name = "Ship_Root";
  scene.add(shipRoot);

  // ==========================================
  // 1. CURVED HULL GEOMETRY (Realistic Lines)
  // ==========================================
  const hullGroup = new THREE.Group();
  hullGroup.name = "Hull_Group";

  // Lower Hull - Red Anti-fouling Draft
  const lowerHullShape = new THREE.Shape();
  lowerHullShape.moveTo(0, -6.8);
  lowerHullShape.quadraticCurveTo(1.3, -6.0, 1.35, -4.5);
  lowerHullShape.lineTo(1.35, 4.5);
  lowerHullShape.quadraticCurveTo(1.2, 5.8, 0, 6.4);
  lowerHullShape.quadraticCurveTo(-1.2, 5.8, -1.35, 4.5);
  lowerHullShape.lineTo(-1.35, -4.5);
  lowerHullShape.quadraticCurveTo(-1.3, -6.0, 0, -6.8);

  const extrudeSettingsLower = {
    steps: 1,
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.1,
    bevelSegments: 3
  };

  const lowerHullGeom = new THREE.ExtrudeGeometry(lowerHullShape, extrudeSettingsLower);
  lowerHullGeom.rotateX(Math.PI / 2);
  const lowerHullMesh = new THREE.Mesh(lowerHullGeom, matHullRed);
  lowerHullMesh.position.set(0, 0.2, 0);
  lowerHullMesh.castShadow = true;
  lowerHullMesh.receiveShadow = true;
  hullGroup.add(lowerHullMesh);

  // Bulbous Bow (Spheroid extending under bow waterline)
  const bulbGeom = new THREE.SphereGeometry(0.55, 24, 24);
  bulbGeom.scale(0.8, 0.7, 2.2);
  const bulbMesh = new THREE.Mesh(bulbGeom, matHullRed);
  bulbMesh.position.set(0, 0.2, -6.5);
  bulbMesh.castShadow = true;
  hullGroup.add(bulbMesh);

  // Upper Hull - Navy Blue Topsides
  const upperHullShape = new THREE.Shape();
  upperHullShape.moveTo(0, -7.0); // Bow tip
  upperHullShape.quadraticCurveTo(1.45, -6.2, 1.48, -4.5);
  upperHullShape.lineTo(1.48, 4.8);
  upperHullShape.quadraticCurveTo(1.3, 6.2, 0, 6.6); // Stern transom
  upperHullShape.quadraticCurveTo(-1.3, 6.2, -1.48, 4.8);
  upperHullShape.lineTo(-1.48, -4.5);
  upperHullShape.quadraticCurveTo(-1.45, -6.2, 0, -7.0);

  const extrudeSettingsUpper = {
    steps: 1,
    depth: 0.75,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 2
  };

  const upperHullGeom = new THREE.ExtrudeGeometry(upperHullShape, extrudeSettingsUpper);
  upperHullGeom.rotateX(Math.PI / 2);
  const upperHullMesh = new THREE.Mesh(upperHullGeom, matHullNavy);
  upperHullMesh.position.set(0, 0.9, 0);
  upperHullMesh.castShadow = true;
  upperHullMesh.receiveShadow = true;
  hullGroup.add(upperHullMesh);

  // Deck Surface
  const deckShape = new THREE.Shape();
  deckShape.moveTo(0, -6.8);
  deckShape.quadraticCurveTo(1.4, -6.0, 1.42, -4.5);
  deckShape.lineTo(1.42, 4.7);
  deckShape.quadraticCurveTo(1.2, 6.0, 0, 6.4);
  deckShape.quadraticCurveTo(-1.2, 6.0, -1.42, 4.7);
  deckShape.lineTo(-1.42, -4.5);
  deckShape.quadraticCurveTo(-1.4, -6.0, 0, -6.8);

  const deckGeom = new THREE.ExtrudeGeometry(deckShape, { depth: 0.08, bevelEnabled: false });
  deckGeom.rotateX(Math.PI / 2);
  const deckMesh = new THREE.Mesh(deckGeom, matDeckDark);
  deckMesh.position.set(0, 0.94, 0);
  deckMesh.receiveShadow = true;
  hullGroup.add(deckMesh);

  // Forecastle Breakwater V-Shield (Bow Spray Deflector)
  const breakwaterGeom = new THREE.BoxGeometry(2.4, 0.25, 0.08);
  const breakwaterMesh = new THREE.Mesh(breakwaterGeom, matSuperstructureWhite);
  breakwaterMesh.position.set(0, 1.08, -5.8);
  breakwaterMesh.rotation.x = -0.2;
  hullGroup.add(breakwaterMesh);

  // Anchor Hawse Pipes & Anchors
  [-1.38, 1.38].forEach(x => {
    const hawseGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 12);
    hawseGeom.rotateZ(Math.PI / 2 * (x > 0 ? 1 : -1));
    const hawseMesh = new THREE.Mesh(hawseGeom, matSteelGrey);
    hawseMesh.position.set(x, 0.65, -5.9);
    hullGroup.add(hawseMesh);

    // Anchor Flukes
    const anchorGeom = new THREE.BoxGeometry(0.1, 0.35, 0.25);
    const anchorMesh = new THREE.Mesh(anchorGeom, matSteelGrey);
    anchorMesh.position.set(x * 1.05, 0.55, -5.9);
    hullGroup.add(anchorMesh);
  });

  shipRoot.add(hullGroup);

  // ==========================================
  // 2. CONTAINER STACKS & CELL GUIDES
  // ==========================================
  const containerGroup = new THREE.Group();
  containerGroup.name = "Containers_Group";

  // Create a realistic detailed container mesh template
  function createDetailedContainer(width, height, length, mat) {
    const cont = new THREE.Group();
    // Main Body
    const bodyGeom = new THREE.BoxGeometry(width, height, length);
    const body = new THREE.Mesh(bodyGeom, mat);
    body.castShadow = true;
    body.receiveShadow = true;
    cont.add(body);

    // Corner Castings (ISO standard steel corner blocks)
    const cornerGeom = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    const dx = width / 2;
    const dy = height / 2;
    const dz = length / 2;
    [
      [-dx, -dy, -dz], [dx, -dy, -dz], [-dx, dy, -dz], [dx, dy, -dz],
      [-dx, -dy, dz],  [dx, -dy, dz],  [-dx, dy, dz],  [dx, dy, dz]
    ].forEach(p => {
      const corner = new THREE.Mesh(cornerGeom, matSteelGrey);
      corner.position.set(p[0], p[1], p[2]);
      cont.add(corner);
    });

    return cont;
  }

  // Layout container bays on deck coamings
  const bayZPositions = [-4.6, -3.3, -2.0, -0.7, 0.6, 1.9];
  const rowXPositions = [-0.98, -0.33, 0.33, 0.98];

  bayZPositions.forEach((zPos, bayIdx) => {
    rowXPositions.forEach((xPos, rowIdx) => {
      // Vary stack height (3 to 5 containers high)
      const stackCount = 3 + Math.floor((Math.sin(bayIdx * 2.1 + rowIdx) + 1) * 1.2);
      
      for (let level = 0; level < stackCount; level++) {
        const mat = containerLineMaterials[(bayIdx * 3 + rowIdx * 2 + level) % containerLineMaterials.length];
        const is40Ft = (bayIdx % 2 === 0);
        const contLength = is40Ft ? 1.22 : 0.61;
        const contWidth = 0.62;
        const contHeight = 0.48;

        const container = createDetailedContainer(contWidth, contHeight, contLength, mat);
        
        // Slight natural stacking alignment tolerance
        const jitterX = (Math.random() - 0.5) * 0.015;
        const jitterZ = (Math.random() - 0.5) * 0.02;

        container.position.set(
          xPos + jitterX,
          1.22 + level * (contHeight + 0.02),
          zPos + jitterZ
        );
        containerGroup.add(container);
      }
    });
  });

  shipRoot.add(containerGroup);

  // ==========================================
  // 3. STERN SUPERSTRUCTURE / BRIDGE (Multi-tier)
  // ==========================================
  const bridgeGroup = new THREE.Group();
  bridgeGroup.name = "Superstructure_Bridge_Group";
  bridgeGroup.position.set(0, 1.0, 3.8); // Located at aft section

  // Deck 1 (Main Accommodation Level)
  const deck1Geom = new THREE.BoxGeometry(2.5, 0.6, 2.0);
  const deck1Mesh = new THREE.Mesh(deck1Geom, matSuperstructureWhite);
  deck1Mesh.position.set(0, 0.3, 0);
  deck1Mesh.castShadow = true;
  deck1Mesh.receiveShadow = true;
  bridgeGroup.add(deck1Mesh);

  // Deck 2 (Officer Mess & Cabins)
  const deck2Geom = new THREE.BoxGeometry(2.3, 0.55, 1.8);
  const deck2Mesh = new THREE.Mesh(deck2Geom, matSuperstructureWhite);
  deck2Mesh.position.set(0, 0.88, 0);
  deck2Mesh.castShadow = true;
  bridgeGroup.add(deck2Mesh);

  // Deck 3 (Captain & Chief Engineer Deck)
  const deck3Geom = new THREE.BoxGeometry(2.1, 0.5, 1.6);
  const deck3Mesh = new THREE.Mesh(deck3Geom, matSuperstructureWhite);
  deck3Mesh.position.set(0, 1.4, 0);
  deck3Mesh.castShadow = true;
  bridgeGroup.add(deck3Mesh);

  // Navigation Bridge Level (Top Command Tier with Extended Wings)
  const bridgeWidth = 2.75; // Extends past hull beam for docking line-of-sight
  const bridgeGeom = new THREE.BoxGeometry(bridgeWidth, 0.52, 1.4);
  const bridgeMesh = new THREE.Mesh(bridgeGeom, matSuperstructureWhite);
  bridgeMesh.position.set(0, 1.91, -0.05);
  bridgeMesh.castShadow = true;
  bridgeGroup.add(bridgeMesh);

  // Navigation Glass Windows (Curved dark glazing ribbon)
  const glassFrontGeom = new THREE.BoxGeometry(bridgeWidth - 0.1, 0.28, 0.05);
  const glassFront = new THREE.Mesh(glassFrontGeom, matGlass);
  glassFront.position.set(0, 1.95, -0.73);
  bridgeGroup.add(glassFront);

  // Port & Starboard Window Ribbons
  [-bridgeWidth / 2 + 0.02, bridgeWidth / 2 - 0.02].forEach(x => {
    const glassSideGeom = new THREE.BoxGeometry(0.05, 0.28, 1.3);
    const glassSide = new THREE.Mesh(glassSideGeom, matGlass);
    glassSide.position.set(x, 1.95, -0.05);
    bridgeGroup.add(glassSide);
  });

  // Bridge Roof Deck
  const roofGeom = new THREE.BoxGeometry(2.4, 0.08, 1.5);
  const roofMesh = new THREE.Mesh(roofGeom, matSuperstructureWhite);
  roofMesh.position.set(0, 2.21, -0.05);
  bridgeGroup.add(roofMesh);

  // ==========================================
  // 4. RADAR MAST & SATCOM DOMES
  // ==========================================
  const mastGroup = new THREE.Group();
  mastGroup.name = "Radar_Mast_Group";
  mastGroup.position.set(0, 2.25, -0.2);

  // Main Lattice Mast Column
  const mastPillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.08, 1.1, 8),
    matSteelGrey
  );
  mastPillar.position.set(0, 0.55, 0);
  mastGroup.add(mastPillar);

  // Radar Yardarm (Horizontal platform)
  const yardarm = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.05, 0.12),
    matSteelGrey
  );
  yardarm.position.set(0, 0.85, 0);
  mastGroup.add(yardarm);

  // Rotating Radar Scanner (Target for animation in R3F)
  const radarScannerGroup = new THREE.Group();
  radarScannerGroup.name = "Rotating_Radar_Scanner";
  radarScannerGroup.position.set(0, 1.15, 0);

  const scannerBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.06, 0.1),
    matAccentBlue
  );
  radarScannerGroup.add(scannerBar);
  mastGroup.add(radarScannerGroup);

  // Satcom VSAT Spherical Radomes
  [-0.45, 0.45].forEach(x => {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      matSuperstructureWhite
    );
    dome.position.set(x, 0.88, 0);
    mastGroup.add(dome);
  });

  bridgeGroup.add(mastGroup);

  // ==========================================
  // 5. EXHAUST FUNNEL WITH BRAND LOGO
  // ==========================================
  const funnelGroup = new THREE.Group();
  funnelGroup.position.set(0, 1.4, 0.65);

  const funnelCasing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.38, 1.2, 16),
    matFunnelBlue
  );
  funnelCasing.castShadow = true;
  funnelGroup.add(funnelCasing);

  // ZndZ Blue Stripe Band
  const stripe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.28, 16),
    matAccentBlue
  );
  stripe.position.set(0, 0.2, 0);
  funnelGroup.add(stripe);

  // Dual Exhaust Stacks
  [-0.1, 0.1].forEach(x => {
    const stack = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12),
      matSteelGrey
    );
    stack.position.set(x, 0.7, 0);
    funnelGroup.add(stack);
  });

  bridgeGroup.add(funnelGroup);

  // ==========================================
  // 6. LIFEBOATS & DAVITS (Port & Starboard)
  // ==========================================
  [-1.25, 1.25].forEach(x => {
    const davitGroup = new THREE.Group();
    davitGroup.position.set(x, 0.9, 0.1);

    // Steel Davit Arm
    const davitArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.45, 0.08),
      matSteelGrey
    );
    davitArm.rotation.z = x > 0 ? -0.2 : 0.2;
    davitGroup.add(davitArm);

    // Fully Enclosed Survival Craft (Lifeboat)
    const lifeboatGeom = new THREE.CapsuleGeometry(0.12, 0.45, 8, 12);
    lifeboatGeom.rotateX(Math.PI / 2);
    const lifeboat = new THREE.Mesh(lifeboatGeom, matLifeboatOrange);
    lifeboat.position.set(x > 0 ? 0.08 : -0.08, -0.05, 0);
    lifeboat.castShadow = true;
    davitGroup.add(lifeboat);

    bridgeGroup.add(davitGroup);
  });

  shipRoot.add(bridgeGroup);

  // ==========================================
  // 7. BOW CRANE & DECK FITTINGS
  // ==========================================
  const fwdCraneGroup = new THREE.Group();
  fwdCraneGroup.position.set(0, 1.0, -5.3);

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.2, 0.4, 12),
    matAccentBlue
  );
  fwdCraneGroup.add(pedestal);

  const jibArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 1.2, 8),
    matAccentBlue
  );
  jibArm.rotation.x = 0.5;
  jibArm.position.set(0, 0.5, 0.4);
  fwdCraneGroup.add(jibArm);

  shipRoot.add(fwdCraneGroup);

  // Perimeter Safety Railings (Forecastle & Stern)
  const railMat = matSteelGrey;
  const railGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6);
  
  // Forecastle railing stanchions
  for (let i = -1.2; i <= 1.2; i += 0.4) {
    const post = new THREE.Mesh(railGeom, railMat);
    post.position.set(i, 1.08, -6.2);
    shipRoot.add(post);
  }

  // Navigation Lights
  // Starboard (Green)
  const stbdLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x10B981 })
  );
  stbdLight.position.set(1.4, 1.95, -0.73);
  bridgeGroup.add(stbdLight);

  // Port (Red)
  const portLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xEF4444 })
  );
  portLight.position.set(-1.4, 1.95, -0.73);
  bridgeGroup.add(portLight);

  return scene;
}

// Generate & Export GLB File
console.log('Generating realistic 3D Container Ship GLB model...');
const scene = createContainerShipScene();
const exporter = new GLTFExporter();

const outputDir = path.resolve(process.cwd(), 'public/models');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'container_ship.glb');

exporter.parse(
  scene,
  (gltf) => {
    fs.writeFileSync(outputPath, Buffer.from(gltf));
    const stats = fs.statSync(outputPath);
    console.log(`✅ Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    process.exit(0);
  },
  (err) => {
    console.error('❌ Error exporting GLB:', err);
    process.exit(1);
  },
  { binary: true }
);
