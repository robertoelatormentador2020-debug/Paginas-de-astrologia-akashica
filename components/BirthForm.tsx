
import React, { useState } from 'react';
import { BirthData } from '../types';
import { Sparkles, MapPin, Calendar, Clock, Briefcase, Compass, Users, User } from 'lucide-react';

interface BirthFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading: boolean;
}

const archetypes = [
  { name: 'Leonardo da Vinci', date: '1452-04-15', time: '22:00', loc: 'Vinci, Italy', cat: 'Artist' },
  { name: 'Nikola Tesla', date: '1856-07-10', time: '00:00', loc: 'Smiljan, Croatia', cat: 'Scientist' },
  { name: 'Marie Curie', date: '1867-11-07', time: '12:00', loc: 'Warsaw, Poland', cat: 'Scientist' },
  { name: 'Carl Jung', date: '1875-07-26', time: '19:30', loc: 'Kesswil, Switzerland', cat: 'Spiritual' },
  { name: 'Frida Kahlo', date: '1907-07-06', time: '08:30', loc: 'Mexico City, Mexico', cat: 'Artist' }
];

const BirthForm: React.FC<BirthFormProps> = ({ onSubmit, isLoading }) => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const [isFamousMode, setIsFamousMode] = useState(false);
  const [formData, setFormData] = useState<BirthData>({
    date: '1990-01-01',
    time: '12:00',
    location: '',
    occupation: '',
    knownAscendant: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isFamous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, isFamous: isFamousMode });
  };

  const selectArchetype = (arc: typeof archetypes[0]) => {
    setFormData({
      ...formData,
      date: arc.date,
      time: arc.time,
      location: arc.loc,
      occupation: arc.name,
      isFamous: true
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Mode Switcher */}
      <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 mb-4">
        <button 
          onClick={() => setIsFamousMode(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${!isFamousMode ? 'bg-yellow-600 text-black shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <User size={14} /> Personal
        </button>
        <button 
          onClick={() => setIsFamousMode(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isFamousMode ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Users size={14} /> Famous Library
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6">
        <div className="text-center mb-4">
          <Sparkles className={`mx-auto mb-2 h-8 w-8 ${isFamousMode ? 'text-purple-400' : 'text-yellow-500'}`} />
          <h2 className="text-2xl font-mystic text-white">
            {isFamousMode ? 'Archetype Selection' : 'Enter Your Astral Data'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isFamousMode ? 'Study collective soul templates' : 'Align your soul signature with the stars'}
          </p>
        </div>

        {isFamousMode && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {archetypes.map(arc => (
              <button
                key={arc.name}
                type="button"
                onClick={() => selectArchetype(arc)}
                className="text-[10px] bg-white/5 border border-white/10 hover:border-purple-500/50 p-2 rounded-lg text-slate-300 text-left transition-colors truncate"
              >
                {arc.name}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-slate-500 block mb-1">Birth Date</label>
              <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-2.5">
                <Calendar className="text-yellow-600/60 mr-2 h-4 w-4" />
                <input
                  type="date"
                  className="bg-transparent w-full outline-none text-sm text-white"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-slate-500 block mb-1">Exact Time</label>
              <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-2.5">
                <Clock className="text-yellow-600/60 mr-2 h-4 w-4" />
                <input
                  type="time"
                  className="bg-transparent w-full outline-none text-sm text-white"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="text-xs uppercase tracking-widest text-slate-500 block mb-1">Place of Birth</label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-2.5">
              <MapPin className="text-yellow-600/60 mr-2 h-4 w-4" />
              <input
                type="text"
                placeholder="City, Country"
                className="bg-transparent w-full outline-none text-sm text-white placeholder-slate-600"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          {!isFamousMode && (
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-slate-500 block mb-1">Known Ascendant (Optional)</label>
              <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-2.5">
                <Compass className="text-yellow-600/60 mr-2 h-4 w-4" />
                <select
                  className="bg-transparent w-full outline-none text-sm text-white appearance-none cursor-pointer"
                  value={formData.knownAscendant}
                  onChange={(e) => setFormData({ ...formData, knownAscendant: e.target.value })}
                >
                  <option value="" className="bg-slate-900 text-slate-500">Auto-calculate</option>
                  {signs.map(sign => (
                    <option key={sign} value={sign} className="bg-slate-900 text-white">{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="relative">
            <label className="text-xs uppercase tracking-widest text-slate-500 block mb-1">
              {isFamousMode ? 'Character Name' : 'Vocational Path (Optional)'}
            </label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-2.5">
              <Briefcase className="text-yellow-600/60 mr-2 h-4 w-4" />
              <input
                type="text"
                placeholder={isFamousMode ? "Enter name..." : "e.g. Healer, Artist..."}
                className="bg-transparent w-full outline-none text-sm text-white placeholder-slate-600"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                required={isFamousMode}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-mystic tracking-widest transition-all duration-300 ${
            isLoading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : isFamousMode 
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.02]'
                : 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:scale-[1.02]'
          }`}
        >
          {isLoading ? 'Decrypting Records...' : isFamousMode ? 'Analyze Archetype' : 'Initialize Soul Mapping'}
        </button>
      </form>
    </div>
  );
};

export default BirthForm;
