import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  Scale, 
  ArrowRight,
  Info,
  Maximize2
} from 'lucide-react';
import { computeShaftMechanics } from '../core/shaftPhysics';
import { MathView } from './MathView';

export const ShaftMechanicalCalculator: React.FC = () => {
  const [powerKw, setPowerKw] = useState<number>(300);
  const [rpm, setRpm] = useState<number>(225);
  const [outerDia, setOuterDia] = useState<number>(125);
  const [innerDia, setInnerDia] = useState<number>(60);
  const [thrustKn, setThrustKn] = useState<number>(34.9);
  const [lengthMm, setLengthMm] = useState<number>(1600);

  // Compute live physics
  const results = useMemo(() => {
    return computeShaftMechanics(
      powerKw,
      rpm,
      outerDia,
      innerDia,
      lengthMm,
      thrustKn
    );
  }, [powerKw, rpm, outerDia, innerDia, lengthMm, thrustKn]);

  const handleReset = () => {
    setPowerKw(300);
    setRpm(225);
    setOuterDia(125);
    setInnerDia(60);
    setThrustKn(34.9);
    setLengthMm(1600);
  };

  return (
    <section className="py-12 bg-[#050b14]/60 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium mb-3">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>MECHANICAL WORKBENCH • IACS UR M68.4 COMPLIANCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Shaft Mechanics &amp; Torque Transmission Calculator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Interactive calculation engine implementing classical torsion theory, Von Mises combined multi-axial stress, and classification society marine rule checks.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Reset to 300 kW CDP baseline values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline (300 kW)</span>
          </button>
        </div>

        {/* Input Parameters Sliders Grid */}
        <div className="marine-card rounded-2xl p-6 mb-8 border border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-4">
            Adjust Propulsion Line Operational Parameters
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input 1: Engine Power */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Engine Power (P):</span>
                <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/20">
                  {powerKw} kW
                </span>
              </div>
              <input 
                type="range"
                min="100"
                max="600"
                step="10"
                value={powerKw}
                onChange={(e) => setPowerKw(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>100 kW</span>
                <span>Baseline: 300 kW</span>
                <span>600 kW</span>
              </div>
            </div>

            {/* Input 2: Rotational Speed */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Shaft Speed (N):</span>
                <span className="text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-500/20">
                  {rpm} RPM
                </span>
              </div>
              <input 
                type="range"
                min="120"
                max="450"
                step="5"
                value={rpm}
                onChange={(e) => setRpm(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>120 RPM</span>
                <span>Baseline: 225 RPM</span>
                <span>450 RPM</span>
              </div>
            </div>

            {/* Input 3: Propeller Thrust */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Axial Thrust (F_thrust):</span>
                <span className="text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-500/20">
                  {thrustKn.toFixed(1)} kN
                </span>
              </div>
              <input 
                type="range"
                min="10"
                max="80"
                step="0.5"
                value={thrustKn}
                onChange={(e) => setThrustKn(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10 kN</span>
                <span>Baseline: 34.9 kN</span>
                <span>80 kN</span>
              </div>
            </div>

            {/* Input 4: Outer Diameter */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Outer Diameter (OD):</span>
                <span className="text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-500/20">
                  {outerDia} mm
                </span>
              </div>
              <input 
                type="range"
                min="90"
                max="180"
                step="1"
                value={outerDia}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setOuterDia(val);
                  if (innerDia >= val - 10) setInnerDia(val - 15);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>90 mm</span>
                <span>Baseline: 125 mm</span>
                <span>180 mm</span>
              </div>
            </div>

            {/* Input 5: Inner Diameter (Bore) */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Inner Bore Diameter (ID):</span>
                <span className="text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-500/20">
                  {innerDia} mm {innerDia === 0 ? '(Solid)' : '(Hollow)'}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max={outerDia - 20}
                step="5"
                value={innerDia}
                onChange={(e) => setInnerDia(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0 mm (Solid)</span>
                <span>Baseline: 60 mm</span>
                <span>{outerDia - 20} mm</span>
              </div>
            </div>

            {/* Input 6: Length */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">Shaft Length (L):</span>
                <span className="text-rose-300 font-bold px-2 py-0.5 rounded bg-rose-500/20">
                  {(lengthMm / 1000).toFixed(2)} m
                </span>
              </div>
              <input 
                type="range"
                min="1000"
                max="3000"
                step="100"
                value={lengthMm}
                onChange={(e) => setLengthMm(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1.0 m</span>
                <span>Baseline: 1.6 m</span>
                <span>3.0 m</span>
              </div>
            </div>

          </div>
        </div>

        {/* Live Calculation Results Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Output 1: Operating Torque */}
          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Transmitted Torque (T)
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {(results.torqueNm / 1000).toFixed(2)} <span className="text-base font-normal text-cyan-400">kN·m</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <MathView math="T = \frac{P}{2\pi (N/60)}" />
            </div>
          </div>

          {/* Output 2: Combined Von Mises Stress */}
          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Von Mises Equivalent Stress (σ_eq)
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {results.combinedVonMisesStressMpa.toFixed(1)} <span className="text-base font-normal text-slate-400">MPa</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <MathView math="\sigma_{\text{eq}} = \sqrt{(\sigma_a + \sigma_b)^2 + 3\tau^2}" />
            </div>
          </div>

          {/* Output 3: IACS Minimum Diameter Check */}
          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">
                IACS UR M68.4 Min. OD
              </span>
              {results.iacsCompliant ? (
                <span className="px-2 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  PASSED
                </span>
              ) : (
                <span className="px-2 py-0.2 rounded text-[9px] font-mono bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                  INSUFFICIENT
                </span>
              )}
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${results.iacsCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
              {results.iacsMinDiameterMm.toFixed(1)} <span className="text-base font-normal text-slate-400">mm</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Actual OD: <b className="text-white">{outerDia} mm</b> {results.iacsCompliant ? '(Compliant)' : '(Below Rule)'}
            </div>
          </div>

          {/* Output 4: Hollow Weight Savings */}
          <div className="marine-card p-5 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Hollow Bore Mass Savings
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
              {results.weightSavingsPercent.toFixed(1)}% <span className="text-base font-normal text-slate-400">Lighter</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Hollow: <b className="text-white">{results.massKg} kg</b> vs Solid: <b className="text-slate-400">{results.solidEquivalentMassKg} kg</b>
            </div>
          </div>

        </div>

        {/* Detailed Engineering Breakdown Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: Stress Distribution & Safety Margins */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-base font-bold text-white font-heading mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Safety Margins &amp; Stress Components
            </h4>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Torsional Shear Stress (τ):</span>
                <span className="text-white font-bold">{results.torsionalShearStressMpa} MPa</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Axial Thrust Normal Stress (σ_a):</span>
                <span className="text-white font-bold">{results.axialStressMpa} MPa</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Torsional Twist Angle (θ):</span>
                <span className="text-cyan-300 font-bold">{results.angleTwistDeg}° over {lengthMm} mm</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Yield Factor of Safety (σ_y / σ_eq):</span>
                <span className="text-emerald-400 font-bold">{results.yieldSafetyFactor} (Yield: 460 MPa)</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Fatigue Factor of Safety (Healthy):</span>
                <span className="text-sky-400 font-bold">{results.fatigueSafetyFactorYear0}</span>
              </div>
            </div>
          </div>

          {/* Right: Solid vs Hollow Shaft Comparison */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-base font-bold text-white font-heading mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              Hollow vs. Solid Shaft Optimization Logic
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              In torsional power transmission, shear stress is proportional to the distance from the shaft axis (<MathView math="\tau \propto r" />). Material located in the inner core (<MathView math="r < 30\,\text{mm}" />) carries almost zero stress while adding dead weight and bearing load.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-300 space-y-2 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Polar Moment (J) Reduction:</span>
                <span className="text-amber-400 font-bold">Only ~5.3%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Mass Reduction:</span>
                <span className="text-emerald-400 font-bold">23.0% (45 kg saved)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Bearing Dynamic Reaction:</span>
                <span className="text-cyan-300 font-bold">Reduced stern bearing wear</span>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-400 leading-snug">
              ✓ <b>Manufacturability Note:</b> The 60 mm bore is produced via deep-hole gundrilling followed by internal boring and honing, ensuring smooth internal surface finish (<MathView math="Ra \le 1.6\,\mu\text{m}" />) without micro-grooves that could initiate fatigue.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
