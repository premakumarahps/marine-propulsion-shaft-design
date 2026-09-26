/**
 * Marine Propulsion Shaft Comprehensive Design Project (CDP - MT3201)
 * Department of Materials Science and Engineering, University of Moratuwa
 * Group 01 • December 2025
 * 
 * Lead Student Contributor Highlighted:
 * H.P.S. PREMAKUMARA (Index: 210494D)
 * - Task 01: Environmental Analysis (Seawater chemistry, dissolved O2, salinity, chloride degradation)
 * - Task 02: Material Selection via ANSYS Granta EduPack (Ashby charts, performance indices)
 * - Task 04: 3D CAD Modeling & 2D Engineering Drawings (Solid Edge assembly, M95x4 thread, taper, splines)
 * - Task 06: Finite Element Analysis (FEA) in Abaqus (7-Zone mesh, Year 0 vs Year 10 corroded state, micro-pit fracture mechanics)
 */

export interface ShaftOperationalSpecs {
  shaftLengthMm: number;
  outerDiameterMm: number;
  innerDiameterMm: number;
  enginePowerKw: number;
  rotationalSpeedRpm: number;
  designTorqueKNm: number;
  axialThrustKn: number;
  nutPreloadMpa: number;
  materialName: string;
  designLifeYears: number;
  corrosionRateMmPerYear: number;
  operatingEnvironment: string;
  waterTemperatureC: number;
  salinityPpt: number;
  chlorideConcentrationPpm: number;
}

export const SHAFT_OPERATIONAL_SPECS: ShaftOperationalSpecs = {
  shaftLengthMm: 1600,
  outerDiameterMm: 125,
  innerDiameterMm: 60,
  enginePowerKw: 300,
  rotationalSpeedRpm: 225,
  designTorqueKNm: 12.64, // 12,640 N*m
  axialThrustKn: 34.9, // 34,900 N
  nutPreloadMpa: -337.5, // Tension on M95x4 face
  materialName: 'Duplex Stainless Steel 2205 (UNS S31803 / EN 1.4462)',
  designLifeYears: 10,
  corrosionRateMmPerYear: 0.2, // 2.0 mm radius loss over 10 years without protection
  operatingEnvironment: 'Seawater Immersion & Splash Zone (High Turbidity & Biofouling)',
  waterTemperatureC: 25,
  salinityPpt: 35,
  chlorideConcentrationPpm: 19000
};

export interface MaterialCandidate {
  id: string;
  name: string;
  category: string;
  yieldStrengthMpa: number;
  tensileStrengthMpa: number;
  fatigueStrengthMpa: number; // At 10^7 cycles
  densityKgM3: number;
  youngsModulusGpa: number;
  shearModulusGpa: number;
  pren: number; // Pitting Resistance Equivalent Number
  relativeCostPerKg: number;
  sccResistance: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  machinabilityRating: 'Good' | 'Moderate' | 'Difficult';
  weldability: 'Excellent' | 'Good' | 'Moderate' | 'Fair' | 'Poor';
  status: 'Selected' | 'Shortlisted' | 'Filtered Out';
  rankingSummary: string;
}

export const MATERIAL_CANDIDATES: MaterialCandidate[] = [
  {
    id: 'duplex_2205',
    name: 'Duplex Stainless Steel AISI 2205 (Annealed)',
    category: 'Duplex Stainless Steel (Austenitic-Ferritic 50/50)',
    yieldStrengthMpa: 460,
    tensileStrengthMpa: 680,
    fatigueStrengthMpa: 360,
    densityKgM3: 7800,
    youngsModulusGpa: 200,
    shearModulusGpa: 80,
    pren: 35.0, // Cr: 22%, Mo: 3.1%, N: 0.17% -> 22 + 3.3(3.1) + 16(0.17) = 35.0
    relativeCostPerKg: 6.5,
    sccResistance: 'Excellent',
    machinabilityRating: 'Moderate',
    weldability: 'Good',
    status: 'Selected',
    rankingSummary: 'WINNER: Optimal balance of high yield strength, superior pitting resistance (PREN > 30), high fatigue endurance, and moderate cost. Chosen as final shaft material.'
  },
  {
    id: 'austenitic_316lvm',
    name: 'Austenitic Stainless Steel AISI 316LVM (Cold Worked)',
    category: 'High-Purity Vacuum-Melted Austenitic Steel',
    yieldStrengthMpa: 690,
    tensileStrengthMpa: 860,
    fatigueStrengthMpa: 414,
    densityKgM3: 8000,
    youngsModulusGpa: 193,
    shearModulusGpa: 75,
    pren: 26.5, // Cr: 17.5%, Mo: 2.7% -> PREN ~ 26.5 < 30
    relativeCostPerKg: 7.2,
    sccResistance: 'Fair',
    machinabilityRating: 'Moderate',
    weldability: 'Good',
    status: 'Shortlisted',
    rankingSummary: 'Highest mechanical yield and fatigue strength, but PREN lies below the critical marine threshold (PREN < 30). Prone to crevice corrosion under marine fouling.'
  },
  {
    id: 'illium_98',
    name: 'Ni-Cr-Mo Superalloy (ILLIUM 98 / Inconel 625)',
    category: 'Nickel-Chromium-Molybdenum Superalloy',
    yieldStrengthMpa: 380,
    tensileStrengthMpa: 720,
    fatigueStrengthMpa: 290,
    densityKgM3: 8440,
    youngsModulusGpa: 205,
    shearModulusGpa: 81,
    pren: 52.0,
    relativeCostPerKg: 38.0,
    sccResistance: 'Excellent',
    machinabilityRating: 'Difficult',
    weldability: 'Good',
    status: 'Shortlisted',
    rankingSummary: 'Impenetrable pitting resistance (PREN 52), but excessively expensive (6x cost of Duplex 2205), lower yield strength, and high mass density.'
  },
  {
    id: 'carbon_steel_1045',
    name: 'Medium Carbon Steel AISI 1045 (Quenched & Tempered)',
    category: 'Traditional Structural Carbon Steel',
    yieldStrengthMpa: 450,
    tensileStrengthMpa: 620,
    fatigueStrengthMpa: 270,
    densityKgM3: 7850,
    youngsModulusGpa: 207,
    shearModulusGpa: 80,
    pren: 0.0,
    relativeCostPerKg: 1.8,
    sccResistance: 'Poor',
    machinabilityRating: 'Good',
    weldability: 'Good',
    status: 'Filtered Out',
    rankingSummary: 'Economical and easy to machine, but catastrophic corrosion in seawater (corrosion rate > 1.0 mm/yr) without heavy clad sleeves.'
  },
  {
    id: 'monel_400',
    name: 'Nickel-Copper Alloy Monel 400',
    category: 'Ni-Cu Solid Solution Alloy',
    yieldStrengthMpa: 280,
    tensileStrengthMpa: 550,
    fatigueStrengthMpa: 240,
    densityKgM3: 8800,
    youngsModulusGpa: 179,
    shearModulusGpa: 66,
    pren: 18.0,
    relativeCostPerKg: 28.0,
    sccResistance: 'Excellent',
    machinabilityRating: 'Moderate',
    weldability: 'Good',
    status: 'Filtered Out',
    rankingSummary: 'Excellent general corrosion resistance, but low yield strength (280 MPa) requires excessively bulky shaft diameter; very high raw material cost.'
  },
  {
    id: 'ti_6al_4v',
    name: 'Titanium Grade 5 (Ti-6Al-4V Annealed)',
    category: 'Alpha-Beta Titanium Alloy',
    yieldStrengthMpa: 880,
    tensileStrengthMpa: 950,
    fatigueStrengthMpa: 510,
    densityKgM3: 4430,
    youngsModulusGpa: 114,
    shearModulusGpa: 44,
    pren: 90.0,
    relativeCostPerKg: 65.0,
    sccResistance: 'Excellent',
    machinabilityRating: 'Difficult',
    weldability: 'Moderate',
    status: 'Filtered Out',
    rankingSummary: 'Superb strength-to-weight ratio and immune to seawater corrosion, but excessively low shear modulus (44 GPa) causes extreme torsional twist and prohibitive cost.'
  }
];

export interface FeaMeshZone {
  zoneNumber: number;
  name: string;
  seedSizeMm: number;
  description: string;
  criticality: 'Hotspot' | 'High' | 'Medium' | 'Low';
}

export const FEA_7_ZONES: FeaMeshZone[] = [
  { zoneNumber: 1, name: 'Thread Region (M95 × 4 LH)', seedSizeMm: 5.0, description: 'Receives retaining nut tension preload (-337.5 MPa).', criticality: 'High' },
  { zoneNumber: 2, name: 'Spline & Taper Transition (Hotspot)', seedSizeMm: 1.0, description: 'External spline fillet root. 1.0 mm local refinement ensures 5 elements across 5 mm fillet radius.', criticality: 'Hotspot' },
  { zoneNumber: 3, name: 'Buffer Transition Zone', seedSizeMm: 8.0, description: 'Prevents abrupt mesh size changes between hotspot (3 mm) and bearing seat.', criticality: 'Medium' },
  { zoneNumber: 4, name: 'Bearing 1 Seat (Thrust Bearing)', seedSizeMm: 5.0, description: 'Constrained radially (U2, U3) and axially (U1). Absorbs 34.9 kN propeller thrust.', criticality: 'High' },
  { zoneNumber: 5, name: 'Aft Mid-Span Uniform Shaft', seedSizeMm: 20.0, description: 'Uniform nominal stress section. Coarse mesh saves degrees of freedom.', criticality: 'Low' },
  { zoneNumber: 6, name: 'Bearing 2 Seat (Support Bearing)', seedSizeMm: 5.0, description: 'Constrained radially (U2, U3) with free axial translation (U1).', criticality: 'High' },
  { zoneNumber: 7, name: 'Forward Span & Flange Connection', seedSizeMm: 20.0, description: 'Links to engine intermediate shaft with 6 fitted bolts transmitting 12.64 kNm torque.', criticality: 'Low' }
];

export interface FeaStressComparison {
  metric: string;
  year0Healthy: number;
  year10Corroded: number;
  unit: string;
  deltaPercent: number;
  interpretation: string;
}

export const FEA_STRESS_COMPARISON: FeaStressComparison[] = [
  {
    metric: 'Outer Diameter (OD)',
    year0Healthy: 125.0,
    year10Corroded: 121.0,
    unit: 'mm',
    deltaPercent: -3.2,
    interpretation: 'Loss of 2.0 mm on radius due to uniform corrosion at 0.2 mm/yr over 10-year design life.'
  },
  {
    metric: 'Cross-Sectional Area',
    year0Healthy: 9444.4,
    year10Corroded: 8684.6,
    unit: 'mm²',
    deltaPercent: -8.0,
    interpretation: 'Hollow shaft cross section reduction elevates nominal shear and axial stresses.'
  },
  {
    metric: 'Polar Moment of Inertia (J)',
    year0Healthy: 2.27e7,
    year10Corroded: 1.98e7,
    unit: 'mm⁴',
    deltaPercent: -12.8,
    interpretation: 'Reduction in torsional rigidity amplifies maximum surface shear stresses.'
  },
  {
    metric: 'Nominal Surface Stress',
    year0Healthy: 105.2,
    year10Corroded: 121.5,
    unit: 'MPa',
    deltaPercent: +15.5,
    interpretation: 'Stress level in uniform shaft spans under 12.64 kNm torque and 34.9 kN thrust.'
  },
  {
    metric: 'Peak Von Mises Stress (Hotspot Node)',
    year0Healthy: 92.03,
    year10Corroded: 114.20,
    unit: 'MPa',
    deltaPercent: +24.1,
    interpretation: 'Macro-stress at root of external spline fillet. Still below yield (450 MPa) if micro-defects are ignored.'
  },
  {
    metric: 'Effective Peak Stress at Pit Root (Kf = 2.6)',
    year0Healthy: 92.03,
    year10Corroded: 296.92,
    unit: 'MPa',
    deltaPercent: +222.6,
    interpretation: 'Catastrophic micro-pit stress concentration (Kt = 3.0, q = 0.8, Kf = 2.6). Exceeds seawater fatigue limit!'
  },
  {
    metric: 'Seawater Corrected Fatigue Limit (Se,corr)',
    year0Healthy: 272.0,
    year10Corroded: 136.0,
    unit: 'MPa',
    deltaPercent: -50.0,
    interpretation: 'Marin factors drop due to pitted surface finish (ka = 0.5) and chloride environment.'
  }
];

export interface TeamMember {
  name: string;
  index: string;
  role: string;
  primaryTasks: string[];
  keyOutputs: string[];
  isHighlighted?: boolean;
}

export const GROUP_01_ROSTER: TeamMember[] = [
  {
    name: 'H.P.S. PREMAKUMARA',
    index: '210494D',
    role: 'Lead Materials, CAD & FEA Engineer',
    primaryTasks: [
      'Task 01: Marine Environmental Analysis (seawater salinity, dissolved O2, biofouling)',
      'Task 02: Material Selection via ANSYS Granta EduPack (Ashby plots, derived performance indices)',
      'Task 04: 3D CAD Modeling & Engineering Drawing (Solid Edge assembly, splines, thread)',
      'Task 06: Finite Element Analysis (FEA) in Abaqus (7-Zone mesh, Year 0 vs 10, pitting fatigue)'
    ],
    keyOutputs: [
      'Authored Environmental Analysis Chapter (Section 03.1)',
      'Constructed ANSYS Granta selection matrix filtering 1,900+ alloys to select Duplex 2205',
      'Created 3D Solid Edge parametric assembly with Boolean-subtracted Dummy Hub',
      'Engineered 7-Zone Abaqus FEA model (1.2M elements) capturing 92.03 -> 114.2 MPa stress rise and 296.9 MPa micro-pit spike'
    ],
    isHighlighted: true
  },
  {
    name: 'D.A.W.I. UDAYAKANTHA',
    index: '210660J',
    role: 'Group Leader & Mechanical Design Lead',
    primaryTasks: [
      'Task 03: Shaft geometry design and torque transmission calculations',
      'Task 08: Quality Assurance and Safety Plan compilation',
      'Project coordination, time plan, meeting scheduling, and report integration'
    ],
    keyOutputs: [
      'Determined shaft OD=125 mm, ID=60 mm, torque 12.64 kNm, engine power 300 kW',
      'Validated shaft compliance against IACS UR M68.4 and DNV-CG-0038 rules',
      'Compiled 5 progress reports and the 208-page master final report'
    ]
  },
  {
    name: 'K.L. THEMIYA',
    index: '210640A',
    role: 'Corrosion Mechanisms & Protection Specialist',
    primaryTasks: [
      'Task 01: Identification of marine corrosion mechanisms (galvanic, crevice, pitting, MIC)',
      'Task 02: Material selection support with corrosion databases',
      'Task 05: Cathodic protection strategy evaluation (SACP vs ICCP)'
    ],
    keyOutputs: [
      'Corrosion mechanisms report and failure mode analysis',
      'Assisted in Ashby chart screening and candidate alloy ranking',
      'Cathodic protection calculations and slip-ring grounding evaluation'
    ]
  },
  {
    name: 'H.M.T. DANINDI',
    index: '210094C',
    role: 'Group Secretary & Surface Treatments Specialist',
    primaryTasks: [
      'Group documentation, meeting minutes recording',
      'Task 05: Coating systems and surface treatment evaluation',
      'Background research on marine propulsion shaft standards'
    ],
    keyOutputs: [
      'Documentation of 5 formal group meeting minutes',
      'Formulation of 3-stage surface treatment protocol (epoxy + PU + antifouling + MoS2 DFL)'
    ]
  },
  {
    name: 'W.H.M.A.D. DHARMADASA',
    index: '210121J',
    role: 'Manufacturing Process Engineer',
    primaryTasks: [
      'Task 07: Manufacturing process design (rough turning, deep-hole drilling, solution annealing)',
      'CNC machining strategy for taper, threads, and spline broaching'
    ],
    keyOutputs: [
      'Detailed 12-step manufacturing roadmap from forged billet to final shaft'
    ]
  },
  {
    name: 'A.K.R. DILSHAN',
    index: '210127H',
    role: 'Mechanical Analysis & Bearing Alignment',
    primaryTasks: [
      'Shaft whirling and critical speed calculations',
      'Stern tube bearing alignment and lubrication analysis'
    ],
    keyOutputs: [
      'Lateral vibration natural frequency verification avoiding resonance with 225 RPM shaft'
    ]
  },
  {
    name: 'B.N. KULATHUNGA',
    index: '210308N',
    role: 'Quality Assurance & Non-Destructive Testing',
    primaryTasks: [
      'Task 08: Non-Destructive Examination (NDE) protocols',
      'Ultrasonic testing (UT), dye penetrant (DPI), magnetic particle (MPI), and runout checks'
    ],
    keyOutputs: [
      'Class-compliant inspection and quality assurance verification plan'
    ]
  }
];

export interface ExtractedFigure {
  id: string;
  title: string;
  category: 'CAD' | 'FEA' | 'Material Selection' | 'Shaft Design';
  imagePath: string;
  pageNumber: number;
  caption: string;
}

export const EXTRACTED_FIGURES: ExtractedFigure[] = [
  {
    id: 'ashby_yield_density',
    title: 'Ashby Chart: Yield Strength vs. Density',
    category: 'Material Selection',
    imagePath: '/figures/ashby_yield_density.png',
    pageNumber: 40,
    caption: 'ANSYS Granta EduPack Stage-2 screening of 1,900+ metallic materials with yield strength >= 50 ksi and fatigue limit >= 30 ksi. Shaded gray indicates filtered out alloys.'
  },
  {
    id: 'ashby_fatigue_pren',
    title: 'Fatigue Strength vs. PREN & Cost Mapping',
    category: 'Material Selection',
    imagePath: '/figures/ashby_fatigue_pren.png',
    pageNumber: 42,
    caption: 'Ashby comparison of shortlisted alloys showing fatigue strength vs density, with color representing Pitting Resistance Equivalent Number (PREN). Duplex 2205 provides optimal balance.'
  },
  {
    id: 'ashby_cost_strength',
    title: 'Material Performance: Cost vs. Strength Efficiency',
    category: 'Material Selection',
    imagePath: '/figures/ashby_cost_strength.png',
    pageNumber: 45,
    caption: 'Plot of cost per unit strength versus mass efficiency for marine shafts under cyclic torsion. Duplex 2205 and 316LVM occupy the favorable sweet spot.'
  },
  {
    id: 'cad_3d_isometric',
    title: 'Solid Edge 3D CAD Assembly of Propulsion Shaft',
    category: 'CAD',
    imagePath: '/figures/cad_3d_model_isometric.png',
    pageNumber: 135,
    caption: 'Parametric 3D CAD model modeled by Premakumara H.P.S. showing conical 1:10 propeller taper, involute splines, hollow bore, and integral forged flange.'
  },
  {
    id: 'cad_flange_thread',
    title: 'CAD Details: Flange Coupling & M95x4 Thread',
    category: 'CAD',
    imagePath: '/figures/cad_flange_and_thread.png',
    pageNumber: 136,
    caption: 'Detailed view of the 6-bolt marine flange coupling and tail-end M95 x 4 left-hand locking thread designed for the propeller retaining nut.'
  },
  {
    id: 'cad_2d_draft',
    title: '2D Manufacturing Draft & Sectional Elevation',
    category: 'CAD',
    imagePath: '/figures/cad_2d_draft_elevation.png',
    pageNumber: 137,
    caption: 'Official 2D production drawing showing front elevation, Section A-A internal bore geometry, and Detail B thread profiles.'
  },
  {
    id: 'fea_load_vectors',
    title: 'FEA Multi-Axis Operational Load Vectors',
    category: 'FEA',
    imagePath: '/figures/fea_load_vectors.png',
    pageNumber: 124,
    caption: 'Simultaneous application of 12.64 kNm torque, 34.9 kN axial thrust, gravity body force, and -337.5 MPa nut preload in Abaqus/CAE 2024.'
  },
  {
    id: 'fea_7zone_partition',
    title: '7-Zone Multi-Scale Mesh Partitioning Strategy',
    category: 'FEA',
    imagePath: '/figures/fea_7zone_partition.png',
    pageNumber: 126,
    caption: 'Shaft segmented into 7 distinct geometric zones for adaptive seeding, focusing 1.0 mm local refinement at spline fillets while coarsening uniform spans to 20 mm.'
  },
  {
    id: 'fea_stress_hotspot_year0',
    title: 'Year 0 Healthy Baseline Stress Contour (92.03 MPa)',
    category: 'FEA',
    imagePath: '/figures/fea_stress_hotspot_year0.png',
    pageNumber: 129,
    caption: 'Baseline Abaqus Von Mises stress distribution. Peak stress of 92.03 MPa occurs at external spline fillet root, well below Duplex 2205 yield limit (450 MPa).'
  },
  {
    id: 'fea_stress_corroded_year10',
    title: 'Year 10 Corroded State Stress Contour (114.2 MPa)',
    category: 'FEA',
    imagePath: '/figures/fea_stress_corroded_year10.png',
    pageNumber: 131,
    caption: 'Simulated 10-year degraded geometry with 2.0 mm uniform radius reduction (OD=121 mm). Peak hotspot stress rises by +24% to 114.2 MPa.'
  }
];
