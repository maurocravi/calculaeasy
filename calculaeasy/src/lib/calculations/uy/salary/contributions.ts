import { round2 } from "../../utils";
import { fonasaRate } from "../fonasa/fonasa";

export type ContributionConfig = {
  retirementRate: number;   // montepío (15%)
  frlRate: number;          // reconversión laboral (0,1%)
  bpc: number;              // para el umbral FONASA de 2,5 BPC
  retirementCapUYU: number; // tope de cotización jubilatoria (en pesos)
};

// Tope de cotización vigente desde enero 2026 (BPS). Se ajusta con las
// pasividades; por encima no se aporta montepío sobre el excedente.
export const CONTRIBUTION_CONFIG_2026: ContributionConfig = {
  retirementRate: 0.15,
  frlRate: 0.001,
  bpc: 6864,
  retirementCapUYU: 288836,
};

export const CONTRIBUTION_CONFIG_2025: ContributionConfig = {
  retirementRate: 0.15,
  frlRate: 0.001,
  bpc: 6576,
  retirementCapUYU: 288836,
};

export type ContributionInput = {
  nominalUYU: number;
  hasChildren: boolean;
  spouseWithoutSNIS: boolean;
};

export type Contributions = {
  retirement: number;
  fonasa: number;
  frl: number;
  total: number;
  fonasaRateUsed: number;
};

export function calculateContributions(
  input: ContributionInput,
  config: ContributionConfig
): Contributions {
  // El tope de cotización aplica solo al aporte jubilatorio;
  // FONASA y FRL se calculan sobre el total de la remuneración.
  const cappedBase = Math.min(input.nominalUYU, config.retirementCapUYU);

  const retirement = round2(cappedBase * config.retirementRate);

  const fonasaRateUsed = fonasaRate(
    {
      nominalUYU: input.nominalUYU,
      hasChildren: input.hasChildren,
      spouseWithoutSNIS: input.spouseWithoutSNIS,
    },
    config.bpc
  );

  const fonasa = round2(input.nominalUYU * fonasaRateUsed);
  const frl = round2(input.nominalUYU * config.frlRate);

  const total = round2(retirement + fonasa + frl);

  return { retirement, fonasa, frl, total, fonasaRateUsed };
}
