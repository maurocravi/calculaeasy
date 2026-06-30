import { round2 } from "../../utils";

export type SalaryConverterInput = {
  monthlyAmount: number;
  hoursPerDay: number;   // default 8
  daysPerWeek: number;   // default 5
  weeksPerYear: number;  // default 52
  monthsPerYear: number; // default 12
  currency: 'UYU' | 'USD';
  exchangeRate?: number;
};

export type SalaryConverterOutput = {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  /** Ingreso anual incluyendo aguinaldo (SAC): 13 sueldos si el mensual es constante. */
  yearlyWithAguinaldo: number;
  workDaysPerMonth: number;
  workHoursPerMonth: number;
  /** Moneda en la que están expresados los resultados (la que ingresó el usuario). */
  currency: 'UYU' | 'USD';
  /** Equivalente del sueldo mensual en pesos. Solo definido si la moneda es USD y hay cotización. */
  monthlyInUYU?: number;
};

export function convertSalary(input: SalaryConverterInput): SalaryConverterOutput {
  // El desglose se calcula en la moneda ingresada (dividir el sueldo es
  // independiente de la moneda). La cotización se usa solo para mostrar el
  // equivalente en pesos como dato auxiliar.
  const monthly = input.monthlyAmount;

  const daysPerWeek = input.daysPerWeek > 0 ? input.daysPerWeek : 5;
  const hoursPerDay = input.hoursPerDay > 0 ? input.hoursPerDay : 8;
  const weeksPerYear = input.weeksPerYear > 0 ? input.weeksPerYear : 52;
  const monthsPerYear = input.monthsPerYear > 0 ? input.monthsPerYear : 12;

  // Días laborales promedio por mes
  const workDaysPerMonth = (daysPerWeek * weeksPerYear) / monthsPerYear;

  // Horas laborales promedio por mes
  const workHoursPerMonth = workDaysPerMonth * hoursPerDay;

  const hourly = workHoursPerMonth > 0 ? monthly / workHoursPerMonth : 0;
  const daily = workDaysPerMonth > 0 ? monthly / workDaysPerMonth : 0;
  const weekly = daily * daysPerWeek;
  const yearly = monthly * monthsPerYear;

  // Aguinaldo (SAC): 1/12 de lo percibido en el año, equivalente a un sueldo
  // extra cuando el mensual es constante. Ingreso anual ≈ 13 sueldos.
  const yearlyWithAguinaldo = monthly * (monthsPerYear + 1);

  const monthlyInUYU =
    input.currency === 'USD' && input.exchangeRate
      ? round2(monthly * input.exchangeRate)
      : undefined;

  return {
    hourly: round2(hourly),
    daily: round2(daily),
    weekly: round2(weekly),
    monthly: round2(monthly),
    yearly: round2(yearly),
    yearlyWithAguinaldo: round2(yearlyWithAguinaldo),
    workDaysPerMonth: round2(workDaysPerMonth),
    workHoursPerMonth: round2(workHoursPerMonth),
    currency: input.currency,
    monthlyInUYU,
  };
}
