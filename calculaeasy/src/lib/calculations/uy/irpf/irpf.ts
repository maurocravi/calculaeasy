import type { IrpfConfig } from "./tables-2025";
import { round2 } from "../../utils";

export type IrpfInput = {
  taxableBaseUYU: number; // base imponible (nominal - aportes)
  nominalUYU: number;     // se usa para decidir 8% o 14% según threshold
};

export type IrpfOutput = {
  taxableBase: number;

  // IRPF por tramos antes de deducción
  irpfGross: number;

  // Deducción general estimada (8% / 14% sobre IRPF bruto)
  generalDeductionRate: number;
  generalDeductionAmount: number;

  // Resultado final
  irpfNet: number;
};

export function calculateIrpf(input: IrpfInput, config: IrpfConfig): IrpfOutput {
  const { taxableBaseUYU, nominalUYU } = input;

  const taxableBase = Math.max(0, taxableBaseUYU);

  // 1) IRPF bruto por franjas (marginal)
  let irpfGross = 0;
  let prevLimit = 0;

  for (const bracket of config.brackets) {
    const upper = bracket.upTo;

    const currentUpper =
      upper === Infinity ? taxableBase : Math.min(taxableBase, upper);

    const portion = currentUpper - prevLimit;

    if (portion > 0) {
      irpfGross += portion * bracket.rate;
      prevLimit += portion;
    }

    if (taxableBase <= upper) break;
  }

  irpfGross = round2(irpfGross);

  // 2) Deducción general (14% si <= threshold; 8% si > threshold)
  const rate =
    nominalUYU <= config.meta.deductionRate.threshold
      ? config.meta.deductionRate.low
      : config.meta.deductionRate.high;

  const generalDeductionAmount = round2(irpfGross * rate);

  // 3) IRPF neto
  const irpfNet = round2(Math.max(0, irpfGross - generalDeductionAmount));

  return {
    taxableBase: round2(taxableBase),
    irpfGross,
    generalDeductionRate: rate,
    generalDeductionAmount,
    irpfNet,
  };
}

