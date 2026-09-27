import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Zap, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Gauge,
  Sliders
} from 'lucide-react';
import { MathView } from './MathView';

export const CorrosionProtectionSystem: React.FC = () => {
  const [activeLayerLevel, setActiveLayerLevel] = useState<number>(4); // 0: Bare to 4: Full Hybrid

  // Data for the protection progression
  const protectionLevels = [
    {
      level: 0,
      title: 'Bare Unprotected Steel',
      corrosionRateMmYr: 0.20,
      pittingSusceptibility: 'Severe Pitting',
      fatigueLifeYears: 2.5,
      description: 'Bare Duplex 2205 in raw seawater. While more resistant than carbon steel, chloride ions still initiate micro-pits that accelerate fatigue failure.'
    },
    {
      level: 1,
      title: 'Stage 1: Shot Peening & Passivation',
      corrosionRateMmYr: 0.12,
      pittingSusceptibility: 'Moderate',
      fatigueLifeYears: 5.0,
      description: 'Shot peening imparts surface compressive residual stress; citric acid passivation removes free iron and enriches protective Cr₂O₃ passive oxide.'
    },
    {
      level: 2,
      title: 'Stage 2: High-Build Epoxy Barrier',
      corrosionRateMmYr: 0.04,
      pittingSusceptibility: 'Low',
      fatigueLifeYears: 8.5,
      description: '250-300 µm high-build marine epoxy primer creates an impervious dielectric physical barrier preventing direct seawater contact.'
    },
    {
      level: 3,
      title: 'Stage 2+: Polyurethane & Antifouling',
      corrosionRateMmYr: 0.015,
      pittingSusceptibility: 'Very Low',
      fatigueLifeYears: 10.0,
      description: 'Polyurethane topcoat provides UV/abrasion resistance; outer foul-release silicone layer stops barnacles, algae, and sulfate-reducing bacteria (SRB).'
    },
    {
      level: 4,
      title: 'Stage 3 + ICCP: Full Hybrid System',
      corrosionRateMmYr: 0.005,
      pittingSusceptibility: 'Virtually Immune (< 10 µm/yr)',
      fatigueLifeYears: 25.0,
      description: 'Complete synergistic protection: Electropolished journals, MoS₂ dry-film lubricated splines, plus -0.80V ICCP cathodic protection with silver-graphite grounding!'
    }
  ];

  const currentLevelData = protectionLevels[activeLayerLevel];

  return (
    <section className="py-12 bg-[#050b14]/75 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TASK 05 • SURFACE COATINGS &amp; IMPRESSED CURRENT CATHODIC PROTECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Hybrid Corrosion Protection &amp; ICCP Grounding
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Multi-barrier defense integrating mechanical surface conditioning, 3-layer marine coatings, specialized electropolishing/DFL interfaces, and class-compliant ICCP cathodic polarization.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
              Set-Point: <b className="text-emerald-400">-0.80 V vs Ag/AgCl</b>
            </span>
          </div>
        </div>

        {/* Interactive Protection Slider Simulator */}
        <div className="marine-card rounded-3xl p-6 md:p-8 mb-10 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Interactive Barrier Simulation
              </span>
              <h3 className="text-xl font-bold text-white font-heading">
                Step-by-Step Degradation Rate Suppression
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-mono border border-slate-700">
              Layer Level {activeLayerLevel} / 4
            </span>
          </div>

          {/* Slider */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>0. Bare Metal</span>
              <span>1. Shot Peen &amp; Passivate</span>
              <span>2. Epoxy Primer</span>
              <span>3. PU &amp; Antifouling</span>
              <span className="text-emerald-400 font-bold">4. Full Hybrid + ICCP</span>
            </div>
            <input 
              type="range"
              min="0"
              max="4"
              step="1"
              value={activeLayerLevel}
              onChange={(e) => setActiveLayerLevel(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Simulation Output Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono">
              <span className="text-slate-500 text-[10px] uppercase block mb-1">Corrosion Penetration Rate</span>
              <div className="text-3xl font-extrabold text-white">
                {currentLevelData.corrosionRateMmYr.toFixed(3)} <span className="text-base font-normal text-slate-400">mm/yr</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                10-Year Thinning: <b className="text-emerald-400">{(currentLevelData.corrosionRateMmYr * 10).toFixed(2)} mm</b>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono">
              <span className="text-slate-500 text-[10px] uppercase block mb-1">Fatigue Survival Life</span>
              <div className={`text-3xl font-extrabold ${activeLayerLevel >= 3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentLevelData.fatigueLifeYears} <span className="text-base font-normal text-slate-400">Years</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Pitting: <b className="text-white">{currentLevelData.pittingSusceptibility}</b>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <div className="text-xs font-bold text-white font-heading mb-1">
                {currentLevelData.title}
              </div>
              <p>
                {currentLevelData.description}
              </p>
            </div>

          </div>
        </div>

        {/* 3-Stage Surface Conditioning Architecture */}
        <div className="mb-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              MANUFACTURING &amp; FINISHING PROTOCOL
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
              3-Stage Surface Treatment Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stage 1 */}
            <div className="marine-card p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
                <span className="font-mono font-bold text-sm">01</span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Stage 1: Universal Conditioning
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Applied to the entire shaft. Mechanical polishing followed by <b>shot peening</b> (compressive residual stress to halt micro-crack growth). Alkaline degrease, pickling, and neutralization.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
                Entire Shaft Body &amp; Journals
              </div>
            </div>

            {/* Stage 2 */}
            <div className="marine-card p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4">
                <span className="font-mono font-bold text-sm">02</span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Stage 2: Multi-Layer Coating
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Applied to exposed shaft body (excluding journals &amp; splines). Citric acid passivation <MathView math="\to" /> 250 µm high-build marine epoxy barrier <MathView math="\to" /> Polyurethane topcoat <MathView math="\to" /> Antifouling layer.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-300">
                Exposed Mid-Span Submerged Body
              </div>
            </div>

            {/* Stage 3 */}
            <div className="marine-card p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                <span className="font-mono font-bold text-sm">03</span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Stage 3: Specialized Interfaces
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                • <b>Bearing Journals:</b> Electropolishing only (mirror finish <MathView math="Ra \le 0.4\,\mu\text{m}" />) for zero friction.
                <br />
                • <b>Splined Interface:</b> Resin-bonded <MathView math="\text{MoS}_2" /> Dry Film Lubricant (8-20 µm) eliminating fretting and galling.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-300">
                Non-Painted Precision Areas
              </div>
            </div>

          </div>
        </div>

        {/* Cathodic Protection & HISC Prevention Details */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h4 className="text-xl font-bold text-white font-heading">
                  ICCP System &amp; Hydrogen Embrittlement Avoidance
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cathodic Protection polarizes the shaft to <MathView math="-0.80\,\text{V}" /> vs Ag/AgCl reference electrode, reducing residual corrosion rates to less than <b>10 µm/year</b>.
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                <b className="text-amber-400 font-mono block">CRITICAL CLASS SAFETY CONSTRAINT:</b>
                <p>
                  Duplex Stainless Steel 2205 has a dual-phase microstructure (50% ferrite, 50% austenite). Ferrite is susceptible to <b>Hydrogen-Induced Stress Cracking (HISC)</b> if polarized to excessively negative potentials (&lt; -1.05 V).
                </p>
                <p>
                  The Impressed Current Cathodic Protection (ICCP) controller tightly stabilizes the potential at <b>-0.80 V ± 10 mV</b>, completely avoiding the HISC risk associated with unregulated galvanic magnesium or aluminum anodes.
                </p>
              </div>
            </div>

            {/* Shaft Grounding Slip-Ring Assembly Details */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] block">
                Silver-Graphite Shaft Grounding System:
              </span>
              <div className="text-slate-400 flex justify-between p-2 rounded bg-slate-950">
                <span>Target Protection Potential:</span>
                <span className="text-emerald-400 font-bold">-0.80 V (Ag/AgCl)</span>
              </div>
              <div className="text-slate-400 flex justify-between p-2 rounded bg-slate-950">
                <span>Shaft-to-Hull Potential Difference:</span>
                <span className="text-cyan-300 font-bold">&lt; 50 mV (Pass Criteria)</span>
              </div>
              <div className="text-slate-400 flex justify-between p-2 rounded bg-slate-950">
                <span>Grounding Mechanism:</span>
                <span className="text-white">Twin Silver-Graphite Brushes</span>
              </div>
              <div className="text-slate-400 flex justify-between p-2 rounded bg-slate-950">
                <span>Spark Erosion Protection:</span>
                <span className="text-emerald-400 font-bold">Prevents bearing arcing</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
