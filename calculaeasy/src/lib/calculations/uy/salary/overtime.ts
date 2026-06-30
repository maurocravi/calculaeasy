import { round2 } from "../../utils";

/** Recargo por trabajo nocturno en Uruguay: 20% sobre el valor hora. */
export const NIGHT_SURCHARGE = 0.2;

export type OvertimeInput = {
  monthlyNominal: number;   // sueldo nominal mensual
  overtimeHours: number;    // horas extra trabajadas
  monthlyHours: number;     // horas mensuales estándar (default 192 o 200)
  surchargeRate: number;    // recargo de la hora extra: 1.0 (hábil) o 1.5 (feriado/descanso)
  nocturnal?: boolean;      // si las horas son nocturnas se suma 20% al valor hora
  currency: "UYU" | "USD";
  exchangeRate?: number;
};

export type OvertimeOutput = {
  hourlyRate: number;          // valor hora normal (sin recargos)
  overtimeHourlyRate: number;  // hora extra con recargo (y nocturnidad si aplica)
  overtimePay: number;         // pago total horas extra
  /** Moneda en la que están expresados los resultados (la que ingresó el usuario). */
  currency: "UYU" | "USD";
  /** Equivalente del pago de las horas extra en pesos. Solo si la moneda es USD y hay cotización. */
  overtimePayInUYU?: number;
  notes: string[];
};

export function calculateOvertime(input: OvertimeInput): OvertimeOutput {
  const notes: string[] = [];

  // El cálculo se hace en la moneda ingresada. La cotización solo se usa para
  // mostrar el equivalente en pesos como dato auxiliar.
  const nominal = input.monthlyNominal;

  const monthlyHours = input.monthlyHours > 0 ? input.monthlyHours : 192;

  // Valor hora normal. Si las horas son nocturnas, la base se incrementa 20%
  // y sobre ese valor recargado se aplica el recargo de la hora extra.
  const hourlyRate = round2(nominal / monthlyHours);
  const nightFactor = input.nocturnal ? 1 + NIGHT_SURCHARGE : 1;
  const overtimeHourlyRate = round2(
    hourlyRate * nightFactor * (1 + input.surchargeRate),
  );
  const overtimePay = round2(overtimeHourlyRate * input.overtimeHours);

  const overtimePayInUYU =
    input.currency === "USD" && input.exchangeRate
      ? round2(overtimePay * input.exchangeRate)
      : undefined;

  if (input.nocturnal) {
    notes.push("Incluye el recargo nocturno del 20% sobre el valor hora.");
  }

  return {
    hourlyRate,
    overtimeHourlyRate,
    overtimePay,
    currency: input.currency,
    overtimePayInUYU,
    notes,
  };
}
