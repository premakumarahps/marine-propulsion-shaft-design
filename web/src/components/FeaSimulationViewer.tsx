import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Eye,
  Maximize2,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { FEA_7_ZONES, FEA_STRESS_COMPARISON } from '../core/shaftData';
import { MathView } from './MathView';

export const FeaSimulationViewer: React.FC = () => {
  const [activeFeaView, setActiveFeaView] = useState<'year0' | 'year10' | 'mesh' | 'loads'>('year0');
  const [pitDepthMm, setPitDepthMm] = useState<number>(0.8);
  const [notchSensitivityQ, setNotchSensitivityQ] = useState<number>(0.8);

  // Dynamic Micro-Pit Stress Calculation
  const Kt = 3.0; // Theoretical for hemispherical pit
  const Kf = 1 + notchSensitivityQ * (Kt - 1); // Typically 2.6
  const sigmaYear10Nominal = 114.20; // MPa from Abaqus
  const sigmaEffective = sigmaYear10Nominal * Kf;
  const seAir = 320; // MPa
  const kaPitted = 0.5; // Corroded finish
  const seCorr = seAir * kaPitted * 0.85; // 136 MPa
  const fatigueFactor = seCorr / sigmaEffective;

  return (
    <section className="py-12 bg-[#050b14]/75 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>TASK 06 • ABAQUS/CAE 2024 FINITE ELEMENT ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Abaqus FEA: 7-Zone Mesh &amp; Corrosion Fatigue Modeling
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Authored by <span className="text-cyan-300 font-semibold">Premakumara H.P.S. (Index: 210494D)</span> using a decoupled multi-scale strategy in Abaqus/CAE to simulate full-scale assembly contact and micro-pit fracture mechanics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300">
              C3D10 Elements: <b className="text-cyan-300">1.2 Million</b>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300">
              Hotspot: <b className="text-amber-400">Spline Fillet</b>
            </span>
          </div>
        </div>

        {/* 3 Innovative Simulation Techniques Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-1">
              Technique 1: "Dummy Hub" Boolean Fit
            </div>
            <div className="text-sm font-bold text-white">Zero-Clearance Master/Slave</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Standard clearance gaps cause rigid-body motion singularities in static FEA. Premakumara used Solid Edge Boolean Subtraction (shaft spline as tool body) to create a perfect line-to-line contact with a 0.01 mm position tolerance.
            </p>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono text-sky-400 uppercase font-bold mb-1">
              Technique 2: Virtual Bearing Surface Split
            </div>
            <div className="text-sm font-bold text-white">Realistic Support Constraints</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Partitioned shaft cylindrical faces at Bearing 1 &amp; 2 coordinates. Linked to Reference Points (RPs) with Kinematic Couplings: Bearing 1 absorbs 34.9 kN thrust (U1, U2, U3=0); Bearing 2 floats axially (U1 free).
            </p>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-amber-500/40">
            <div className="text-xs font-mono text-amber-400 uppercase font-bold mb-1">
              Technique 3: Decoupled Multi-Scale
            </div>
            <div className="text-sm font-bold text-amber-300">FEA + Fracture Mechanics</div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Meshing microscopic pits (&lt; 1 mm) on a 1.6 m shaft requires &gt; 10⁷ elements. Decoupled approach: Global FEA computes macro nominal stress (114.2 MPa), then analytical <MathView math="K_f" /> calculates micro-pit stress (296.9 MPa).
            </p>
          </div>
        </div>

        {/* Interactive FEA Contour & Mesh Visualizer */}
        <div className="marine-card rounded-3xl p-6 md:p-8 mb-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Abaqus/CAE Simulation Output Viewer
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle between baseline healthy state, 10-year corroded geometry, 7-zone mesh partitioning, and applied multi-axis load vectors.
              </p>
            </div>

            {/* FEA Stage Switcher */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
              <button
                onClick={() => setActiveFeaView('year0')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFeaView === 'year0' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Year 0 (Healthy 92 MPa)
              </button>
              <button
                onClick={() => setActiveFeaView('year10')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFeaView === 'year10' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Year 10 (Corroded 114 MPa)
              </button>
              <button
                onClick={() => setActiveFeaView('mesh')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFeaView === 'mesh' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                7-Zone Mesh
              </button>
              <button
                onClick={() => setActiveFeaView('loads')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFeaView === 'loads' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Load Vectors
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Visual Screen */}
            <div className="lg:col-span-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center relative group min-h-[350px] flex items-center justify-center">
              {activeFeaView === 'year0' && (
                <img 
                  src="/figures/fea_stress_hotspot_year0.png" 
                  alt="Year 0 Baseline Stress Distribution in Abaqus" 
                  className="max-h-[400px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
              {activeFeaView === 'year10' && (
                <img 
                  src="/figures/fea_stress_corroded_year10.png" 
                  alt="Year 10 Corroded State Stress Distribution" 
                  className="max-h-[400px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
              {activeFeaView === 'mesh' && (
                <img 
                  src="/figures/fea_7zone_partition.png" 
                  alt="7-Zone Mesh Partitioning Strategy" 
                  className="max-h-[400px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
              {activeFeaView === 'loads' && (
                <img 
                  src="/figures/fea_load_vectors.png" 
                  alt="Multi-axis Load Vectors applied in Abaqus" 
                  className="max-h-[400px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
            </div>

            {/* Technical Detail Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  FEA Diagnostics &amp; Validation
                </span>
                <h4 className="text-sm font-bold text-white font-heading">
                  {activeFeaView === 'year0' && 'Year 0 Nominal Healthy State'}
                  {activeFeaView === 'year10' && 'Year 10 Uniform Degradation'}
                  {activeFeaView === 'mesh' && 'Adaptive 7-Zone Seeding Plan'}
                  {activeFeaView === 'loads' && 'Four Superimposed Load Vectors'}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {activeFeaView === 'year0' && (
                    'Peak Von Mises stress occurs at the root of the external spline fillet: 92.03 MPa. This represents the healthy baseline and is well within Duplex 2205 elastic yield limit (450 MPa).'
                  )}
                  {activeFeaView === 'year10' && (
                    'Uniform thinning of 2.0 mm on radius reduces OD from 125 mm to 121 mm. Nominal hotspot stress rises by +24.1% to 114.2 MPa due to reduced polar moment of inertia (J).'
                  )}
                  {activeFeaView === 'mesh' && (
                    'To prevent element distortion at 5 mm fillets while maintaining practical 8-hour solve times, the model uses 1.0 mm local seeds at fillets (5 elements across radius) and 20 mm in uniform spans.'
                  )}
                  {activeFeaView === 'loads' && (
                    'Superimposition of 12.64 kNm torque, 34.9 kN axial thrust, gravity body force (-9810 mm/s²), and -337.5 MPa nut tension preload on M95x4 thread.'
                  )}
                </p>
              </div>

              {/* Reaction Force Check Verification */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block">Model Equilibrium Check:</span>
                <div className="text-slate-400 flex justify-between">
                  <span>Thrust Reaction (RF1):</span>
                  <span className="text-emerald-400 font-bold">34,900 N (100% Match)</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>Torque Reaction (RM1):</span>
                  <span className="text-emerald-400 font-bold">1.264 × 10⁷ N·mm</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>Hotspot Stress Rise:</span>
                  <span className="text-amber-400 font-bold">92.03 → 114.2 MPa (+24%)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 7-Zone Partitioning Table */}
        <div className="marine-card rounded-2xl overflow-hidden shadow-xl border border-slate-800 mb-8">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">
              7-Zone Multi-Scale Adaptive Mesh Seeding Plan
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Quadratic Tetrahedral Elements (C3D10)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-300 font-mono border-b border-slate-800">
                  <th className="py-3 px-4">Zone #</th>
                  <th className="py-3 px-4">Shaft Geometric Region</th>
                  <th className="py-3 px-3 text-right">Seed Size (mm)</th>
                  <th className="py-3 px-4">Functional Purpose &amp; Loading</th>
                  <th className="py-3 px-3 text-center">Criticality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {FEA_7_ZONES.map((zone) => (
                  <tr 
                    key={zone.zoneNumber}
                    className={`transition-colors ${
                      zone.criticality === 'Hotspot' 
                        ? 'bg-rose-950/20 hover:bg-rose-950/30' 
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                      Zone {zone.zoneNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {zone.name}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      {zone.seedSizeMm.toFixed(1)} mm
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {zone.description}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        zone.criticality === 'Hotspot'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : zone.criticality === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {zone.criticality}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Micro-Pitting Fracture Mechanics Hybrid Calculator */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border-2 border-rose-500/40 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-xl font-bold text-white font-heading">
                  Micro-Pitting Fracture Mechanics: Why Unprotected Shafts Fail
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Superimposing micro-pit stress concentration (<MathView math="K_f" />) onto macro-FEA results to prove that uniform corrosion analysis alone is dangerously misleading.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
              Catastrophic Pitting Risk
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Sliders */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Micro-Pit Depth:</span>
                  <span className="text-rose-400 font-bold">{pitDepthMm.toFixed(2)} mm</span>
                </div>
                <input 
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={pitDepthMm}
                  onChange={(e) => setPitDepthMm(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Hemispherical pit geometry: Kt ≈ 3.0</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Notch Sensitivity (q):</span>
                  <span className="text-amber-400 font-bold">{notchSensitivityQ.toFixed(2)}</span>
                </div>
                <input 
                  type="range"
                  min="0.6"
                  max="1.0"
                  step="0.05"
                  value={notchSensitivityQ}
                  onChange={(e) => setNotchSensitivityQ(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">For high-strength Duplex 2205: q ≈ 0.8</span>
              </div>
            </div>

            {/* Math Telemetry */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2.5">
              <div className="text-slate-400 flex justify-between">
                <span>Fatigue Notch Factor (Kf):</span>
                <span className="text-white font-bold">{Kf.toFixed(2)}</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span>Nominal Corroded Stress (Year 10):</span>
                <span className="text-slate-300">{sigmaYear10Nominal} MPa</span>
              </div>
              <div className="text-slate-400 flex justify-between pt-2 border-t border-slate-800">
                <span className="text-rose-400 font-bold">Effective Pit Stress (σ_eff):</span>
                <span className="text-rose-400 font-bold text-base">{sigmaEffective.toFixed(1)} MPa</span>
              </div>
              <div className="text-slate-400 flex justify-between pt-1">
                <span>Corrected Seawater Endurance (Se,corr):</span>
                <span className="text-sky-400 font-bold text-base">{seCorr.toFixed(1)} MPa</span>
              </div>
              <div className="text-slate-400 flex justify-between pt-2 border-t border-slate-800">
                <span>High Cycle Fatigue Safety Factor:</span>
                <span className={`font-bold text-base ${fatigueFactor >= 1.0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {fatigueFactor.toFixed(2)} {fatigueFactor < 1.0 ? '(FAILURE)' : '(SAFE)'}
                </span>
              </div>
            </div>

            {/* Failure Interpretation Callout */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-xs text-rose-200 space-y-3 leading-relaxed">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Critical Scientific Discovery</span>
              </div>
              <p>
                Under macro uniform corrosion alone, the nominal stress of <b>114.2 MPa</b> appears safe compared to yield (450 MPa).
              </p>
              <p>
                However, when chloride pitting nucleates small hemispherical pits, the stress concentration triples (<MathView math="K_f = 2.6" />), spiking localized stress to <b>{sigmaEffective.toFixed(1)} MPa</b>.
              </p>
              <p className="font-semibold text-rose-300">
                Since this exceeds the degraded seawater fatigue limit ({seCorr.toFixed(1)} MPa), the bare shaft WILL suffer catastrophic fatigue fracture without coatings!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
