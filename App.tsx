
import React, { useState } from 'react';
import { BirthData, CompleteChartData, TabType } from './types';
import BirthForm from './components/BirthForm';
import ChartWheel from './components/ChartWheel';
import RayReport from './components/RayReport';
import { generateEsotericReading } from './services/geminiService';
import { 
  Compass, 
  Dna, 
  Orbit as Galaxy, 
  BookOpen, 
  ChevronRight,
  Loader2,
  Download,
  Share2,
  Trophy,
  Zap,
  Star,
  Activity,
  Shield,
  Layers,
  Map,
  Flame,
  Globe,
  Dna as DnaIcon,
  Castle,
  Sun,
  Anchor
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<CompleteChartData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Natal);
  const [error, setError] = useState<string | null>(null);

  const handleBirthSubmit = async (data: BirthData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateEsotericReading(data);
      setChartData(result);
      if (data.isFamous) setActiveTab(TabType.Famous);
    } catch (err) {
      console.error(err);
      setError("The Akashic gateway timed out. Please verify your spiritual connection parameters.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => window.print();

  const renderTabContent = () => {
    if (!chartData) return null;

    switch (activeTab) {
      case TabType.Natal:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-700">
            <ChartWheel points={chartData.points} fixedStars={chartData.analysis.fixedStars} />
            <div className="space-y-8">
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-yellow-500">
                <h3 className="text-xl font-mystic text-yellow-500 mb-4 border-b border-yellow-500/10 pb-2">Geocentric Blueprint</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {chartData.points.map(p => (
                    <div key={p.name} className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 uppercase tracking-tighter text-[10px] font-bold">{p.name}</span>
                      <span className="text-white font-medium">{p.sign} {Math.floor(p.degree)}°</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-purple-500">
                <h3 className="text-xl font-mystic text-purple-400 mb-2">Geocentric Star Nodes</h3>
                <div className="space-y-3">
                  {chartData.analysis.fixedStars.slice(0, 4).map(star => (
                    <div key={star.name} className="flex items-start gap-3">
                      <Star size={12} className="text-purple-400 mt-1 shrink-0" />
                      <div>
                        <div className="text-white text-sm font-bold">{star.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Memory: {star.memoryType} via {star.conjunctionPoint}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case TabType.Heliocentric:
        const helioEarth = chartData.analysis.heliocentric;
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ChartWheel mode="heliocentric" points={chartData.heliocentricPoints} fixedStars={chartData.analysis.fixedStars} />
              
              <div className="space-y-8">
                <div className="glass-panel p-10 rounded-[2.5rem] border-t-8 border-green-500/30">
                  <h3 className="text-3xl font-mystic text-green-400 mb-6 flex items-center gap-3">
                    <Anchor size={28} /> The Soul Anchor (⊕)
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Earth's Solar Position</span>
                      <div className="text-3xl text-white font-mystic">
                        {helioEarth.earthPosition.sign} {Math.floor(helioEarth.earthPosition.degree)}°
                      </div>
                    </div>
                    <p className="text-xl text-slate-200 leading-relaxed font-light italic">
                      "{helioEarth.soulAnchorMeaning}"
                    </p>
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-xs uppercase text-green-500 font-bold mb-2">Planetary Service Function</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{helioEarth.planetaryService}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-yellow-500/20">
                  <h4 className="text-xl font-mystic text-yellow-500 mb-4 flex items-center gap-2">
                    <Sun size={20} /> Solar Vector Axis
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {helioEarth.solarVector}
                  </p>
                  <div className="mt-6 flex items-center gap-3 p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                    <Star size={16} className="text-purple-400" />
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                      Stellar Resonance: {helioEarth.stellarResonance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case TabType.Esoteric:
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <RayReport rays={chartData.analysis.sevenRays} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-[2rem] border-t-8 border-yellow-500/30">
                <h3 className="text-2xl font-mystic text-yellow-500 mb-6 flex items-center gap-2">
                  <Flame size={24} /> Spiritual Ashram
                </h3>
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Primary Alignment</span>
                    <div className="text-2xl text-white font-mystic">{chartData.analysis.ashram.primaryAshram}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-yellow-600 uppercase font-bold block mb-1">Soul Function</span>
                    <p className="text-slate-300 text-sm italic leading-relaxed">{chartData.analysis.ashram.soulFunction}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Esoteric Ruler</span>
                      <span className="text-white text-sm font-bold">{chartData.analysis.ashram.dominantEsotericRuler}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Initiatic Stage</span>
                      <span className="text-white text-sm font-bold">{chartData.analysis.ashram.initiaticLevel || 'Calculating...'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-[2rem] bg-gradient-to-br from-yellow-600/5 to-transparent flex flex-col justify-center items-center text-center">
                <div className="h-32 w-32 rounded-full border-4 border-yellow-500/20 flex items-center justify-center relative mb-6">
                  <div className="absolute inset-0 border-2 border-yellow-500/10 rounded-full animate-ping"></div>
                  <Castle size={48} className="text-yellow-500" />
                </div>
                <h4 className="text-xs uppercase tracking-[0.4em] text-slate-500 font-bold mb-2">Secondary Support</h4>
                <p className="text-lg text-white font-mystic">{chartData.analysis.ashram.secondaryAshram}</p>
              </div>
            </div>
          </div>
        );
      case TabType.Starseed:
        return (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-3xl col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Galaxy size={200} />
                </div>
                <h3 className="text-4xl font-mystic text-yellow-500 mb-6">Stellar Origin Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {chartData.analysis.starseedProfile.affinityScores.map(score => (
                    <div key={score.system} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{score.system}</div>
                      <div className="text-2xl font-mystic text-white">{score.score}%</div>
                      <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full" style={{ width: `${score.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-1">Primary Signature</h4>
                    <p className="text-xl text-white font-mystic">{chartData.analysis.starseedProfile.primarySystem}</p>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic text-sm border-t border-white/5 pt-4">
                    {chartData.analysis.starseedProfile.stellarActivation}
                  </p>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-3xl border border-purple-500/20">
                <h4 className="text-xl font-mystic text-purple-400 mb-6 flex items-center gap-2">
                  <Shield size={20} /> Soul Archetype
                </h4>
                <div className="space-y-6">
                  <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                    <p className="text-lg text-white font-mystic mb-2">{chartData.analysis.starseedProfile.missionType}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Collective specialized frequency to act as a catalyst for consciousness awakening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case TabType.Akashic:
        return (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-10 rounded-[2.5rem] md:col-span-2 border-b-8 border-yellow-500/30 relative overflow-hidden bg-gradient-to-br from-yellow-600/5 to-transparent">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Globe size={120} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.5em] text-yellow-600 font-bold mb-4">Akashic Soul Origin</h3>
                <h2 className="text-5xl font-mystic text-white mb-6">
                  {chartData.analysis.origin.category}
                </h2>
                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <DnaIcon size={14} className="text-yellow-500" /> Lineage: {chartData.analysis.origin.soulLineage}
                </p>
                <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Karmic Resonance Weight</span>
                  <p className="text-slate-200 leading-relaxed italic">{chartData.analysis.origin.karmicWeight}</p>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between border-white/10">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Evolutionary Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-yellow-500 mt-1"></div>
                      <p className="text-xs text-slate-400 leading-tight">Root connection to {chartData.analysis.akashicRecord.pastLifeCivilization}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                  <span className="text-[10px] text-yellow-600 uppercase font-bold">Soul Contract</span>
                  <p className="text-white font-mystic text-lg mt-1 truncate">{chartData.analysis.akashicRecord.archetypalLineage}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case TabType.Famous:
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 glass-panel p-10 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-transparent">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Trophy size={120} className="text-purple-400" />
                </div>
                <h3 className="text-xs uppercase tracking-[0.5em] text-purple-400 font-bold mb-4">Archetypal Lineage</h3>
                <h2 className="text-5xl font-mystic text-white mb-6">{chartData.analysis.akashicRecord.archetypalLineage || "The Visionary"}</h2>
                <p className="text-xl text-slate-200 leading-relaxed font-light">{chartData.analysis.akashicRecord.soulContract}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-yellow-500/30 pb-20">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:rotate-90 transition-transform duration-700">
            <Galaxy className="text-black h-6 w-6" />
          </div>
          <span className="text-2xl font-mystic tracking-tighter text-yellow-500 glow-gold">Astra Akasha</span>
        </div>
        {chartData && (
          <div className="flex items-center gap-4">
            <button onClick={handleDownload} className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold text-slate-300 transition-all border border-white/10">
              <Download size={14} /> PDF Blueprint
            </button>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!chartData ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-6 max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-mystic text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-600 leading-none">
                Soul Anchoring
              </h1>
              <p className="text-xl text-slate-400 font-light tracking-wide max-w-2xl mx-auto">
                Heliocentric Starseed analysis and the initiatic identification of your service to Earth's planetary grid.
              </p>
            </div>
            {isLoading ? (
              <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in">
                <Loader2 className="h-20 w-20 text-yellow-500 animate-spin" />
                <p className="font-mystic text-yellow-500 tracking-[0.5em] uppercase text-sm">Calculating Solar Vectors...</p>
              </div>
            ) : (
              <BirthForm onSubmit={handleBirthSubmit} isLoading={isLoading} />
            )}
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12">
              <div className="space-y-4">
                <span className={`font-mystic uppercase tracking-[0.6em] text-[10px] ${chartData.birthData.isFamous ? 'text-purple-400' : 'text-yellow-600'}`}>
                  {chartData.birthData.isFamous ? 'Archetypal Record' : 'Solar-Soul Profile v5.0'}
                </span>
                <h2 className="text-5xl font-mystic text-white">{chartData.birthData.isFamous ? chartData.birthData.occupation : 'Incarnation Vector'}</h2>
              </div>
              
              <div className="flex bg-white/5 rounded-full p-1.5 border border-white/10 backdrop-blur-xl">
                {[
                  { id: TabType.Natal, label: 'Geo-Natal', icon: Compass },
                  { id: TabType.Heliocentric, label: 'Helio-Soul', icon: Sun },
                  { id: TabType.Esoteric, label: 'Ashram', icon: Flame },
                  { id: TabType.Starseed, label: 'Stellar', icon: Galaxy },
                  ...(chartData.birthData.isFamous ? [{ id: TabType.Famous, label: 'Archetype', icon: Trophy }] : []),
                  { id: TabType.Akashic, label: 'Origins', icon: Globe },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all duration-500 ${
                      activeTab === tab.id 
                        ? 'bg-yellow-600 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <tab.icon size={14} />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="min-h-[600px]">{renderTabContent()}</div>
          </div>
        )}
      </main>

      <footer className="mt-40 py-20 border-t border-white/5 text-center bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          <div className="text-left space-y-2">
            <p className="text-slate-600 text-xs uppercase tracking-[0.3em] font-mystic">Wisdom Origin</p>
            <p className="text-slate-400 text-[10px]">Heliocentric Soul-Centering & Interstellar service mapping.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Galaxy size={30} className="text-yellow-600/20" />
            <p className="text-slate-600 text-xs tracking-widest font-mystic">SOLAR CONSCIOUSNESS • EARTH SERVICE</p>
          </div>
          <div className="text-right space-y-2">
            <p className="text-slate-600 text-xs uppercase tracking-[0.3em] font-mystic">Solar Engine</p>
            <p className="text-slate-400 text-[10px]">Soul vectors calculated via Gemini 3.0 Real-time Astrological Logic.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
