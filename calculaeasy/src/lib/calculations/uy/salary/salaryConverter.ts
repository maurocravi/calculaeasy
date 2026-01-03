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
  workDaysPerMonth: number;
  workHoursPerMonth: number;
};

export function convertSalary(input: SalaryConverterInput): SalaryConverterOutput {
  let monthly = input.monthlyAmount;

  if (input.currency === 'USD' && input.exchangeRate) {
    monthly = monthly * input.exchangeRate;
  }

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

  return {
    hourly: round2(hourly),
    daily: round2(daily),
    weekly: round2(weekly),
    monthly: round2(monthly),
    yearly: round2(yearly),
    workDaysPerMonth: round2(workDaysPerMonth),
    workHoursPerMonth: round2(workHoursPerMonth),
  };
}
