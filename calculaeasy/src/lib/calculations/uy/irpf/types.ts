export type IrpfBracket = {
  upTo: number;   // límite superior mensual en UYU, último: Infinity
  rate: number;   // alícuota marginal (0.10 = 10%)
};

export type IrpfConfig = {
  year: number;
  brackets: IrpfBracket[];

  meta: {
    bpc: number;
    mnig: number; // mínimo no imponible mensual (7 BPC), informativo

    // Incremento ficto del 6%: si el nominal mensual supera 10 BPC,
    // la base de cálculo del IRPF se incrementa un 6% (anticipa el
    // IRPF de aguinaldo y salario vacacional).
    ficto: {
      thresholdUYU: number; // 10 BPC mensuales
      rate: number;         // 0.06
    };

    // Las deducciones (aportes BPS + hijos) no se restan de la base:
    // se valorizan a una tasa fija y se restan del IRPF de las franjas.
    deductionCredit: {
      thresholdUYU: number; // 15 BPC mensuales
      low: number;          // 0.14 si nominal <= threshold
      high: number;         // 0.08 si nominal > threshold
    };

    personalDeductions: {
      perChildMonthly: number;         // 20 BPC anuales / 12
      perDisabledChildMonthly: number; // 40 BPC anuales / 12
    };
  };
};
