import { round2 } from "../../utils"; // ajustá el path según tu proyecto

export type SeveranceInput = {
  salaryMonthlyUYU: number;         // remuneración mensual de referencia (nominal)
  startDateISO: string;             // "YYYY-MM-DD"
  endDateISO: string;               // "YYYY-MM-DD"
  countFractionOver3Months?: boolean; // default true
  maxMonthsCap?: number;            // default 6
};

export type SeveranceOutput = {
  salaryMonthlyUYU: number;
  seniority: {
    years: number;
    months: number;
    totalMonths: number;
  };
  indemnityMonths: number; // meses de indemnización (con tope)
  indemnityRawMonths: number; // antes de tope
  capApplied: boolean;
  indemnityUYU: number;
};

function diffInMonths(start: Date, end: Date): number {
  // Cálculo simple de meses completos aproximado (por calendario)
  // Si querés precisión quirúrgica por días, lo refinamos después.
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

export function calculateSeverance(input: SeveranceInput): SeveranceOutput {
  const salary = Math.max(0, input.salaryMonthlyUYU);
  const cap = input.maxMonthsCap ?? 6;
  const countFrac = input.countFractionOver3Months ?? true;

  const start = new Date(input.startDateISO);
  const end = new Date(input.endDateISO);

  const totalMonths = diffInMonths(start, end);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Regla de cómputo de fracción:
  // - base MTSS: "por cada año o fracción" (interpretación práctica: si hay fracción, computa 1 año más)
  // - muchas guías usan: "fracción mayor a 3 meses" suma 1 año
  let indemnityRawMonths = years;

  if (countFrac) {
    if (months > 3) indemnityRawMonths += 1;
  } else {
    if (months > 0) indemnityRawMonths += 1;
  }

  const indemnityMonths = Math.min(indemnityRawMonths, cap);
  const capApplied = indemnityRawMonths > cap;

  const indemnityUYU = round2(indemnityMonths * salary);

  return {
    salaryMonthlyUYU: round2(salary),
    seniority: { years, months, totalMonths },
    indemnityMonths,
    indemnityRawMonths,
    capApplied,
    indemnityUYU,
  };
}
