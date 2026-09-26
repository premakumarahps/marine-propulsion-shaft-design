import React from 'react';
import { 
  Compass, 
  Activity, 
  Layers, 
  PenTool, 
  ShieldCheck, 
  Sliders, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Anchor,
  Flame,
  Zap,
  Gauge
} from 'lucide-react';
import { MathView } from './MathView';
import { SHAFT_OPERATIONAL_SPECS } from '../core/shaftData';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-sky-950/60">
      
      {/* Abyssal Marine Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-sky-600/15 to-emerald-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-700/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-700/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Hydrodynamic Flow Grid Coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Academic Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Dept. of Materials Science & Engineering</span>
            <span className="text-slate-600">•</span>
            <span>University of Moratuwa</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>MT3201: COMPREHENSIVE DESIGN PROJECT (CDP)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-medium">
            <Anchor className="w-3.5 h-3.5 text-sky-400" />
            <span>GROUP 01 • SEMESTER 7</span>
          </div>
        </div>

        {/* Main Title & Hero Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white">
            Designing of Corrosion Resistant{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Marine Propulsion Shaft
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
            End-to-end engineering of a 300 kW, 225 RPM marine propulsion shaft system in high-salinity seawater immersion. Featuring ANSYS Granta material selection (Duplex 2205), Solid Edge 3D CAD modeling, 7-Zone Abaqus FEA multi-scale simulation, and hybrid ICCP cathodic protection.
          </p>
        </div>

        {/* Author Attribution Card (Premakumara H.P.S. Highlighted) */}
        <div className="mt-8 max-w-3xl mx-auto bg-slate-900/80 rounded-2xl border-2 border-cyan-500/50 p-5 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-sky-800 to-slate-900 border border-cyan-400/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                Lead Materials, CAD & FEA Engineer
              </span>
              <h3 className="text-xl font-bold text-white font-heading tracking-tight">
                Premakumara H.P.S.
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Task 01: Environmental Analysis • Task 02: Material Selection (Granta) • Task 04: 3D CAD (Solid Edge) • Task 06: FEA Fatigue (Abaqus)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Index Number</span>
              <span className="text-sm font-bold text-cyan-300">210494D</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Group</span>
              <span className="text-sm font-bold text-amber-400">Group 01</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Date</span>
              <span className="text-sm font-bold text-slate-200">2025/12</span>
            </div>
          </div>
        </div>

        {/* 4 Core Quantitative Metric Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Card 1: Power & Torque */}
          <div className="marine-card p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Power & Torque</span>
              <Gauge className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-heading">
              12.64 <span className="text-sm font-normal text-cyan-400">kN·m</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              300 kW @ 225 RPM • 34.9 kN Thrust
            </p>
          </div>

          {/* Card 2: Hollow Shaft Geometry */}
          <div className="marine-card p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Hollow Geometry</span>
              <Sliders className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-heading">
              Ø125 / Ø60 <span className="text-sm font-normal text-slate-400">mm</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              1.6 m Length • 23% Weight Savings
            </p>
          </div>

          {/* Card 3: Material Alloy */}
          <div className="marine-card p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Selected Alloy</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-heading">
              Duplex 2205
            </div>
            <p className="text-xs text-slate-400 mt-1">
              PREN 35.0 &gt; 30 • σy = 460 MPa
            </p>
          </div>

          {/* Card 4: Multi-Scale FEA Hotspot */}
          <div className="marine-card p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">FEA Hotspot (Yr 0)</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-sky-400 font-heading">
              92.03 <span className="text-sm font-normal text-slate-400">MPa</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Spline Fillet • 7-Zone Mesh (1.2M elems)
            </p>
          </div>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('material-selection')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-cyan-500 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Ashby Material Selection Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setActiveTab('mechanical-design')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            Shaft Mechanics & IACS M68
          </button>

          <button
            onClick={() => setActiveTab('fea-simulation')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            Abaqus FEA Stress & Pitting
          </button>

          <button
            onClick={() => setActiveTab('cad-drawings')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <PenTool className="w-4 h-4 text-emerald-400" />
            3D CAD & 2D Engineering Drafts
          </button>

          <button
            onClick={() => setActiveTab('report-explorer')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Award className="w-4 h-4 text-purple-400" />
            208-Page Report Explorer
          </button>
        </div>

      </div>
    </section>
  );
};
