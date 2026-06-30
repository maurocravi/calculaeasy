import { round2 } from "../../utils";

export type VacationalInput = {
  monthlyNominal: number; // sueldo nominal mensual
  vacationDays: number;   // días de licencia
  monthDaysDivisor: number; // divisor para salario diario (default 30)
  currency: "UYU" | "USD";
  exchangeRate?: number;
};

export type VacationalOutput = {
  dailyRate: number;
  vacationalPay: number;
  /** Moneda en la que están expresados los resultados (la que ingresó el usuario). */
  currency: "UYU" | "USD";
  /** Equivalente del total en pesos. Solo si la moneda es USD y hay cotización. */
  vacationalPayInUYU?: number;
  notes: string[];
};

export function calculateVacational(input: VacationalInput): VacationalOutput {
  const notes: string[] = [];
  // El salario vacacional es jornal × días: independiente de la moneda. Se
  // calcula en la moneda ingresada; la cotización solo da el equivalente en pesos.
  const nominal = input.monthlyNominal;

  const divisor = input.monthDaysDivisor > 0 ? input.monthDaysDivisor : 30;
  const dailyRate = round2(nominal / divisor);
  const vacationalPay = round2(dailyRate * input.vacationDays);

  const vacationalPayInUYU =
    input.currency === "USD" && input.exchangeRate
      ? round2(vacationalPay * input.exchangeRate)
      : undefined;

  notes.push("El cálculo es estimativo y puede variar según régimen laboral y convenios.");

  return {
    dailyRate,
    vacationalPay,
    currency: input.currency,
    vacationalPayInUYU,
    notes,
  };
}
