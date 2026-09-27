import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { MaterialSelectionStudio } from './components/MaterialSelectionStudio';
import { ShaftMechanicalCalculator } from './components/ShaftMechanicalCalculator';
import { FeaSimulationViewer } from './components/FeaSimulationViewer';
import { CadDrawingGallery } from './components/CadDrawingGallery';
import { CorrosionProtectionSystem } from './components/CorrosionProtectionSystem';
import { ReportExplorer } from './components/ReportExplorer';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Confetti on Report Explorer view
  useEffect(() => {
    if (activeTab === 'report-explorer') {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#38bdf8', '#f59e0b', '#10b981', '#a855f7']
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <OverviewSection setActiveTab={setActiveTab} />
            <MaterialSelectionStudio />
            <ShaftMechanicalCalculator />
            <FeaSimulationViewer />
            <CadDrawingGallery />
            <CorrosionProtectionSystem />
          </>
        )}

        {activeTab === 'material-selection' && (
          <div className="pt-20">
            <MaterialSelectionStudio />
          </div>
        )}

        {activeTab === 'mechanical-design' && (
          <div className="pt-20">
            <ShaftMechanicalCalculator />
          </div>
        )}

        {activeTab === 'fea-simulation' && (
          <div className="pt-20">
            <FeaSimulationViewer />
          </div>
        )}

        {activeTab === 'cad-drawings' && (
          <div className="pt-20">
            <CadDrawingGallery />
          </div>
        )}

        {activeTab === 'corrosion-protection' && (
          <div className="pt-20">
            <CorrosionProtectionSystem />
          </div>
        )}

        {activeTab === 'report-explorer' && (
          <div className="pt-20">
            <ReportExplorer />
          </div>
        )}
      </main>

      {/* Academic Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
