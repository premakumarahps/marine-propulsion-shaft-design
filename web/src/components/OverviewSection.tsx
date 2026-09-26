import React from 'react';
import { 
  Compass, 
  Droplets, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Anchor, 
  Zap, 
  Layers, 
  ArrowRight,
  Sparkles,
  FileCheck,
  Award
} from 'lucide-react';
import { GROUP_01_ROSTER, SHAFT_OPERATIONAL_SPECS } from '../core/shaftData';
import { MathView } from './MathView';

interface OverviewSectionProps {
  setActiveTab: (tab: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="py-12 bg-[#050b14]/60 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Project Genesis & Academic Brief */}
        <div className="marine-card rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  MT3201: COMPREHENSIVE DESIGN PROJECT
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  SEMESTER 7 CAPSTONE
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono text-slate-400 bg-slate-800 border border-slate-700">
                  GROUP 01
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Corrosion Resistant Power Transmission Marine Propulsion Shaft
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Marine propulsion shafts operate in one of the most mechanically and chemically unforgiving natural environments on earth. Submerged in high-salinity seawater, the shaft transmits continuous rotational power (<MathView math="P = 300\,\text{kW}" /> at <MathView math="N = 225\,\text{RPM}" />) under cyclic multi-axial torsional shear, propeller thrust (<MathView math="34.9\,\text{kN}" />), and hydrodynamic bending, while continuously combating chloride-induced pitting, galvanic coupling, crevice corrosion, and biofouling.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="bg-slate-950/90 p-5 rounded-2xl border-2 border-cyan-500/40 shadow-xl shrink-0 w-full sm:w-auto font-mono text-xs space-y-2">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                System Design Target
              </div>
              <div className="text-white font-bold text-sm">
                10-Year Uninterrupted Service Life
              </div>
              <div className="text-slate-400">
                • Class: IACS UR M68 &amp; DNV-CG-0038
                <br />
                • Alloy: Duplex Stainless Steel 2205
                <br />
                • Hybrid Protection: Epoxy/PU + ICCP
              </div>
            </div>
          </div>
        </div>

        {/* Premakumara's Task 01: Environmental Analysis */}
        <div>
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>TASK 01 • AUTHORED BY H.P.S. PREMAKUMARA</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white font-heading tracking-tight">
              Marine Operating Environment &amp; Degradation Dynamics
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Detailed quantification of seawater chemistry, temperature, dissolved oxygen saturation, and biological activity that accelerate shaft corrosion and fatigue crack initiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Factor 1: Chloride Concentration */}
            <div className="marine-card p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold mb-2">
                1. Salinity &amp; Chlorides
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                19,000 <span className="text-sm font-normal text-slate-400">ppm Cl⁻</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Average seawater salinity is <b>35 ppt (3.5% TDS)</b>. Chloride ions aggressively disrupt passive chromium oxide films on standard steels, necessitating an alloy with <b>PREN ≥ 30</b>.
              </p>
            </div>

            {/* Factor 2: Dissolved Oxygen */}
            <div className="marine-card p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-sky-400 uppercase font-semibold mb-2">
                2. Dissolved Oxygen (DO)
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                6.5 - 8.0 <span className="text-sm font-normal text-slate-400">mg/L</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Oxygen acts as the primary cathodic reactant (<MathView math="\text{O}_2 + 2\text{H}_2\text{O} + 4e^- \to 4\text{OH}^-" />). Differential aeration under biofouling barnacles drives intense localized crevice corrosion cells.
              </p>
            </div>

            {/* Factor 3: Temperature & Splash Zone */}
            <div className="marine-card p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold mb-2">
                3. Splash Zone &amp; Heat
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                ~25°C <span className="text-sm font-normal text-slate-400">Ambient</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Intermittent wetting, wave impact, and cyclic evaporation produce hyper-saline salt encrustations in splash zones, accelerating corrosion fatigue crack nucleation.
              </p>
            </div>

            {/* Factor 4: Biofouling & MIC */}
            <div className="marine-card p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-2">
                4. Microbiological Attack
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                SRB Biofilms
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Sulfate-Reducing Bacteria (SRB) flourish under anaerobic slimes, reducing sulfates (<MathView math="\text{SO}_4^{2-}" />) into corrosive hydrogen sulfide (<MathView math="\text{H}_2\text{S}" />), promoting hydrogen embrittlement.
              </p>
            </div>

          </div>
        </div>

        {/* Complete Group 01 Member Directory Table */}
        <div className="marine-card rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white font-heading">
                  Group 01 Technical Responsibilities &amp; Project Outputs
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Department of Materials Science and Engineering • University of Moratuwa
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 font-mono text-xs border border-slate-800">
              7 Team Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-300 font-mono border-b border-slate-800">
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-3">Index</th>
                  <th className="py-3 px-3">Assigned Role</th>
                  <th className="py-3 px-4">Key Technical Outputs Produced</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {GROUP_01_ROSTER.map((member) => (
                  <tr 
                    key={member.index}
                    className={`transition-colors ${
                      member.isHighlighted
                        ? 'bg-cyan-950/30 border-l-4 border-l-cyan-400 hover:bg-cyan-950/50'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        {member.isHighlighted && (
                          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        )}
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                      {member.index}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {member.role}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">
                      <ul className="list-disc list-inside space-y-0.5">
                        {member.keyOutputs.map((out, idx) => (
                          <li key={idx} className="text-slate-300">
                            {out}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Propulsion Shaft Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              PROPULSION SHAFT LINE ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              1.6-Meter Hollow Propulsion Shaft Geometry
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The propulsion shaft transmits <MathView math="12.64\,\text{kN}\cdot\text{m}" /> torque from the engine gearbox to the propeller hub. Selected dimensions: Outer Diameter <MathView math="OD = 125\,\text{mm}" />, Inner Bore <MathView math="ID = 60\,\text{mm}" />, total length <MathView math="L = 1600\,\text{mm}" />.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <b className="text-cyan-400 font-mono">1. Integral Forged Flange (Forward):</b> Rigidly connects to the intermediate shaft using 6 precision fitted bolts under IS:3653 standard.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <b className="text-sky-400 font-mono">2. Hollow Axial Bore (Ø60 mm):</b> Drilled via deep-hole gundrilling. Reduces shaft mass by 23% while sacrificing only ~5% of torsional section modulus.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <b className="text-amber-400 font-mono">3. Conical Taper (1:10) &amp; Involute Splines:</b> Provides self-centering contact and robust positive torque transmission to the propeller hub without stress concentration of traditional flat keys.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <b className="text-emerald-400 font-mono">4. M95 × 4 Left-Hand Retaining Thread:</b> Threaded tail end locks the propeller under -337.5 MPa nut tension, prevented from loosening by cotter pins.
              </div>
            </div>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-slate-800 text-center">
            <img 
              src="/figures/shaft_final_render.png" 
              alt="Final Designed Marine Propeller Shaft" 
              className="max-h-72 mx-auto object-contain rounded-xl shadow-2xl mb-3"
            />
            <span className="text-xs font-mono text-cyan-300 font-semibold block">
              Figure: Solid Edge 3D CAD Final Propulsion Shaft Geometry
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Modeled by Premakumara H.P.S. • Conical Taper, Involute Spline, M95 Thread &amp; Marine Flange
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
