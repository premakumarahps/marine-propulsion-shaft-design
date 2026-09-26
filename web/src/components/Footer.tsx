import React from 'react';
import { 
  ArrowUp, 
  Download, 
  Layers, 
  PenTool, 
  FileText, 
  Sparkles, 
  Award,
  Anchor,
  Activity
} from 'lucide-react';
import { GROUP_01_ROSTER } from '../core/shaftData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030814] border-t border-sky-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Academic Lineage */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-sky-600/30 to-amber-500/20 border border-cyan-400/40 flex items-center justify-center p-2">
                <img 
                  src="/propeller_logo.svg" 
                  alt="Propulsion Logo" 
                  className="w-full h-full object-contain propeller-spin" 
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-wider text-white">
                  MARINE PROPULSION SHAFT CDP
                </span>
                <span className="block text-[11px] text-cyan-400 font-mono">
                  Module MT3201: Comprehensive Design Project • Semester 7
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Complete engineering design, material selection via ANSYS Granta EduPack, Solid Edge 3D CAD modeling, and Abaqus multi-scale FEA simulation for a 300 kW, 225 RPM marine propulsion shaft line.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 inline-block">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                Highlighted Student Contributor
              </span>
              <span className="text-sm font-bold text-white">
                Premakumara H.P.S. • Index: 210494D
              </span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Tasks 01 (Environment), 02 (Granta), 04 (CAD), 06 (Abaqus FEA)
              </div>
            </div>
          </div>

          {/* Quick Tab Links */}
          <div className="space-y-2">
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">
              Project Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('overview'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Overview &amp; Environment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('material-selection'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Ashby Material Selection Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('mechanical-design'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shaft Mechanics &amp; IACS M68
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('fea-simulation'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Abaqus FEA Stress &amp; Pitting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('cad-drawings'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  3D CAD Models &amp; 2D Drafts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('corrosion-protection'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Surface Coatings &amp; ICCP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('report-explorer'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  208-Page Master Report
                </button>
              </li>
            </ul>
          </div>

          {/* Documents & Downloads */}
          <div className="space-y-2">
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">
              Official Project Documents
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="/docs/Marine_Propeller_Shaft_Final_Report_Group01.pdf"
                download="Marine_Propeller_Shaft_Final_Report_Group01.pdf"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Master Final Report</div>
                  <div className="text-[10px] text-slate-500 font-mono">208 Pages • Group 01</div>
                </div>
              </a>

              <a
                href="/docs/2D_Manufacturing_Drawing_Propeller_Shaft.pdf"
                download="2D_Manufacturing_Drawing_Propeller_Shaft.pdf"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <PenTool className="w-4 h-4 text-sky-400" />
                <div className="text-left">
                  <div className="font-semibold text-xs">2D Production Drawing</div>
                  <div className="text-[10px] text-slate-500 font-mono">ISO Standards • GD&amp;T</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            Department of Materials Science and Engineering • Faculty of Engineering • University of Moratuwa, Sri Lanka.
            <br />
            MT3201 Comprehensive Design Project (CDP) • Group 01 • December 2025.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
