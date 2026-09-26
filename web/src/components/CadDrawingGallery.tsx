import React, { useState } from 'react';
import { 
  PenTool, 
  Download, 
  Maximize2, 
  X, 
  Eye, 
  Layers, 
  Sparkles, 
  CheckCircle2,
  FileText,
  Search
} from 'lucide-react';
import { EXTRACTED_FIGURES } from '../core/shaftData';

export const CadDrawingGallery: React.FC = () => {
  const [activeCadImage, setActiveCadImage] = useState<string>('/figures/engineering_drawing_sheet_1.png');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const cadItems = [
    {
      id: 'drawing_2d',
      title: '2D Manufacturing Production Drawing (Sheet 1)',
      category: '2D Engineering Drawing',
      image: '/figures/engineering_drawing_sheet_1.png',
      caption: 'Official 2D production draft showing full front elevation, sectional views, GD&T runout, and thread dimensions.'
    },
    {
      id: 'cad_draft_elevation',
      title: 'Internal Geometry & Section A-A Elevation',
      category: '2D Sectional Detail',
      image: '/figures/cad_2d_draft_elevation.png',
      caption: 'Detailed sectional view showing hollow Ø60 mm internal bore, wall thickness, and M95x4 thread undercut.'
    },
    {
      id: 'cad_3d_isometric',
      title: 'Solid Edge 3D CAD Model (Isometric View)',
      category: '3D CAD Assembly',
      image: '/figures/cad_3d_model_isometric.png',
      caption: 'Parametric Solid Edge 3D model designed by Premakumara H.P.S. showing propeller conical taper and integral flange.'
    },
    {
      id: 'cad_flange_thread',
      title: 'Flange Coupling & Thread Detail Renders',
      category: '3D CAD Detail',
      image: '/figures/cad_flange_and_thread.png',
      caption: 'Close-up 3D render of the 6-bolt marine flange coupling and tail-end M95x4 left-hand locking thread.'
    },
    {
      id: 'shaft_final_render',
      title: 'Complete Propulsion Shaft Final CAD Render',
      category: '3D CAD Assembly',
      image: '/figures/shaft_final_render.png',
      caption: 'High-fidelity CAD rendering of the 1.6 m Duplex 2205 marine propulsion shaft.'
    }
  ];

  return (
    <section className="py-12 bg-[#050b14]/70 border-b border-sky-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
              <PenTool className="w-3.5 h-3.5 text-cyan-400" />
              <span>TASK 04 • SOLID EDGE 3D CAD &amp; ISO 2D MANUFACTURING DRAFTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              3D CAD Engineering Models &amp; Production Drawings
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Modeled and detailed by <span className="text-cyan-300 font-semibold">Premakumara H.P.S. (Index: 210494D)</span> in Siemens Solid Edge according to marine classification standards.
            </p>
          </div>

          <a
            href="/docs/2D_Manufacturing_Drawing_Propeller_Shaft.pdf"
            download="2D_Manufacturing_Drawing_Propeller_Shaft.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download 2D Drawing PDF</span>
          </a>
        </div>

        {/* Featured Large Viewer Stage */}
        <div className="marine-card rounded-3xl p-6 md:p-8 mb-8 border border-slate-800">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Active Technical Drawing
              </span>
              <h3 className="text-lg font-bold text-white font-heading">
                {cadItems.find(i => i.image === activeCadImage)?.title}
              </h3>
            </div>

            <button
              onClick={() => setModalImage(activeCadImage)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
              title="Fullscreen Zoom"
            >
              <Maximize2 className="w-4 h-4 text-cyan-400" />
              <span>Inspect Fullscreen</span>
            </button>
          </div>

          {/* Large Image Canvas */}
          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[450px] relative group overflow-hidden">
            <img 
              src={activeCadImage} 
              alt="Active CAD Drawing" 
              className="max-h-[600px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200"
            />
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-300">
              {cadItems.find(i => i.image === activeCadImage)?.caption}
            </span>
            <span className="font-mono text-cyan-300 shrink-0">
              Siemens Solid Edge 2024 • ISO Standard Projection
            </span>
          </div>
        </div>

        {/* CAD Thumbnails Grid Scrubber */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {cadItems.map((item) => {
            const isSelected = item.image === activeCadImage;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCadImage(item.image)}
                className={`p-2 rounded-2xl border text-left transition-all group ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-2 relative border border-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-black/80 text-cyan-300">
                    {item.category}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-white truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Key Geometric Specifications Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Propeller Taper Angle</span>
            <div className="text-xl font-bold font-mono text-white">1:10 Conical</div>
            <p className="text-xs text-slate-400 mt-1">Self-centering snug fit with matching hub</p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Tail Locking Thread</span>
            <div className="text-xl font-bold font-mono text-cyan-300">M95 × 4 Left-Hand</div>
            <p className="text-xs text-slate-400 mt-1">Left-hand pitch prevents loosening under ahead torque</p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Bore Concentricity</span>
            <div className="text-xl font-bold font-mono text-amber-400">Ø60 mm ± 0.05</div>
            <p className="text-xs text-slate-400 mt-1">Deep-hole gundrilled along entire 1.6 m length</p>
          </div>

          <div className="marine-card p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Coupling Flange</span>
            <div className="text-xl font-bold font-mono text-emerald-400">6 Fitted Bolts</div>
            <p className="text-xs text-slate-400 mt-1">Integral forged flange per IS:3653 standard</p>
          </div>
        </div>

        {/* Fullscreen Modal View */}
        {modalImage && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-white font-bold text-sm">
                Technical Drawing Inspection Viewer
              </span>
              <button
                onClick={() => setModalImage(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2 overflow-auto">
              <img 
                src={modalImage} 
                alt="Technical Drawing" 
                className="max-h-[85vh] w-auto max-w-full object-contain rounded shadow-2xl"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
