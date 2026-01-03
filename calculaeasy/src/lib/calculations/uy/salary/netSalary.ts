import { calculateContributions, type ContributionRates } from "./contributions";
import { calculateIrpf } from "../irpf/irpf";
import type { IrpfConfig } from "../irpf/tables-2026";
import { round2 } from "../../utils";

export type NetSalaryInput = {
  nominalMonthly: number;
  currency: "UYU" | "USD";
  exchangeRate: number;   // UYU por USD (default 40)
  year: 2026;
  childrenCount: number;  // 0 por ahora
  hasSpouse: boolean;     // false por ahora
};

export type NetSalaryBreakdown = {
  nominalUYU: number;
  contributions: {
    retirement: number;
    fonasa: number;
    frl: number;
    total: number;
  };
  taxableBaseUYU: number;
  irpf: {
    deductions: number;
    taxableAfterDeductions: number;
    amount: number;
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

  const contributions = calculateContributions(nominalUYU, contributionRates);

  // Base imponible aproximada:
  const taxableBaseUYU = Math.max(0, nominalUYU - contributions.total);

  const irpf = calculateIrpf(
    {
      taxableBaseUYU,
      childrenCount: input.childrenCount,
      hasSpouse: input.hasSpouse,
    },
    irpfConfig
  );

  const totalDiscounts = round2(contributions.total + irpf.irpf);
  const netUYU = round2(nominalUYU - totalDiscounts);
  const effectiveDiscountRate = nominalUYU > 0 ? totalDiscounts / nominalUYU : 0;

  return {
    nominalUYU,
    contributions,
    taxableBaseUYU: round2(taxableBaseUYU),
    irpf: {
      deductions: irpf.deductions,
      taxableAfterDeductions: irpf.taxableAfterDeductions,
      amount: irpf.irpf,
    },
    totalDiscounts,
    netUYU,
    effectiveDiscountRate,
  };
}
