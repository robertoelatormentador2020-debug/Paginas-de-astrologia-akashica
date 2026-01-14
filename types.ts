
export interface BirthData {
  date: string;
  time: string;
  location: string;
  lat?: number;
  lng?: number;
  timezone: string;
  occupation?: string;
  knownAscendant?: string;
  isFamous?: boolean;
  famousCategory?: 'Historical' | 'Scientist' | 'Artist' | 'Spiritual' | 'Fictional';
}

export interface AstrologicalPoint {
  name: string;
  sign: string;
  degree: number;
  house: number;
  isRetrograde: boolean;
  esotericRuler?: string;
}

export interface SevenRays {
  monad: RayInfo;
  soul: RayInfo;
  personality: RayInfo;
  mental: RayInfo;
  astral: RayInfo;
  physical: RayInfo;
}

export interface RayInfo {
  number: number;
  name: string;
  motto: string;
  color: string;
}

export interface FixedStar {
  name: string;
  constellation: string;
  meaning: string;
  starseedConnection: string;
  conjunctionPoint?: string;
  orb?: number;
  memoryType: string;
  spiritualAffinities: string[];
}

export interface ResonancePoint {
  planet: string;
  aspect: string;
  archetypePlanet: string;
  meaning: string;
}

export interface AshramProfile {
  primaryAshram: string;
  secondaryAshram: string;
  soulFunction: string;
  dominantEsotericRuler: string;
  initiaticLevel: string;
}

export interface AkashicOrigin {
  category: 'Ancient Earth' | 'Starseed' | 'Lemurian/Atlantean' | 'Solar/Crystal' | 'Reincarnating Master' | 'Cosmic Exile';
  systemOrigin?: string;
  karmicWeight: string;
  soulLineage: string;
}

export interface HeliocentricAnalysis {
  earthPosition: AstrologicalPoint;
  soulAnchorMeaning: string;
  planetaryService: string;
  solarVector: string; // The Sun-Earth axis meaning
  stellarResonance: string; // How Heliocentric Earth connects to fixed stars
}

export interface SoulAnalysis {
  starseedOrigin: string;
  starseedProfile: {
    primarySystem: string;
    secondarySystem: string;
    missionType: string;
    stellarActivation: string;
    affinityScores: { system: string; score: number }[];
  };
  akashicRecord: {
    soulContract: string;
    dormantGifts: string[];
    karmicAncestry: string;
    pastLifeCivilization: string;
    evolutionaryLine: string;
    archetypalLineage?: string;
  };
  ashram: AshramProfile;
  origin: AkashicOrigin;
  heliocentric: HeliocentricAnalysis;
  soulMission: string;
  karmicLessons: string[];
  pastLifeEchoes: string;
  sevenRays: SevenRays;
  fixedStars: FixedStar[];
  resonance?: {
    sharedFixedStars: string[];
    sharedRays: number[];
    mirrorPoints: ResonancePoint[];
    overallCompatibility: number;
  };
}

export interface CompleteChartData {
  birthData: BirthData;
  points: AstrologicalPoint[];
  heliocentricPoints: AstrologicalPoint[];
  analysis: SoulAnalysis;
}

export enum TabType {
  Natal = 'natal',
  Esoteric = 'esoteric',
  Heliocentric = 'heliocentric',
  Starseed = 'starseed',
  Akashic = 'akashic',
  Famous = 'famous'
}
