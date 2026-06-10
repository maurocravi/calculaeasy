import type { IrpfConfig } from "./types";
import { round2 } from "../../utils";

export type IrpfInput = {
  nominalUYU: number;                // sueldo nominal mensual
  deductibleContributionsUYU: number; // aportes personales BPS (montepío + FONASA + FRL)
  childrenCount?: number;            // hijos menores a cargo (deducción 100%)
  disabledChildrenCount?: number;    // hijos con discapacidad a cargo
};

export type IrpfOutput = {
  // Base de cálculo: nominal, incrementado 6% si supera 10 BPC
  computedBaseUYU: number;
  fictoApplied: boolean;

  // IRPF por franjas sobre la base de cálculo
  irpfGross: number;

  // Deducciones admitidas (aportes BPS + hijos), valorizadas a tasa fija
  totalDeductions: number;
  creditRate: number;   // 0.14 si nominal <= 15 BPC, 0.08 si no
  creditAmount: number;

  irpfNet: number;
};

// Mecanismo oficial DGI/BPS (régimen de retenciones mensuales):
// 1) Si el nominal supera 10 BPC, la base se incrementa un 6% (ficto que
//    anticipa el IRPF de aguinaldo y salario vacacional).
// 2) Se aplica la escala de franjas sobre esa base.
// 3) Las deducciones (aportes personales + hijos) NO se restan de la base:
//    se suman y se valorizan al 14% (nominal <= 15 BPC) u 8%, y ese monto
//    se resta del impuesto de las franjas.
export function calculateIrpf(input: IrpfInput, config: IrpfConfig): IrpfOutput {
  const {
    nominalUYU,
    deductibleContributionsUYU,
    childrenCount = 0,
    disabledChildrenCount = 0,
  } = input;

  const { ficto, deductionCredit, personalDeductions } = config.meta;

  const fictoApplied = nominalUYU > ficto.thresholdUYU;
  const computedBaseUYU = round2(
    fictoApplied ? nominalUYU * (1 + ficto.rate) : nominalUYU
  );

  let irpfGross = 0;
  let prevLimit = 0;

  for (const bracket of config.brackets) {
    const upper = Math.min(computedBaseUYU, bracket.upTo);
    const portion = upper - prevLimit;

    if (portion > 0) {
      irpfGross += portion * bracket.rate;
      prevLimit = upper;
    }

    if (computedBaseUYU <= bracket.upTo) break;
  }

  irpfGross = round2(irpfGross);

  const totalDeductions = round2(
    deductibleContributionsUYU +
      childrenCount * personalDeductions.perChildMonthly +
      disabledChildrenCount * personalDeductions.perDisabledChildMonthly
  );

  const creditRate =
    nominalUYU <= deductionCredit.thresholdUYU
      ? deductionCredit.low
      : deductionCredit.high;

  const creditAmount = round2(totalDeductions * creditRate);
  const irpfNet = round2(Math.max(0, irpfGross - creditAmount));

  return {
    computedBaseUYU,
    fictoApplied,
    irpfGross,
    totalDeductions,
    creditRate,
    creditAmount,
    irpfNet,
  };
}
