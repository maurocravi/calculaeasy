export type IrpfBracket = {
  upTo: number;   // límite superior mensual (UYU), último: Infinity
  rate: number;   // alícuota marginal (0.10 = 10%)
};

export type IrpfConfig = {
  year: 2026;
  brackets: IrpfBracket[];
  deductionPerChild: number; // 0 por ahora
  deductionSpouse: number;   // 0 por ahora
};

export const IRPF_CONFIG_2026: IrpfConfig = {
  year: 2026,
  brackets: [
    // TODO: reemplazar por franjas oficiales 2026
    // Ejemplo placeholder:
    { upTo: 46032, rate: 0.00 },
    { upTo: 65760, rate: 0.10 },
    { upTo: 98640, rate: 0.15 },
    { upTo: 197280, rate: 0.24 },
    { upTo: 328800, rate: 0.25 },
    { upTo: 493200, rate: 0.27 },
    { upTo: 657600, rate: 0.31 },
    { upTo: Infinity, rate: 0.36 },
  ],
  deductionPerChild: 0,
  deductionSpouse: 0,
};
