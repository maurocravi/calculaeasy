import type { IrpfConfig } from "./types";

export type { IrpfBracket, IrpfConfig } from "./types";

// Valores oficiales 2026 (BPC $6.864, Decreto 11/026 y Comunicado BPS R 5/2026)
export const IRPF_CONFIG_2026: IrpfConfig = {
  year: 2026,
  brackets: [
    { upTo: 48048, rate: 0.00 },     // hasta 7 BPC → 0%
    { upTo: 68640, rate: 0.10 },     // 7–10 BPC → 10%
    { upTo: 102960, rate: 0.15 },    // 10–15 BPC → 15%
    { upTo: 205920, rate: 0.24 },    // 15–30 BPC → 24%
    { upTo: 343200, rate: 0.25 },    // 30–50 BPC → 25%
    { upTo: 514800, rate: 0.27 },    // 50–75 BPC → 27%
    { upTo: 789360, rate: 0.31 },    // 75–115 BPC → 31%
    { upTo: Infinity, rate: 0.36 },  // +115 BPC → 36%
  ],
  meta: {
    bpc: 6864,
    mnig: 48048, // 7 BPC
    ficto: {
      thresholdUYU: 68640, // 10 BPC
      rate: 0.06,
    },
    deductionCredit: {
      thresholdUYU: 102960, // 15 BPC
      low: 0.14,
      high: 0.08,
    },
    personalDeductions: {
      perChildMonthly: 11440,         // 20 BPC anuales / 12
      perDisabledChildMonthly: 22880, // 40 BPC anuales / 12
    },
  },
};
