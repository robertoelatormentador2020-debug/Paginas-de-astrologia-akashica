
import { GoogleGenAI, Type } from "@google/genai";
import { BirthData, CompleteChartData } from "../types";

export const generateEsotericReading = async (birthData: BirthData, userContext?: BirthData): Promise<CompleteChartData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const modeContext = birthData.isFamous 
    ? `ANALYSIS MODE: FAMOUS/ARCHETYPAL. Character: ${birthData.occupation}.`
    : `ANALYSIS MODE: PERSONAL. Birth: ${birthData.date}, ${birthData.time}, ${birthData.location}.`;

  const prompt = `Perform an advanced Akashic, Initiatic, and Heliocentric analysis.
  ${modeContext}
  
  MANDATORY TASKS:
  1. GEOCENTRIC PLANETS: 10 planets + ASC/MC.
  
  2. HELIOCENTRIC PLANETS: Calculate positions for Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto AND the Earth (⊕).
     - In the Heliocentric chart, the Sun is the center. The Earth (⊕) is always 180° opposite the Geocentric Sun position.
  
  3. HELIOCENTRIC EARTH ANALYSIS:
     - Earth (⊕) represents the Point of Conscious Incarnation.
     - Identify the "Soul Anchor" (how the soul grounds its cosmic mission).
     - Define the "Planetary Service" (the role the soul fulfills for Earth's evolution).
     - Link the Earth position to Fixed Stars (e.g. Earth at 14° Scorpio links to Acrux).

  4. AKASHIC ORIGIN: Classify as 'Ancient Earth', 'Starseed', 'Lemurian/Atlantean', etc., using planetary weights.

  5. SPIRITUAL ASHRAM: Determine Primary/Secondary Ashram and Soul Function.

  6. SEVEN RAYS: Calculate all rays.

  Return valid JSON. Use highly symbolic, profound language.`;

  const raySchema = {
    type: Type.OBJECT,
    properties: {
      number: { type: Type.NUMBER },
      name: { type: Type.STRING },
      motto: { type: Type.STRING },
      color: { type: Type.STRING }
    },
    required: ["number", "name", "motto", "color"]
  };

  const pointSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      sign: { type: Type.STRING },
      degree: { type: Type.NUMBER },
      house: { type: Type.NUMBER },
      isRetrograde: { type: Type.BOOLEAN },
      esotericRuler: { type: Type.STRING }
    },
    required: ["name", "sign", "degree", "house", "isRetrograde"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          points: { type: Type.ARRAY, items: pointSchema },
          heliocentricPoints: { type: Type.ARRAY, items: pointSchema },
          analysis: {
            type: Type.OBJECT,
            properties: {
              starseedOrigin: { type: Type.STRING },
              starseedProfile: {
                type: Type.OBJECT,
                properties: {
                  primarySystem: { type: Type.STRING },
                  secondarySystem: { type: Type.STRING },
                  missionType: { type: Type.STRING },
                  stellarActivation: { type: Type.STRING },
                  affinityScores: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: { system: { type: Type.STRING }, score: { type: Type.NUMBER } },
                      required: ["system", "score"]
                    }
                  }
                },
                required: ["primarySystem", "secondarySystem", "missionType", "stellarActivation", "affinityScores"]
              },
              ashram: {
                type: Type.OBJECT,
                properties: {
                  primaryAshram: { type: Type.STRING },
                  secondaryAshram: { type: Type.STRING },
                  soulFunction: { type: Type.STRING },
                  dominantEsotericRuler: { type: Type.STRING },
                  initiaticLevel: { type: Type.STRING }
                },
                required: ["primaryAshram", "secondaryAshram", "soulFunction", "dominantEsotericRuler"]
              },
              origin: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  systemOrigin: { type: Type.STRING },
                  karmicWeight: { type: Type.STRING },
                  soulLineage: { type: Type.STRING }
                },
                required: ["category", "karmicWeight", "soulLineage"]
              },
              heliocentric: {
                type: Type.OBJECT,
                properties: {
                  earthPosition: pointSchema,
                  soulAnchorMeaning: { type: Type.STRING },
                  planetaryService: { type: Type.STRING },
                  solarVector: { type: Type.STRING },
                  stellarResonance: { type: Type.STRING }
                },
                required: ["earthPosition", "soulAnchorMeaning", "planetaryService", "solarVector", "stellarResonance"]
              },
              akashicRecord: {
                type: Type.OBJECT,
                properties: {
                  soulContract: { type: Type.STRING },
                  dormantGifts: { type: Type.ARRAY, items: { type: Type.STRING } },
                  karmicAncestry: { type: Type.STRING },
                  pastLifeCivilization: { type: Type.STRING },
                  evolutionaryLine: { type: Type.STRING },
                  archetypalLineage: { type: Type.STRING }
                },
                required: ["soulContract", "dormantGifts", "karmicAncestry", "pastLifeCivilization", "evolutionaryLine"]
              },
              soulMission: { type: Type.STRING },
              karmicLessons: { type: Type.ARRAY, items: { type: Type.STRING } },
              sevenRays: {
                type: Type.OBJECT,
                properties: {
                  monad: raySchema, soul: raySchema, personality: raySchema,
                  mental: raySchema, astral: raySchema, physical: raySchema
                },
                required: ["monad", "soul", "personality", "mental", "astral", "physical"]
              },
              fixedStars: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    constellation: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    starseedConnection: { type: Type.STRING },
                    conjunctionPoint: { type: Type.STRING },
                    orb: { type: Type.NUMBER },
                    memoryType: { type: Type.STRING },
                    spiritualAffinities: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["name", "constellation", "meaning", "starseedConnection", "memoryType"]
                }
              }
            },
            required: ["starseedOrigin", "starseedProfile", "ashram", "origin", "heliocentric", "akashicRecord", "soulMission", "karmicLessons", "sevenRays", "fixedStars"]
          }
        },
        required: ["points", "heliocentricPoints", "analysis"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  const rawData = JSON.parse(text);
  return { 
    birthData, 
    points: rawData.points, 
    heliocentricPoints: rawData.heliocentricPoints, 
    analysis: rawData.analysis 
  };
};
