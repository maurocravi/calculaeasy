export const FONASA_THRESHOLD_BPC = 2.5;

export type FonasaInput = {
  nominalUYU: number;
  hasChildren: boolean;
  spouseWithoutSNIS: boolean; // (*) Solo si no tiene cobertura SNIS propia
};

export function fonasaRate(input: FonasaInput, bpc: number): number {
  const aboveThreshold = input.nominalUYU > bpc * FONASA_THRESHOLD_BPC;

  // Remuneración hasta 2,5 BPC
  if (!aboveThreshold) {
    return input.spouseWithoutSNIS ? 0.05 : 0.03;
  }

  // Remuneración mayor a 2,5 BPC
  if (!input.spouseWithoutSNIS && !input.hasChildren) return 0.045;
  if (!input.spouseWithoutSNIS && input.hasChildren) return 0.06;
  if (input.spouseWithoutSNIS && !input.hasChildren) return 0.065;
  return 0.08;
}
