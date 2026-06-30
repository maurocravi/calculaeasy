import { round2 } from "../../utils";

export type VatMode = "add" | "remove";

export type VatInput = {
  mode: VatMode;
  amount: number;   // monto base o final según modo (en la moneda original)
  rate: number;     // IVA en decimal: 0.22 o 0.10
  currency: "UYU" | "USD";
  exchangeRate?: number;
};

export type VatOutput = {
  net: number;      // sin IVA
  vat: number;      // monto IVA
  gross: number;    // con IVA
  /** Moneda en la que están expresados los resultados (la que ingresó el usuario). */
  currency: "UYU" | "USD";
  /** Equivalente del total (con IVA) en pesos. Solo si la moneda es USD y hay cotización. */
  grossInUYU?: number;
};

export function calculateVat(input: VatInput): VatOutput {
  const { mode, rate } = input;
  // El IVA es un porcentaje: se calcula en la moneda ingresada, sin convertir.
  // La cotización solo se usa para mostrar el equivalente en pesos como dato auxiliar.
  const amount = input.amount;

  if (rate < 0) {
    return { net: 0, vat: 0, gross: 0, currency: input.currency };
  }

  let net: number;
  let vat: number;
  let gross: number;

  if (mode === "add") {
    // amount es neto (sin IVA)
    net = round2(amount);
    vat = round2(amount * rate);
    gross = round2(amount + vat);
  } else {
    // mode === "remove": amount es bruto (con IVA)
    gross = round2(amount);
    net = round2(amount / (1 + rate));
    vat = round2(gross - net);
  }

  const grossInUYU =
    input.currency === "USD" && input.exchangeRate
      ? round2(gross * input.exchangeRate)
      : undefined;

  return { net, vat, gross, currency: input.currency, grossInUYU };
}
