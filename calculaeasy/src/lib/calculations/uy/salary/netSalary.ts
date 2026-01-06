import { calculateContributions, type ContributionRates } from "./contributions";
import { calculateIrpf } from "../irpf/irpf";
import type { IrpfConfig } from "../irpf/tables-2025";
import { round2 } from "../../utils";

export type NetSalaryInput = {
  nominalMonthly: number;
  currency: "UYU" | "USD";
  exchangeRate: number;
  year: number;

  hasChildren: boolean;      // For FONASA
  spouseWithoutSNIS: boolean; // For FONASA
};


export type NetSalaryBreakdown = {
  nominalUYU: number;
  contributions: {
    retirement: number;
    fonasa: number;
    frl: number;
    total: number;
    fonasaRateUsed: number;
  };

  taxableBaseUYU: number;
  irpf: {
    gross: number;
    generalDeductionRate: number;
    generalDeductionAmount: number;
    amount: number; // neto
  };

  totalDiscounts: number;
  netUYU: number;
  effectiveDiscountRate: number;
};

export function calculateNetSalary(
  input: NetSalaryInput,
  contributionRates: ContributionRates,
  irpfConfig: IrpfConfig
): NetSalaryBreakdown {

  const nominalUYU =
    input.currency === "USD"
      ? round2(input.nominalMonthly * input.exchangeRate)
      : round2(input.nominalMonthly);

  const contributions = calculateContributions(
    {
      nominalUYU,
      hasChildren: input.hasChildren,
      spouseWithoutSNIS: input.spouseWithoutSNIS,
    },
    contributionRates
  );


  // Base imponible aproximada:
  const taxableBaseUYU = Math.max(0, nominalUYU - contributions.total);

const irpf = calculateIrpf(
  {
    taxableBaseUYU,
    nominalUYU,
  },
  irpfConfig
);


  const totalDiscounts = round2(contributions.total + irpf.irpfNet);
  const netUYU = round2(nominalUYU - totalDiscounts);
  const effectiveDiscountRate = nominalUYU > 0 ? totalDiscounts / nominalUYU : 0;

  return {
    nominalUYU,
    contributions,
    taxableBaseUYU: round2(taxableBaseUYU),
    irpf: {
      gross: irpf.irpfGross,
      generalDeductionRate: irpf.generalDeductionRate,
      generalDeductionAmount: irpf.generalDeductionAmount,
      amount: irpf.irpfNet,
    },

    totalDiscounts,
    netUYU,
    effectiveDiscountRate,
  };
}
