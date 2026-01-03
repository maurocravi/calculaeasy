import { round2 } from "../../utils";

export type ContributionRates = {
  retirementRate: number; // montepío
  fonasaRate: number;
  frlRate: number;        // fondo reconversión laboral
};

export type Contributions = {
  retirement: number;
  fonasa: number;
  frl: number;
  total: number;
};

export function calculateContributions(nominalUYU: number, rates: ContributionRates): Contributions {
  const retirement = round2(nominalUYU * rates.retirementRate);
  const fonasa = round2(nominalUYU * rates.fonasaRate);
  const frl = round2(nominalUYU * rates.frlRate);

  const total = round2(retirement + fonasa + frl);

  return { retirement, fonasa, frl, total };
}
