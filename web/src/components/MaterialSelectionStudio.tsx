import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sliders, 
  Download, 
  Eye, 
  Sparkles, 
  Info,
  Maximize2,
  FileText,
  BarChart2
} from 'lucide-react';
import { MATERIAL_CANDIDATES, MaterialCandidate } from '../core/shaftData';
import { MathView } from './MathView';

export const MaterialSelectionStudio: React.FC = () => {
  const [minYield, setMinYield] = useState<number>(345); // 50 ksi = 345 MPa
  const [minFatigue, setMinFatigue] = useState<number>(207); // 30 ksi = 207 MPa
  const [minPren, setMinPren] = useState<number>(30.0);
  const [selectedChart, setSelectedChart] = useState<'yield-density' | 'fatigue-pren' | 'cost-strength'>('fatigue-pren');
  const [selectedCandidate, setSelectedCandidate] = useState<MaterialCandidate>(MATERIAL_CANDIDATES[0]);

  // Filter candidates based on user sliders
  const filteredCandidates = useMemo(() => {
    return MATERIAL_CANDIDATES.map(mat => {
      const passesYield = mat.yieldStrengthMpa >= minYield;
      const passesFatigue = mat.fatigueStrengthMpa >= minFatigue;
      const passesPren = mat.pren >= minPren;
      const passes = passesYield && passesFatigue && passesPren;

      return {
        ...mat,
        passesAll: passes,
        failures: [
          !passesYield && `Yield < ${minYield} MPa`,
          !passesFatigue && `Fatigue < ${minFatigue} MPa`,
          !passesPren && `PREN < ${minPren.toFixed(1)}`
        ].filter(Boolean) as string[]
      };
    });
  }, [minYield, minFatigue, minPren]);

  return (
    <section className="py-12 bg-[#050b14]/70 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>TASK 02 • ANSYS GRANTA EDUPACK &amp; ASHBY METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Material Selection Studio: 1,900+ Alloy Screening
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Authored by <span className="text-cyan-300 font-semibold">Premakumara H.P.S. (Index: 210494D)</span> using the 4-Stage Ashby methodology (Translate–Screen–Rank–Document) to identify the optimal marine propulsion alloy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/docs/Material_Selection_Ashby_Report.pdf"
              download="Material_Selection_Ashby_Report.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ashby Report PDF</span>
            </a>

            <a
              href="/docs/ANSYS_Granta_EduPack_Report.pdf"
              download="ANSYS_Granta_EduPack_Report.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Granta Datasheet</span>
            </a>
          </div>
        </div>

        {/* The 4-Stage Ashby Methodology Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-1">
              Stage 1: Translate
            </div>
            <div className="text-sm font-bold text-white">Design Requirements</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Function: Transmit torque &amp; thrust. Constraints: <MathView math="\sigma_y \ge 345\,\text{MPa}" />, <MathView math="\sigma_f \ge 207\,\text{MPa}" />, <MathView math="\text{PREN} \ge 30" />.
            </p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono text-sky-400 uppercase font-bold mb-1">
              Stage 2: Screen
            </div>
            <div className="text-sm font-bold text-white">Database Filtering</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Filtered 1,900+ metals in ANSYS Granta EduPack. Eliminated ~98% of candidate alloys failing seawater durability or yield constraints.
            </p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <div className="text-xs font-mono text-amber-400 uppercase font-bold mb-1">
              Stage 3: Rank
            </div>
            <div className="text-sm font-bold text-white">Performance Indices</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Derived <MathView math="M_1 = \sigma_f^{2/3}/\rho" /> for torsion mass efficiency and cost-per-strength optimization under cyclic fatigue.
            </p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-emerald-500/40">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1">
              Stage 4: Document
            </div>
            <div className="text-sm font-bold text-emerald-300">Duplex 2205 Selection</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Chosen: <MathView math="\sigma_y = 460\,\text{MPa}" />, <MathView math="\text{PREN} = 35.0" />, high fatigue endurance, and optimal economic viability.
            </p>
          </div>
        </div>

        {/* Ashby Chart Interactive Visualizer */}
        <div className="marine-card rounded-2xl p-6 mb-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  ANSYS Granta EduPack Ashby Property Maps
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect the authentic Ashby charts generated during the CDP materials selection phase.
              </p>
            </div>

            {/* Chart Switcher Buttons */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
              <button
                onClick={() => setSelectedChart('yield-density')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedChart === 'yield-density' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Yield vs. Density
              </button>
              <button
                onClick={() => setSelectedChart('fatigue-pren')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedChart === 'fatigue-pren' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fatigue vs. PREN
              </button>
              <button
                onClick={() => setSelectedChart('cost-strength')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedChart === 'cost-strength' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cost vs. Strength
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Chart Image Display */}
            <div className="lg:col-span-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center relative group">
              {selectedChart === 'yield-density' && (
                <img 
                  src="/figures/ashby_yield_density.png" 
                  alt="Ashby Chart: Yield Strength vs Density" 
                  className="max-h-[380px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
              {selectedChart === 'fatigue-pren' && (
                <img 
                  src="/figures/ashby_fatigue_pren.png" 
                  alt="Ashby Chart: Fatigue Strength vs PREN" 
                  className="max-h-[380px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
              {selectedChart === 'cost-strength' && (
                <img 
                  src="/figures/ashby_cost_strength.png" 
                  alt="Ashby Chart: Cost per unit strength vs Mass Efficiency" 
                  className="max-h-[380px] w-auto mx-auto object-contain rounded-xl"
                />
              )}
            </div>

            {/* Chart Technical Insight Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  Crystallographic Insight
                </span>
                <h4 className="text-sm font-bold text-white font-heading">
                  {selectedChart === 'yield-density' && 'Initial Pool vs Screened Alloys'}
                  {selectedChart === 'fatigue-pren' && 'Pitting Resistance Equivalent Number'}
                  {selectedChart === 'cost-strength' && 'The Economic Sweet Spot'}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedChart === 'yield-density' && (
                    'The gray shaded envelope represents 1,900+ metals in Granta. Applying yield and fatigue thresholds immediately excludes soft coppers, aluminums, and plain low-carbon steels, isolating high-alloy steels.'
                  )}
                  {selectedChart === 'fatigue-pren' && (
                    'Notice 316LVM has high mechanical fatigue, but its PREN (26.5) falls into the warning zone. Duplex 2205 (PREN 35.0) safely crosses the marine pitting threshold (PREN ≥ 30), resisting crevice attack.'
                  )}
                  {selectedChart === 'cost-strength' && (
                    'Superalloys like ILLIUM 98 and Inconel 625 provide immense corrosion resistance, but at 6x higher cost. Duplex 2205 occupies the optimal frontier balancing mass efficiency and capital cost.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="text-slate-400 flex justify-between">
                  <span>Duplex 2205 PREN:</span>
                  <span className="text-emerald-400 font-bold">35.0 (Passed)</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>316LVM PREN:</span>
                  <span className="text-rose-400 font-bold">26.5 (Failed)</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>Threshold Limit:</span>
                  <span className="text-amber-400 font-bold">PREN ≥ 30.0</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Constraint Filtering Sliders */}
        <div className="marine-card rounded-2xl p-6 mb-8 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-heading">
              Interactive Design Constraint Filter (Test Alternative Scenarios)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Slider 1: Yield Strength */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Min. Yield Strength (σy):</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  {minYield} MPa
                </span>
              </div>
              <input 
                type="range"
                min="200"
                max="600"
                step="10"
                value={minYield}
                onChange={(e) => setMinYield(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Class Requirement: ≥ 345 MPa (50 ksi)</span>
            </div>

            {/* Slider 2: Fatigue Strength */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Min. Fatigue Limit (10⁷ cyc):</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                  {minFatigue} MPa
                </span>
              </div>
              <input 
                type="range"
                min="150"
                max="450"
                step="10"
                value={minFatigue}
                onChange={(e) => setMinFatigue(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Class Requirement: ≥ 207 MPa (30 ksi)</span>
            </div>

            {/* Slider 3: PREN */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Min. Pitting Resistance (PREN):</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {minPren.toFixed(1)}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="50"
                step="1"
                value={minPren}
                onChange={(e) => setMinPren(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Seawater Limit: PREN = %Cr + 3.3%Mo + 16%N ≥ 30</span>
            </div>

          </div>
        </div>

        {/* Candidates Comparison Table */}
        <div className="marine-card rounded-2xl overflow-hidden shadow-xl border border-slate-800 mb-8">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">
              Candidate Alloys Screening &amp; Ranking Matrix
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {filteredCandidates.filter(c => c.passesAll).length} of {MATERIAL_CANDIDATES.length} Alloys Comply
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-300 font-mono border-b border-slate-800">
                  <th className="py-3 px-4">Alloy Designation</th>
                  <th className="py-3 px-3 text-right">Yield (MPa)</th>
                  <th className="py-3 px-3 text-right">Fatigue (MPa)</th>
                  <th className="py-3 px-3 text-right">PREN</th>
                  <th className="py-3 px-3 text-right">Rel. Cost/kg</th>
                  <th className="py-3 px-3 text-center">SCC Risk</th>
                  <th className="py-3 px-3 text-center">Screening Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCandidates.map((mat) => {
                  const isWinner = mat.id === 'duplex_2205';
                  return (
                    <tr 
                      key={mat.id}
                      onClick={() => setSelectedCandidate(mat)}
                      className={`cursor-pointer transition-colors ${
                        selectedCandidate.id === mat.id
                          ? 'bg-cyan-950/40'
                          : isWinner 
                          ? 'bg-emerald-950/20 hover:bg-emerald-950/30' 
                          : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          {isWinner && <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />}
                          <div>
                            <div>{mat.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{mat.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-cyan-300">
                        {mat.yieldStrengthMpa}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {mat.fatigueStrengthMpa}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-bold">
                        <span className={mat.pren >= 30 ? 'text-emerald-400' : 'text-rose-400'}>
                          {mat.pren.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        ${mat.relativeCostPerKg.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          mat.sccResistance === 'Excellent' 
                            ? 'bg-emerald-500/20 text-emerald-300' 
                            : mat.sccResistance === 'Good' 
                            ? 'bg-sky-500/20 text-sky-300' 
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {mat.sccResistance}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {mat.passesAll ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40" title={mat.failures.join(', ')}>
                            <XCircle className="w-3 h-3 text-rose-400" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Candidate Datasheet Spotlight */}
        <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Selected Alloy Technical Profile
              </span>
              <h4 className="text-xl font-bold text-white font-heading mt-0.5">
                {selectedCandidate.name}
              </h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              selectedCandidate.status === 'Selected'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {selectedCandidate.status}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedCandidate.rankingSummary}
          </p>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Elastic Modulus</span>
              <span className="text-white font-bold">{selectedCandidate.youngsModulusGpa} GPa</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Shear Modulus</span>
              <span className="text-white font-bold">{selectedCandidate.shearModulusGpa} GPa</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Density</span>
              <span className="text-white font-bold">{selectedCandidate.densityKgM3} kg/m³</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Weldability</span>
              <span className="text-emerald-300 font-bold">{selectedCandidate.weldability}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
