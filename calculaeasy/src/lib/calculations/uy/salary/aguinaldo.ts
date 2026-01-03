import { round2 } from "../../utils";

export type AguinaldoMode = "monthly" | "semesterTotal";

export type AguinaldoInput = {
  mode: AguinaldoMode;
  currency: "UYU" | "USD";
  exchangeRate?: number;

  // mode === "monthly"
  monthlyNominal?: number;
  monthsWorked?: number; // 1..6

  // mode === "semesterTotal"
  semesterTotal?: number;
};

export type AguinaldoOutput = {
  aguinaldo: number;
  semesterTotalUsed: number;
  notes: string[];
};

// Fórmula base: aguinaldo = totalSemestre / 12
export function calculateAguinaldo(input: AguinaldoInput): AguinaldoOutput {
  const notes: string[] = [];
  const exchangeRate = input.exchangeRate || 1;
  const isUSD = input.currency === "USD";

  let semesterTotalUsed = 0;

  if (input.mode === "monthly") {
    let monthly = input.monthlyNominal ?? 0;
    if (isUSD) monthly *= exchangeRate;

    const months = input.monthsWorked ?? 0;

    semesterTotalUsed = monthly * months;

    if (months < 6) {
      notes.push("Aguinaldo proporcional según meses trabajados en el semestre.");
    }
  } else {
    let total = input.semesterTotal ?? 0;
    if (isUSD) total *= exchangeRate;
    semesterTotalUsed = total;
  }

  const aguinaldo = round2(semesterTotalUsed / 12);

  return {
    aguinaldo,
    semesterTotalUsed: round2(semesterTotalUsed),
    notes,
  };
}
