
import React from 'react';
import { SevenRays, RayInfo } from '../types';

interface RayReportProps {
  rays: SevenRays;
}

const RayCard: React.FC<{ label: string; ray: RayInfo }> = ({ label, ray }) => (
  <div className="glass-panel p-4 rounded-xl border-l-4" style={{ borderColor: ray.color }}>
    <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">{label}</span>
    <h4 className="text-lg font-mystic text-white mt-1">Ray {ray.number}: {ray.name}</h4>
    <p className="text-sm italic text-slate-400 mt-2">"{ray.motto}"</p>
  </div>
);

const RayReport: React.FC<RayReportProps> = ({ rays }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <h3 className="text-2xl font-mystic text-yellow-500 mb-6 flex items-center gap-2">
          <div className="h-0.5 w-12 bg-yellow-500/30"></div>
          The Seven Rays of Influence
          <div className="h-0.5 w-12 bg-yellow-500/30"></div>
        </h3>
      </div>
      
      <RayCard label="Monadic Ray (Divine Source)" ray={rays.monad} />
      <RayCard label="Soul Ray (Inner Purpose)" ray={rays.soul} />
      <RayCard label="Personality Ray (External Self)" ray={rays.personality} />
      
      <RayCard label="Mental Body (Thought)" ray={rays.mental} />
      <RayCard label="Astral Body (Emotion)" ray={rays.astral} />
      <RayCard label="Physical Body (Action)" ray={rays.physical} />
    </div>
  );
};

export default RayReport;
