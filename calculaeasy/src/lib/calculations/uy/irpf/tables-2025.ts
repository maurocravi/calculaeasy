export type IrpfBracket = {
  upTo: number;   // límite superior mensual en UYU, último: Infinity
  rate: number;   // alícuota marginal (0.10 = 10%)
};

export type IrpfConfig = {
  year: 2025;
  brackets: IrpfBracket[];

  // Metadata útil para cálculo (y futura extensibilidad)
  meta: {
    bpc: number;
    mnig: number;
    deductionRate: {
      threshold: number; // 15 BPC = 98.640
      low: number;       // 14% si <= threshold
      high: number;      // 8% si > threshold
    };
  };
};

export const IRPF_CONFIG_2025: IrpfConfig = {
  year: 2025,
  brackets: [
    { upTo: 46032, rate: 0.00 },     // hasta 7 BPC → 0%
    { upTo: 65760, rate: 0.10 },     // 7–10 BPC → 10%
    { upTo: 98640, rate: 0.15 },     // 10–15 BPC → 15%
    { upTo: 197280, rate: 0.24 },    // 15–30 BPC → 24%
    { upTo: 328800, rate: 0.25 },    // 30–50 BPC → 25%
    { upTo: 493200, rate: 0.27 },    // 50–75 BPC → 27%
    { upTo: 756240, rate: 0.31 },    // 75–115 BPC → 31%  ✅ CORREGIDO
    { upTo: Infinity, rate: 0.36 },  // +115 BPC → 36%
  ],
  meta: {
    bpc: 6576,
    mnig: 46032,
    deductionRate: {
      threshold: 98640, // 15 BPC
      low: 0.14,
      high: 0.08,
    },
  },
};

