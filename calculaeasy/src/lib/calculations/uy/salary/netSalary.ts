import { calculateContributions, type ContributionConfig } from "./contributions";
import { calculateIrpf } from "../irpf/irpf";
import type { IrpfConfig } from "../irpf/types";
import { round2 } from "../../utils";

export type NetSalaryInput = {
  nominalMonthly: number;
  currency: "UYU" | "USD";
  exchangeRate: number;
  year: number;

  childrenCount: number;      // For IRPF deductions & FONASA
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

  irpf: {
    computedBase: number;   // nominal (+6% ficto si supera 10 BPC)
    fictoApplied: boolean;
    gross: number;          // IRPF por franjas
    totalDeductions: number; // aportes + deducción por hijos
    creditRate: number;     // 14% u 8%
    creditAmount: number;
    amount: number;         // IRPF final retenido
  };

  totalDiscounts: number;
  netUYU: number;
  effectiveDiscountRate: number;
};

export function calculateNetSalary(
  input: NetSalaryInput,
  contributionConfig: ContributionConfig,
  irpfConfig: IrpfConfig
): NetSalaryBreakdown {
  const nominalUYU =
    input.currency === "USD"
      ? round2(input.nominalMonthly * input.exchangeRate)
      : round2(input.nominalMonthly);

  const contributions = calculateContributions(
    {
      nominalUYU,
      hasChildren: input.childrenCount > 0,
      spouseWithoutSNIS: input.spouseWithoutSNIS,
    },
    contributionConfig
  );

  const irpf = calculateIrpf(
    {
      nominalUYU,
      deductibleContributionsUYU: contributions.total,
      childrenCount: input.childrenCount,
    },
    irpfConfig
  );

  const totalDiscounts = round2(contributions.total + irpf.irpfNet);
  const netUYU = round2(nominalUYU - totalDiscounts);
  const effectiveDiscountRate = nominalUYU > 0 ? totalDiscounts / nominalUYU : 0;

  return {
    nominalUYU,
    contributions,
    irpf: {
      computedBase: irpf.computedBaseUYU,
      fictoApplied: irpf.fictoApplied,
      gross: irpf.irpfGross,
      totalDeductions: irpf.totalDeductions,
      creditRate: irpf.creditRate,
      creditAmount: irpf.creditAmount,
      amount: irpf.irpfNet,
    },

    totalDiscounts,
    netUYU,
    effectiveDiscountRate,
  };
}
