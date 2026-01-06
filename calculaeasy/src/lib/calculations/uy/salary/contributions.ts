import { round2 } from "../../utils";
import { fonasaRate2025 } from "../fonasa/fonasa-2025";

export type ContributionRates = {
  retirementRate: number; // montepío
  frlRate: number;        // reconversión laboral
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
  rates: ContributionRates
): Contributions {
  const retirement = round2(input.nominalUYU * rates.retirementRate);

  const fonasaRateUsed = fonasaRate2025({
    nominalUYU: input.nominalUYU,
    hasChildren: input.hasChildren,
    spouseWithoutSNIS: input.spouseWithoutSNIS,
  });

  const fonasa = round2(input.nominalUYU * fonasaRateUsed);
  const frl = round2(input.nominalUYU * rates.frlRate);

  const total = round2(retirement + fonasa + frl);

  return { retirement, fonasa, frl, total, fonasaRateUsed };
}

