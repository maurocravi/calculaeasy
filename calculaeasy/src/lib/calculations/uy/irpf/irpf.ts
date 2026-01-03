import type { IrpfConfig } from "./tables-2026";
import { round2 } from "../../utils";

export type IrpfInput = {
  taxableBaseUYU: number;
  childrenCount: number; // no se usa aún (deductions=0)
  hasSpouse: boolean;    // no se usa aún
};

export type IrpfOutput = {
  taxableBase: number;
  deductions: number;
  taxableAfterDeductions: number;
  irpf: number;
};

export function calculateIrpf(input: IrpfInput, config: IrpfConfig): IrpfOutput {
  const { taxableBaseUYU, childrenCount, hasSpouse } = input;

  const deductions =
    childrenCount * config.deductionPerChild + (hasSpouse ? config.deductionSpouse : 0);

  const taxableAfterDeductions = Math.max(0, taxableBaseUYU - deductions);

  let irpf = 0;
  let prevLimit = 0;

  for (const bracket of config.brackets) {
    const upper = bracket.upTo;

    const currentUpper =
      upper === Infinity ? taxableAfterDeductions : Math.min(taxableAfterDeductions, upper);

    const portion = currentUpper - prevLimit;

    if (portion > 0) {
      irpf += portion * bracket.rate;
      prevLimit += portion;
    }

    if (taxableAfterDeductions <= upper) break;
  }

  return {
    taxableBase: round2(taxableBaseUYU),
    deductions: round2(deductions),
    taxableAfterDeductions: round2(taxableAfterDeductions),
    irpf: round2(irpf),
  };
}
