import { round2 } from "../../utils";
import {
  calculateContributions,
  CONTRIBUTION_CONFIG_2026,
} from "./contributions";

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

  // Para cálculo de aportes sobre el aguinaldo (opcional)
  childrenCount?: number;
  hasSpouse?: boolean;
  spouseWithoutSNIS?: boolean;
};

export type AguinaldoOutput = {
  aguinaldo: number; // nominal
  semesterTotalUsed: number;
  contributions: {
    retirement: number;
    fonasa: number;
    frl: number;
    total: number;
    fonasaRateUsed: number;
  };
  netAguinaldo: number;
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

  // Aportes sobre el aguinaldo (estimado)
  // Nota: en la realidad, el tope de cotización se aplica sobre sueldo + aguinaldo del mes de pago.
  // Si el sueldo del mes ya alcanzó el tope, estos descuentos podrían ser menores.
  const hasChildren = (input.childrenCount ?? 0) > 0;
  const contributions = calculateContributions(
    {
      nominalUYU: aguinaldo,
      hasChildren,
      spouseWithoutSNIS: input.spouseWithoutSNIS ?? false,
    },
    CONTRIBUTION_CONFIG_2026
  );

  const netAguinaldo = round2(aguinaldo - contributions.total);

  if (contributions.total > 0) {
    notes.push(
      "Los descuentos de aportes son una estimación. El tope de cotización de BPS se aplica sobre el total del mes de pago (sueldo + aguinaldo)."
    );
  }

  return {
    aguinaldo,
    semesterTotalUsed: round2(semesterTotalUsed),
    contributions,
    netAguinaldo,
    notes,
  };
}
