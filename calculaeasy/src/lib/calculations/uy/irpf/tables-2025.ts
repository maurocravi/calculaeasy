import type { IrpfConfig } from "./types";

export type { IrpfBracket, IrpfConfig } from "./types";

// Valores oficiales 2025 (BPC $6.576)
export const IRPF_CONFIG_2025: IrpfConfig = {
  year: 2025,
  brackets: [
    { upTo: 46032, rate: 0.00 },     // hasta 7 BPC → 0%
    { upTo: 65760, rate: 0.10 },     // 7–10 BPC → 10%
    { upTo: 98640, rate: 0.15 },     // 10–15 BPC → 15%
    { upTo: 197280, rate: 0.24 },    // 15–30 BPC → 24%
    { upTo: 328800, rate: 0.25 },    // 30–50 BPC → 25%
    { upTo: 493200, rate: 0.27 },    // 50–75 BPC → 27%
    { upTo: 756240, rate: 0.31 },    // 75–115 BPC → 31%
    { upTo: Infinity, rate: 0.36 },  // +115 BPC → 36%
  ],
  meta: {
    bpc: 6576,
    mnig: 46032, // 7 BPC
    ficto: {
      thresholdUYU: 65760, // 10 BPC
      rate: 0.06,
    },
    deductionCredit: {
      thresholdUYU: 98640, // 15 BPC
      low: 0.14,
      high: 0.08,
    },
    personalDeductions: {
      perChildMonthly: 10960,         // 20 BPC anuales / 12
      perDisabledChildMonthly: 21920, // 40 BPC anuales / 12
    },
  },
};
