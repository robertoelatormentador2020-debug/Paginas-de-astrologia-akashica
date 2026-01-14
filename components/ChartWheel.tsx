
import React, { useState } from 'react';
import { AstrologicalPoint, FixedStar } from '../types';
import { Sparkles, Star, Sun } from 'lucide-react';

interface ChartWheelProps {
  points: AstrologicalPoint[];
  fixedStars: FixedStar[];
  mode?: 'geocentric' | 'heliocentric';
}

const ChartWheel: React.FC<ChartWheelProps> = ({ points, fixedStars, mode = 'geocentric' }) => {
  const [activeLayer, setActiveLayer] = useState<'traditional' | 'stellar'>('traditional');
  const size = 600;
  const center = size / 2;
  const radius = (size / 2) - 60;
  
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const signSymbols: Record<string, string> = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋', 
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏', 
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const planetSymbols: Record<string, string> = {
    'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 
    'Mars': '♂', 'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 
    'Neptune': '♆', 'Pluto': '♇', 'Ascendant': 'ASC', 'MC': 'MC',
    'Earth': '⊕'
  };

  const getPosition = (sign: string, degree: number, currentRadius: number) => {
    const signIndex = signs.indexOf(sign);
    const totalDegree = (signIndex * 30) + degree;
    const angle = (totalDegree - 180) * (Math.PI / 180);
    return {
      x: center + currentRadius * Math.cos(angle),
      y: center + currentRadius * Math.sin(angle)
    };
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-full max-w-2xl mx-auto p-4">
        {/* Layer Controls */}
        <div className="absolute top-0 right-0 z-10 flex gap-2">
          <button 
            onClick={() => setActiveLayer('traditional')}
            className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border transition-all ${
              activeLayer === 'traditional' ? 'bg-yellow-600 border-yellow-500 text-black' : 'bg-black/50 border-white/10 text-slate-400'
            }`}
          >
            {mode === 'geocentric' ? 'Natal' : 'Soul Matrix'}
          </button>
          <button 
            onClick={() => setActiveLayer('stellar')}
            className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border transition-all ${
              activeLayer === 'stellar' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-black/50 border-white/10 text-slate-400'
            }`}
          >
            Stellar
          </button>
        </div>

        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto drop-shadow-[0_0_30px_rgba(234,179,8,0.1)] overflow-visible">
          <defs>
            <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={mode === 'heliocentric' ? "rgba(234, 179, 8, 0.2)" : "rgba(26, 16, 61, 0.4)"} />
              <stop offset="100%" stopColor="rgba(5, 5, 5, 0)" />
            </radialGradient>
          </defs>
          <circle cx={center} cy={center} r={radius + 40} fill="url(#nebula)" />

          {/* Zodiac Ring */}
          {signs.map((sign, i) => {
            const angleStart = (i * 30 - 180) * (Math.PI / 180);
            const x1 = center + radius * Math.cos(angleStart);
            const y1 = center + radius * Math.sin(angleStart);
            const textPos = getPosition(sign, 15, radius - 20);

            return (
              <g key={sign}>
                <line x1={center} y1={center} x2={x1} y2={y1} stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
                <text 
                  x={textPos.x} y={textPos.y} 
                  fill="rgba(255, 255, 255, 0.3)" fontSize="16" 
                  textAnchor="middle" alignmentBaseline="middle" className="font-mystic"
                >
                  {signSymbols[sign]}
                </text>
              </g>
            );
          })}

          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
          <circle cx={center} cy={center} r={radius - 45} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

          {/* Fixed Stars Layer */}
          {activeLayer === 'stellar' && fixedStars.map((star, i) => {
            const targetPoint = points.find(p => p.name === star.conjunctionPoint);
            if (!targetPoint) return null;

            const pos = getPosition(targetPoint.sign, targetPoint.degree, radius + 20);
            return (
              <g key={`star-${i}`} className="animate-pulse">
                <circle cx={pos.x} cy={pos.y} r="3" fill="#a855f7" />
                <text x={pos.x + 8} y={pos.y} fill="#c084fc" fontSize="8" className="font-mystic uppercase">
                  {star.name}
                </text>
              </g>
            );
          })}

          {/* Planets */}
          {points.map((p) => {
            const pos = getPosition(p.sign, p.degree, radius - 75);
            const isEarth = p.name === 'Earth';
            return (
              <g key={p.name} className="group transition-transform hover:scale-110">
                <circle 
                  cx={pos.x} cy={pos.y} r="16" 
                  fill="#0f0f19" 
                  stroke={isEarth ? "#4ade80" : "#eab308"} 
                  strokeWidth="1" 
                />
                <text 
                  x={pos.x} y={pos.y} 
                  fill={isEarth ? "#4ade80" : "#eab308"} 
                  fontSize="12" 
                  textAnchor="middle" alignmentBaseline="middle"
                >
                  {planetSymbols[p.name] || p.name.substring(0, 2)}
                </text>
              </g>
            );
          })}

          <circle 
            cx={center} cy={center} r="10" 
            fill={mode === 'heliocentric' ? "#eab308" : "#eab308"} 
            className="animate-pulse shadow-[0_0_20px_#eab308]" 
          />
        </svg>
      </div>
    </div>
  );
};

export default ChartWheel;
