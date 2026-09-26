import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  PenTool, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';

export const ReportExplorer: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  const chapters = [
    {
      num: 1,
      title: 'Executive Summary',
      pages: '8 - 9',
      author: 'Group 01 Integration',
      summary: 'High-level synthesis of environmental assessment, material selection, mechanical calculations, FEA verification, and hybrid corrosion protection for the 300 kW, 225 RPM shaft.'
    },
    {
      num: 2,
      title: 'Design Methodology & Task Distribution',
      pages: '9 - 11',
      author: 'Premakumara H.P.S. & Group 01',
      summary: 'Division of 8 major technical tasks across team members. Details Premakumara H.P.S. responsibilities across Environmental Analysis, Granta Material Selection, 3D CAD, and Abaqus FEA.'
    },
    {
      num: 3,
      title: 'Application Description & Marine Environment',
      pages: '12 - 35',
      author: 'Premakumara H.P.S. (Task 01)',
      summary: 'Environmental analysis of seawater constituents: 35 ppt salinity, 19,000 ppm chloride, dissolved oxygen saturation, temperature gradients, flow velocity, biofouling, and SRB-induced microbial attack.'
    },
    {
      num: 4,
      title: 'Material Selection (ANSYS Granta EduPack)',
      pages: '36 - 49',
      author: 'Premakumara H.P.S. (Task 02)',
      summary: '4-Stage Ashby methodology filtering 1,900+ alloys. Performance indices derived for cyclic torsional fatigue and cost efficiency. Selection of Duplex 2205 (PREN 35.0, yield 460 MPa).'
    },
    {
      num: 5,
      title: 'Corrosion Protection Strategy',
      pages: '50 - 81',
      author: 'Danindi H.M.T. & Themiya K.L.',
      summary: 'Universal shot peening and citric passivation, high-build marine epoxy primer, polyurethane topcoat, foul-release antifouling, electropolished journals, MoS2 DFL splines, and -0.80V ICCP system.'
    },
    {
      num: 6,
      title: 'Mechanical Design & Torque Calculations',
      pages: '82 - 120',
      author: 'Udayakantha D.A.W.I. (Task 03)',
      summary: 'Classical strength of materials, polar moment of inertia, combined Von Mises stress, torsional deflection, and minimum diameter compliance per IACS UR M68.4 and DNV-CG-0038.'
    },
    {
      num: 7,
      title: 'CAD Drawings & 3D Assembly Modeling',
      pages: '120 - 138',
      author: 'Premakumara H.P.S. (Task 04)',
      summary: 'Siemens Solid Edge parametric CAD modeling: 1:10 conical taper, M95x4 left-hand locking thread, involute splines, hollow bore, and ISO standard 2D manufacturing drafts.'
    },
    {
      num: 8,
      title: 'Abaqus FEA Loading & Corrosion Fatigue',
      pages: '120 - 134',
      author: 'Premakumara H.P.S. (Task 06)',
      summary: 'Decoupled multi-scale 3D FEA in Abaqus 2024. Dummy Hub Boolean contact, 7-zone adaptive mesh (1.2M C3D10 elements), Year 0 (92.03 MPa) vs Year 10 (114.2 MPa), micro-pit Kf = 2.6 fracture analysis.'
    },
    {
      num: 9,
      title: 'Process Design & CNC Manufacturing Roadmap',
      pages: '139 - 156',
      author: 'Dharmadasa W.H.M.A.D. (Task 07)',
      summary: '12-step fabrication roadmap: rough turning of forged billet, deep-hole gundrilling of Ø60 mm bore, solution annealing at 1050°C, taper turning, spline milling, thread machining, and polishing.'
    },
    {
      num: 10,
      title: 'Quality Assurance, NDE & Safety Plan',
      pages: '157 - 172',
      author: 'Kulathunga B.N. (Task 08)',
      summary: 'Class-approved inspection protocols: ultrasonic testing (UT) for internal voids, dye penetrant (DPI) for surface cracks, optical surface roughness (Ra) verification, and runout checks.'
    },
    {
      num: 11,
      title: 'Discussion & Model Validation',
      pages: '173 - 174',
      author: 'Group 01',
      summary: 'Cross-validation of analytical stress predictions against FEA numerical outputs, reaction equilibrium balance check, and justification of the hybrid coating-ICCP protection philosophy.'
    },
    {
      num: 12,
      title: 'Conclusion & Recommendations',
      pages: '174 - 175',
      author: 'Group 01',
      summary: 'Confirmation that the designed hollow Duplex 2205 propulsion shaft satisfies all structural, vibrational, fatigue, and class safety requirements for 10-year marine service.'
    },
    {
      num: 13,
      title: 'References & Bibliographic Citations',
      pages: '176 - 181',
      author: 'Academic Lineage',
      summary: '65 peer-reviewed citations including IACS rules, DNV class guidance, ABS marine propeller criteria, ISO standards, and ASM Handbook corrosion volumes.'
    }
  ];

  const currentCh = chapters.find(c => c.num === activeChapter) || chapters[0];

  return (
    <section className="py-12 bg-[#050b14]/70 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>COMPREHENSIVE ACADEMIC DOSSIER • 208 PAGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Comprehensive Design Project Report Explorer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Browse through the 13 chapters of the 208-page master thesis submitted for MT3201 at the University of Moratuwa.
            </p>
          </div>

          <a
            href="/docs/Marine_Propeller_Shaft_Final_Report_Group01.pdf"
            download="Marine_Propeller_Shaft_Final_Report_Group01.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Report PDF (208 Pgs)</span>
          </a>
        </div>

        {/* 4 Official Verified Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="marine-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white font-heading">
                Master Final Report
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Complete 208-page thesis covering all 8 design tasks, engineering calculations, and QA.
              </p>
            </div>
            <a
              href="/docs/Marine_Propeller_Shaft_Final_Report_Group01.pdf"
              download
              className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (6.6 MB)</span>
            </a>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3">
                <PenTool className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white font-heading">
                2D Manufacturing Draft
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Official 2D production draft with GD&amp;T runout, M95x4 thread detail, and tolerances.
              </p>
            </div>
            <a
              href="/docs/2D_Manufacturing_Drawing_Propeller_Shaft.pdf"
              download
              className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (90 KB)</span>
            </a>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white font-heading">
                Material Selection Report
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Ashby selection methodology, derived performance indices, and screening dossier.
              </p>
            </div>
            <a
              href="/docs/Material_Selection_Ashby_Report.pdf"
              download
              className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (616 KB)</span>
            </a>
          </div>

          <div className="marine-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white font-heading">
                ANSYS Granta Datasheet
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Full Granta EduPack exported datasheet and multi-stage screening record.
              </p>
            </div>
            <a
              href="/docs/ANSYS_Granta_EduPack_Report.pdf"
              download
              className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 hover:text-purple-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (320 KB)</span>
            </a>
          </div>

        </div>

        {/* Chapter Browser Interactive Explorer */}
        <div className="marine-card rounded-3xl p-6 md:p-8 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Chapters Menu */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2 px-2">
                Report Table of Contents
              </span>
              {chapters.map((ch) => {
                const isSelected = ch.num === activeChapter;
                return (
                  <button
                    key={ch.num}
                    onClick={() => setActiveChapter(ch.num)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border border-cyan-500/60 text-white font-bold shadow-md'
                        : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {ch.num.toString().padStart(2, '0')}
                      </span>
                      <span className="truncate">{ch.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                      p.{ch.pages}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Chapter Detail Card */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                      Chapter {currentCh.num.toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                      {currentCh.title}
                    </h3>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-400">
                    <span className="block text-[10px] text-slate-500">Report Pages</span>
                    <span className="text-cyan-300 font-bold">{currentCh.pages}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-500 font-mono text-[10px] uppercase block mb-0.5">
                      Lead Author / Technical Assignment:
                    </span>
                    <span className="text-white font-bold">{currentCh.author}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-500 font-mono text-[10px] uppercase block mb-1">
                      Chapter Scope &amp; Technical Coverage:
                    </span>
                    <p>{currentCh.summary}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Department of Materials Science and Engineering • University of Moratuwa
                </span>
                <a
                  href="/docs/Marine_Propeller_Shaft_Final_Report_Group01.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master Report</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
